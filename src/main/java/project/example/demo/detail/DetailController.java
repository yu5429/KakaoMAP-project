package project.example.demo.detail;

import java.io.File;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import project.example.demo.dto.RestaurantDTO;
import project.example.demo.dto.ReviewDTO;
import project.example.demo.dto.StatisticDTO;

@Controller
public class DetailController {
	@Autowired
	private DetailDAO ddao;

	@GetMapping("/restaurant/detail/{rname}/{address}")
	public String rdetail() {
		return "/detail/detail";
	}

	@PostMapping("/restaurant/detail/{rname}/{address}")
	@ResponseBody
	public String get_restaurant_detail (@PathVariable("rname") String rname, 
								      @PathVariable("address") String address,
							    	  HttpServletRequest req) {
		String response;
		
		int count = ddao.count_reviewList(rname, address, "is not null");
		ArrayList<RestaurantDTO> rdto = ddao.get_restaurant_detail(rname, address);
		JSONArray ja = new JSONArray();
		for (RestaurantDTO r : rdto) {
			JSONObject jo = new JSONObject();
			jo.put("primecode", r.getPrimecode());
			jo.put("r_name", r.getR_name());
			jo.put("owner", r.getOwner());
			jo.put("category", r.getCategory());
			jo.put("address", r.getAddress());
			jo.put("r_phone", r.getR_phone());
			jo.put("r_detail", r.getR_detail());
			jo.put("menu", r.getMenu());
			jo.put("r_photo", r.getR_photo());
			
			HttpSession session = req.getSession();
			String id = "";
			if (session.getAttribute("id") != null && r.getOwner() != null) { 
				id = String.valueOf(session.getAttribute("id"));
				if (id.equals(r.getOwner().split(",")[0])) jo.put("isOwner", "true");
				else jo.put("isOwner", "false");
			}
			jo.put("reviewCount", count);
			ja.put(jo);
		}
		response = ja.toString();
		return response;
	}
	
	@PostMapping("/restaurant/detail/update/info")
	@ResponseBody
	public String update_info(@RequestParam("r_name") String r_name,
							  @RequestParam("address") String address,	
							  @RequestParam("r_phone") String r_phone,
							  @RequestParam("r_detail") String r_detail) {
		ddao.update_info(r_name, address, r_phone, r_detail);
		return "update";
	}
	
	@PostMapping("/restaurant/detail/update/menu")
	@ResponseBody
	public String update_menu(@RequestParam("r_name") String r_name,
							  @RequestParam("address") String address,
							  @RequestParam("menu") String menu) {
		ddao.update_menu(r_name, address, menu);
		return "update";
	}
	
	@PostMapping("/review/check/mine")
	@ResponseBody
	public String review_check_mine(@RequestParam("rv_r_name") String rv_r_name,
									@RequestParam("rv_address") String rv_address,
									HttpServletRequest req) {
		String message = "";
		HttpSession session = req.getSession();
		String owner = null; 
		if (ddao.get_owner(rv_r_name, rv_address) != null) 
			owner = ddao.get_owner(rv_r_name, rv_address).split(",")[0];
		
		if (session.getAttribute("id") == null) {
			message = "logout";
			return message;
		}
		else {
			if (owner != null && session.getAttribute("id").equals(owner)) {
				message = "owner";
				return message;
			}
			String rv_id = String.valueOf(session.getAttribute("id"));
			int flag = ddao.check_mine(rv_r_name, rv_address, rv_id);
			if (flag == 0) message = "none";
			else {
				String detail = ddao.check_isFirst(rv_r_name, rv_address, rv_id);
				if (detail == null) message = "first";
				else message = "exist";
			}
			return message;
		}
	}
	
	@GetMapping("/restaurant/detail/{rname}/{address}/authorize")
	public String get_authorize (@PathVariable("rname") String rname, 
							     @PathVariable("address") String address,
							     HttpServletRequest req) {
		String encodedName = null;
		String encodedAddress = null;
		try {
			encodedName = URLEncoder.encode(rname, "UTF-8").replace("+", "%20");
			encodedAddress = URLEncoder.encode(address, "UTF-8").replace("+", "%20");
		}
		catch (Exception e) {}
		
		HttpSession session = req.getSession();
		if (session.getAttribute("id") == null) {
			return "redirect:/restaurant/detail/" + encodedName + "/" + encodedAddress;
		}
		else return "/detail/authorize";
	}
	
	@PostMapping("/restaurant/detail/{rname}/{address}/authorize")
	@ResponseBody
	public String review_authorize (@PathVariable("rname") String rv_r_name,
									@PathVariable("address") String rv_address,
									HttpServletRequest req) {
		String message = "";
		HttpSession session = req.getSession();
		if (session.getAttribute("id") == null) message = "logout";
		else {
			String rv_id = String.valueOf(session.getAttribute("id"));
			int flag = ddao.check_mine(rv_r_name, rv_address, rv_id);
			if (flag == 0) {
				if (ddao.get_owner(rv_r_name, rv_address) != null) {
					if (rv_id.equals(ddao.get_owner(rv_r_name, rv_address).split(",")[0])) {
						message = "owner";
					}
				}
				else {
					String rv_primecode = ddao.get_primecode(rv_r_name, rv_address);
					ddao.authorize_reivew(rv_primecode, rv_r_name, rv_address, rv_id);
					message = "authorize";
				}
			}
			else message = "exist";
		}
		return message;
	}
	
	@PostMapping("/restaurant/detail/tag/top")
	@ResponseBody
	public String tag_top (@RequestParam("r_name") String r_name,
					 	   @RequestParam("address") String address,
					 	   HttpServletRequest req) {
		ArrayList<StatisticDTO> sdto = ddao.tag_top(r_name, address);
		JSONArray ja = new JSONArray();
		for (StatisticDTO s : sdto) {
			JSONObject jo = new JSONObject();
			jo.put("tags", s.getTags().toLowerCase());
			jo.put("tag_count", s.getTag_count());
			ja.put(jo);
		}
		return ja.toString();
	}

	@PostMapping("/review/submit")
	@ResponseBody
	public String review_submit (@RequestPart(value = "review") ReviewDTO rdto,
								 @RequestPart(value = "tags") String tags,
								 HttpServletRequest req) {
		String rv_r_name = rdto.getRv_r_name();
		String rv_address = rdto.getRv_address();
		String rv_primecode = ddao.get_primecode(rv_r_name, rv_address);
		HttpSession session = req.getSession();
		String rv_id = String.valueOf(session.getAttribute("id"));
		ArrayList<String> originList = new ArrayList<String>();
		ArrayList<String> tagList = new ArrayList<String>(Arrays.asList(tags.split(",")));
		String rv_detail = rdto.getRv_detail();
		
		int flag = ddao.check_mine(rv_r_name, rv_address, rv_id);
		if (flag == 0) ddao.review_insert(rv_primecode, rv_r_name, rv_address, rv_id, tags, rv_detail);
		else {
			if (ddao.get_origin_tags(rv_r_name, rv_address, rv_id) != null) {
				String[] temp = ddao.get_origin_tags(rv_r_name, rv_address, rv_id).split(",");
				originList = new ArrayList<String>(Arrays.asList(temp));
			}
			ddao.review_update(rv_primecode, rv_r_name, rv_address, rv_id, tags, rv_detail);
		}
				
		StringBuilder query = new StringBuilder();
		int occured = 0;
		if (flag == 0) {
			for (int i = 0; i < tagList.size(); i++) {
				if (occured == 0) {
					query.append(String.format("%1$s = %1$s + 1", tagList.get(i)));
					occured++;
				}
				else query.append(String.format("\n, %1$s = %1$s + 1", tagList.get(i)));
			}
			ddao.update_statistic(rv_r_name, rv_address, query.toString());	
		}
		else {
			for (int i = 0; i < tagList.size(); i++) {
				if (originList.contains(tagList.get(i))) continue;
				else {
					if (occured == 0) {
						query.append(String.format("%1$s = %1$s + 1", tagList.get(i)));
						occured++;
					}
					else query.append(String.format("\n, %1$s = %1$s + 1", tagList.get(i)));
				}
			}
			if (query.length() != 0) ddao.update_statistic(rv_r_name, rv_address, query.toString());
			query.setLength(0);
			occured = 0;
			for (int i = 0; i < originList.size(); i++) {
				if (tagList.contains(originList.get(i))) continue;
				else {
					if (occured == 0) {
						query.append(String.format("%1$s = %1$s - 1", originList.get(i)));
						occured++;
					}
					else query.append(String.format("\n, %1$s = %1$s - 1", originList.get(i)));
				}
			}
			if (query.length() != 0) ddao.update_statistic(rv_r_name, rv_address, query.toString());
		}
		return "insert";
	}
	
	@PostMapping("/review/submit/photo")
	@ResponseBody
	public String review_submit_photo (@RequestPart(value = "review") ReviewDTO rdto,
									   @RequestPart(value = "tags") String tags,
									   @RequestPart(value = "photo", required = false) MultipartFile[] photo,
									   HttpServletRequest req) {
		String message = "";
		
		String rv_r_name = rdto.getRv_r_name();
		String rv_address = rdto.getRv_address();
		String rv_primecode = ddao.get_primecode(rv_r_name, rv_address);
		HttpSession session = req.getSession();
		String rv_id = String.valueOf(session.getAttribute("id"));
		String idString = String.valueOf(session.getAttribute("id")) + " ";
		ArrayList<String> originList = new ArrayList<String>();
		ArrayList<String> tagList = new ArrayList<String>(Arrays.asList(tags.split(",")));
		String rv_detail = rdto.getRv_detail();
		
		LocalDate today = LocalDate.now();
		DateTimeFormatter fd = DateTimeFormatter.ofPattern(" yyyy-MM-DD ");
		String todayString = today.format(fd);
		LocalTime now = LocalTime.now();
		DateTimeFormatter fn = DateTimeFormatter.ofPattern("HH-mm-ss ");
		String timeString = now.format(fn);
		
		String rv_photo = "";
		
		if(photo != null) {
			String location = 
					"C:\\Users\\leon1\\eclipse-workspace\\Project\\src\\main\\resources\\static\\img\\review";
			String shortLocation = "/img/review/";
			
			String[] extensions = {
					"bmp", "jpg", "jpeg", "gif", "png", "webp", "webm", "jfif", "pdf"
			};
			String originalExtension = photo[0].getOriginalFilename().split("\\.")[1];
			int acceptable = 0;
			for (String s : extensions) {
				if (s.equals(originalExtension)) {
					acceptable = 1; break;
				}
			}
			if (acceptable == 0) {
				message = "extension";
				return message;
			}
		
			String filename = rv_r_name + " " + idString + todayString + timeString + photo[0].getOriginalFilename();
			File savefile = new File(location, filename);
			try {
				photo[0].transferTo(savefile);
			} 
			catch (Exception e) {}
			rv_photo = shortLocation + filename;
		}
		String origin_photo = ddao.get_origin_fileURL(rv_r_name, rv_address, rv_id);
		
		int flag = ddao.check_mine(rv_r_name, rv_address, rv_id);
		if (flag == 0) ddao.review_insert_photo(rv_primecode, rv_r_name, rv_address, rv_id, rv_photo, tags, rv_detail);
		else {
			String[] temp = ddao.get_origin_tags(rv_r_name, rv_address, rv_id).split(",");
			originList = new ArrayList<String>(Arrays.asList(temp));
			ddao.review_update_photo(rv_primecode, rv_r_name, rv_address, rv_id, rv_photo, tags, rv_detail);
		}
		
		if (! rv_photo.equals(origin_photo)) {
			Path filePath = Paths.get("C:\\Users\\leon1\\eclipse-workspace\\Project\\src\\main\\resources\\static" + origin_photo);
			try {
				Files.deleteIfExists(filePath);
			}
			catch (Exception e) {};
		}
				
		StringBuilder query = new StringBuilder();
		int occured = 0;
		if (flag == 0) {
			for (int i = 0; i < tagList.size(); i++) {
				if (occured == 0) {
					query.append(String.format("%1$s = %1$s + 1", tagList.get(i)));
					occured++;
				}
				else query.append(String.format("\n, %1$s = %1$s + 1", tagList.get(i)));
			}
			ddao.update_statistic(rv_r_name, rv_address, query.toString());	
		}
		else {
			for (int i = 0; i < tagList.size(); i++) {
				if (originList.contains(tagList.get(i))) continue;
				else {
					if (occured == 0) {
						query.append(String.format("%1$s = %1$s + 1", tagList.get(i)));
						occured++;
					}
					else query.append(String.format("\n, %1$s = %1$s + 1", tagList.get(i)));
				}
			}
			if (query.length() != 0) ddao.update_statistic(rv_r_name, rv_address, query.toString());
			query.setLength(0);
			occured = 0;
			for (int i = 0; i < originList.size(); i++) {
				if (tagList.contains(originList.get(i))) continue;
				else {
					if (occured == 0) {
						query.append(String.format("%1$s = %1$s - 1", originList.get(i)));
						occured++;
					}
					else query.append(String.format("\n, %1$s = %1$s - 1", originList.get(i)));
				}
			}
			if (query.length() != 0) ddao.update_statistic(rv_r_name, rv_address, query.toString());
		}
		return message;
	}
	
	@PostMapping("/review/get/photoList")
	@ResponseBody
	public String review_get_photoList (@RequestParam("rv_r_name") String rv_r_name,
					 	   				@RequestParam("rv_address") String rv_address,
					 	   				@RequestParam("start") int start,
					 	   				@RequestParam("end") int end) {
		int count = ddao.count_photoList(rv_r_name, rv_address);
		ArrayList<ReviewDTO> rdto = ddao.get_photoList(rv_r_name, rv_address, start, end);
		JSONArray ja = new JSONArray();
		for (int i = 0; i < rdto.size(); i++) {
			JSONObject jo = new JSONObject();
			ReviewDTO r = rdto.get(i);
			jo.put("rv_photo", r.getRv_photo());
			ja.put(jo);
		}
		JSONObject jo = new JSONObject();
		jo.put("count", count);
		ja.put(jo);
		return ja.toString();
	}
	
	@PostMapping("/review/get/my")
	@ResponseBody
	public String review_get_my (@RequestParam("rv_r_name") String rv_r_name,
								 @RequestParam("rv_address") String rv_address,
								 HttpServletRequest req) {
		HttpSession session = req.getSession();
		String rv_id = String.valueOf(session.getAttribute("id"));
		ArrayList<ReviewDTO> rdto = ddao.get_review(rv_r_name, rv_address, rv_id);
		JSONArray ja = new JSONArray();
		for (ReviewDTO r : rdto) {
			JSONObject jo = new JSONObject();
			jo.put("rv_visit", r.getRv_visit());
			jo.put("rv_photo", r.getRv_photo());
			jo.put("tags", r.getTags());
			jo.put("rv_detail", r.getRv_detail());
			jo.put("rv_time", r.getRv_time());
			jo.put("rv_owner", r.getRv_owner());
			ja.put(jo);
		}
		
		return ja.toString();
	}
	
	@PostMapping("/review/delete")
	@ResponseBody
	public String review_delete (@RequestParam("rv_r_name") String rv_r_name,
								@RequestParam("rv_address") String rv_address,
								HttpServletRequest req) {
		String message = "null";
		HttpSession session = req.getSession();
		String rv_id = null;
		if (session.getAttribute("id") != null) {
			rv_id = String.valueOf(session.getAttribute("id"));
			String[] temp = ddao.get_origin_tags(rv_r_name, rv_address, rv_id).split(",");
			ArrayList<String> originList = new ArrayList<String>(Arrays.asList(temp));
			StringBuilder query = new StringBuilder();
			for (int i = 0; i < originList.size(); i++) {
				if (i == 0) query.append(String.format("%1$s = %1$s - 1", originList.get(i)));
				else query.append(String.format("\n, %1$s = %1$s - 1", originList.get(i)));
			}
			if (query.length() != 0) ddao.update_statistic(rv_r_name, rv_address, query.toString());
			
			String origin_photo = ddao.get_origin_fileURL(rv_r_name, rv_address, rv_id);
			Path filePath = Paths.get("C:\\Users\\leon1\\eclipse-workspace\\Project\\src\\main\\resources\\static" + origin_photo);
			try {
				Files.deleteIfExists(filePath);
			}
			catch (Exception e) {};
			
			ddao.review_delete(rv_r_name, rv_address, rv_id);
			message = "delete";
			return message;
		}
		else return message;
	}
	
	@PostMapping("/review/get/reviewList")
	@ResponseBody
	public String review_get_reviewList (@RequestParam("rv_r_name") String rv_r_name,
					 	   				@RequestParam("rv_address") String rv_address,
					 	   				@RequestParam("start") int start,
					 	   				@RequestParam("end") int end,
					 	   				HttpServletRequest req) {	
		HttpSession session = req.getSession();
		String rv_id = String.valueOf(session.getAttribute("id"));
		if (rv_id == null) rv_id = "is not null";
		else rv_id = "!= '" + rv_id + "'";
		
		int count = ddao.count_reviewList(rv_r_name, rv_address, rv_id);
		if (count == 0) return "null";
		
		ArrayList<ReviewDTO> rdto = ddao.get_reviewList(rv_r_name, rv_address, rv_id, start, end);
		JSONArray ja = new JSONArray();
		for (ReviewDTO r : rdto) {
			JSONObject jo = new JSONObject();
			jo.put("rv_id", r.getRv_id());
			jo.put("rv_visit", r.getRv_visit());
			jo.put("rv_photo", r.getRv_photo());
			jo.put("tags", r.getTags());
			jo.put("rv_detail", r.getRv_detail());
			jo.put("rv_owner", r.getRv_owner());
			jo.put("rv_tiem", r.getRv_time());
			ja.put(jo);
		}
		JSONObject jo = new JSONObject();
		jo.put("count", count);
		ja.put(jo);
		return ja.toString();
	}
	
	@PostMapping("/review/get/modal")
	@ResponseBody
	public String review_get_modal (@RequestParam("rv_r_name") String rv_r_name,
				 	   				@RequestParam("rv_address") String rv_address,
				 	   				@RequestParam("rv_id") String rv_id) {
		ArrayList<ReviewDTO> rdto = ddao.get_review(rv_r_name, rv_address, rv_id);
		JSONArray ja = new JSONArray();
		for (ReviewDTO r : rdto) {
			JSONObject jo = new JSONObject();
			jo.put("rv_visit", r.getRv_visit());
			jo.put("rv_photo", r.getRv_photo());
			jo.put("tags", r.getTags());
			jo.put("rv_detail", r.getRv_detail());
			jo.put("rv_time", r.getRv_time());
			jo.put("rv_owner", r.getRv_owner());
			ja.put(jo);
		}
		return ja.toString();
	}
	
	@PostMapping("/review/update/ceo")
	@ResponseBody
	public String review_update_ceo (@RequestParam("rv_r_name") String rv_r_name,
									 @RequestParam("rv_address") String rv_address,
									 @RequestParam("rv_id") String rv_id,
								     @RequestParam("rv_owner") String rv_owner) {
		ddao.update_review_ceo(rv_r_name, rv_address, rv_id, rv_owner);
		return "업데이트";		
	}
}
