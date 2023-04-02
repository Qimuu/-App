function ripple() {
	var btn = document.querySelector(".btn");
	var ripple = document.querySelector(".ripple");
	btn.onclick=function(event) {
		this.children[0].classList.add("animated");
		var size;
		size = Math.max(this.offsetWidth,this.offsetHeight);
		ripple.style.width = size + "px";
		ripple.style.height = size + "px";
		ripple.style.top = -(this.offsetHeight-event.offsetY) + "px";
		ripple.style.left = -(this.offsetWidth/2-event.offsetX) + "px";
		setTimeout(function(){
			btn.children[0].classList.remove("animated");
		},800)
}
}
