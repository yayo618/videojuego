var movIz, movDe;
var izz = false;
var dee = true;
var det= true;
var jump = false;
var w = 16;
var h = 16;
let f = 1;
let c = 0;
var x = 100;
var y = 20;

var cnv = document.getElementById("my-canv");
var ctx = cnv.getContext("2d");
var img = new Image();

var friction = 0.2;
var xspeed = 0;
var yspeed = 0;
var maxspeed = 1;
var maxspeedy = 2;

//var checker = false;
var saltando = false;

var scrolling = 25;
img.src = "img/marioAll.png";


function animation() {
    ctx.fillStyle = "rgb(147,187,236)";
    ctx.clearRect(0, 0, cnv.width, cnv.height);    
    ctx.fillRect(0, 0, cnv.width, cnv.height);
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
var btnJump = document.getElementById("jump");
btnJump.addEventListener("touchstart", function (e) {jump=true;}, false);
btnJump.addEventListener("touchend", function (e) {jump=false;}, false);
