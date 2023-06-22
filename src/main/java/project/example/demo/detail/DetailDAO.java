package project.example.demo.detail;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import project.example.demo.dto.RestaurantDTO;
import project.example.demo.dto.ReviewDTO;
import project.example.demo.dto.StatisticDTO;

@Mapper
public interface DetailDAO {
	ArrayList<RestaurantDTO> get_restaurant_detail(String rname,String address);
	
	void update_info(String r_name, String address, String r_phone, String r_detail);
	
	void update_menu(String r_name, String address, String menu);
	
	ArrayList<StatisticDTO> tag_top(String r_name, String address);
	
	int check_mine(String rv_r_name, String rv_address, String rv_id);
	
	String check_isFirst(String rv_r_name, String rv_address, String rv_id);
	
	void authorize_reivew(String rv_primecode, String rv_r_name, String rv_address, String rv_id);
	
	String get_owner(String r_name, String address);
	
	String get_primecode(String r_name, String address);
	
	String get_origin_tags(String rv_r_name, String rv_address, String rv_id);
	
	String get_origin_fileURL(String rv_r_name, String rv_address, String rv_id);
	
	void review_insert(String primecode, String rv_r_name, String rv_address, String rv_id,
					   String tags, String rv_detail);
	
	void review_update(String primecode, String rv_r_name, String rv_address, String rv_id,
			   		   String tags, String rv_detail);
	
	void review_insert_photo(String primecode, String rv_r_name, String rv_address, String rv_id,
							 String rv_photo, String tags, String rv_detail);
	
	void review_update_photo(String primecode, String rv_r_name, String rv_address, String rv_id,
			 				 String rv_photo, String tags, String rv_detail);
	
	void review_delete(String rv_r_name, String rv_address, String rv_id);
	
	void update_statistic(String rv_r_name, String rv_address, String query);
	
	int count_photoList(String rv_r_name, String rv_address);
	
	ArrayList<ReviewDTO> get_photoList(String rv_r_name, String rv_address, int start, int end);
	
	ArrayList<ReviewDTO> get_review(String rv_r_name, String rv_address, String rv_id);
	
	int count_reviewList(String rv_r_name, String rv_address, String rv_id);
	
	ArrayList<ReviewDTO> get_reviewList(String rv_r_name, String rv_address, String rv_id, int start, int end);
	
	void update_review_ceo(String rv_r_name, String rv_address, String rv_id, String rv_owner);
}