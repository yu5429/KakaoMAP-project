$(document)
.on("propertychange change paste input", "#input_id", check_duplicateID)
.on("propertychange change paste input", "#input_phone", check_phone)
.on("propertychange change paste input", "#input_passwordCheck", check_samePWC)
.on("click", "#button_submitSignup", submit_signup)


function check_duplicateID() {
	id = $("#input_id").val();
	$.ajax({
		url: "/check/duplicateID",
		type: "post",
		data: {
			id: id
		},
		dataType: "text",
		beforeSend: function() {
			validation = /^[A-Za-z0-9]{5,20}$/; 
			if(id == "" || id == null) {
				$("#error_inputID").css("color", "red");
				$("#error_inputID").text("아이디를 입력해주세요");
				return false;
			}
			
			if (validation.test(id) == false) {
				$("#error_inputID").css("color", "red");
				$("#error_inputID").text("ID는 5자 이상, 20자 이하 영문과 숫자만 가능합니다.");
				$("#error_inputID").show();
				return false;
			}
		},
		success: function(check) {
			if (check == "true") {
				$("#error_inputID").css("color", "green");
				$("#error_inputID").text("사용 가능한 ID입니다.");
				$("#error_inputID").show();
			}
			else {
				$("#error_inputID").css("color", "red");
				$("#error_inputID").text("이미 사용중인 ID입니다.");
				$("#error_inputID").show();
			}
		}
	})
}

function check_phone() {
	
	let phone = $(this).val().replace(/[^0-9]/g, "");
	$(this).val(phone);
	if ($(this).val().length == 10) {
		let ten = $(this).val();
		ten = ten.slice(0, 3) + "-" + ten.slice(3, 6) + "-" + ten.slice(6);
		$("label[for='input_phone']").html(ten);
	}
	else if ($(this).val().length == 11) {
		let ele = $(this).val();
		ele = ele.slice(0, 3) + "-" + ele.slice(3, 7) + "-" + ele.slice(7);
		$("label[for='input_phone']").html(ele);
	}
	else $("label[for='input_phone']").html("");
	
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

function submit_signup() {
	id = $("#input_id").val();
	pw =$("#input_password").val();
	userName = $("#input_name").val();
	phone = $("#input_phone").val();
	gender = $("input[name=gender]:checked").val();
	birth = $("#input_birth").val();
	
	$.ajax({
		url: "/submit/signup",
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
			if (userName == "" || userName == null) {
				alert("이름을 입력해주세요.");
				return false;
			}
			if (phone == "" || phone == null) {
				alert("전화번호를 입력해주세요.");
				return false;
			}
			if (birth == "" || birth == null) {
				alert("생년월일을 입력해주세요.");
				return false;
			}
			
			if (pw != $("#input_passwordCheck").val()){
				alert("비밀번호가 일치하지 않습니다.");
				return false;
			}
			if ($("#error_inputPhone").css("color") != "rgb(0, 128, 0)"){
				alert("이미 등록된 번호입니다.");
				return false;
			}
			
		},
		success: function(check) {
			alert("회원가입이 완료되었습니다");
			clear_signup();
			document.location = "/login"; 
		}
	})
}

function check_samePWC() {
	pw = $("#input_password").val();
	pwc = $("#input_passwordCheck").val();
	
	if (pw == pwc) {
		$("#error_passwordCheck").css("color", "green");
		$("#error_passwordCheck").text("비밀번호가 일치합니다.");
		$("#error_passwordCheck").show();
	}
	else {
		$("#error_passwordCheck").css("color", "red");
		$("#error_passwordCheck").text("비밀번호가 일치하지 않음");
		$("#error_passwordCheck").show();
	}
}
function clear_signup() {
	$("#content").find("input").val("");
}