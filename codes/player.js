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
//counts jumps
let cc = 0;

var friction = 0.2;
var xspeed = 0;
var yspeed = 0;
var maxspeed = 1;
var maxspeedy = 2;
var img = new Image();

var saltando = false;
var cae, caee, ff;
ff=0;

var scrolling = 50;
img.src = "img/marioAll.png";

function draw(){
    //screen
    if (x>scrolling+125) {worldX-=xspeed;scrolling+=xspeed;}
    else if (x<scrolling) {worldX-=xspeed;scrolling+=xspeed;}
    else {worldX+=0;}
    ctx.imageSmoothingEnabled = false;
    
    //draw border
    for (let i = 0; i < borders.length; i++) {
	borders[i].draw();
    }
    //draw enemies
    for (let i = 0; i < enemies.length; i++) {
	enemies[i].draw();
    }
    //enemies[0].draw();
//    ctx.drawImage(img_goomba,0,0,16,16, this.x+worldX, this.y-16, this.w, this.h);
    //moves
    if (det) {
	xspeed *= friction;
	yspeed *= friction;
	if (saltando) {f = 5;} 
	else if (caee) {f = ff;}
	else {f = 0;}
    }
    if (movDe){
	if (saltando) {f = 5;} 
	else if (caee) {f = ff;}
	else {
	    c++;
	    if (c > 4) { f++; c = 0; }
	    if (f > 3) { f = 1; }
	    ff = f;
	}
	xspeed += 0.2;
	izz = false;
	dee = true;
    }
    if (movIz){
	if (saltando) {f = 5;} 
	else if (caee) {f = ff;}
	else {
	    c++;
	    if (c > 4) { f++; c = 0; }
	    if (f > 3) { f = 1; }
	    ff = f;
	} 
	xspeed -= 0.2;
	izz = true;
	dee = false;
    }	
    if (dee) {
        ctx.drawImage(img, w*f, 0, w, h, x+worldX-2, y, w, h);
    }
    if (izz) {
        ctx.scale(-1,1);
        ctx.drawImage(img, w*f, 0, w, h, -x-16-worldX+2, y, w, h);
	ctx.scale(-1,1);
    }
 
    yspeed+=2;//habia q ponerlo arriba

    if (jump) {
	yspeed=-2;
	if (!caee) {saltando = true;}
	cc++;
	if (cc>40 || caee) {yspeed=+2;}
    }
    if (!jump) {
	if (cae) {caee = true;}
    }
    cae = true;
    
    if (xspeed>maxspeed) {xspeed=maxspeed;}
    else if (xspeed<-maxspeed) {xspeed=-maxspeed}
    if (yspeed>maxspeedy) {yspeed=maxspeedy;}
    else if (yspeed<-maxspeedy) {yspeed=-maxspeedy}    

    //HORIZONTAL COLLISION RECT
    let horizontalRect = {
	x: x + xspeed,
	y: y,
	width: w-4,
	height: h
    }
    //VERTICAL COLLISION RECT	    
    let verticalRect = {
	x: x,
	y: y + yspeed,
	width: w-4,
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
	//check = checkIn(horizontalRect, borderRect);
	if (checkIn(horizontalRect, borderRect)) {
	    while (checkIn(horizontalRect, borderRect)) {
		//horizontalRect.x -= Math.sign(xspeed);
		if (xspeed<0) {horizontalRect.x-=-0.1;}
		else {horizontalRect.x-=0.1;}
	    }
	    x = horizontalRect.x;
	    xspeed = 0;
	}
	if (checkIn(verticalRect, borderRect)) {
	    while (checkIn(verticalRect, borderRect)) {
		//verticalRect.y -= Math.sign(yspeed);
		if (yspeed<0) {verticalRect.y+=0.1;}
		else {verticalRect.y+=-0.1;}
	    }
	    y = verticalRect.y;
	    yspeed = 0;
	    //limit jump
	    saltando = false;
	    cc = 0;
	    jump = false;
	    cae = false;
  	    caee = false;
	}
    }
    //show changes
    ctx.font = "11px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("caendoo: "+caee, 20, 20);

    x += xspeed;
    y += yspeed;
}
