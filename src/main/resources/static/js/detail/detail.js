const r_name = decodeURIComponent(window.location.pathname.split('/')[3]);
const address = decodeURIComponent(window.location.pathname.split('/')[4]);

const oe = "/img/detail/OwnerEdit.png";
const ock = "/img/detail/OwnerCheck.png";
const ocl = "/img/detail/OwnerCancel.png";
const oeh = "/img/detail/OwnerEditHover.gif";
const oes = "/img/detail/OwnerEditSubmit.gif";
const oec = "/img/detail/OwnerEditCancel.gif";

const review_string = `	
	<div style="margin: 0 0 0 20px;">
		<div>
			<label class="tag_label">
				<input type="checkbox" value="clean" name="tags">
				<span># 청결</span>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="kind" name="tags">
				<span># 친절</span>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="parking" name="tags">
				<span># 주차</span>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="fast" name="tags">
				<span># 빠름</span>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="pack" name="tags">
				<span># 포장</span><br>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="alone" name="tags">
				<span># 혼밥</span>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="together" name="tags">
				<span># 단체</span>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="focus" name="tags">
				<span># 집중</span>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="talk" name="tags">
				<span># 대화</span>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="photoplace" id="tags" name="tags">
				<span># 사진</span><br>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="delicious" id="tags" name="tags">
				<span># 맛</span>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="lot" id="tags" name="tags">
				<span># 양</span>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="cost" id="tags" name="tags">
				<span># 가성비</span>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="portion" id="tags" name="tags">
				<span># 알참</span>
			</label>
			<label class="tag_label">
				<input type="checkbox" value="satisfy" id="tags" name="tags">
				<span># 만족</span>
			</label>			
		</div><br>

		<input type="file" id="review_imageUpload" 
		accept=".bmp, .jpg, .jpeg, .gif, .png, .webp, .webm, .jfif, .pdf" style="display: none;">
		<label for="review_imageUpload" class="imageUpload"></label>
		
		<img id="review_beforePreview" class="photo_modal" src=""/>
		<label for="review_beforePreview" style="display: none;"></label><br><br>`;

$(document)
.ready(function() {
	gen_qrcode();
	check_mine();
    get_restaurant_detail();
    tag_ranking();
    get_photoList();
    get_reviewList();
    came_from_main();
})
.on("click", "#detail_edit, #de_cancel", detail_edit)
.on("click", "#de_submit", detail_submit)
.on("click", "#menu_edit, #me_cancel", menu_edit)
.one("click", "#ctAdd", add_category)
.on("click", ".ctConfirm", confirm_category)
.on("click", ".ctCancel", cancel_category)
.on("click", ".meAdd", add_menu)
.on("click", ".meConfirm", confirm_menu)
.on("click", ".meCancel", cancel_menu)
.on('click', "#categoryNuller", delete_category)
.on("click", "#menuNuller", delete_menu)
.on("click", "#me_submit", menu_submit)
.on('click','#review_submit', review_submit)
.on("click", ".photo_modal", photo_modal)
.on("click", "#photoList_backward", photoList_backward) 
.on("click", "#photoList_forward", photoList_forward)
.on("click", "#review_delete", review_delete)
.on("click", ".reviewList_pageNum", reviewList_pageNum)
.on("click", "#reviewList_backward", reviewList_backward)
.on("click", "#reviewList_forward", reviewList_forward)
.on("click", ".review_modal", review_modal)
.on("hidden.bs.modal", "#review_modal", update_ceoReply)



.on("propertychange change paste input focus", "input[type='number']", function() {
	number = $(this).val().replace(/[^0-9]/g, "").substr(0,8);
	$(this).val(number);
})

.on("propertychange change paste input focus", ".blockChar", function() {
	text = $(this).val().replace(/[|,￦]/gi, "");
	$(this).val(text);
})

.on("mouseover", ".owner_edit", function() {
	$(this).attr("src", oeh);
})

.on("mouseout", ".owner_edit", function() {
	$(this).attr("src", oe);
})

.on("mouseover", ".owner_submit", function() {
	$(this).attr("src", oes);
})

.on("mouseout", ".owner_submit", function() {
	$(this).attr("src", ock);
})

.on("mouseover", ".owner_cancel", function() {
	$(this).attr("src", oec);
})

.on("mouseout", ".owner_cancel", function() {
	$(this).attr("src", ocl);
})

.on("mouseover", ".tdCategory, .tdMenu", function() {
	if (menuEditFlag == 1) $(this).css("background-color", "#9babb8");
})

.on("mouseout", ".tdCategory, .tdMenu", function() {
	if (menuEditFlag == 1) $(this).css("background-color", "#ffffff");
})

.on("keyup", "#categoryEditor", function(e) {
	if (e.keyCode == 13) {
		let edited = $(this).val();
		let td = $(this).parent();
		td.empty();
		$("#categoryNuller").remove();
		td.text(edited);
		$(".tdCategory").one("click", edit_category);
	}
	return false;
})

.on("keyup", "#menuNameEditor, #menuPriceEditor", function(e) {
	if (e.keyCode == 13 && $("#menuNameEditor").val() != "" && $("#menuPriceEditor").val() != "") {
		let name = $("#menuNameEditor").val();
		let price = "￦ " + $("#menuPriceEditor").val().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		let edited = name + "\x97" + price;
		let td = $(this).parent();
		td.empty();
		td.text(edited);
		$(".tdMenu").one("click", edit_menu);
	}
	return false;
})

.on("change", "#review_imageUpload", function(e) {
	let file = e.target.files[0];
	let reader = new FileReader();
	reader.onload = function(e) {
		$("label[for='review_imageUpload']").css("display", "none");
		$("#review_beforePreview").css("display", "inline-block");
		$("label[for='review_beforePreview']").css("display", "inline-block");
		$("#review_beforePreview").attr("src", e.target.result);
	}
	reader.readAsDataURL(file);
	if ($("#review_beforePreview").attr("src") != "") {
		$("#review_beforePreview").css("margin", "0px");
	}
	else $("#review_beforePreview").css("margin", "0 0 0 20px");
})

.on("click", "label[for='review_beforePreview']", function() {
	$(this).css("display", "none");
	$("label[for='review_imageUpload']").css("display", "inline-block");
	$("#review_imageUpload").val("");
	$("#review_beforePreview").css("display", "none");
	$("#review_beforePreview").attr("src", "");
})

.on("change", ".tdCategory", function() {
	$(this).css("min-width", "fit-content");
})



function came_from_main() {
	if (localStorage.getItem("goto_review", true)) {
		let offset = $("#restaurant_reviewPhoto").offset();
		$("html, body").animate({
			scrollTop: offset.top
		}, 500);
		localStorage.removeItem("goto_review");
	}
}



function gen_qrcode() {
	const encode_name = r_name.replace(/ /g, "%20");
	const encode_address = address.replace(/ /g, "%20");
	let options = {
		render: "canvas",
		minVersion: 1,
		maxVersion: 40,
		ecLevel: "L",
		left: 0,
		top: 0,
		size: 100,
		fill: "#0d1015",
		background: null,
		text: `http://192.168.0.90:8081/restaurant/detail/${encode_name}/${encode_address}/authorize`,
		radius: 0,
		quiet: 1,
		mode: 0,
		mSize: 0.1,
		mPosX: 0.5,
		mPosY: 0.5,
		label: "no label",
		fontname: "sans",
		fontcolor: "#000",
		image: null
	}
	$("#qrcode").qrcode(options);
}



let isOwner = 0;

function check_mine() {
	$.ajax({
		url: "/review/check/mine",
		type: "post",
		data: {
			rv_r_name: r_name,
			rv_address: address
		},
		dataType: "text",
		success: function(message) {
			$("#restaurant_review").empty();
			if (message == "logout" || message == "none") {
				$("#restaurant_review").css("display", "block");
				$("#restaurant_review").append(`
				<pre>리뷰</pre>
				<pre style="font-weight: normal;">&emsp;로그인 및 방문 인증을 하시면 리뷰가 가능합니다</pre>`)
			}
			else if (message == "first") {
				$("#restaurant_review").css("display", "block");
				$("#restaurant_review").append(`
						${review_string}
						<textarea id="review_writeDetail" maxlength="300" 
						placeholder="음식점에 대한 솔직한 리뷰를\n서로 배려하는 마음을 담아 작성해주세요."></textarea>
						<br>
						<div style="text-align: right;">
							<button id="review_submit" class="btn btn-success" 
							style="margin: 0 20px 0 0;">리뷰 등록</button>
						<div>
					</div>`);
			}
			else if (message == "exist") {
				$("#my_review").css("display", "block");
				get_myReview();
			}
			else if (message == "owner") isOwner = 1;
		}
	})
}

let origin_myPhoto = null;

function get_myReview() {
	$("#my_review").append(`
		${review_string}
			<textarea id="review_writeDetail" maxlength="300"></textarea>
			<br>
			<p id="review_myVisit" style="font-weight: normal"></p>
			<p id="review_myTime" style="font-weight: normal"></p><br>
			<p>사장님의 답변</p>
			<textarea type="tesxt" id="my_ceoReply" maxlength="300" readonly></textarea>
			<div style="text-align: right;">
				<button id="review_submit" class="btn btn-success" 
				style="margin: 0 20px 0 0;">리뷰 수정</button>
				<button id="review_delete" class="btn btn-danger"
				style="margin: 0 20px 0 0;">리뷰 삭제</button>
			<div>
		</div>`);
	
	$.ajax({
		url: "/review/get/my",
		type: "post",
		data: {
			rv_r_name: r_name,
			rv_address: address
		},
		dataType: "json",
		success: function(data) {
			let d = data[0];
			let tagAry = d.tags.split(",");
			for (i = 0; i < tagAry.length; i++) {
				$(`input[name="tags"][value="${tagAry[i]}"]`).prop("checked", true);
			}
			
			$("label[for='review_imageUpload']").css("display", "none");
			$("#review_beforePreview").css("display", "inline-block");
			$("label[for='review_beforePreview']").css("display", "inline-block");
			
			if (d.rv_photo == undefined) $("#review_beforePreview").attr("src", "/img/admin/No-Image.jpg");
			else {
				origin_myPhoto = d.rv_photo;
				$("#review_beforePreview").attr("src", d.rv_photo);
			}
			
			if ($("#review_beforePreview").attr("src") != "") {
				$("#review_beforePreview").css("margin", "0px");
			}
			else $("#review_beforePreview").css("margin", "0 0 0 20px");
			
			$("#review_writeDetail").val(d.rv_detail);
			$("#review_myVisit").text("방문횟수: " + d.rv_visit);
			$("#review_myTime").text("작성일자: " + d.rv_time);
			$("#my_ceoReply").text(d.rv_owner);
		}
	})
}



let originPhone = 0;

function get_restaurant_detail() {	
    $.ajax({
        url: `/restaurant/detail/${r_name}/${address}`,
        type: 'post',
        dataType: 'json',
        success: function(response) {
            let r = response[0];
            let owner = "false";
            if (r.isOwner != undefined) owner = r.isOwner;
                        			
            $('#rImg').attr('src', r.r_photo);
            $('#rName').html(r.r_name);
            $('#rCategory').attr("src", `/img/main/${r.category}.png`);
            $('#rReviewN').html("리뷰수: " + r.reviewCount);
            
            $('#rAddress').append(r.address);
                
            if (r.r_phone != undefined) {                        
	            if (r.r_phone.length == 10) {
					r.r_phone = r.r_phone.slice(0, 3) + "-" + r.r_phone.slice(3, 6) + "-" + r.r_phone.slice(6);
					$("#rPhone").val(r.r_phone);
				}
				else if (r.r_phone.length == 11) {
					r.r_phone = r.r_phone.slice(0, 3) + "-" + r.r_phone.slice(3, 7) + "-" + r.r_phone.slice(7);
					$("#rPhone").val(r.r_phone);
				}
				else $("#rPhone").val(r.r_phone);
			}
						
			originPhone = r.r_phone;
			
			$("#rDetail").val(r.r_detail);
			if ($("#rDetail").val().length == 0) {
				$("#rDetail").attr("placeholder", "사장님의 참여를 기다리고 있어요");
			}
			
            if (owner == "true") {
				$("#restaurant_detail").append(`
				<div class="owner_wrapper">
					<img src="/img/detail/OwnerEdit.png" id="detail_edit" class="owner_edit">
				</div>`);
				$("#rmPre_wrapper").append(`
				<div class="owner_wrapper">
					<img src="/img/detail/OwnerEdit.png" id="menu_edit" class="owner_edit">
				</div>`);
			}
			
			if (r.menu == undefined) {
				$("#menu_table tbody").append(`
				<tr><td class="tdIndent"></td><td>메뉴 정보가 없습니다</td></tr>`)
			}
			else {
				let fa = r.menu.split("|||");
				for (i = 0; i < fa.length; i++) {
					if (i % 2 == 0) {
						$("#menu_table tbody").append(`
						<tr class="trCategory"><td class="tdIndent"></td><td class="tdCategory">${fa[i]}</td>
						<td class="tdAddCategory"></td></tr>`);
					}
					else {
						let sa = fa[i].split("||");
						for (j = 0; j < sa.length; j++) {
							let ta = sa[j].split("|");
							let name = ta[0], price = "￦ " + ta[1].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							if (j < sa.length - 1)
							$("#menu_table tbody").append(`
							<tr><td class="tdIndent"></td><td class="tdIndent"></td>
							<td class="tdMenu">${name}&emsp;${price}</td>`);
							else $("#menu_table tbody").append(`
							<tr><td class="tdIndent"></td><td class="tdIndent"></td>
							<td class="tdMenu">${name}&emsp;${price}</td>`);
						}
					}
					
					if (i == fa.length - 1) {
						$("#menu_table tbody").append(`<tr class="trCategory"></tr>`);
					}
				}
			}
        },
        error: function() {
            alert('존재하지 않는 업소입니다');
        }
    });
}



let photoList_page = 1;
let photoList_deadend = 0;

function get_photoList() {
	let start = (photoList_page - 1) * 5 + 1;
	let end = photoList_page * 5;
		
	$.ajax({
		url: "/review/get/photoList",
		type: "post",
		data: {
			rv_r_name: r_name,
			rv_address: address,
			start: start,
			end: end
		},
		dataType: "json",
		success: function(data) {
			$("#reviewPhoto_list").empty();
			if (data.length > 1) {
				for (i = 0; i < data.length - 1; i++) {
					let src = data[i]["rv_photo"];
					$("#reviewPhoto_list").append(`
					<img src="${src}" class="">`);
				}
				
				let count = data[data.length - 1]["count"];
				photoList_deadend = Math.ceil(count / 5);
				
				if (photoList_page == photoList_deadend) 
					$("#photoList_forward").addClass("disabled");
				else if (photoList_page < photoList_deadend) 
					$("#photoList_forward").removeClass("disabled");
					
				
				if (photoList_page > 1 && photoList_page <= photoList_deadend) 
					$("#photoList_backward").removeClass("disabled");
				else if (photoList_page == 1) 
					$("#photoList_backward").addClass("disabled");
			}
			else {
				$("#reviewPhoto_list").append(`
				<p>등록된 리뷰 사진이 없습니다</p>`);
			}
		}
	})
}

function photo_modal() {
	let src = $(this).attr("src");
	$("#photomodal_img").attr("src", src);
	$("#photoModal_button").trigger("click");
}

function photoList_backward() {
	if (photoList_page - 1 > 0) {
		photoList_page--;
		get_photoList();
	}
}

function photoList_forward() {
	if (photoList_page + 1 <= photoList_deadend) {
		photoList_page++;
		get_photoList();
	}
}



let reviewList_page = 1;
let reviewList_deadend = 0;

function get_reviewList() {
	let start = (reviewList_page - 1) * 5 + 1;
	let end = reviewList_page * 5;
	$.ajax({
		url: "/review/get/reviewList",
		type: "post",
		data: {
			rv_r_name: r_name,
			rv_address: address,
			start: start,
			end: end
		},
		dataType: "json",
		success: function(data) {
			if (data != null && data.length > 1) {
				$("#review_list_block").empty();
				for (i = 0; i < data.length - 1; i++) {
					let d = data[i];
					let html = "";
					let ownerTag = "";
					if (d.rv_owner != undefined) ownerTag = `<img src="/img/detail/OwnerCommented.png">`;
					if (d.rv_photo == undefined) d.rv_photo = "/img/admin/No-Image.jpg";
					html = `
					<div style="margin: 0 0 10px 0;">
						<img src="${d.rv_photo}" class="photo_modal">
						<p class="review_modal">${d.rv_detail.substring(0,50)}&emsp;...</p>
						<p class="modal_id">${d.rv_id}</p>
						${ownerTag}
					</div>`;
					$("#review_list_block").append(html);
				}
				
				let count = data[data.length - 1].count;
				reviewList_deadend = Math.ceil(count / 5);
				reviewList_pagination();
			}
			else $("#review_list_block").append(`<p style="margin: 0 0 0 20px;">등록된 리뷰가 없습니다</p>`);
		}
	})
}

function reviewList_pagination() {
	$("#review_list_pagination").empty();
	
	let cp = reviewList_page; // current page
	let ep = reviewList_deadend; // end page
	let fp = 0; // first page
	let lp = 0; // last page
	
	if (cp % 5 == 0) fp = cp / 5; 
	else fp = (Math.floor(cp / 5) * 5 + 1);
	
	if (fp + 4 <= ep) lp = fp + 4;
	else lp = ep;
	
	let active = "";
	let disabled = "";
	
	if (cp == 1) disabled = "disabled";
	$("#review_list_pagination").append(`
	<li class="page-item ${disabled} reviewList_pageNum" pn=1><a class="page-link"><<</a></li>
	<li id="reviewList_backward" class="page-item ${disabled}"><a class="page-link"><</a></li>`);
	
	for (i = fp; i <= lp; i++) {
		if (i == cp) active = "active";
		else active = "";
		
		$("#review_list_pagination").append(`
		<li class="page-item ${active} reviewList_pageNum" pn=${i}><a class="page-link">${i}</a></li>`);
	}
	
	disabled = "";
	if (cp == ep) disabled = "disabled";
	$("#review_list_pagination").append(`
	<li id="reviewList_forward" class="page-item ${disabled}"><a class="page-link">></a></li>
	<li class="page-item ${disabled} reviewList_pageNum" pn=${ep}><a class="page-link">>></a></li>`);
}

function reviewList_pageNum() {
	let clicked = Number($(this).attr("pn"));
	if (reviewList_page == clicked) return false;
	else { 
		reviewList_page = Number($(this).attr("pn"));
		get_reviewList();
	}
}

function reviewList_backward() {
	if (reviewList_page - 1 > 0) {
		reviewList_page--;
		get_reviewList();
	}
}

function reviewList_forward() {
	if (reviewList_page + 1 <= reviewList_deadend) {
		reviewList_page++;
		get_reviewList();
	}
}



let originCeoReply = "";

function review_modal() {
	let rv_id = $(this).parent().find(".modal_id").text();
	$.ajax({
		url: "/review/get/modal",
		type: "post",
		data: {
			rv_r_name: r_name,
			rv_address: address,
			rv_id: rv_id
		},
		dataType: "json",
		success: function(data) {
			$("#review_modal_content").empty();
			let d = data[0];
			if (d.rv_photo == undefined) d.rv_photo = "/img/admin/No-Image.jpg";
			html = `
			<p id="rvm_id" writter="${rv_id}">작성자: ${rv_id}</p>
			<img src="${d.rv_photo}" class="rvm_image photo_modal">
			<textarea type="text" maxlength="300" class="rvm_textarea" readonly>${d.rv_detail}</textarea>`;
			
			let tags = d.tags.split(",");
			let emojiBuilder = "<p>";
			tags.forEach(function(tag) {
				let emoji = "";
				emoji = return_emoji(tag, emoji);
				emojiBuilder += emoji + " ";
			});
			emojiBuilder += "</p>";
			html += emojiBuilder;
			
			html += `
			<p>방문횟수: ${d.rv_visit}</p>
			<p>등록일자: ${d.rv_time}</p>`;
			
			if (d.rv_owner != undefined && d.rv_owner != "") {
				let readonly = "readonly";
				if (isOwner == 1) readonly = "";
				html += `
				<br><p>사장님의 답변</p>
				<textarea type="text" maxlength="300" id="rvm_ceoReply" class="rvm_textarea"
				placeholder="작성 후 창을 벗어나면 답변이 달립니다" ${readonly}>${d.rv_owner}</textarea>`;
				originCeoReply = d.rv_owner;
			}
			else {
				if (isOwner == 1)
				html += `
				<br><p>사장님의 답변</p>
				<textarea type="text" maxlength="300" id="rvm_ceoReply" class="rvm_textarea" 
				placeholder="작성 후 창을 벗어나면 답변이 달립니다"></textarea>`;
			}
			
			$("#review_modal_content").append(html);
			$("#reviewModal_button").trigger("click");
		}
	})
}



function update_ceoReply() {
	let changedCeoReply = $("#rvm_ceoReply").val();
	$.ajax({
		url: "/review/update/ceo",
		type: "post",
		data: {
			rv_r_name: r_name,
			rv_address: address,
			rv_id: $("#rvm_id").attr("writter"),
			rv_owner: changedCeoReply
		},
		dataType: "text",
		beforeSend: function() {
			if (isOwner != 1) return false;
			if (originCeoReply == changedCeoReply) return false;
		},
		success: function() {}
	})
}



function return_emoji(tag, emoji) {
	if (tag == "clean") emoji = "🧹 청결";
	else if (tag == "kind") emoji = "😊 친절";
	else if (tag == "parking") emoji = "🅿️ 주차";
	else if (tag == "fast") emoji = "🍳 빠름";
	else if (tag == "pack") emoji = "🥡 포장";
	else if (tag == "alone") emoji = "🙇‍♀ 혼밥";
	else if (tag == "together") emoji = "👥 단체";
	else if (tag == "focus") emoji = "🔥 집중";
	else if (tag == "talk") emoji = "💭 대화";
	else if (tag == "photoplace") emoji = "📷 사진";
	else if (tag == "delicious") emoji = "🍱 맛";
	else if (tag == "portion") emoji = "👌 알참";
	else if (tag == "cost") emoji = "💰 가성비";
	else if (tag == "lot") emoji = "🥣 양";
	else if (tag == "satisfy") emoji = "👍 만족";
	return emoji;
}


function tag_ranking(){	
	$.ajax({
		url: "/restaurant/detail/tag/top",
		type: "post",
		data: {
			r_name: r_name,
			address: address
		},
		dataType: "json",
		success:function(data) {
			if (data.length != 0) {
				let tagAry = [], countAry = [], total = 0;
				for (i = 0; i < data.length; i++) {
					if (data[i]["tag_count"] == 0) continue;
					countAry.push(data[i]["tag_count"]);
					total += data[i]["tag_count"];
					
					let tag = data[i]["tags"];
					let count = "(" + data[i]["tag_count"] + ")";
					let emoji = "";
					emoji = return_emoji(tag, emoji);
					tagAry.push(emoji);
				}
				
				if (countAry.length == 0) {
					$("#restaurant_tag").empty();
					$("#restaurant_tag").append(`
					<p style="margin: 0 0 0 20px;">리뷰를 등록해서 가게의 장점들을 나타내는 태그들의 순위를 매겨주세요</p>`);
					$("#restaurant_tag").css("min-height", "0px");		
					return false;
				}
																
				let percentAry = [];
				
				for (i = 0; i < countAry.length; i++) {
					let percent = Math.round((countAry[i] / total) * 100);
					percentAry.push(percent);
				}
				
				let dataPointsAry = [];
				for (i = countAry.length - 1; i >= 0; i--) {
					let dic = {};
					dic["y"] = countAry[i];
					dic["label"] = percentAry[i] + "%";
					dic["indexLabel"] = tagAry[i];
					dataPointsAry.push(dic)		
				}
												
				let options = {
					animationEnabled: true,
					title: {
						text: "태그 랭킹",                
						fontColor: "black",
						fontFamily: "'SUITE-Regular', sans-serif",
						fontWeight: "bold"
					},	
					axisY: {
						tickThickness: 0,
						lineThickness: 0,
						valueFormatString: " ",
						includeZero: true,
						gridThickness: 0                    
					},
					axisX: {
						tickThickness: 0,
						lineThickness: 0,
						labelFontSize: 18,
						labelFontColor: "#F08A5D"				
					},
					data: [{
						indexLabelFontSize: 26,
						toolTipContent: `<span style=\"color:#62C9C3\">{indexLabel}:</span>
						<span style=\"color:#CD853F\"><strong>{y}</strong></span>`,
						indexLabelPlacement: "inside",
						indexLabelFontColor: "white",
						indexLabelFontWeight: 600,
						indexLabelFontFamily: "SUITE-Regular",
						color: "#B83B5E",
						type: "bar",
						dataPoints: dataPointsAry
					}]
				};
					
				$("#graph_container").CanvasJSChart(options);
			}
		}
	})
}



function review_submit(){
	let formData = new FormData();
	
	let detail = $('#review_writeDetail').val();
	
	let review = {
		rv_r_name: r_name,
		rv_address: address,
		rv_detail: detail
	};
	formData.append("review", new Blob([JSON.stringify(review)], {type: "application/json"}));
	
	let checkboxValues = "";
	$('input[name="tags"]:checked').each(function(){
		checkboxValues += $(this).val() + ",";
	})
	formData.append('tags', checkboxValues);
	
	let photo = $('#review_imageUpload')[0].files;
	let photoSize = 0;
	
	if (origin_myPhoto != null || photo.length != 0)  {
		if (photo.length != 0) {
			formData.append('photo', photo[0]);
			photoSize = photo[0].size;
		}
		
		$.ajax({
			url: "/review/submit/photo",
			type: "post",
			processData: false,
	        contentType: false,
			data: formData,
	        dataType: "text",
			beforeSend: function() {
				if	(detail == '')	{
					alert("내용을 입력해주세요");
					return false;
				}
				else if (checkboxValues.length == 0) {
					alert("하나 이상의 태그를 선택해주세요");
					return false;
				}
				else if (photoSize > 5 * 1024 * 1024) {
					alert("첨부 파일 사이즈는 5MB 이내로 등록 가능합니다");
					return false;
				}
			},
			success: function(message) {
				if (message == "extension") {
					alert("지원하지 않는 이미지 파일입니다 이미지를 변경해주세요");
				}
				else {
					alert("리뷰가 등록되었습니다");
					window.location.reload();
				}
			},
		})
	}
	else {
		$.ajax({
			url: "/review/submit",
			type: "post",
			processData: false,
	        contentType: false,
			data: formData,
	        dataType: "text",
			beforeSend: function() {
				if	(detail =='')	{
					alert('내용을 입력하세요');
					return false;
				}
				else if (checkboxValues.length == 0) {
					alert('태그를 하나 이상 선택해주세요');
					return false;
				}
			},
			success: function(message) {
				if (message == "extension") {
					alert("지원하지 않는 이미지 파일입니다 이미지를 변경해주세요");
				}
				else {
					alert("리뷰가 등록되었습니다");
					window.location.reload();
				}
			},
		})
	}
}



function review_delete() {
	$.ajax({
		url: "/review/delete",
		type: "post",
		data: {
			rv_r_name: r_name,
			rv_address: address
		},
		dataType: "text",
		success: function(message) {
			alert("리뷰가 삭제되었습니다");
			window.location.reload();
		}
	})
}



let orginRDetail = "";

function detail_edit() {
	if ($(this).attr("id") == "detail_edit") {
		$(this).attr("src", oes);
		$(this).css("display", "none");
		$("#rPhone").val($("#rPhone").val().replace(/-/g, ""));
		$("#restaurant_detail").find(".owner_wrapper").append(`
		<img src=${ock} id="de_submit" class="owner_submit deimg">
		<img src=${ocl} id="de_cancel" class="owner_cancel deimg">`);
		$(".editable_detail").css("border", "solid");
		$(".editable_detail").attr("readonly", false);
		$("#rDetail").css("min-height", "40vh");
		$("#rPhone").on("propertychange change paste input focus", onlyTel);
		orginRDetail = $("#rDetail").val();
	}
	else {
		$("#rPhone").val(originPhone);
		$("label[for='rPhone']").html("");
		$("#detail_edit").attr("src", oe);
		$("#detail_edit").css("display", "block");
		$(".deimg").remove();
		$(".editable_detail").css("border", "none");
		$(".editable_detail").attr("readonly", true);
		$("#rDetail").css("min-height", "");
		$("#rPhone").off("propertychange change paste input focus");
		$("#rDetail").val(orginRDetail);
	}
}

function detail_submit() {
	let r_phone = $("#rPhone").val();
	let r_detail = $("#rDetail").val();
	$.ajax({
		url: "/restaurant/detail/update/info",
		type: "post",
		data: {
			r_name: r_name,
			address: address,
			r_phone: r_phone,
			r_detail: r_detail
		},
		dataType: "text",
		success: function(message) {
			alert("상세정보가 수정되었습니다");
			window.location.reload();
		}
	})
}

function onlyTel() {
	let tel = $(this).val().replace(/[^0-9]/g, "");
	$(this).val(tel);
	if ($(this).val().length == 10) {
		let ten = $(this).val();
		ten = ten.slice(0, 3) + "-" + ten.slice(3, 6) + "-" + ten.slice(6);
		$("label[for='rPhone']").html(ten);
	}
	else if ($(this).val().length == 11) {
		let ele = $(this).val();
		ele = ele.slice(0, 3) + "-" + ele.slice(3, 7) + "-" + ele.slice(7);
		$("label[for='rPhone']").html(ele);
	}
	else $("label[for='rPhone']").html("");
}



let menuEditFlag = 0;

function menu_edit() {
	if ($("#menu_table tbody tr:eq(0)").find("td:eq(1)").text() == "메뉴 정보가 없습니다")
		$("#menu_table tbody").empty();
	
	if ($(this).attr("id") == "menu_edit") {
		$(this).attr("src", oes);
		$(this).css("display", "none");
		$("#rmTitle").append(`
		<button id="ctAdd" class="btn btn-primary tableButton">카테고리 추가</button>`);
		$("#rmPre_wrapper").find(".owner_wrapper").append(`
		<span style="margin: 0 20px 0 0;">* 기존 메뉴의 수정, 삭제를 원하시면 해당 부분을 클릭해주세요<br>
		수정은 변경 후 엔터를 치시면 적용됩니다</span>
		<img src=${ock} id="me_submit" class="owner_submit">
		<img src=${ocl} id="me_cancel" class="owner_cancel">`);
		$("#menu_table").find(".tdAddCategory").append(`
		<button class='btn btn-primary meAdd tableButton'>메뉴 추가</button>`);
		menuEditFlag = 1;
		$(".tdCategory").one("click", edit_category);
		$(".tdMenu").one("click", edit_menu);
	}
	else window.location.reload();
	
}

function add_category() {
	$("#menu_table tbody").append(`
	<tr class="trCategory"><td class="tdIndent"></td>
	<td><input type="text" name="category" maxlength="20"></td>
	<td>
	<span style="margin: 0 0 0 20px"></span>
	<button class="btn btn-primary ctConfirm tableButton"
	style="margin: 0 20px 0 0">추가</button>
	<button class="btn btn-danger ctCancel tableButton">취소</button>
	</td></tr>`)
}

function confirm_category() {
	$("#ctAdd").one("click", add_category);
	let index = Number($(this).parent().parent().index());
	let category = $(`#menu_table tbody tr:eq(${index})`).find("input[name='category']").val();
	
	if (category == "") return false;
	
	$(`#menu_table tbody tr:eq(${index})`).empty();
	$("#menu_table tbody tr:last").append(`
	<td class="tdIndent"></td><td class="tdCategory">${category}</td>
	<td><button class='btn btn-primary meAdd tableButton'>메뉴 추가</button></td>`);
	$("#menu_table tbody").append("<tr class='trCategory'></tr>");
	
	$(".tdCategory").off("click");
	$(".tdCategory").on("click", edit_category);
}

function cancel_category() {
	$("#ctAdd").one("click", add_category);
	$(this).parent().parent().remove();
}

function add_menu() {
	let index = $(this).parent().parent().index();
	let target = $(`#menu_table tbody tr:eq(${index})`).nextAll("tr.trCategory").first();
	if (index == $("#menu_table tbody tr:last").index() - 1) {
		target = $(`#menu_table tbody tr:eq(${index + 1})`);
	}
	target.before(`<tr><td class="tdIndent"></td><td class="tdIndent"></td>
	<td>메뉴명: <input type="text" name="name" maxlength="20"></td><td>가격: <input type="number" name="price"></td>
	<td><button class="btn btn-success meConfirm tableButton">추가</td>
	<td><button class="btn btn-danger meCancel tableButton">취소</td>
	</tr>`);
}

function confirm_menu() {
	let tr = $(this).parent().parent();
	let name = tr.find("input[name='name']").val();
	let price = "￦ " + tr.find("input[name='price']").val().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	
	if (name == "" || price == "￦ ") return false;
	
	tr.empty();
	tr.append(`
	<td class="tdIndent"></td><td class="tdIndent"></td>
	<td class="tdMenu">${name}&emsp;${price}</td>`);
	
	$(".tdMenu").off("click");
	$(".tdMenu").on("click", edit_menu);
}

function cancel_menu() {
	$(this).parent().parent().remove();
}

function edit_category() {
	$(".tdCategory").off("click");
	let next = $(this).parent().find("td:eq(2)");
	let origin = $(this).text();
	$(this).empty();
	$(this).append(`
	<input type="text" id="categoryEditor" class="blockChar" 
	value="${origin}" placeholder="수정 후 엔터" maxlength="20">`);
	next.prepend(`
	<button id="categoryNuller" class="btn btn-danger tableButton" style="margin: 0 20px 0 0;">카테고리 삭제</button>`);
}

function edit_menu() {
	$(".tdMenu").off("click");
	let target = $(this).parent().find("td:eq(2)");
	let ary = target.text().replace(/,/gi, "").split("￦");
	let name = ary[0].trim(), price = ary[1].trim();
	target.empty();
	target.append(`
	<input type="text" id="menuNameEditor" class="blockChar" placeholder="수정 후 엔터" maxlength="20" value="${name}">
	<input type="number" id="menuPriceEditor" placeholder="수정 후 엔터" value="${price}">
	<button id="menuNuller" class="btn btn-danger tableButton" style="margin: 0 0 0 20px;">메뉴 삭제</button>`);
}

function delete_category() {
	let index = $(this).parent().parent().index();
	let targetDex = $(`#menu_table tbody tr:eq(${index})`).nextAll("tr.trCategory").first().index() - 1;
	if (index == $("#menu_table tbody tr:last").index() - 1)
		targetDex = index + 1;
	for (i = targetDex; i >= index; i--) $(`#menu_table tbody tr:eq(${i})`).remove();
	$(".tdCategory").one("click", edit_category);
			
	for (i = $("#menu_table tr:last").index(); i >= 0; i--) {
		if ($(`#menu_table tbody tr:eq(${i})`).html() == "" && i < $("menu_table tr:last").index())
			$(`#menu_table tbody tr:eq(${i})`).remove();
	}
}

function delete_menu() {
	$(this).parent().parent().remove();
	$(".tdMenu").on("click", edit_menu);
}

function menu_submit() {
	let submitString = "";
	let array = [], cluster = [], pushFlag = 0;
	for (i = 0; i <= $("#menu_table tbody tr:last").index(); i++) {
		let category = $(`#menu_table tbody tr:eq(${i})`).find("td.tdCategory").text();
		let menu = $(`#menu_table tbody tr:eq(${i})`).find("td.tdMenu").text();
		
		if (category != "") {
			category = category + "|||";
			if (pushFlag == 1) {
				array.push(cluster);
				cluster = [];
				cluster.push(category);
			}
			else {
				cluster.push(category);
				pushFlag = 1;
			}
		}
		
		if (menu != "") {
			let temp = menu.replace(/,/gi, "").split("￦");
			menu = temp[0].trim() + "|" + temp[1].trim() + "||";
			cluster.push(menu);
		}
		
		if (i == $("#menu_table tbody tr:last").index()) array.push(cluster);
	}
	
	for (i = 0; i < array.length; i++) {
		if (array[i].length == 1) continue;
		else {
			if (i != 0) submitString += "|";
			for (j = 0; j < array[i].length; j++) {
				submitString += array[i][j];
			}
		}
	}
	
	submitString = submitString.substring(0, submitString.length - 2);
	
	$.ajax({
		url: "/restaurant/detail/update/menu",
		type: "post",
		data: {
			r_name: r_name,
			address: address,
			menu: submitString
		},
		dataType: "text",
		beforeSend: function() {
			if (submitString == "") {
				alert("메뉴를 하나라도 추가해주세요");
				return false;
			}
		},
		success: function(message) {
			alert("메뉴가 업데이트 되었습니다");
			window.location.reload();
		}
	})
}