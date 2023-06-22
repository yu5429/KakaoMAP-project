$(document)
.on("click","#button_findID",findID);

function findID(){
	findN = $("#inputFindName").val();
	findP = $("#inputFindPhone").val();
	
	$.ajax({
		url: "/search/id",
		type: "post",
		data:{name:findN, phone:findP},
		dataType:"text",
		beforeSend: function(){
			if(findN==""||findN==null){
				$("#SearchIDMessage").css("color","red");
				$("#SearchIDMessage").text("이름을 입력해주세요");
				return false;
			}else if(findP==""||findP==null){
				$("#SearchIDMessage").css("color","red");
				$("#SearchIDMessage").text("전화번호를 입력해주세요");
				return false;
			}else if(findP.length<11){
				alert("전화번호를 올바르게 입력해주세요!");
				return false;
			}
		},
		success: function(result){
			if(result!=""){
				alert('찾으시는 아이디는 "'+result+'" 입니다.\n 확인하시면 로그인 페이지로 돌아갑니다.');
				clear_searchID();
				document.location = "/login"
			}
			else{
				$("#SearchIDMessage").css("color","black");
				$("#SearchIDMessage").text("회원정보와 일치하는 ID가 없습니다.\n이름과 전화번호를 다시 확인해주세요.");
			}
		},
	})
}

function clear_searchID(){
	$("#inputFindName").val("");
	$("#inputFindPhone").val("");
}