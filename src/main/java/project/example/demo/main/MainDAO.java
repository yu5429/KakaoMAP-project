package project.example.demo.main;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import project.example.demo.dto.RestaurantDTO;
import project.example.demo.dto.ReviewDTO;

@Mapper
public interface MainDAO {
	ArrayList<RestaurantDTO> check_duplicateLocation(String address);
	
	int check_duplicateRequest(String r_name, String address);
	
	String get_member_name(String id);
		
	void restaurant_approval_request
	(double lat, double lng, String primecode, String r_name, 
	String owner, String category, String address, String localURL);
	
	void restaurant_update_request
	(double lat, double lng, String primecode, String r_name, 
	String owner, String category, String address, String localURL);
	
	String admin_search(String primecode);
	
	ArrayList<RestaurantDTO> get_searchFilterLIst(String query);
	
	int countMyReviewList(String rv_id);
	ArrayList<ReviewDTO> getMyReviewList(String rv_id, int start, int end);
	
	int countMyStoreList(String owner);
	ArrayList<RestaurantDTO> getMyStoreList(String owner, int start, int end);
}