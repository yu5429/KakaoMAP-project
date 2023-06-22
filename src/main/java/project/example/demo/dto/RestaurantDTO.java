package project.example.demo.dto;

import java.util.Collection;

import lombok.Data;

@Data
public class RestaurantDTO {
	double lat;
	double lng;
	double close;
	String primecode;
	String r_name;
	String owner;
	String category;
	String address;
	String r_phone;
	String r_detail;
	String menu;
	String r_photo;
	
	int eval;

	
}