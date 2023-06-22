package project.example.demo.dto;

import lombok.Data;

@Data
public class StatisticDTO {
	String s_primecode, s_r_name, s_address, s_category;
	int age10, age20, age30, age40, age50, age60, male, female,
	clean, kind, parking, fast, pack, alone, together, focus,
	talk, photoplace, delicious, portion, cost, lot, satisfy;
	
	String tags;
	int tag_count;
}