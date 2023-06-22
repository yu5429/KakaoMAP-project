package project.example.demo.member;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

import project.example.demo.dto.MemberDTO;


@Controller
public class MemberController {
	final DefaultMessageService messageService;

	public MemberController() {
		this.messageService = NurigoApp.INSTANCE.initialize("NCSY0E54KZK025CT", "PGICSLP8GA8KX8L9VNJXQV9HJZ29E7ET",
				"https://api.coolsms.co.kr");
	}

	@Autowired
	private MemberDAO mdao;

	private final Logger log = LoggerFactory.getLogger(getClass());

	@GetMapping("/login")
	public String login_page(HttpServletRequest req) {
		return redirectMain(req, "/member/login");
	}

	@GetMapping("/signup")
	public String signup_page(HttpServletRequest req) {
		return redirectMain(req, "/member/signUp");
	}

	@GetMapping("/signupdate")
	public String signupdate_page(HttpServletRequest req) {
		HttpSession session = req.getSession();
		if (session.getAttribute("id") != null) return "/member/signUpdate";
		else if (req.getHeader("Referer") != null) {
			return "redirect:" + req.getHeader("Referer");
		}
		else return "welcome";
	}

	@GetMapping("/find/id")
	public String idfind(HttpServletRequest req) {
		return redirectMain(req, "/member/findID");
	}

	@GetMapping("/find/pw")
	public String pwfind(HttpServletRequest req) {
		return redirectMain(req, "/member/findPW");
	}

	@PostMapping("/submit/login")
	@ResponseBody
	public String submit_login(HttpServletRequest req) {
		String check = "false";

		HttpSession session = req.getSession();

		String id = req.getParameter("id");
		String pw = req.getParameter("pw");

		int flag = mdao.check_duplicateID(id);

		if (flag != 0) {
			String get_id = mdao.get_id(id, pw);
			if (get_id != null) {
				session.setAttribute("id", get_id);
				session.setMaxInactiveInterval(600);
				check = "true";
			} else
				check = "wrong";
		} else
			check = "none";

		return check;
	}

	@PostMapping("/submit/signup")
	@ResponseBody
	public String submit_signup(HttpServletRequest req) {
		String check = "true";

		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		String name = req.getParameter("name");
		String gender = req.getParameter("gender");
		String birth = req.getParameter("birth");
		String phone = req.getParameter("phone");

		mdao.submit_signup(id, pw, gender, birth, name, phone);

		return check;
	}

	@PostMapping("/submit/logout")
	@ResponseBody
	public String submit_logout(HttpServletRequest req) {
		String check = "true";

		HttpSession session = req.getSession();
		session.invalidate();

		return check;
	}

	@PostMapping("/check/duplicateID")
	@ResponseBody
	public String check_duplicateID(HttpServletRequest req) {
		String check = "false";

		String id = req.getParameter("id");

		int flag = mdao.check_duplicateID(id);
		if (flag == 0)
			check = "true";

		return check;
	}

	@PostMapping("/check/phone")
	@ResponseBody
	public String check_phone(HttpServletRequest req) {
		String check = "false";

		String phone = req.getParameter("phone");

		int flag = mdao.check_phone(phone);
		if (flag == 0)
			check = "true";

		return check;
	}

	@PostMapping("/search/id")
	@ResponseBody
	public String search_id(HttpServletRequest req) {
		String result = "";

		String name = req.getParameter("name");
		String phone = req.getParameter("phone");

		result = mdao.search_id(name, phone);

		return result;
	}

	@PostMapping("/search/pw")
	@ResponseBody
	public String search_pw(HttpServletRequest req) {

		String result = "false";

		String temporary = getTemporalPw(8);

		String id = req.getParameter("id");
		String name = req.getParameter("name");
		String phone = req.getParameter("phone");

		int flag = mdao.search_pw(id, name, phone);

		if (flag != 0) {
			mdao.update_pw(id, name, phone, temporary);
			sendTemporalPw(phone, temporary);
			result = "true";
		}

		return result;
	}

	public String redirectMain(HttpServletRequest req, String url) {
		HttpSession session = req.getSession();
		if (session.getAttribute("id") != null)
			return "redirect:/main";
		else
			return url;
	}

	public String getTemporalPw(int size) {
		char[] charSet = new char[] { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
				'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };

		StringBuffer sb = new StringBuffer();
		SecureRandom sr = new SecureRandom();
		sr.setSeed(new Date().getTime());
		int index = 0;

		for (int i = 0; i < size; i++) {
			index = sr.nextInt(charSet.length);
			sb.append(charSet[index]);
		}
		return sb.toString();
	}

	@PostMapping("/get/signupInfo")
	@ResponseBody
	public String get_signupInfo(HttpServletRequest req) {
		HttpSession session = req.getSession();
		JSONArray ja = new JSONArray();

		if (session.getAttribute("id") != null) {
			String id = session.getAttribute("id").toString();

			ArrayList<MemberDTO> mdto = mdao.get_signupInfo(id);

			for (int i = 0; i < mdto.size(); i++) {
				JSONObject jo = new JSONObject();
				jo.put("id", mdto.get(i).getId());
				jo.put("pw", mdto.get(i).getPw());
				jo.put("name", mdto.get(i).getName());
				jo.put("gender", mdto.get(i).getGender());
				jo.put("birth", mdto.get(i).getBirth());
				jo.put("phone", mdto.get(i).getPhone());
				ja.put(jo);
			}
		}

		return ja.toString();
	}

	@PostMapping("/get/userName")
	@ResponseBody
	public String get_userName (HttpServletRequest req) {
		HttpSession session = req.getSession();
		JSONArray ja = new JSONArray();
				
		if (session.getAttribute("id") != null) {
			String id = session.getAttribute("id").toString();
		
			ArrayList<MemberDTO> mdto = mdao.get_signupInfo(id);
			
			for (int i = 0; i < mdto.size(); i++) {
				JSONObject jo = new JSONObject();
				jo.put("name", mdto.get(i).getName());
				ja.put(jo);
			}
		}
		
		return ja.toString();
	}

	@PostMapping("/update/signup")
	@ResponseBody
	public String update_signup(HttpServletRequest req) {
		String check = "true";

		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		String name = req.getParameter("name");
		String gender = req.getParameter("gender");
		String birth = req.getParameter("birth");
		String phone = req.getParameter("phone");
		mdao.update_signup(id, pw, name, gender, birth, phone);

		return check;
	}

	public SingleMessageSentResponse sendTemporalPw(String phone, String temporary) {
		Message message = new Message();
		message.setFrom("01074123949");
		message.setTo(phone);
		message.setText(String.format("""
				[맛집] 임시 비밀번호는 %1$s 입니다
				로그인 후 비밀번호를 변경해주세요
				""", temporary));
		SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
		return response;
	}
	
	@PostMapping("/get/userReviewCount")
	@ResponseBody
	public int get_userReviewCount (HttpServletRequest req) {
		HttpSession session = req.getSession();
		String id = session.getAttribute("id").toString();
		return mdao.get_userReviewCount(id); 
	}
}
