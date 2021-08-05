var movIz, movDe;
var izz = false;
var dee = true;
var det= true;
var jump = false;
var w = 16;
var h = 16;
let f = 1;
let c = 0;
var x = 20;
var y = 20;

var cnv = document.getElementById("my-canv");
var ctx = cnv.getContext("2d");
var img = new Image();

var friction = 0.2;
var xspeed = 0;
var yspeed = 0;
var maxspeed = 2;

img.src = "marioAll.png";

function draw(){
    ctx.imageSmoothingEnabled = false;
    //braw border
    for (let i = 0; i < borders.length; i++) {
	borders[i].draw();
    }
    
    if (det) {
	xspeed *= friction;
	yspeed *= friction;
	
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
	//x++;
	xspeed ++;
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
	//x--;
	xspeed --;
	c++;
	if (c > 4) { f++; c = 0; }
	if (f > 3) { f = 1; }
	izz = true;
	dee = false;
    }
  
	yspeed++;//habia q ponerlo arriba
    
    if (jump) {
	yspeed=-1.5;
    }
    
    if (xspeed>maxspeed) {xspeed=maxspeed;}
    else if (xspeed<-maxspeed) {xspeed=-maxspeed}
    if (yspeed>maxspeed) {yspeed=maxspeed;}
    else if (yspeed<-maxspeed) {yspeed=-maxspeed}    
/*
    	  if (xspeed > 0) {xspeed = Math.floor(xspeed);}
	  else {xspeed = Math.ceil(xspeed);}
	  if (yspeed > 0) {yspeed = Math.floor(yspeed);}
	  else {xspeed = Math.ceil(yspeed);}

    if (xspeed < 0) {xspeed = Math.ceil(xspeed);}
    else {xspeed = Math.floor(xspeed);}
    if (yspeed < 0) {yspeed = Math.ceil(yspeed);}
    else {xspeed = Math.floor(yspeed);}
*/
    //HORIZONTAL COLLISION RECT
    let horizontalRect = {
	x: x + xspeed,
	y: y,
	width: w,
	height: h
    }
    //VERTICAL COLLISION RECT	    
    let verticalRect = {
	x: x,
	y: y + yspeed,
	width: w,
	height: h
    }
    
    //CHECK INTERSECTION
    for (let i = 0; i< borders.length; i++) {
	let borderRect = {
	    x: borders[i].x,
	    y: borders[i].y,
	    width: borders[i].width,
	    height: borders[i].height
	}
	
	if (checkIn(horizontalRect, borderRect)) {
	    while (checkIn(horizontalRect, borderRect)) {
		//horizontalRect.x -= Math.sign(xspeed);
		if (xspeed<0) {horizontalRect.x-=-1;}
		else {horizontalRect.x-=1;}
	    }
	    x = horizontalRect.x;
	    xspeed = 0;
	}
	if (checkIn(verticalRect, borderRect)) {
	    while (checkIn(verticalRect, borderRect)) {
		//verticalRect.y -= Math.sign(yspeed);
		if (yspeed<0) {verticalRect.y+=1;}
		else {verticalRect.y+=-1;}
	    }
	    y = verticalRect.y;
	    yspeed = 0;
	}
    }
    

    x += xspeed;
    y += yspeed;
}
function animation() {
    ctx.fillStyle = "skyblue";
//   ctx.fillRect(0, 0, cnv.width, cnv.height);
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
var btnJump = document.getElementById("jump");
btnJump.addEventListener("touchstart", function (e) {jump=true;}, false);
btnJump.addEventListener("touchend", function (e) {jump=false;}, false);
