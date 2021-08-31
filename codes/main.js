var cnv = document.getElementById("my-canv");
var ctx = cnv.getContext("2d");

var elem = document.documentElement;
if (window.innerWidth > window.innerHeight) {
	fullscreenOpen();
//	screen.orientation.lock('landscape');
} else {alert("portrait");}
function fullscreenOpen () {
//    cnv.height = 256;
    //    cnv.width = 240;
//    cnv.width = 512;
//    cnv.height = 240;
    
    if (elem.requestFullscreen) {
	elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
	elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
	elem.msRequestFullscreen();
    }
}

function animation() {
    ctx.fillStyle = "rgb(147,187,236)";
    ctx.clearRect(0, 0, cnv.width, cnv.height);    
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    draw();
    requestAnimationFrame(animation);
}
animation();


//eventos botones
/*var btnIz = document.getElementById("iz");
var btnDe = document.getElementById("de");
btnIz.addEventListener("touchstart", function(e) {movIz=true;det=false;},false);
btnIz.addEventListener("touchend", function (e) {movIz=false;det=true;}, false);
btnDe.addEventListener("touchstart", function(e) {movDe=true;det=false;}, false);
btnDe.addEventListener("touchend", function (e) {movDe=false;det=true;}, false);*/
var btnJump = document.getElementById("jump");
btnJump.addEventListener("touchstart", function (e) {jump=true;}, false);
btnJump.addEventListener("touchend", function (e) {jump=false;}, false);


