package project.example.demo.admin;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import project.example.demo.dto.AdminRestaurantDTO;

@Controller
public class AdminController {
	@Autowired
	private AdminRestaurantDAO ardao;

	@GetMapping("/admin/restaurant")
	public String check_admin(HttpServletRequest req) {		
		HttpSession session = req.getSession();
		if (session.getAttribute("id") != null 
		&& session.getAttribute("id").equals("admin")) return "/admin/adminRestaurant";
		else return "main";
	}

	@PostMapping("/admin/restaurant/getList")
	@ResponseBody
	public String adminRestaurant_getList(HttpServletRequest req) {
		int start = Integer.parseInt(req.getParameter("start"));
		int end = Integer.parseInt(req.getParameter("end"));
		
		ArrayList<AdminRestaurantDTO> ardto = ardao.adminRestaurantList(start, end);
		JSONArray ja = new JSONArray();

		for (int i = 0; i < ardto.size(); i++) {
			JSONObject jo = new JSONObject();

			jo.put("adrt_primecode", ardto.get(i).getAdrt_primecode());
			jo.put("adrt_r_name", ardto.get(i).getAdrt_r_name());
			jo.put("adrt_owner", ardto.get(i).getAdrt_owner());
			jo.put("adrt_category", ardto.get(i).getAdrt_category());
			jo.put("adrt_address", ardto.get(i).getAdrt_address());
			jo.put("adrt_localurl", ardto.get(i).getAdrt_localurl());
			ja.put(jo);
		}
		return ja.toString();
	}

	@PostMapping("/admin/insup/restaurant")
	@ResponseBody
	public String admin_insup_restaurant(@RequestParam("r_name") String r_name,
										 @RequestParam("primecode") String primecode,
										 @RequestParam("address") String address,
										 @RequestParam("changeFlag") int changeFlag) {
		String check = "insert";
		int exist = ardao.admin_beforeInsUp(r_name, address);
		String query = "";
		if (exist == 0 && primecode != "") {
			query = String.format("""
				insert into restaurant (lat, lng, primecode, r_name, owner, category, address) 
				select adrt_lat, adrt_lng, adrt_primecode, adrt_r_name, adrt_owner,
				adrt_category, adrt_address
				from admin_restaurant 
				where adrt_primecode = '%1$s'
				""", primecode);
			ardao.admin_insup_restaurant(query);
			adrt_delete_procedure(r_name, address);
		}
		else if (exist == 0 && primecode == "") {
			query = String.format("""
				insert into restaurant (lat, lng, primecode, r_name, owner, category, address) 
				select adrt_lat, adrt_lng, adrt_primecode, adrt_r_name, adrt_owner,
				adrt_category, adrt_address
				from admin_restaurant 
				where adrt_r_name = '%1$s'
				and adrt_address = '%2$s'
				""", r_name, address);
			ardao.admin_insup_restaurant(query);
			adrt_delete_procedure(r_name, address);
		}
		else if  (exist != 0 && changeFlag == 0) check = "exist";
		else if (changeFlag == 1) {
			query = String.format("""
				update restaurant r
				set (r.lat, r.lng, r.primecode, r.r_name, r.owner, r.category, r.address)
				= (	select a.adrt_lat, a.adrt_lng, a.adrt_primecode, a.adrt_r_name, 
					a.adrt_owner, a.adrt_category, a.adrt_address
					from admin_restaurant a
					where a.adrt_r_name = '%1$s'
					and a.adrt_address = '%2$s' )
				where r.r_name = '%1$s'
				and r.address = '%2$s'
				""", r_name, address);
			ardao.admin_insup_restaurant(query);
			adrt_delete_procedure(r_name, address);
			check = "update";
		}
		return check;
	}

	@PostMapping("/admin/delete/restaurant")
	@ResponseBody
	public String admin_delete_restaurant(@RequestParam("r_name") String r_name,
										  @RequestParam("address") String address) {
		String check = "true";
		adrt_delete_procedure(r_name, address);
		return check;
	}
	
	public void adrt_delete_procedure(String r_name, String address) {
		String url = ardao.admin_getLocalURL(r_name, address);
		Path filePath = Paths.get("C:\\Users\\leon1\\eclipse-workspace\\Project\\src\\main\\resources\\static" + url);
		try {
			Files.deleteIfExists(filePath);
		}
		catch (Exception e) {};
		ardao.admin_delete_restaurant(r_name, address);
	}
}