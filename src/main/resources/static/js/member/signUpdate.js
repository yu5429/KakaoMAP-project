$(document)
.ready(get_signupInfo)
.on('click','#button_submitSignUpdate',update_signup)
.on('change','#input_phone',check_phone)
.on('click','#button_submitCancel',cancel_update)
.on('propertychange change paste input','#input_phone',check_phone)



let userPhone = "";

function get_signupInfo() {
	$.ajax({
		url: "/get/signupInfo",
		type: "post",
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {				
				$("#input_id").val(data[0]["id"]);
				$("#input_password").val(data[0]["pw"]);
				$("#input_name").val(data[0]["name"]);
				$("#input_phone").val(data[0]["phone"]);
				userPhone = data[0]["phone"];
				if (data[0]["gender"] == "남") $("#input_genderM").prop("checked", true);
				else $("#input_genderF").prop("checked", true);
				$("#input_birth").val(data[0]["birth"]);
				$("#error_inputPhone").css("color", "green");
				$("#error_inputPhone").text("사용 가능한 번호입니다.");
				$("#error_inputPhone").show();
			}
			else {
				alert("로그인이 필요한 페이지입니다");
				document.location = "/main";
			}
		}
	})
}

function update_signup() {
	id = $("#input_id").val();
	pw =$("#input_password").val();
	pwc = $("#input_passwordCheck").val();
	userName = $("#input_name").val();
	phone = $("#input_phone").val();
	gender = $("input[name='gender']:checked").val();
	birth = $("#input_birth").val();
	
	$.ajax({
		url: "/update/signup",
		type: "post",
		data: {
			id: id,
			pw: pw,
			name: userName,
			gender: gender,
			birth: birth,
			phone: phone
		},
		dataType: "text",
		beforeSend: function() {
			if (id == "" || pw == "" || pwc == "" || userName == "" ||
			phone == "" || birth == "") {
				alert("회원 정보 수정 내용 중 비어있는 것이 없는지 확인해주세요");
				return false;
			} 
			if (pw != pwc){
				alert("비밀번호가 일치하지 않습니다.");
				return false;
			}
			if ($("#error_inputPhone").css("color") != "rgb(0, 128, 0)") {
				return false;
			}
		},
		success: function(check) {
			alert("회원 정보가 수정되었습니다\n다시 로그인해주세요");
			clear_signup();
			do_logout();
		}
	})
}
function cancel_update() {
	document.location = "/main";
}

function check_phone() {
	phone = $(this).val().replace(/[^0-9]/g, "");
	$(this).val(phone);
	
	$.ajax({
		url: "/check/phone",
		type: "post",
		data: {
			phone: phone
		},
		dataType: "text",
		beforeSend: function() {
			if (phone == "") {
				$("#error_inputPhone").text("전화번호는 필수값입니다");
				$("#error_inputPhone").show();
				return false;
			}
			if (phone == userPhone) {
				return false;
			}
		},
		success: function(check) {
			if (check == "true") {
				$("#error_inputPhone").css("color", "green");
				$("#error_inputPhone").text("사용 가능한 번호입니다.");
				$("#error_inputPhone").show();
			}
			else {
				$("#error_inputPhone").css("color", "red");
				$("#error_inputPhone").text("이미 등록된 번호입니다.");
				$("#error_inputPhone").show();
			}
		}
	})
}
function clear_signup() {
	$("#content").find("input").val("");
	$("input[name=gender]").prop("checked", false);
}
function do_logout() {
	$.ajax({
		url: "/submit/logout",
		type: "post",
		dataType: "text",
		success: function(check) {
			document.location = "/login";
		}
	})
}