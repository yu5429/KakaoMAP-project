$(document)
.on("click", "#btnLogin", submit_login)
.on("click", "#signup", goto_signup)
.on("click", "#IdFind", goto_IdFind)
.on("click", "#PwFind", goto_PwFind)
.on("keyup", "#input_loginID, #input_loginPW", function(e) {
	if (e.keyCode == 13) {
		submit_login();
	}
	return false;
})


function submit_login(){
	id = $("#input_loginID").val();
	pw = $("#input_loginPW").val();
	
	$.ajax({
		url: "/submit/login",
		type: "post",
		data: {
			id: id,
			pw: pw
		},
		dataType: "text",
		beforeSend: function() {
			if (id == "" || id == null || pw == "" || pw == null) {
				alert("아이디와 비밀번호를 전부 입력해주세요")
				return false;
			}
		},
		success: function(check) {
			if (check == "true") {
				clear_login();
				// 나중에 환영 페이지 만들어지면 주소 수정할것
				document.location = "/main";
			}
			else if (check == "wrong") {
				alert("비밀번호가 틀렸습니다");
				$("#input_loginPW").val("");
			}
			else if (check == "none") {
				alert("존재하지 않는 ID 입니다");
				clear_login();
			}
		}
	})
}

function goto_signup(){
	document.location = "/signup"
}

function goto_IdFind(){
	document.location = "/find/id"
}

function goto_PwFind(){
	document.location = "/find/pw"
}

function clear_login() {
	$("#div_loginUpper").find("input").val("");
}