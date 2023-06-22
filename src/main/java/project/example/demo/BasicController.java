package project.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class BasicController {
	@GetMapping("/")
	@ResponseBody
	public String index_page() {
		return "INDEX";
	}
	
	@GetMapping("/welcome")
	public String welcom_page() {
		return "welcome";
	}
	
	@PostMapping("/isLogin")
	@ResponseBody
	public String isLogin(HttpServletRequest req) {
		String isLogin = "false";
		HttpSession session = req.getSession();
		if (session.getAttribute("id") != null) { 
			isLogin = "true";
			if (session.getAttribute("id").equals("admin"))
				isLogin = "admin";
		}
		return isLogin;
	}
	
	@PostMapping("/logout")
	@ResponseBody
	public String logout_page(HttpServletRequest req) {
		String flag = "logout";
		HttpSession session = req.getSession();
		session.invalidate();
		return flag;
	}
}