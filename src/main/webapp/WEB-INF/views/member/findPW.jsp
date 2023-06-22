<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/WEB-INF/views/metaLink.jsp"/>
<link href="/css/member/findPW.css" rel="stylesheet">
<title>비밀번호 찾기</title>
</head>
<body>
	<section>
		<h1>비밀번호 찾기</h1><br>
		<article>
			<input type="text" id="inputFindId" class="form-control" placeholder="아이디"><br>
			<input type="text" id="inputFindName" class="form-control" placeholder="이름"><br>
			<input type="tel" id="inputFindPhone" class="form-control" placeholder="전화번호"><br>
			<pre id="SearchPwMessage"></pre>
			<button id="buttonFindPw" class="btn btn-primary">비밀번호 찾기</button>
		</article>
	</section>
<jsp:include page="/WEB-INF/views/script.jsp"/>
<script src="/js/member/findPW.js"></script>
</body>
</html>