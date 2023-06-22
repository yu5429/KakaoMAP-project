<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/WEB-INF/views/metaLink.jsp" />
<link rel="stylesheet" href="/css/welcome.css">
<title>Welcome</title>
</head>
<body>
	<div class="position-absolute top-0 start-50 translate-middle-x title1">
		<h1>AI 맛집 추천 Map</h1>
	</div>

	<div id="carouselExampleDark" class="carousel carousel-dark slide"
		data-bs-ride="carousel">
		<div class="carousel-indicators">
			<button type="button" data-bs-target="#carouselExampleDark"
				data-bs-slide-to="0" class="active" aria-current="true"
				aria-label="Slide 1"></button>
			<button type="button" data-bs-target="#carouselExampleDark"
				data-bs-slide-to="1" aria-label="Slide 2"></button>
			<button type="button" data-bs-target="#carouselExampleDark"
				data-bs-slide-to="2" aria-label="Slide 3"></button>
		</div>
		<div class="carousel-inner">
			<div class="carousel-item active" data-bs-interval="5000">
				<img src="/img/welcomePage/background.jpg" class="d-block w-100"
					alt="/img/welcomePage/background.jpg">
				<div class="carousel-caption d-none d-md-block">
					<h2>AI 맛집 추천 기능!</h2>
					<br>
					<p>회원님의 선호하는 음식으로 맛집을 추천해드립니다.</p>
					<br>
					<br>
				</div>
			</div>
			<div class="carousel-item" data-bs-interval="5000">
				<img src="/img/welcomePage/background.jpg" class="d-block w-100"
					alt="/img/welcomePage/background.jpg">
				<div class="carousel-caption d-none d-md-block lll">
					<h2>다양한 데이터를 활용한 추천!</h2>
					<br>
					<p>
						맛집의 특징, 현재 위치에서 가까운 거리등 <br>회원님의 데이터를 활용하여 최적의 맛집을 추천해드립니다.
					</p>
					<br>
				</div>
			</div>
			<div class="carousel-item">
				<img src="/img/welcomePage/background.jpg" class="d-block w-100"
					alt="/img/welcomePage/background.jpg">
				<div class="carousel-caption d-none d-md-block">
					<h2>회원 참여형 시스템!</h2>
					<br>
					<p>회원님들의 참여를 통해 추천 데이터를 확장해 나갑니다.</p>
					<br>
					<br>
				</div>
			</div>
		</div>

		<button class="carousel-control-prev" type="button"
			data-bs-target="#carouselExampleDark" data-bs-slide="prev"
			style="z-index: 21">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span> <span
				class="visually-hidden">Previous</span>
		</button>
		<button class="carousel-control-next" type="button"
			data-bs-target="#carouselExampleDark" data-bs-slide="next"
			style="z-index: 21">
			<span class="carousel-control-next-icon" aria-hidden="true"></span> <span
				class="visually-hidden">Next</span>
		</button>

		<div
			class="position-absolute top-50 start-50 translate-middle container-sm"
			id="outDivWel">
			<div class="divWel">
				<button type="button" class="btn btn-success btnWel"
					id="btnNoMember">비회원으로 이용하기</button>
			</div>
			<div class="vr"></div>
			<div class="divWel">
				<button type="button" class="btn btn-success btnWel" id="btnLogin">로그인</button>
			</div>
			<div class="vr"></div>
			<div class="divWel">
				<button type="button" class="btn btn-success btnWel" id="btnSignup">회원가입</button>
			</div>
		</div>
	</div>
<jsp:include page="/WEB-INF/views/script.jsp"/>
<script src="/js/welcome.js"></script>
</body>
</html>