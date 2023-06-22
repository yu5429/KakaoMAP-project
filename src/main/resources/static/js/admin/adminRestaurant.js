$(document)
.ready(getList)
.on("click", "#appendTable", getList)
.on("click", ".fileView", fileView)
.on('click', ".btnSearch", searchCodeandAddress)
.on("click", ".btnOk", admin_insup_restaurant)
.on("click", ".btnCancel", admin_delete_restaurant)
.on("click", "#gotoMain", function() {
	document.location = "/main";
})

let rownum = 0, start = 1, end = 10;

function getList() {
    $.ajax({
        url: "/admin/restaurant/getList",
        type: "post",
        data: {
			start: start,
			end: end
		},
        dataType: "json",
        success: function (data) {
            if (data.length != 0) {
	            for (i = 0; i < data.length; i++) {
					let localURL = data[i]["adrt_localurl"];
					if (localURL == undefined) localURL = "/img/admin/No-image.jpg";
	                html = [];
	                html.push(
	                    "<tr><th scope='row'>", rownum + 1, "</th>",
	                    "<td>",data[i]["adrt_r_name"],"</td>",
	                    "<td>",data[i]["adrt_primecode"],"</td>",
	                    "<td>",data[i]["adrt_category"],"</td>",
	                    "<td><img src='",localURL,"' class='fileView'></td>",
	                    "<td>",data[i]["adrt_owner"],"</td>",
	                   	"<td>",
	                   	"<button class='btnSearch btn btn-secondary btn-sm'>조회</button>&nbsp;",
	                   	'<button class="btnOk btn btn-secondary btn-sm">승인</button>&nbsp;',
	                    '<button class="btnCancel btn btn-secondary btn-sm">거부</button></td>',
	                    "<td hidden>",data[i]["adrt_address"],"</td></tr>"
	                );
	                $("#tbl_adrtRestaurant").append(html.join(""));
	                rownum++;
	            }
	            start += 10; end += 10;
            }
        }
    })
}

function fileView() {
	const src = $(this).attr("src");
	const image_viewer = window.open("", '_blank');
	image_viewer.document.write(`
		<html><head></head>
		<body>
			<img src='${src}' style="width: 100%; height: 100%">
		</body></html>
	`);
}

function searchCodeandAddress() {
    let primecode = $(this).closest("tr").find('td:eq(1)').text(),
    query = encodeURI($(this).closest("tr").find("td:eq(6)").text());
	window.open(`https://moneypin.biz/bizno/?name=${primecode}`, "_blank");
	window.open(`/main/search/${query}`, '_blank');
}

function admin_insup_restaurant() {
    let r_name = $(this).closest("tr").find('td:eq(0)').text(),
    primecode = $(this).closest("tr").find('td:eq(1)').text(),
    address = $(this).closest("tr").find("td:eq(6)").text(),
    changeFlag = 0;

    $.ajax({
        url: "/admin/insup/restaurant",
        type: "post",
        data: { 
			r_name: r_name,
			primecode: primecode,
			address: address,
			changeFlag: changeFlag 
		},
        dataType: "text",
        success: function (check) {
			if (check == "insert") {
            	alert("해당 업체 신청은 승인되었습니다");
            	location.reload();
            }
            else if (check == "exist") {
				if (confirm("이미 해당 업체가 등록되어 있습니다\n요청하신 계정주로 업주를 변경하시겠습니까?")) {
					changeFlag = 1;
					 $.ajax({
				        url: "/admin/insup/restaurant",
				        type: "post",
				        data: { 
							r_name: r_name,
							primecode: primecode,
							address: address,
							changeFlag: changeFlag  
						},
				        dataType: "text",
				        success: function (check) {
							if (check == "update") {
								alert("요청하신 계정주로 해당 업체의 업주가 변경되었습니다");
								location.reload();
							}
							else alert("업주 변경 과정 실패");
						}
					})
				}
				else alert("승인 과정이 취소되었습니다");
			}
        }
    })
}

function admin_delete_restaurant() {
	let r_name = $(this).closest("tr").find('td:eq(0)').text(),
	address = $(this).closest("tr").find("td:eq(6)").text();
    $.ajax({
        url: "/admin/delete/restaurant",
        type: "post",
        data: { 
			r_name: r_name,
			address: address 
		},
        dataType: "text",
        success: function (check) {
			alert("해당 업체 신청은 반려되었습니다");
			location.reload();
        }
    })
}