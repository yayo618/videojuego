var movIz, movDe;
var izz = false;
var dee = true;
var det= true;
var w = 16;
var h = 16;
let f = 1;
let c = 0;
var x = 20;
var y = 20;

var cnv = document.getElementById("my-canv");
var ctx = cnv.getContext("2d");
var img = new Image();

img.src = "marioAll.png";

function draw(){
    ctx.imageSmoothingEnabled = false;		  
    if (det) {
	if (dee) {
	    ctx.drawImage(img, 0, 0, w, h, x, y, w, h);
	}
	if (izz) {
	    ctx.scale(-1,1);
	    ctx.drawImage(img, 0, 0, w, h, -x-16, y, w, h);
	    ctx.scale(-1,1);
	}
    }
    if (movDe){
	ctx.drawImage(img, w*f, 0, w, h, x, y, w, h);
	x++;
	c++;
	if (c > 4) { f++; c = 0; }
	if (f > 3) { f = 1; }
	izz = false;
	dee = true;
    }
    if (movIz){
	ctx.scale(-1,1);
	ctx.drawImage(img, w*f, 0, w, h, -x-16, y, w, h);
	ctx.scale(-1,1);
	x--;
	c++;
	if (c > 4) { f++; c = 0; }
	if (f > 3) { f = 1; }
	izz = true;
	dee = false;
    } 
}
function animation() {
    ctx.fillStyle = "skyblue";
//    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    draw();
    requestAnimationFrame(animation);
}
animation();
//eventos botones
var btnIz = document.getElementById("iz");
var btnDe = document.getElementById("de");
btnIz.addEventListener("touchstart", function(e) {movIz=true;det=false;},false);
btnIz.addEventListener("touchend", function (e) {movIz=false;det=true;}, false);
btnDe.addEventListener("touchstart", function(e) {movDe=true;det=false;}, false);
btnDe.addEventListener("touchend", function (e) {movDe=false;det=true;}, false);
