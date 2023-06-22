$(document)
.on("click","#btnNoMember",gotoNoMember)
.on("click","#btnLogin",gotoLogin)
.on("click","#btnSignup",gotoSignup)

function gotoNoMember(){
	document.location = "/main"
}

function gotoLogin(){
	document.location = "/login"
}

function gotoSignup(){
	document.location = "/signup"
}