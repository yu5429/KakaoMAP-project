<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/WEB-INF/views/metaLink.jsp"/>
<link rel="stylesheet" href="/css/member/signUp.css">
<title>회원 정보 수정</title>
</head>
<body>
	<!-- header -->
	<div id="header"></div>


	<!-- wrapper -->
	<div id="wrapper">

		<!-- content-->
		<div id="content">
		<h1>
			<label>회원 정보 수정</label>
		</h1>

			<!-- ID -->
			<div id ="info_first">
				<h3>아이디</h3>
				<span class="box int_id"> 
					<input type="text" id="input_id" class="int" style="outline: none;" maxlength="20" readonly>
				</span> 
				<span class="info_msg">ID는 수정 불가능 합니다.</span>
			</div>

			<!-- PW1 -->
			<div>
				<h3>비밀번호</h3>
				<span class="box int_pass"> 
					<input type="password" id="input_password" class="int" maxlength="20"> 
					<span id="alertTxt">사용불가</span>
				</span> 
			</div>

			<!-- PW2 -->
			<div>
				<h3>비밀번호 확인</h3>
				<span class="box int_pass_check"> 
					<input type="password" id="input_passwordCheck" class="int" maxlength="20">
				</span> 
			</div>

			<!-- NAME -->
			<div>
				<h3>이름</h3>
				<span class="box int_name"> 
					<input type="text" id="input_name" class="int" maxlength="20">
				</span> 
				<span class="error_box"></span>
			</div>

			<!-- MOBILE -->
			<div>
				<h3>휴대전화</h3>
				<span class="box int_mobile"> 
					<input type="tel" id="input_phone" class="int" maxlength="12" placeholder="'-' 제외 번호만 입력">
				</span> 
				<span class="error_box" id="error_inputPhone"></span>
			</div>

			<!-- GENDER -->
			<div>
				<h3>성별</h3>
				<div class="box gender_code"> 
					<input type="radio" id="input_genderM" class="gender_radio" name="gender" value="남"> 
					<label for="input_genderM" class="gender_radio">남</label>
					<input type="radio" id="input_genderF" class="gender_radio" name="gender" value="여">
					<label for="input_genderF" class="gender_radio">여</label>
				</div> 
				<span class="error_box">필수 정보입니다.</span>
			</div>

			<!-- BIRTH -->
			<div>
				<h3>생년월일</h3>
				<span class="box"> 
					<input type="text" id="input_birth" class="int" maxlength="8" placeholder="ex)20010514">
				</span> 
				<span class="error_box"></span>
			</div>

			<!-- JOIN BTN-->
			<div class="btn_area">
				<button type="button" id="button_submitSignUpdate">수정 완료</button>
				<button type="button" id="button_submitCancel">취소</button>
			</div>

		</div>
		<!-- content-->

	</div>
	<!-- wrapper -->
<jsp:include page="/WEB-INF/views/script.jsp"/>
<script src="/js/member/signUpdate.js"></script>
</body>
</html>