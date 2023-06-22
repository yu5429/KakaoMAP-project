<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/WEB-INF/views/metaLink.jsp" />
<link rel="stylesheet" href="/css/admin/adminRestaurant.css">
<title>관리자 페이지</title>
</head>
<body>
	<div class="title1">
		<h1>업체 등록 확인</h1>
		<hr>
		<br>
		<table class="table table-hover" id="tbl_adrtRestaurant">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">매장 이름</th>
					<th scope="col">사업자 번호</th>
					<th scope="col">카테고리</th>
					<th scope="col">증빙 서류</th>
					<th scope="col">계정명, 실명</th>
					<th scope="col">승인/거부</th>
					<th scope="col" hidden>주소</th>
				</tr>
			</thead>
		</table>
		<button id="appendTable" class="btn btn-primary">더보기</button>
		<button id="gotoMain" class="btn btn-danger">메인으로</button>
	</div>
<jsp:include page="/WEB-INF/views/script.jsp" />
<script src="/js/admin/adminRestaurant.js"></script>
</body>
</html>