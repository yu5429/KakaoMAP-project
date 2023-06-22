package project.example.demo.member;
import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import project.example.demo.dto.MemberDTO;

@Mapper
public interface MemberDAO {
	String get_id(String id,String pw);
	String search_id(String name, String phone);
	
	int check_duplicateID(String id);
	int search_pw(String id, String name, String phone);
	
	void update_pw(String id,String name, String phone, String pw);
	void submit_signup(String id, String pw, String gender, String birth,
			String name, String phone);
	int check_phone(String phone);

	ArrayList<MemberDTO> get_signupInfo(String id);
	void update_signup(String id, String pw, String name, String gender, String birth, String phone);
	int get_userReviewCount(String id);
	
}