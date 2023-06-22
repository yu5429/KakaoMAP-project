<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/WEB-INF/views/metaLink.jsp"/>
<link rel="stylesheet" href="http://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
<link href="/css/detail/detail.css" rel="stylesheet">
<title>상세 페이지</title>
</head>
<body>
<section>
	<div id="restaurant_image" class="whiteblock">
		<div id="qrcode"></div>
	</div>
	
	<div id="restaurant_name" class="whiteblock">
		<p id="rName"></p>
		<img src="" id="rCategory">
		<p id="rReviewN"></p>
	</div>
	
	<div id="restaurant_detail" class="whiteblock">
		<div>
			<pre>상세정보</pre>
			<p id="rAddress">
				<img src="/img/detail/LocationMarker.png" class="detail_logos">
			</p>
			<p>
				<img src="/img/detail/PhoneIcon.png" class="detail_logos">
				<input type="tel" id="rPhone" class="editable_detail" maxlength="11" readonly></input>
				<label for="rPhone"></label>
			</p>
			<p>
				<img src="/img/detail/InfoIcon.png" class="detail_logos">
			</p>
			<p>
				<textarea id="rDetail" class="editable_detail" maxlength="900" readonly></textarea>
			</p>
		</div>
	</div>
	
	<div class="whiteblock">
		<div id="rmPre_wrapper" style="display: flex;">
			<pre id="rmTitle">메뉴</pre>
		</div>
		<table id="menu_table">
			<tbody>
			</tbody>
		</table>
	</div>
	
	<div id="restaurant_tag" class="whiteblock">
		<div id="graph_container"></div>	
	</div>
	
	<div id='restaurant_reviewPhoto' class="whiteblock">
		<pre>리뷰 사진</pre>
		<div id="reviewPhoto_list"></div><br>
		  <ul class="pagination" style="justify-content: center;">
		    <li id="photoList_backward" class="page-item">
		    	<a class="page-link" style="margin: 0 10px 0 0;"><</a>
		    </li>
		    <li id="photoList_forward"  class="page-item">
		    	<a class="page-link" style="margin: 0 0 0 10px;">></a>
	    	</li>
		  </ul>
	</div>
	
	<div id='restaurant_review' class="whiteblock" style="display: none;">
		<pre>후기를 남겨주세요</pre>
	</div>
	
	<div id="my_review" class="whiteblock" style="display: none;">
		<pre>내 리뷰</pre>
	</div>
	
	<div id="review_list" class="whiteblock">
		<pre>리뷰 목록</pre>
		<div id="review_list_block">
		</div>
		<ul id= "review_list_pagination" class="pagination">
		</ul>
	</div>
</section>

<!-- 포토 모달 -->
<button id="photoModal_button" data-bs-toggle="modal" 
data-bs-target="#photo_modal" style="display:none"></button>
<div id="photo_modal" class="modal fade">
	<div class="modal-dialog modal-dialog-centered ">
		<div class="modal-content">
			<img id="photomodal_img" src="">
		</div>
	</div>
</div>

<!-- 리뷰 모달 -->
<button id="reviewModal_button" data-bs-toggle="modal"
data-bs-target="#review_modal" style="display:none"></button>
<div id="review_modal"class="modal fade">
	<div class="modal-dialog modal-dialog-centered ">
		<div id="review_modal_content" class="modal-content">
		</div>
	</div>
</div>

<jsp:include page="/WEB-INF/views/script.jsp"/>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script type="text/javascript" src="https://cdn.canvasjs.com/jquery.canvasjs.min.js"></script>
<script src="/js/jquery-qrcode-0.18.0.js"></script>
<script src="/js/detail/detail.js"></script>
</body>
</html>
