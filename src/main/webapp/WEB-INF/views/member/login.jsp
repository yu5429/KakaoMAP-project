<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">

<head>
<jsp:include page="/WEB-INF/views/metaLink.jsp"/>
<link rel="stylesheet" href="/css/member/login.css">
<title>로그인</title>
</head>

<body>
	<div class="body">
		<div class="loginbox">
			<h1 style="text-align: center;">로그인</h1><br>
			<div class="wrapperSI">
				<span class="loginspan">ID</span>
				<input type="text" id="input_loginID" class="form-control">
			</div>
			<br>
			<div class="wrapperSI">
		        <span class="loginspan">PW</span>
			    <input type="password" id="input_loginPW" class="form-control">
			</div>
			<br>
            <button type="button" class="btn btn-primary" id="btnLogin">로그인</button>
	        <div class="wrapperA">
                <a class="text-decoration-none aText" id="signup">회원가입</a>
				<a class="text-decoration-none aText" id="IdFind">아이디 찾기</a>
				<a class="text-decoration-none aText" id="PwFind">비밀번호 찾기</a>
			</div>
		</div>
	</div>
<jsp:include page="/WEB-INF/views/script.jsp"/>
<script src="/js/member/login.js"></script>
</body>
</html>