const r_name = decodeURIComponent(window.location.pathname.split('/')[3]);
const address = decodeURIComponent(window.location.pathname.split('/')[4]);

$(document)
.ready(review_authorize)

function review_authorize() {
	const url = `/restaurant/detail/${r_name}/${address}/authorize`;
	console.log(url);
	$.ajax({
		url: url,
		type: "post",
		dataType: "text",
		success: function(message) {
			console.log(message);
			if (message == "authorize") alert("방문 인증이 완료되었습니다");
			else if (message == "exist") alert("이미 방문 인증이 되어있습니다");
			else if (message == "owner") alert("사장님은 리뷰를 남길 수 없습니다");
			else if (message == "logout") alert("로그인을 먼저 해주세요");
			history.back();
		}
	})
}