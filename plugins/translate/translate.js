(function() {
	function translate () {}

	HTMLElement.prototype.appendHTML = function(html) {
		var div = document.createElement("div"),
			fragment = document.createDocumentFragment(), nodes;

		div.innerHTML = html;
		nodes = div.childNodes;
		for (var i = 0, l = nodes.length; i < l; i += 1) {
			fragment.appendChild(nodes[i]);
		};
		this.appendChild(fragment);

		nodes = null;
		fragment = null;
	}

	translate.prototype = {
		prevTxt: "",
		generateTransContanier: function() {
			var container = "<div class='translate-yd'>" + 
							"<div class='translate-container'><div class='translate-content'><span class='translate-text'></span><span class='translation'></span></div>" +
							"<div class='tip'><em></em><ins></ins></div></div></div>";

			document.body.appendHTML(container);
		},
		getSelectionTxt : function() {
			if(document.selection) {
				return document.selection.createRange().text.toString();
			}
			return document.getSelection().toString();
			
		},
		getTranslate: function(selectionTxt, cb) {
			var script = document.createElement("script");
			script.src = encodeURI("http://fanyi.youdao.com/openapi.do?keyfrom=translatev1&key=1840651191&type=data&doctype=jsonp&version=1.1&only=translate&q=" + selectionTxt +"&callback=(" + cb + ")");
			script.id = "translate-yd";
			document.head.appendChild(script);
		},
		initEvent: function(container) {
			var that = this;

			container.addEventListener("mouseup", function(e) {
				var selectionTxt = that.getSelectionTxt(),
					transContainer = document.querySelector(".translate-container"),
					sh = window.pageOffset || document.documentElement.scrollTop || document.body.scrollTop;

				if(!selectionTxt || (selectionTxt && that.prevTxt == selectionTxt) ) {
					return that.hideTranslate();
				}
				
				that.prevTxt = selectionTxt;
				transContainer.style.top = e.clientY + 20 + sh + "px";
				transContainer.style.left = e.clientX + 10 + "px";

				that.getTranslate(selectionTxt, that.showTranslate);
			});
		},
		hideTranslate: function() {
			var that = this,
				ts = document.querySelector("#translate-yd"),
				transEle = document.querySelector(".translate-content"),
				transContainer = document.querySelector(".translate-container");

			if(!ts) return;

			that.prevTxt = "";
			transContainer.style.display = "none";
			transEle.textContent = "";
			document.head.removeChild(ts);
		},
		showTranslate: function(data) {
			if(!data) return;
			var translation = data.translation,
				transEle = document.querySelector(".translation"),
				transContainer = document.querySelector(".translate-container");

			transEle.textContent = translation;
			transContainer.style.display = "block";
		}
	}

	var trans = new translate();
	trans.generateTransContanier();
	trans.initEvent(document.body);
})(window)