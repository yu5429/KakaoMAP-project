package project.example.demo.admin;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import project.example.demo.dto.AdminRestaurantDTO;

@Mapper
public interface AdminRestaurantDAO {
	ArrayList<AdminRestaurantDTO> adminRestaurantList(int start, int end);
	int admin_beforeInsUp(String r_name, String address);
	String admin_getLocalURL(String r_name, String address);
	void admin_insup_restaurant(String query);
	void admin_delete_restaurant(String r_name, String address);
}
