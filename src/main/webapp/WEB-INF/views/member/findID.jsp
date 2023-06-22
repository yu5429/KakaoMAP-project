<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/WEB-INF/views/metaLink.jsp"/>
<link href="/css/member/findID.css" rel="stylesheet">
<title>아이디 찾기</title>
<style>
</style>
</head>
<body>
	<section>
		<h1>아이디 찾기</h1><br>
		<article>
			<input type="text" id="inputFindName" class="form-control" placeholder="이름"><br>
			<input type="tel" id="inputFindPhone" class="form-control" placeholder="전화번호"><br>
			<pre id="SearchIDMessage"></pre>
			<button id="button_findID" class="btn btn-primary">아이디 찾기</button>
		</article>
	</section>
<jsp:include page="/WEB-INF/views/script.jsp"/>
<script src="/js/member/findID.js"></script>
</body>
</html>