const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

$(document)
.ready(isLogin)
.ready(geoPosition)
.mousemove(function (e) {
	let mouseX = e.pageX;
	let mouseY = e.pageY;

	$(".cursor").css({
		left: mouseX + "px",
		top: mouseY + "px"
	})
})
.on("click", "#addLocationButton", clickAddLocationButton)
.on("click", ".alm_ceo", addCeoInput)
.on("propertychange change paste input", "#primecode", onlyNumber)
.on("click", "#button_log", manageLoginButton)
.on("click", "#search_button", search)
.on("click", "#off_category", offCategory)
.on("click", "#off_orderby", offOrderby)
.on("click", "#off_tags", offTags)
.on("click", ".alm_suggest", suggestALM)
.on("click", "#btn-myPage", showMyData)
.on("click", "#btn-GO-signUpdate", signUpdate)
.on("click", ".toggle_sidebar", toggleBarandMap)
.on("click", ".dt_suggest", suggestDT)
.on("click", ".choice_currentmap", rectSearch)
.on("click", "#btn-pasSetting", showTagSetting)
.on("click", "#btn-reviewSetting", showReviewSetting)
.on("click", "#btn-storeSetting", showStoreSetting)
.on("click", "#btn-backMain", gotoMain)
.on("click", "#btn-saveMyTag", saveTag)
.on("click", "#userReviewCount", showReviewSetting)
.on("click", "#clearMarkerButton", clearMarkers)
.on("click", ".MyReviewList_pageNum", MyReviewList_pageNum)
.on("click", "#MyReviewList_backward", MyReviewList_backward)
.on("click", "#MyReviewList_forward", MyReviewList_forward)
.on("click", ".MyStoreList_pageNum", MyStoreList_pageNum)
.on("click", "#MyStoreList_backward", MyStoreList_backward)
.on("click", "#MyStoreList_forward", MyStoreList_forward)
.on("click", ".goto_review_my", goto_review_my)



.on("click", "#currentLocationButton", function() {
	map.panTo(new kakao.maps.LatLng(selfLat, selfLng));
})

.on("keyup", "#search_input", function (e) {
	if (e.keyCode == 13) {
		search();
	}
	return false;
})

.on("click", ".alm_though", function() {
	thoughSuggestFlag = 1;
	check_duplicateLocation(thoughLatLng);
})

.on("click", ".alm_listBlock", function() {
	let r_name = $(this).find("p").eq(0).text();
	let address = $(this).find("p").eq(1).text();
	window.open(`/restaurant/detail/${r_name}/${address}`, "_blank");
})

.on("click", ".showSearchInfo", function(){
	var index = $('.showSearchInfo').index(this);
	let detailMarker = detailMarkers[index];
	kakao.maps.event.trigger(detailMarker,"click");
		
})

.on("click", "#backto_sf", function(){
	$(".sf_filter").css("display", "block"); 
	$("#search_list_wrapper").css("display", "none"); 
})

.on("click", "#btn_searchList", function(){
	if (detailMarkers.length == 0) {
		alert("검색을 먼저 수행해주세요");
		return false;
	}
	$(".sf_filter").css("display", "none"); 
	$("#search_list_wrapper").css("display", "block"); 
})



$(".each_fcr").hover(function() {
	$(this).css("background-image", "url('/img/main/FC_HoverRectangle.png')");
	$(this).css("background-position", "center");
}, function() {
	$(this).css("background-image", "none");
})

$("input:radio[name='fc']").change(function() {
	$("input[name='fc']").each(function() {
		let id = $(this).attr("id");
		if ($(this).prop("checked")) {
			$(`label[for='${id}']`).children("img").attr("src", id + "Act.png");
		}
		else {
			$(`label[for='${id}']`).children("img").attr("src", id + ".png");
		}
	})
})

$("input:radio[name='close_or_eval']").change(function() {
	$("input:radio[name='close_or_eval']").each(function() {
		let id = $(this).attr("id");
		if ($(this).prop("checked")) {
			$(`label[for='${id}']`).addClass("active");
		}
		else $(`label[for='${id}']`).removeClass("active");
	})
})

$("input:radio[name='orderby']").change(function() {
	$("input[name='orderby']").each(function() {
		let id = $(this).attr("id");
		if ($(this).prop("checked")) {
			$(`label[for='${id}']`).addClass("active");
		}
		else $(`label[for='${id}']`).removeClass("active");
	})
})

$("input:checkbox[name='tags']").change(function() {
	$("input:checkbox[name='tags']").each(function () {
		let id = $(this).attr("id");
		if ($(this).prop("checked")) {
			$(`label[for='${id}']`).addClass("active");
		}
		else $(`label[for='${id}']`).removeClass("active");
	})
})

$("#currentLocationButton").hover(function() {
	$(this).css("background-position-y", "-350px");
}, function () {
	$(this).css("background-position-y", "-450px");
})

$(".eraserIcon").hover(function() {
	$(this).css("background-position-x", "-140px");
}, function () {
	$(this).css("background-position-x", "-80px");
})

$("#goto_admin_restaurant").click(function() {
	document.location = "/admin/restaurant";
})



let loginFlag = 0;

function isLogin() {
	$.ajax({
		url: "/isLogin",
		type: "post",
		dataType: "text",
		success: function (isLogin) {
			if (isLogin == "true" || isLogin == "admin") {
				createUI(isLogin);
				if (isLogin == "true") loginFlag = 1;
				else if (isLogin == "admin") loginFlag = 2;
				checkTag();
			}
		}
	})
}

function createUI(isLogin) {
	let addLocationButton = `
		<button id="addLocationButton" class="controlButton cursorButton"></button>`
	$(".controlBox").append(addLocationButton);
	$("#button_log").html("로그아웃");
	$(".middle_sideMessage").css("display", "none");
	$(".sf_filter").css("display", "block");
	$(".header").append(`
		<button id="btn_searchList" class="btn btn-secondary ts_button">검색 결과 보기</button>
	 	<button id="btn-myPage" class="btn btn-success ts_button">마이페이지</button>	
	  	<button id="challenge" class="btn btn-danger ts_button" data-bs-toggle="tooltip" 
	  	data-bs-placement="right" data-bs-title="내 취향의 가보지 않은 맛집 찾기">도전</button>`);
	if (isLogin == "admin") {
		$(".header_title").append(`
		<button id="button_manage" class="btn btn-dark" data-bs-toggle="modal"
		data-bs-target="#manageModal">관리</button>`)
	}
}



let mapOption, map, lat, lng, selfOverlay;
let zoomControl = new kakao.maps.ZoomControl();
let selfLat, selfLng;

function geoPosition() {
	lat = 36.81044107630051,
	lng = 127.14647463417765;
	selfLat = lat; selfLng = lng;
	makeMap(lat, lng);

	map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

	let imageSrc = "/img/main/HumanMarker.png",
		imageSize = new kakao.maps.Size(30, 30),
		imageOption = { offset: new kakao.maps.Point(20, 20) },
		markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
		selfMarker, selfContent;

	selfMarker = new kakao.maps.Marker({
		position: new kakao.maps.LatLng(lat, lng),
		image: markerImage,
		clickable: true
	})
	selfMarker.setMap(map);

	selfContent = `
		<div class="simpleOverlay">
	  		<span class="simpleOverlayTitle" onclick="closeOverlay()">내 위치</span>
	  	</div>`;
	selfOverlay = new kakao.maps.CustomOverlay({
		map: map,
		position: selfMarker.getPosition(),
		content: selfContent,
		xAnchor: 0.6,
		yAnchor: -0.2
	});

	kakao.maps.event.addListener(selfMarker, "click", function () {
		selfOverlay.setMap(map);
	});
	selfOverlay.setMap(null);

	kakao.maps.event.addListener(map, "rightclick", function (e) {
		if ($("#cursorImg").attr("src") == "/img/main/AddLocationCursor.gif") {
			$("#addLocationButton").trigger("click");
		}
		return false;
	})

	isAdminSearch();

	/* geolocation 도메인 미지원으로 인한 비활성화
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function(position) {
				lat = position.coords.latitude; 
				lng = position.coords.longitude;
				selfLat = lat; selfLng = lng;
				makeMap(lat, lng);
				
				map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
							
				selfMarker = new kakao.maps.Marker({
					position: new kakao.maps.LatLng(lat, lng),
					image: markerImage,
					clickable: true
				})
				selfMarker.setMap(map);
				
				selfContent = `
					<div class="simpleOverlay">
							<span class="simpleOverlayTitle" onclick="closeOverlay()">내 위치</span>
						</div>`;
				selfOverlay = new kakao.maps.CustomOverlay({
					map: map,
					position: selfMarker.getPosition(),
					content: selfContent,
					xAnchor: 0.6,
					yAnchor: -0.2
				});
				
				kakao.maps.event.addListener(selfMarker, "click", function() {
					selfOverlay.setMap(map);
				});
				selfOverlay.setMap(null);
				
				kakao.maps.event.addListener(map, "rightclick", function(e) {
					if ($("#cursorImg").attr("src") == "/img/main/AddLocationCursor.gif") {
						$("#addLocationButton").trigger("click");
					}
					return false;
				})
			});
		isAdminSearch();
	}
	else {
		lat = 36.81044107630051,
		lng = 127.14647463417765;
		makeMap(lat, lng);
		isAdminSearch();
	}*/
}

function makeMap(lat, lng) {
	mapOption = {
		center: new kakao.maps.LatLng(lat, lng),
		level: 2
	},
		map = new kakao.maps.Map($("#map").get(0), mapOption);
}

let adminSearchFlag = 0;

function isAdminSearch() {
	if (window.location.href.includes("/main/search/")) {
		adminSearchFlag = 1;
		let tempURL = window.location.href.split("search/"),
			query = tempURL[1],
			searchURL =
				`https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10
			&query=${query}"`;
		addressSearch(searchURL, query);
	}
}



function closeOverlay() {
	isCEO = 0;
	if (selfOverlay != null) selfOverlay.setMap(null);
	if (addLocationOverlay != null) addLocationOverlay.setMap(null);
	if (openedKeywordOverlay != null) openedKeywordOverlay.setMap(null);
	if (openedAddressOverlay != null) openedAddressOverlay.setMap(null);
	if (openedDetailOverlay != null) openedDetailOverlay.setMap(null);
}



let addLocationMarker = new kakao.maps.Marker({
	clickable: true
}),
	addLocationOverlay = new kakao.maps.CustomOverlay({
		clickable: true
	}),
	addLocationFlag = 0;

function addLocationEvent(mouseEvent) {
	let imageSrc = "/img/main/EditMapMarker.png",
		imageSize = new kakao.maps.Size(25, 25),
		imageOption = { offset: new kakao.maps.Point(20, 20) },
		markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
	addLocationMarker.setImage(markerImage);

	let latLng = mouseEvent.latLng;
	addLocationMarker.setPosition(latLng);
	addLocationMarker.setMap(map);
	map.setCenter(latLng);

	$("#addLocationButton").css("background-position-y", "-450px");
	$("#cursorImg").attr("src", "");

	check_duplicateLocation(latLng);

	kakao.maps.event.removeListener(map, "click", addLocationEvent);
}

function popUpAddLocationOverlay() {
	addLocationOverlay.setMap(map);
}

function clickAddLocationButton() {
	if ($(this).css("background-position-y") == "-450px" &&
		$("#cursorImg").attr("src") == "") {

		$(this).css("background-position-y", "-350px");
		$("#cursorImg").attr("src", "/img/main/AddLocationCursor.gif");
		$(".cursor").css("display", "inline-block");

		kakao.maps.event.addListener(map, "click", addLocationEvent);
		kakao.maps.event.addListener(addLocationMarker, "click", popUpAddLocationOverlay);
		map.setLevel(1);
		addLocationFlag = 1;
		wholeMarkersNull();
		addLocationOverlay.setMap(null);
	}
	else {
		$(this).css("background-position-y", "-450px");
		$("#cursorImg").attr("src", "");
		$(".cursor").css("display", "none");

		kakao.maps.event.removeListener(map, "click", addLocationEvent);
		kakao.maps.event.removeListener(addLocationMarker, "click", popUpAddLocationOverlay);
		map.setLevel(2);
		addLocationFlag = 0;
		wholeMarkersNull();
		addLocationOverlay.setMap(null);
	}
}

let thoughSuggestFlag = 0;
let thoughLatLng;

function check_duplicateLocation(latLng) {
	if (thoughLatLng != latLng) thoughSuggestFlag = 0;
	thoughLatLng = latLng;

	let geocoder = new kakao.maps.services.Geocoder();
	let lng = latLng.getLng(), lat = latLng.getLat(),
		address = "";

	let callback = function (result, status) {
		if (status === kakao.maps.services.Status.OK) {
			if (result[0].road_address != null) address = JSON.stringify(result[0].road_address.address_name);
			else address = JSON.stringify(result[0].address.address_name);
		}

		address = address.replaceAll(/"/g, "");

		if (addLocationFlag == 1) {
			$.ajax({
				url: "/check/duplicateLocation",
				type: "post",
				data: {
					address: address
				},
				dataType: "json",
				success: function (data) {
					if (data.length != 0 && thoughSuggestFlag == 0) {
						let list = "";
						for (i = 0; i < data.length; i++) {
							let html =
								`<div style="display: flex; align-items: center;">
									<img src="/img/main/${data[i]["category"]}.png" class="alm_blockimg">
									<div class="alm_listBlock">
										<p>${data[i]["r_name"]}</p>
										<p>${data[i]["address"]}</p>
									</div>
								</div>`;
							list = list + html;
						}

						let emptyContent =
							`<div class="alm_info">
					 		<div class="alm_title">
					 			<span>${data[0]["address"]}</span>
					 			<div class="alm_close" onclick="closeOverlay()" title="닫기"></div>					 			
					 		</div>
						 	<div class="alm_body">
						 		${list}
					 			<div><button class="alm_though btn btn-primary">목록에 없는 제안하기</button></div>
						 	</div>
						 </div>`;

						addLocationOverlay.setContent(emptyContent);
						addLocationOverlay.setPosition(latLng);
						addLocationOverlay.setMap(map);
					}
					else {
						let emptyContent =
							`<div class="alm_info">
					 		<div class="alm_title">
					 			<span>신규 음식점 제안</span>
					 			<div class="alm_close" onclick="closeOverlay()" title="닫기"></div>
					 		</div>
						 	<div class="alm_body">
					 			<div><input id="r_name" class="alm_input" placeholder="상호명"></div>
					 			<div style="text-align: center">
					 				<select id="category" class="alm_select" is="ms-dropdown">
					 					<option value="">카테고리를 선택하세요</option>
					 					<option value="koreanfood" data-image="/img/main/KoreanFood.png">한식</option>
					 					<option value="chinafood" data-image="/img/main/ChinaFood.png">중식</option>
					 					<option value="japanfood" data-image="/img/main/JapanFood.png">일식</option>
					 					<option value="westernfood" data-image="/img/main/WesternFood.png">양식</option>
					 					<option value="pizza" data-image="/img/main/Pizza.png">피자</option>
					 					<option value="chicken" data-image="/img/main/Chicken.png">치킨</option>
					 					<option value="jokbal" data-image="/img/main/Jokbal.png">족발</option>
					 					<option value="cafe" data-image="/img/main/Cafe.png">카페</option>
					 				</select>
					 			</div>
					 			<div class="alm_append">
					 			</div>
					 			<a class="alm_ceo" isCEO = 0>사장님이신가요?</a>
					 			<button class="alm_suggest btn btn-primary" aors="">제안하기</button>
						 	</div>
						 </div>`;

						addLocationOverlay.setContent(emptyContent);
						addLocationOverlay.setPosition(latLng);
						addLocationOverlay.setMap(map);
						$("#r_name").val(dt_placename);
					}

					if (addLocationMarker.getMap() != null && selectedKeywordMarker == null) {
						$(".alm_suggest").attr("aors", "a");
					}
					else if (addLocationMarker.getMap() == null && selectedKeywordMarker != null) {
						$(".alm_suggest").attr("aors", "s");
					}
				}
			})
		}
	}
	geocoder.coord2Address(lng, lat, callback);
}

let isCEO = 0;

function addCeoInput() {
	if ($(this).attr("isCEO") == 0) {
		let html = [];
		html.push(`
			<div>
				<input type="tel" id="primecode" class="alm_input" 
				placeholder="사업자번호" maxlength="10"><br>
				<label for="primecode"></label>
			</div>
			<div>
				<label for="input_bnd">사업자 증빙 서류</label>
 				<input class="form-control" type="file" name="upload_bnd" id="input_bnd" 
 				accept=".bmp, .jpg, .jpeg, .gif, .png, .webp, .webm, .jfif, .pdf">
			</div>`)
		$(".alm_append").append(html);
		$(this).html("사장님 아니에요");
		$(this).attr("isCEO", 1);
		isCEO = 1;
	}
	else {
		$(".alm_append").empty();
		$(this).html("사장님이신가요?");
		$(this).attr("isCEO", 0);
		isCEO = 0;
	}
}

function onlyNumber() {
	let phone = $(this).val().replace(/[^0-9]/g, "");
	$(this).val(phone);
	if (phone.length == 10) {
		let splited = phone.split(""),
			labelPhone = "사업자 번호: ";
		for (i = 0; i < splited.length; i++) {
			labelPhone += splited[i];
			if (i == 2 || i == 4) labelPhone += "-";
		}
		$("label[for='primecode']").html(labelPhone);
	}
	else $("label[for='primecode']").html("");
}

function suggestALM() {
	let marker = null;

	if ($(".alm_suggest").attr("aors") == "a") {
		marker = addLocationMarker;
	}
	else marker = selectedKeywordMarker;

	let formData = new FormData(),
		files = null;

	let lat = marker.getPosition().getLat(),
		lng = marker.getPosition().getLng(),
		primecode = $("input[id='primecode']").val(),
		r_name = $("#r_name").val(),
		category = $("#category option:selected").val(),
		address = "";

	if (isCEO == 1) {
		files = $("input[name='upload_bnd']")[0].files;
		fileSize = $("input[name='upload_bnd']")[0].files[0].size;
		for (i = 0; i < files.length; i++) formData.append("bnd", files[i]);
	}

	let geocoder = new kakao.maps.services.Geocoder();
	let callback = function (result, status) {
		if (status === kakao.maps.services.Status.OK) {
			if (result[0].road_address != null) address = JSON.stringify(result[0].road_address.address_name);
			else address = JSON.stringify(result[0].address.address_name);

			let restaurant = {
				lat: lat,
				lng: lng,
				primecode: primecode,
				r_name: r_name,
				category: category,
				address: address
			}
			formData.append("restaurant", new Blob([JSON.stringify(restaurant)], { type: "application/json" }));

			if (isCEO == 1) {
				$.ajax({
					url: "/suggest/alm/ceo",
					type: "post",
					contentType: false,
					processData: false,
					data: formData,
					dataType: "text",
					beforeSend: function () {
						if (r_name == "" || category == "") {
							alert("상호명과 카테고리 분류는 필수입니다");
							return false;
						}
						else if (isCEO == 1 && (primecode.length != 10 || formData.get("bnd") == null)) {
							alert("사업자 번호와 증빙 서류는 필수입니다");
							return false;
						}
						else if (fileSize > 5 * 1024 * 1024) {
							alert("첨부 파일 사이즈는 5MB 이내로 등록 가능합니다")
							return false;
						}
					},
					success: function (message) {
						if (message == "proceed") {
							alert("해당 내용으로 맛집 등록이 요청되었습니다");
							location.reload();
						}
						else if (message == "extension") {
							alert("지원하지 않는 확장자 파일입니다\n" +
								".bmp .jpg, .jpeg, .gif, .png,\n" +
								".webp, .webm .jfif .pdf 만을 지원합니다");
						}
						else {
							alert("이미 등록 요청이 된 맛집입니다");
						}
					},
					error: function () {
						alert("카카오 서버와 통신에 실패했습니다");
					}
				})
			}
			else {
				$.ajax({
					url: "/suggest/alm/user",
					type: "post",
					contentType: false,
					processData: false,
					data: formData,
					dataType: "text",
					beforeSend: function () {
						if (r_name == "" || category == "") {
							alert("상호명과 카테고리 분류는 필수입니다");
							return false;
						}
					},
					success: function (message) {
						if (message == "proceed") {
							alert("해당 내용으로 맛집 등록이 요청되었습니다");
							location.reload();
						}
						else {
							alert("이미 등록 요청이 된 맛집입니다");
						}
					},
					error: function () {
						alert("카카오 서버와 통신에 실패했습니다");
					}
				})
			}
		}
	}
	geocoder.coord2Address(lng, lat, callback);
}

let dt_placename = "";

function suggestDT() {
	if (loginFlag == 1 || loginFlag == 2) {
		let position = selectedKeywordMarker.getPosition();
		dt_placename = $(".dt_placename").text();
		closeOverlay();
		addLocationFlag = 1;
		check_duplicateLocation(position);
	}
	else {
		alert("로그인하셔야 맛집 제안이 가능합니다");
	}
}



function manageLoginButton() {
	if ($(this).text() == "로그인") {
		document.location = "/login";
	}
	else {
		$.ajax({
			url: "/logout",
			type: "post",
			dataType: "text",
			success: function () {
				alert("로그아웃 되었습니다");
				document.location = "/login";
			}
		})
	}
}



function search() {
	let sf_count = 0;
	let query, fc, ce, ob;
	let tags = [];

	fc = $("input:radio[name='fc']:checked").val();
	if (fc != undefined) sf_count++;
	ce = $("input:radio[name='close_or_eval']:checked").val();
	if (ce != undefined) sf_count++;
	ob = $("input:radio[name='orderby']:checked").val();
	if (ob != undefined) sf_count++;

	$("input:checkbox[name='tags']").each(function () {
		if ($(this).prop("checked") == true) {
			tags.push($(this).val());
			sf_count++;
		}
	});

	let position = map.getCenter();
	let lat = position.getLat(),
		lng = position.getLng();

	wholeMarkersNull();
	$("#search_list").empty();

	if (sf_count == 0 || loginFlag == 0) {
		query = encodeURI($("#search_input").val());
		let searchURL =
			`https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=10&sort=accuracy&query=${query}&x=${lng}&y=${lat}`;
		$.ajax({
			url: searchURL,
			type: "get",
			headers: {
				"Authorization": "KakaoAK 996c306ef122d0be2b100a12e7f2e6ac"
			},
			dataType: "json",
			beforeSend: function () {
				if (query == "") {
					alert("검색어 또는 검색 조건을 하나라도 활성화해주세요");
					return false;
				}
			},
			success: function (data) {
				if (data.documents.length != 0) {
					let bounds = new kakao.maps.LatLngBounds();
					for (i = 0; i < data.documents.length; i++) {
						displayKeywordMarker(data.documents[i]);
						bounds.extend(new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x));
					}
					map.setBounds(bounds);
					let swLat = bounds.getSouthWest().getLat(),
					swLng = bounds.getSouthWest().getLng(),
					neLat = bounds.getNorthEast().getLat(),
					neLng = bounds.getNorthEast().getLng();
					let centerLng = (neLng + swLng) / 2;
					let centerLat = (neLat + swLat) / 2;
					map.setCenter(new kakao.maps.LatLng(centerLat, centerLng));
				}
				else addressSearch(searchURL, query);
			},
			error: function () {
				alert("카카오 서버와 통신하지 못했습니다");
			}
		})
	}
	else if (sf_count != 0) {
		$(".sf_filter").css("display", "none"); 
		$("#search_list_wrapper").css("display", "block"); 
					
		query = $("#search_input").val();
		$.ajax({
			url: "/main/filter/search",
			type: "post",
			data: {
				query: query,
				fc: fc,
				ce: ce,
				ob: ob,
				tags: tags,
				lat: lat,
				lng: lng
			},
			dataType: "json",
			success: function (data) {
				
				if (data.length != 0) {
					let tempAry = [];
					for (i = 0; i < data.length; i++) {
						let d = data[i];
						tempAry.push(d.eval);
					}
					tempAry.sort(function (a, b) {
						return b - a;
					});
					let indexAry = [];
					let tempNum = 0, index = 1;
					for (i = 0; i < tempAry.length; i++) {
						if (i == 0) {
							tempNum = tempAry[0];
							indexAry.push(index);
						}
						else {
							if (tempNum > tempAry[i]) index++;
							tempNum = tempAry[i];
							indexAry.push(index);
						}
					}
					let bounds = new kakao.maps.LatLngBounds();
					detailMarkers = [];
					for (i = 0; i < data.length; i++) {
						let d = data[i];
						displayDetailMarker(d, indexAry[i], ce);
						bounds.extend(new kakao.maps.LatLng(d.lat, d.lng));
					}
					map.setBounds(bounds);
					let swLat = bounds.getSouthWest().getLat(),
					swLng = bounds.getSouthWest().getLng(),
					neLat = bounds.getNorthEast().getLat(),
					neLng = bounds.getNorthEast().getLng();
					let centerLng = (neLng + swLng) / 2;
					let centerLat = (neLat + swLat) / 2;
					map.setCenter(new kakao.maps.LatLng(centerLat, centerLng));
				}
				else alert("검색하신 결과에 맞는 맛집이 없습니다");
			}
		})
	}
}

function rectSearch() {
	let sf_count = 0;
	let query, fc, ce, ob;
	let tags = [];

	fc = $("input:radio[name='fc']:checked").val();
	if (fc != undefined) sf_count++;
	ce = $("input:radio[name='close_or_eval']:checked").val();
	if (ce != undefined) sf_count++;
	ob = $("input:radio[name='orderby']:checked").val();
	if (ob != undefined) sf_count++;

	$("input:checkbox[name='tags']").each(function () {
		if ($(this).prop("checked") == true) {
			tags.push($(this).val());
			sf_count++;
		}
	});

	let position = map.getCenter();
	let lat = position.getLat(),
		lng = position.getLng();

	let bounds = map.getBounds(),
		swLat = bounds.getSouthWest().getLat().toString() + ",",
		swLng = bounds.getSouthWest().getLng().toString() + ",",
		neLat = bounds.getNorthEast().getLat().toString(),
		neLng = bounds.getNorthEast().getLng().toString() + ",";

	let tempBoundary = swLng + swLat + neLng + neLat,
		boundary = encodeURI(tempBoundary);

	wholeMarkersNull();

	if (sf_count == 0 || loginFlag == 0) {
		query = encodeURI($("#search_input").val());
		let searchURL =
			`https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=10&sort=accuracy
		&query=${query}&x=${lng}&y=${lat}&rect=${boundary}`;
		$.ajax({
			url: searchURL,
			type: "get",
			headers: {
				"Authorization": "KakaoAK 996c306ef122d0be2b100a12e7f2e6ac"
			},
			dataType: "json",
			beforeSend: function () {
				if (query == "") {
					alert("검색어를 입력해주세요");
					return false;
				}
			},
			success: function (data) {
				detailMarkers = [];
				if (data.documents.length != 0) {
					let bounds = new kakao.maps.LatLngBounds();
					for (i = 0; i < data.documents.length; i++) {
						displayKeywordMarker(data.documents[i]);
					}
				}
				else addressSearch(searchURL, query);
			},
			error: function () {
				alert("카카오 서버와 통신하지 못했습니다");
			}
		})
	}
	else if (sf_count != 0) {
		query = $("#search_input").val();
		let bounds = map.getBounds(),
			swLat = bounds.getSouthWest().getLat(),
			swLng = bounds.getSouthWest().getLng(),
			neLat = bounds.getNorthEast().getLat(),
			neLng = bounds.getNorthEast().getLng();

		$.ajax({
			url: "/main/filter/search",
			type: "post",
			data: {
				query: query,
				fc: fc,
				ce: ce,
				ob: ob,
				tags: tags,
				lat: lat,
				lng: lng,
				swLat: swLat,
				swLng: swLng,
				neLat: neLat,
				neLng: neLng
			},
			dataType: "json",
			success: function (data) {
				if (data.length != 0) {
					let tempAry = [];
					for (i = 0; i < data.length; i++) {
						let d = data[i];
						tempAry.push(d.eval);
					}
					tempAry.sort(function (a, b) {
						return b - a;
					});
					let indexAry = [];
					let tempNum = 0, index = 1;
					for (i = 0; i < tempAry.length; i++) {
						if (i == 0) {
							tempNum = tempAry[0];
							indexAry.push(index);
						}
						else {
							if (tempNum > tempAry[i]) index++;
							tempNum = tempAry[i];
							indexAry.push(index);
						}
					}
					for (i = 0; i < data.length; i++) {
						let d = data[i];
						displayDetailMarker(d, indexAry[i], ce);
					}
				}
				else alert("검색하신 결과에 맞는 맛집이 없습니다");
			}
		})
	}
}

function addressSearch(searchURL, query) {
	wholeMarkersNull();

	searchURL =
		`https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10
		&query=${query}"`
	$.ajax({
		url: searchURL,
		type: "get",
		headers: {
			"Authorization": "KakaoAK 996c306ef122d0be2b100a12e7f2e6ac"
		},
		dataType: "json",
		success: function (data) {
			if (data.documents.length != 0) {
				let bounds = new kakao.maps.LatLngBounds();
				for (i = 0; i < data.documents.length; i++) {
					displayAddressMarker(data.documents[i]);
					bounds.extend(new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x));
				}
				map.setBounds(bounds);
				map.setCenter(new kakao.maps.LatLng(data.documents[0].y, data.documents[0].x));
			}
			else {
				alert("키워드 에러가 의심됩니다\n주소명을 정확히 입력해주세요");
			}
		},
		error: function () {
			alert("카카오 서버와 통신하지 못했습니다");
		}
	})
}



let keywordMarkers = [];
let selectedKeywordMarker = null,
	openedKeywordOverlay = null;

function displayKeywordMarker(data) {
	let keywordMarker = new kakao.maps.Marker({
		clickable: true,
		map: map,
		position: new kakao.maps.LatLng(data.y, data.x)
	}),
		detailOverlay = new kakao.maps.CustomOverlay({
			clickable: true
		}),
		infowindow = new kakao.maps.InfoWindow({
			content: `<div class="iw_placename">${data.place_name}</div>`
		});

	kakao.maps.event.addListener(keywordMarker, "click", function () {
		if (selectedKeywordMarker != null && keywordMarker != selectedKeywordMarker) {
			openedKeywordOverlay.setMap(null);
		}
		selectedKeywordMarker = keywordMarker;
		let detailContent = `
		 	<div class="dt_info">
		 		<div class="dt_title">
		 			<span class="dt_placename">${data.place_name}</span>
	 				<div class="alm_close" onclick="closeOverlay()" title="닫기"></div>
		 		</div>
			 	<div class="alm_body">
		 			<p>도로명 주소: ${data.road_address_name}</p>
		 			<p>지번 주소: ${data.address_name}</p>
		 			<button class="dt_suggest btn btn-primary">맛집으로 제안하기</button>
			 	</div>
			 </div>`;
		map.setCenter(keywordMarker.getPosition());
		detailOverlay.setContent(detailContent);
		detailOverlay.setPosition(keywordMarker.getPosition());
		detailOverlay.setMap(map);
		openedKeywordOverlay = detailOverlay;
	});

	kakao.maps.event.addListener(keywordMarker, "mouseover", function () {
		infowindow.open(map, keywordMarker);
	})
	kakao.maps.event.addListener(keywordMarker, "mouseout", function () {
		infowindow.close();
	})

	keywordMarkers.push(keywordMarker);
}



let addressMarkers = [];
let selectedAddressMarker = null,
	openedAddressOverlay = null;

function displayAddressMarker(data) {
	let addressMarker = new kakao.maps.Marker({
		clickable: true,
		map: map,
		position: new kakao.maps.LatLng(data.y, data.x)
	}),
		detailOverlay = new kakao.maps.CustomOverlay({
			clickable: true
		});

	let address = data.address_name;
	if (data.address_name == null) address = data.address.address_name;

	infowindow = new kakao.maps.InfoWindow({
		content: `<div class="iw_placename">${address}</div>`
	});

	kakao.maps.event.addListener(addressMarker, "click", function () {
		if (selectedAddressMarker != null && addressMarker != selectedAddressMarker) {
			openedAddressOverlay.setMap(null);
		}
		selectedAddressMarker = addressMarker;

		let ifAdminSearch = "";
		if (adminSearchFlag == 0) {
			ifAdminSearch =
				`<button class="dt_suggest btn btn-primary">맛집으로 제안하기</button></div></div>`
		}
		else {
			ifAdminSearch = `</div></div>`;
		}

		let detailContent = `
		 	<div class="dt_info">
		 		<div class="dt_title">
		 			<span class="dt_placename">${address}</span>
		 			<div class="alm_close" onclick="closeOverlay()" title="닫기"></div>
		 		</div>
			 	<div class="alm_body">
		 			<p>도로명 주소: ${data.address_name}</p>
		 			<p>지번 주소: ${data.address.address_name}</p>
		 		${ifAdminSearch}`;

		map.setCenter(addressMarker.getPosition());
		detailOverlay.setContent(detailContent);
		detailOverlay.setPosition(addressMarker.getPosition());
		detailOverlay.setMap(map);
		openedAddressOverlay = detailOverlay;
	});

	kakao.maps.event.addListener(addressMarker, "mouseover", function () {
		infowindow.open(map, addressMarker);
	})
	kakao.maps.event.addListener(addressMarker, "mouseout", function () {
		infowindow.close();
	})

	addressMarkers.push(addressMarker);
}



let detailMarkers = [];
let selectedDetailMarker = null,
	openedDetailOverlay = null;

function displayDetailMarker(data, index, flag) {
	let r_name = data.r_name,
		category = data.category,
		address = data.address,
		r_phone = data.r_phone;
		close = data.close;
		eval = data.eval;
		
	if (r_phone == undefined) r_phone = "미등록";

	let imageSrc = null, hoverSrc = null;
	if (flag == "close") {
		imageSrc = "/img/main/" + category + ".png";
		hoverSrc = "/img/main/" + category + "Act.png";
	}
	else if (flag == "eval") {
		imageSrc = "/img/main/Pin" + index + ".png";
		hoverSrc = "/img/main/Pin" + index + "Act.png";
	}

	let imageSize = new kakao.maps.Size(30, 30),
		imageOption = { offset: new kakao.maps.Point(20, 20) },
		markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
		hoverImage = new kakao.maps.MarkerImage(hoverSrc, imageSize, imageOption);

	let detailMarker = new kakao.maps.Marker({
		clickable: true,
		map: map,
		position: new kakao.maps.LatLng(data.lat, data.lng),
		image: markerImage
	}),
		detailOverlay = new kakao.maps.CustomOverlay({
			clickable: true
		}),
		infowindow = new kakao.maps.InfoWindow({
			content: `<div class="iw_placename">${r_name}</div>`
		});
	if (close>0){
	if (Number(close) >= 1000) close = (close / 1000).toFixed(2) + "km";
	else close += "m";
	} else {
		close = "리뷰 "+eval;
	} 	
	
	let showSearchInfo = `
		 	<div class="showSearchInfo">
		 	<img src="${imageSrc}" style="width:25px">
			 	<span style="font-weight: bold;">${r_name}</span>
			 	&emsp;<span style="font-weight: bold; color: #f24c3d;">${close}</span><br>
		 			<span class="r_address">주소: ${address}</span><br>
		 	</div>`;
	$('#search_list').append(showSearchInfo);
	 	
	kakao.maps.event.addListener(detailMarker, "click", function () {
		if (selectedDetailMarker != null && detailMarker != selectedDetailMarker) {
			openedDetailOverlay.setMap(null);
		}
		selectedDetailMarker = detailMarker;
		let detailContent = `
		 	<div class="dt_info">
		 		<div class="dt_title">
		 			<span id="dt_r_name" class="dt_placename">${r_name}</span>
		 			<div class="alm_close" onclick="closeOverlay()" title="닫기"></div>
		 		</div>
			 	<div class="alm_body">
		 			<p id="dt_address">주소: ${address}</p>
		 			<p>전화번호: ${r_phone}</p>
		 			<div style="display: flex; justify-content: center;">
			 			<button id="goto_detail" class="btn btn-primary detail_button"
			 			onclick="goto_detail()">상세보기</button>
			 			<button id="goto_review" class="btn btn-primary detail_button"
			 			onclick="goto_review()">리뷰보기</button>
			 		</div>
		 		</div>
		 	</div>`;

		map.setCenter(detailMarker.getPosition());
		detailOverlay.setContent(detailContent);
		detailOverlay.setPosition(detailMarker.getPosition());
		detailOverlay.setMap(map);
	
		openedDetailOverlay = detailOverlay;
	});

	kakao.maps.event.addListener(detailMarker, "mouseover", function () {
		infowindow.open(map, detailMarker);
		detailMarker.setImage(hoverImage);
	});

	kakao.maps.event.addListener(detailMarker, "mouseout", function () {
		infowindow.close();
		detailMarker.setImage(markerImage);
	});
	
	detailMarkers.push(detailMarker);
}

function goto_detail() {
	let r_name = $("#dt_r_name").text();
	let address = $("#dt_address").text().split(":")[1].trim();
	window.open(`/restaurant/detail/${r_name}/${address}`, "_blank");
}

function goto_review() {
	let r_name = $("#dt_r_name").text();
	let address = $("#dt_address").text().split(":")[1].trim();
	localStorage.setItem("goto_review", true);
	window.open(`/restaurant/detail/${r_name}/${address}`, "_blank");
}



function wholeMarkersNull() {
	addLocationMarker.setMap(null);
	markersNuller(keywordMarkers);
	markersNuller(addressMarkers);
	markersNuller(detailMarkers);
}

function markersNuller(markers) {
	for (i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
}



function offCategory() {
	sf_category = "";
	$("input:radio[name='fc']").each(function () {
		$(this).prop("checked", false);
		let id = $(this).attr("id");
		$(`label[for='${id}']`).children("img").attr("src", id + ".png");
	})
}

function offOrderby() {
	$("input:radio[name='orderby']").each(function () {
		$(this).prop("checked", false);
		let id = $(this).attr("id");
		$(`label[for='${id}']`).removeClass("active");
	})
}
function offTags() {
	$("input:checkbox[name='tags']").each(function () {
		$(this).prop("checked", false);
		let id = $(this).attr("id");
		$(`label[for='${id}']`).removeClass("active");
	})
}



function toggleBarandMap() {
	if ($(this).hasClass("tsb_close")) {
		$(".tsb_open").css("display", "block");
	}
	else {
		$(".tsb_open").css("display", "none");
	}
}



function clearMarkers() {
	wholeMarkersNull();
}



function showMyData() {
	$("#search_list_wrapper").css("display", "none");
	$(".sf_filter").css("display", "block"); 
	if (loginFlag == 1 || loginFlag == 2) {
		$(".top_sidebar").empty();
		$(".top_sidebar").append(
			`<div class="profil" role="banner">
			<span class="profil img"><img src="/img/main/Profile.jpg"
				width="85" height="85"></span>
			<div class="profil info">
				<span id="profil_user_name"></span>님 안녕하세요
				<button id="btn-GO-signUpdate"></button>
				<div style="line-height: 50%"><br><br></div>
				<button type="button" class="btn-userGrade"></button>
				<span class="profil userInfo">리뷰 <a id=userReviewCount></a></span>
			</div>

		</div>
		<div class="profil_subarea">
			<button type="button" id="btn-backMain">뒤로</button>
			<button type="button" class="btn-userSetting active"
				id="btn-pasSetting">선호도 관리</button>
			<button type="button" class="btn-userSetting"
				id="btn-reviewSetting">리뷰 관리</button>
			<button type="button" class="btn-userSetting"
				id="btn-storeSetting">업체 관리</button>
		</div>`);
		$("#food_categories").css("display", "none");
		$("#btn-saveMyTag").css("display", "block");

		$("input:radio").each(function () {
			$(this).prop("checked", false);
		})
		$("input:checkbox").each(function () {
			$(this).prop("checked", false);
		});

		checkTag();
		get_userName();
		get_userReviewCount();
	}
	else alert("로그인이 필요한 페이지입니다.");
}

function checkTag() {
	let ce = localStorage.getItem("close_or_eval"),
		orderby = localStorage.getItem("orderby");

	$("input:radio").prop("checked", false);

	if (ce != "undefined" && ce != undefined) {
		$(`input:radio[value='${ce}']`).prop("checked", true);
	}
	else {
		$("input:radio[value='close']").prop("checked", true);
		$("label[for='close']").addClass("active");
	}

	if (orderby != "undefined") $(`input:radio[value='${orderby}']`).prop("checked", true);

	$("input[type='radio']:checked").each(function () {
		let id = $(this).attr("id");
		$(`label[for='${id}']`).addClass("active");
	});

	let storedValues = localStorage.getItem("tags");
	if (storedValues) {
		checkedValues = JSON.parse(storedValues);
		$("input:checkbox[name='tags']").each(function () {
			let value = $(this).val();
			if (checkedValues.includes(value)) {
				$(this).prop("checked", true);
				$(`label[for='${this.id}']`).addClass("active");
			}
		});
	}
}

function gotoMain() {
	$("#food_categories").css("display", "block");
	$("#btn-saveMyTag").css("display", "none");
	$(".top_sidebar").empty();
	$(".mypage_subtab").css("display", "none");
	$(".sf_filter").css('display', "block");

	let manageButton = "";
	if (loginFlag == 2) manageButton =
		`<button id='button_manage' class='btn btn-dark' data-bs-toggle='modal' 
	data-bs-target='#manageModal'>관리</button>`

	let header_subarea = "";
	if (loginFlag >= 1) header_subarea = `
		<button id="btn_searchList" class="btn btn-secondary ts_button">검색 결과 보기</button>
	 	<button id="btn-myPage" class="btn btn-success ts_button">마이페이지</button>	
	  	<button id="challenge" class="btn btn-danger ts_button" data-bs-toggle="tooltip" 
	  	data-bs-placement="right" data-bs-title="내 취향의 가보지 않은 맛집 찾기">도전</button>`;

	$(".top_sidebar").append(`
		<div class="header" role="banner">
		    <h1 class="header_title">
		        <a class="a_title">kakaomap</a>
		        <button id="button_log" class="btn btn-danger">로그아웃</button>
			    ${manageButton}
		    </h1>
		    <button class="choice_currentmap btn btn-success">현 지도 내 장소검색</button>
			<div class="box_searchbar">
			    <input id="search_input" class="tf_keyword" maxlength="100" 
			    autocomplete="off" placeholder="장소, 주소 검색">
			    <button id="search_button">검색</button>
			</div>
			${header_subarea}
		</div>`);
}

function get_userName() {
	$.ajax({
		url: "/get/userName",
		type: "post",
		dataType: "json",
		success: function (data) {
			if (data.length != 0) {
				$("#profil_user_name").text(data[0]["name"]);
			}
		}
	})
}
function get_userReviewCount() {
	$.ajax({
		url: "/get/userReviewCount",
		type: "post",
		dataType: "json",
		success: function (count) {
			$("#userReviewCount").text(count);
			get_userGrade(count);
		}
	})
}

function get_userGrade(count) {
	if (count <= 5) {
		$(".btn-userGrade").text("맛보기");
		$(".btn-userGrade").css("color", "#ffffff");
		$(".btn-userGrade").addClass("silver-background");
	}
	else if (count >= 10 && count < 15) {
		$(".btn-userGrade").text("맛돌이");
		$(".btn-userGrade").css("color", "#ffffff");
		$(".btn-userGrade").addClass("gold-background");
	}
	else if (count >= 15 && count < 20) {
		$(".btn-userGrade").text("맛고수");
		$(".btn-userGrade").css("color", "#ffffff");
		$(".btn-userGrade").addClass("platinum-background");
	}
	else if (count >= 20) {
		$(".btn-userGrade").text("미식가");
		$(".btn-userGrade").css("color", "#808080");
		$(".btn-userGrade").addClass("diamond-background");
	}
}



function signUpdate() {
	document.location = "/signupdate";
}



function showTagSetting() {
	$(".sf_filter").css("display", "block");
	$("#food_categories").css("display", "none");
	$("#btn-saveMyTag").css("display", "block");
	$(".div_reviewList").css("display", "none");
	$(".div_storeList").css("display", "none");
	$("#btn-pasSetting").addClass("active");
	$("#btn-reviewSetting").removeClass("active");
	$("#btn-storeSetting").removeClass("active");
}
function showReviewSetting() {
	$(".sf_filter").css("display", "none");
	$("#btn-saveMyTag").css("display", "none");
	$(".div_reviewList").css("display", "block");
	$(".div_storeList").css("display", "none");
	$("#btn-pasSetting").removeClass("active");
	$("#btn-reviewSetting").addClass("active");
	$("#btn-storeSetting").removeClass("active");
	getMyReviewList();
}

let MyReviewList_page = 1;
let MyReviewList_deadend = 0;

function getMyReviewList(){
	let start = (MyReviewList_page - 1) * 5 + 1;
	let end = MyReviewList_page * 5;
	$.ajax({
		url: "/my/reviewList",
		type: "post",
		data: {
			start: start,
			end: end
		},
		dataType: "json",
		success: function (data) {
			if (data != null && data.length > 1) {
				$("#review_list").empty();
				for (let i = 0; i < data.length - 1; i++) {
					let d = data[i];
					if(d.rv_photo == undefined) d.rv_photo = "/img/admin/No-Image.jpg";
					let html = `
					<div class="myReviewStore">
						<img src="${d.rv_photo}" class="goto_review_my">
						<div class="myReviewStoreTag">
							<strong r_name="${d.rv_r_name}" address="${d.rv_address}"
							class="goto_review_my">${d.rv_r_name}</strong>
							<p style="font-size:13px;color:grey; margin: 0px;">${d.rv_time}</p>
							<span style="font-size: 13px">${d.rv_detail.substring(0,20)}&emsp;...</span>
						<div>
					</div>`;
					$('#review_list').append(html);
				}
				let count = data[data.length - 1].count;
				MyReviewList_deadend = Math.ceil(count / 5);
				MyReview_list_pagination();
			}
			else{
				$("#noMyReview").css("display", "block");
			}
		}
	})
}

function goto_review_my() {
	let parent = $(this).closest(".myReviewStore");
	let r_name = parent.find("strong").attr("r_name");
	let address = parent.find("strong").attr("address");
	localStorage.setItem("goto_review", true);
	window.open(`/restaurant/detail/${r_name}/${address}`, "_blank");
}


function MyReview_list_pagination(){
	$("#MyReview_list_pagination").empty();
	
	let cp = MyReviewList_page; // current page
	let ep = MyReviewList_deadend; // end page
	let fp = 0; // first page
	let lp = 0; // last page
	
	if (cp % 5 == 0 ) fp = cp /5;
	else fp = (Math.floor(cp/5) * 5 + 1);
	
	if (fp + 4 <= ep) lp = fp + 4;
	else lp = ep;
	
	let active = "";
	let disabled = "";
	
	if(cp == 1) disabled = "disabled";
	$("#MyReview_list_pagination").append(`
	<li class="page-item ${disabled} MyReviewList_pageNum" pn=1><a class="page-link"><<</a></li>
	<li id="MyReviewList_backward" class="page-item ${disabled}"><a class="page-link"><</a></li>`);
	
	for (i = fp; i <= lp; i++) {
		if (i == cp) active = "active";
		else active = "";
		
		$("#MyReview_list_pagination").append(`
		<li class="page-item ${active} MyReviewList_pageNum" pn=${i}><a class="page-link">${i}</a></li>`);
	}
	
	disabled = "";
	if (cp == ep) disabled = "disabled";
	$("#MyReview_list_pagination").append(`
	<li id="MyReviewList_forward" class="page-item ${disabled}"><a class="page-link">></a></li>
	<li class="page-item ${disabled} MyReviewList_pageNum" pn=${ep}><a class="page-link">>></a></li>`);
}

function MyReviewList_pageNum() {
	MyReviewList_page = Number($(this).attr("pn"));
	
	getMyReviewList();
}

function MyReviewList_backward() {
	if (MyReviewList_page - 1 > 0) {
		MyReviewList_page--;
		getMyReviewList();
	}
}

function MyReviewList_forward() {
	if (MyReviewList_page + 1 <= MyReviewList_deadend) {
		MyReviewList_page++;
		getMyReviewList();
	}
}

function showStoreSetting() {
	$(".sf_filter").css("display", "none");
	$("#btn-saveMyTag").css("display", "none");
	$(".div_reviewList").css("display", "none");
	$(".div_storeList").css("display", "block");
	$("#btn-pasSetting").removeClass("active");
	$("#btn-reviewSetting").removeClass("active");
	$("#btn-storeSetting").addClass("active");
	getMyStoreList();
}

let MyStoreList_page = 1;
let MyStoreList_deadend = 0;
function getMyStoreList(){
	let name = $("#profil_user_name").text();
	let start = (MyStoreList_page - 1) * 5 + 1;
	let end = MyStoreList_page * 5;
	$.ajax({
		url: "/my/storeList",
    	type: "post",
	  	data: { 
			name: name,
			start: start,
			end: end
	  	},
	  	dataType: "json",
	  	success: function(data) {
	    	if (data != null && data.length > 1) {
	     		$("#store_List").empty();
	      		for (let i = 0; i < data.length - 1; i++) {
	        		let d = data[i];
	        		let category = "";
	        		if (d.category == "koreanfood") category = "한식";
	        		else if (d.category == "chinafood") category = "중식";
	        		else if (d.category == "japanfood") category = "일식";
	        		else if (d.category == "westernfood") category = "양식";
	        		else if (d.category == "pizza") category = "피자";
	        		else if (d.category == "chicken") category = "치킨";
	        		else if (d.category == "jokbal") category = "족발";
	        		else if (d.category == "cafe") category = "카페";
	        		
	        		let html = `
	          		<div class="myReviewStore">
	          			<label>
	          				<img src="/img/main/${d.category}.png" style="width:60px;height:60px;">
	          			</label>
	          			<div class="myReviewStoreTag">
		          			<a href="/restaurant/detail/${d.r_name}/${d.address}" target="_blank">
		            			<strong>${d.r_name}</strong>
		            		</a>
		            		<span class="badge bg-dark store_ctbadge">${category}</span><br>
	            			<span style="font-size: 13px">${d.address}</span>
	            		</div>
	          		</div>`;
	       			$("#store_List").append(html);
	      		}
	      		let count = data[data.length - 1].count;
				MyStoreList_deadend = Math.ceil(count / 5);
				MyStore_list_pagination();
	    	} 
	    	else {
				$("#noMyStore").css("display", "block");
			}
	  	}
	});
}

function MyStore_list_pagination(){
	$("#MyStore_list_pagination").empty();
	
	let cp = MyStoreList_page; // current page
	let ep = MyStoreList_deadend; // end page
	let fp = 0; // first page
	let lp = 0; // last page
	
	if (cp % 5 == 0 ) fp = cp /5;
	else fp = (Math.floor(cp/5) * 5 + 1);
	
	if (fp + 4 <= ep) lp = fp + 4;
	else lp = ep;
	
	let active = "";
	let disabled = "";
	
	if(cp == 1) disabled = "disabled";
	$("#MyStore_list_pagination").append(`
	<li class="page-item ${disabled} MyStoreList_pageNum" pn=1><a class="page-link"><<</a></li>
	<li id="MyStoreList_backward" class="page-item ${disabled}"><a class="page-link"><</a></li>`);
	
	for (i = fp; i <= lp; i++) {
		if (i == cp) active = "active";
		else active = "";
		
		$("#MyStore_list_pagination").append(`
		<li class="page-item ${active} MyStoreList_pageNum" pn=${i}><a class="page-link">${i}</a></li>`);
	}
	
	disabled = "";
	if (cp == ep) disabled = "disabled";
	$("#MyStore_list_pagination").append(`
	<li id="MyStoreList_forward" class="page-item ${disabled}"><a class="page-link">></a></li>
	<li class="page-item ${disabled} MyStoreList_pageNum" pn=${ep}><a class="page-link">>></a></li>`);
}
function MyStoreList_pageNum() {
	let clicked = Number($(this).attr("pn"));
	if (MyStoreList_page == clicked) return false; 
	else {
		MyStoreList_page = Number($(this).attr("pn"));
		getMyStoreList();
	}
}

function MyStoreList_backward() {
	if (MyStoreList_page - 1 > 0) {
		MyStoreList_page--;
		getMyStoreList();
	}
}

function MyStoreList_forward() {
	if (MyStoreList_page + 1 <= MyStoreList_deadend) {
		MyStoreList_page++;
		getMyStoreList();
	}
}

function saveTag() {
	let close_or_eval = $("input:radio[name='close_or_eval']:checked").val(),
		orderby = $("input:radio[name='orderby']:checked").val(),
		checkedValues = [];

	localStorage.setItem("close_or_eval", close_or_eval);
	localStorage.setItem("orderby", orderby);
	$("input:checkbox[name='tags']").each(function () {
		if ($(this).prop("checked") == true) {
			checkedValues.push($(this).val());
		}
	})
	localStorage.setItem("tags", JSON.stringify(checkedValues));
	alert("설정 태그가 저장되었습니다.");
}

function showDistance(content, position) {
    
    if (distanceOverlay) { // 커스텀오버레이가 생성된 상태이면
        
        // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
        distanceOverlay.setPosition(position);
        distanceOverlay.setContent(content);
        
    } else { // 커스텀 오버레이가 생성되지 않은 상태이면
        
        // 커스텀 오버레이를 생성하고 지도에 표시합니다
        distanceOverlay = new kakao.maps.CustomOverlay({
            map: map, // 커스텀오버레이를 표시할 지도입니다
            content: content,  // 커스텀오버레이에 표시할 내용입니다
            position: position, // 커스텀오버레이를 표시할 위치입니다.
            xAnchor: 0,
            yAnchor: 0,
            zIndex: 3  
        });      
    }
}
