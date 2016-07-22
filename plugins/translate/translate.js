(function() {
	var container = document.createElement("div"), 
		prevTxt = "";
	container.setAttribute("class", "container");
	
	document.body.appendChild(container);

	document.addEventListener("mouseup", function(e) {
		var selectionTxt = getSelectionTxt();

		if(!selectionTxt || selectionTxt == prevTxt) {
			container.style.display = "none"
			return;
		}

		container.style.top = e.clientY + 15;
		container.style.left = e.clientX + 8;
		container.style.display = "block";
		prevTxt = selectionTxt;
		
		getTranslate(selectionTxt, function(data) {
			console.log(data);
		});
	});

	function getSelectionTxt() {
		if(document.selection) {
			return document.selection.createRange().text.toString();
		}
		return document.getSelection().toString();
	}

	function getTranslate(selectionTxt, cb) {
		// $.getJSON("http://fanyi.youdao.com/openapi.do?keyfrom=translatev1&key=1840651191&callback=?",{
		// 		type: "data",
		// 		doctype: "jsonp",
		// 		version: "1.1",
		// 		only:"translate",
		// 		q:selectionTxt
		// 	})
		// .done(function(data) {
		// 	cb(data);
		// });
		
		var xhr = new XMLHttpRequest();
		
		xhr.open("GET", 
			"http://fanyi.youdao.com/openapi.do?keyfrom=translatev1&key=1840651191&type=data&doctype=jsonp&version=1.1&only=translate&callback=1&q=" + selectionTxt);

		xhr.setRequestHeader("Accept", "*");
		xhr.setRequestHeader("DataType", "json");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				var data = xhr.responseText;
				cb(data);
			}
		}; 
		xhr.send();
	}
})()