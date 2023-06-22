<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<html>

	<head>
		<jsp:include page="/WEB-INF/views/metaLink.jsp" />
		<link rel="stylesheet" href="/css/main/main.css">
		<link rel="stylesheet" href="/css/main/dd.css">
		<title>메인 페이지</title>
	</head>

	<body>
		<div id="wrapper_sidebar" class="offcanvas show offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false">
			<div class="top_sidebar">
				<div class="header" role="banner">
					<h1 class="header_title">
						<a class="a_title">kakaomap</a>
						<button id="button_log" class="btn btn-danger">로그인</button>
					</h1>
					<button class="choice_currentmap btn btn-success">현 지도 내 장소검색</button>
					<div class="box_searchbar">
						<input id="search_input" class="tf_keyword" maxlength="100" autocomplete="off"
							placeholder="장소, 주소 검색">
						<button id="search_button">검색</button>
					</div>
				</div>
			</div>
			
			<div class="middle_sidebar">
				<div class="middle_sideMessage">
					<p class="sideMessage">
						로그인 하시면 카테고리, 사용자 선호도 정렬, <br>
						맛집 태그별 검색, 장소 등록 제안 등 <br>
						다양한 기능을 사용하실 수 있습니다
					</p>
				</div>
				<div id="food_categories" class="sf_filter">
					<div style="display: flex;">
						<h3 class="sf_title">카테고리</h3>
						<label id="off_category" class="toggleSwitchOff"><span>해제</span></label>
					</div>
					<div class="sf_fcr">
						<div class="each_fcr">
							<input type="radio" id="/img/main/KoreanFood" class="btn-check" name="fc"
								value="koreanfood">
							<label for="/img/main/KoreanFood">
								<img src="/img/main/KoreanFood.png" class="fc_img"></img><br>
								<span>한식</span>
							</label>
						</div>
						<div class="each_fcr">
							<input type="radio" id="/img/main/ChinaFood" class="btn-check" name="fc" value="chinafood">
							<label for="/img/main/ChinaFood">
								<img src="/img/main/ChinaFood.png" class="fc_img"></img><br>
								<span>중식</span>
							</label>
						</div>
						<div class="each_fcr">
							<input type="radio" id="/img/main/JapanFood" class="btn-check" name="fc" value="japanfood">
							<label for="/img/main/JapanFood">
								<img src="/img/main/JapanFood.png" class="fc_img"></img><br>
								<span>일식</span>
							</label>
						</div>
						<div class="each_fcr">
							<input type="radio" id="/img/main/WesternFood" class="btn-check" name="fc"
								value="westernfood">
							<label for="/img/main/WesternFood">
								<img src="/img/main/WesternFood.png" class="fc_img"></img><br>
								<span>양식</span>
							</label>
						</div>
						<div style="line-height: 62.5%"><br><br></div>
						<div class="each_fcr">
							<input type="radio" id="/img/main/Pizza" class="btn-check" name="fc" value="pizza">
							<label for="/img/main/Pizza">
								<img src="/img/main/Pizza.png" class="fc_img"></img><br>
								<span>피자</span>
							</label>
						</div>
						<div class="each_fcr">
							<input type="radio" id="/img/main/Chicken" class="btn-check" name="fc" value="chicken">
							<label for="/img/main/Chicken">
								<img src="/img/main/Chicken.png" class="fc_img"></img><br>
								<span>치킨</span>
							</label>
						</div>
						<div class="each_fcr">
							<input type="radio" id="/img/main/Jokbal" class="btn-check" name="fc" value="jokbal">
							<label for="/img/main/Jokbal">
								<img src="/img/main/Jokbal.png" class="fc_img"></img><br>
								<span>족발</span>
							</label>
						</div>
						<div class="each_fcr">
							<input type="radio" id="/img/main/Cafe" class="btn-check" name="fc" value="cafe">
							<label for="/img/main/Cafe">
								<img src="/img/main/Cafe.png" class="fc_img"></img><br>
								<span>카페</span>
							</label>
						</div>
					</div>
				</div>
				<div class="sf_filter">
					<div style="display: flex;">
						<h3 class="sf_title">사용자 선호도 정렬</h3>
						<label id="off_orderby" class="toggleSwitchOff"><span>해제</span></label>
						<button type="button" id="btn-saveMyTag">저장</button>
					</div>
					<div style="line-height: 40%"><br><br></div>
					<input type="radio" id="close" class="btn-check" name="close_or_eval" value="close">
					<label for="close" class="toggleSwitch"><span>거리순</span></label>
					<input type="radio" id="eval" class="btn-check" name="close_or_eval" value="eval">
					<label for="eval" class="toggleSwitch"><span>평점순</span></label>
					<input type="radio" id="been" class="btn-check" name="orderby" value="been">
					<label for="been" class="toggleSwitch"><span>가봤던 맛집만</span></label>
					<input type="radio" id="never" class="btn-check" name="orderby" value="never">
					<label for="never" class="toggleSwitch"><span>안 가본 맛집만</span></label>
				</div>
				<div class="sf_filter">
					<div style="display: flex;">
						<h3 class="sf_title">맛집 태그</h3>
						<label id="off_tags" class="toggleSwitchOff"><span>해제</span></label>
					</div>
					<div class="tag_row">
						<div class="tag_column">
							<span class="tag_category">편의성</span>
							<input type="checkbox" name="tags" id="clean" class="btn-check" value="clean">
							<label for="clean" class="toggleSwitch2"><span>청결</span></label>
							<input type="checkbox" name="tags" id="kind" class="btn-check" value="kind">
							<label for="kind" class="toggleSwitch2"><span>친절</span></label>
							<input type="checkbox" name="tags" id="parking" class="btn-check" value="parking">
							<label for="parking" class="toggleSwitch2"><span>주차</span></label>
							<input type="checkbox" name="tags" id="fast" class="btn-check" value="fast">
							<label for="fast" class="toggleSwitch2"><span>조리</span></label>
							<input type="checkbox" name="tags" id="pack" class="btn-check" value="pack">
							<label for="pack" class="toggleSwitch2"><span>포장</span></label>
						</div>
						<div class="tag_column">
							<span class="tag_category">분위기</span>
							<input type="checkbox" name="tags" id="alone" class="btn-check" value="alone">
							<label for="alone" class="toggleSwitch2"><span>혼밥</span></label>
							<input type="checkbox" name="tags" id="together" class="btn-check" value="together">
							<label for="together" class="toggleSwitch2"><span>단체</span></label>
							<input type="checkbox" name="tags" id="focus" class="btn-check" value="focus">
							<label for="focus" class="toggleSwitch2"><span>집중</span></label>
							<input type="checkbox" name="tags" id="talk" class="btn-check" value="talk">
							<label for="talk" class="toggleSwitch2"><span>대화</span></label>
							<input type="checkbox" name="tags" id="photoplace" class="btn-check" value="photoplace">
							<label for="photoplace" class="toggleSwitch2"><span>사진</span></label>
						</div>
						<div class="tag_column">
							<span class="tag_category" style="margin-left: 10px;">맛과 가격</span>
							<input type="checkbox" name="tags" id="delicious" class="btn-check" value="delicious">
							<label for="delicious" class="toggleSwitch2"><span>맛</span></label>
							<input type="checkbox" name="tags" id="lot" class="btn-check" value="lot">
							<label for="lot" class="toggleSwitch2"><span>양</span></label>
							<input type="checkbox" name="tags" id="cost" class="btn-check" value="cost">
							<label for="cost" class="toggleSwitch2"><span>가성비</span></label>
							<input type="checkbox" name="tags" id="portion" class="btn-check" value="portion">
							<label for="portion" class="toggleSwitch2"><span>알참</span></label>
							<input type="checkbox" name="tags" id="satisfy" class="btn-check" value="satisfy">
							<label for="satisfy" class="toggleSwitch2"><span>만족</span></label>
						</div>
					</div>
				</div>
				<div id="search_list_wrapper" style="display:none;">
					<button type="button" id="backto_sf" class="btn btn-secondary">뒤로가기</button>
					<div id="search_list"></div>
				</div>
				<div class="div_reviewList mypage_subtab" style="display: none;">
					<h3 class="sf_title">리뷰 관리</h3>
					<p id="noMyReview" class="userMessage">
						리뷰 정보가 없습니다. <br><br>
						지금 전국 맛집을 리뷰하면서 다양 리뷰를 작성해보세요. <br>
					</p>
					<div id="review_list" class="block_myList">
					</div>
					<ul id= "MyReview_list_pagination" class="pagination">
					</ul>
				</div>
				<div class="div_storeList mypage_subtab" style="display: none;">
					<h3 class="sf_title">업체 관리</h3>
					<p id="noMyStore" class="userMessage">
						등록된 업체가 없습니다. <br><br>
						사장님이라면 내 업체를 등록해서 직접 관리해보세요. <br>
					</p>
					<div id="store_List" class="block_myList">
					</div>
					<ul id= "MyStore_list_pagination" class="pagination">
					</ul>
				</div>
			</div>
			<div class="toggle_sidebar tsb_close" data-bs-toggle="offcanvas" data-bs-target="#wrapper_sidebar"></div>
		</div>
		<div class="toggle_sidebar tsb_open" data-bs-toggle="offcanvas" data-bs-target="#wrapper_sidebar"></div>
		<div class="mapView">
			<div id="map">
				<div class="controlDiv">
					<div class="controlBox">
						<button id="currentLocationButton" class="controlButton"></button>
						<div id="clearMarkerButton" class="controlButton">
							<span class="eraserIcon"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="cursor">
			<img src="" id="cursorImg">
		</div>
		<div id="manageModal" class="modal fade" aria-labelledby="manageModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="manageModalLabel">관리자 메뉴</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-footer">
						<button type="button" id="goto_admin_restaurant" class="btn btn-primary">업체 등록 관리</button>
						<button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<jsp:include page="/WEB-INF/views/script.jsp" />
		<script type="text/javascript"
			src="//dapi.kakao.com/v2/maps/sdk.js?appkey=329e5620a47418538719e0a8fbdae4ce&libraries=services"></script>
		<script src="/js/main/main.js"></script>
		<script src="/js/main/dd.min.js"></script>
	</body>

	</html>