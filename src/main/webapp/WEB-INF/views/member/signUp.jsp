<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/WEB-INF/views/metaLink.jsp"/>
<link rel="stylesheet" href="/css/member/signUp.css">
<title>회원가입</title>
</head>
<body>
	<!-- header -->
	<div id="header"></div>


	<!-- wrapper -->
	<div id="wrapper">

		<!-- content-->
		<div id="content">
		<h1>
		<label>회원 정보</label>
		</h1>

			<!-- ID -->
			<div id ="info_first">
				<h3>
					<label>아이디</label>
				</h3>
				<span class="box int_id"> <input type="text" id="input_id"
					class="int" maxlength="20">

				</span> <span class="error_box" id="error_inputID"></span>
			</div>

			<!-- PW1 -->
			<div>
				<h3>
					<label>비밀번호</label>
				</h3>
				<span class="box int_pass"> <input type="password" id="input_password"
					class="int" maxlength="20"> <span id="alertTxt">사용불가</span>

				</span> <span class="error_box"></span>
			</div>

			<!-- PW2 -->
			<div>
				<h3>
					<label>비밀번호 확인</label>
				</h3>
				<span class="box int_pass_check"> <input type="password"
					id="input_passwordCheck" class="int" maxlength="20">

				</span> <span class="error_box" id="error_passwordCheck"></span>
			</div>

			<!-- NAME -->
			<div>
				<h3>
					<label>이름</label>
				</h3>
				<span class="box int_name"> <input type="text" id="input_name"
					class="int" maxlength="20">
				</span> <span class="error_box"></span>
			</div>

			<!-- MOBILE -->
			<div>
				<h3>
					<label>휴대전화</label>
				</h3>
				<span class="box int_mobile">
					<input type="tel" id="input_phone" class="int" maxlength="12" placeholder="'-' 제외 번호만 입력">
				</span>
				<span class="error_box" id="error_inputPhone"></span>
				<label for="input_phone" style="margin: 0 0 0 20px;"></label>
			</div>

			<!-- GENDER -->
			<div>
				<h3>
					<label>성별</label>
				</h3>
				<span class="box gender_code"> 
					<input type="radio" id="gender_male" class="gender_radio" name="gender" value="남">
					<label for="gender_male" class="gender_radio">남</label>
					<input type="radio" id="gender_female" class="gender_radio" name="gender" value="여">
					<label for="gender_female" class="gender_radio">여</label>
				</span>
				<span class="error_box">필수 정보입니다.</span>
			</div>

			<!-- BIRTH -->
			<div>
				<h3>
					<label>생년월일</label>
				</h3>
				<span class="box"> <input type="text" id="input_birth" class="int"
					maxlength="8" placeholder="ex) 20010514">
				</span> <span class="error_box"></span>
			</div>

			<!-- JOIN BTN-->
			<div class="btn_area">
				<button type="button" id="button_submitSignup">
					<span>회원가입</span>
				</button>
			</div>

		</div>
		<!-- content-->

	</div>
	<!-- wrapper -->
<jsp:include page="/WEB-INF/views/script.jsp"/>
<script src="/js/member/signUp.js"></script>
</body>
</html>