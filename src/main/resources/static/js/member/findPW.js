$(document)
.on('click','#buttonFindPw',findPW)

function findPW(){
	findI = $('#inputFindId').val();
	findN = $("#inputFindName").val();
	findP = $("#inputFindPhone").val();
	
	$.ajax({
		url:"/search/pw",
		type:"post",
		data:{
			id:findI,
			name:findN,
			phone:findP
		},
		dataType:"text",
		beforeSend: function(){
			if(findI==""||findI==null){
				$("#SearchPwMessage").css("color","red");
				$("#SearchPwMessage").text("아이디를 입력해주세요");
				return false;
			}else if(findN==""||findN==null){
				$("#SearchPwMessage").css("color","red");
				$("#SearchPwMessage").text("이름을 입력해주세요");
				return false;
			}else if(findP==""||findP==null){
				$("#SearchPwMessage").css("color","red");
				$("#SearchPwMessage").text("전화번호를 입력해주세요");
				return false;
			}else if(findP.length<11){
				alert("전화번호를 올바르게 입력해주세요!");
				return false;
			}
		},
		success:function(result){
			if(result == "true"){
				alert("임시 비밀번호가 해당 전화번호에 문자로 발송되었습니다\n로그인 후 비밀번호를 변경하세요!");
				clear_searchPW();
				document.location = "/login"
			}
			else {
				$("#SearchPwMessage").css("color","black");
				$("#SearchPwMessage")
				.text("회원정보와 일치하는 ID가 없습니다.\n아이디나 이름, 전화번호를 다시 확인해주세요.");
			}
		}
		
	})
}

function clear_searchPW() {
	$('#inputFindId').val();
	$("#inputFindName").val();
	$("#inputFindPhone").val();
}