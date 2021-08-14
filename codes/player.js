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
var cj = 0;
var cjj = 0;
let cc = 0;

var friction = 0.2;
var xspeed = 0;
var yspeed = 0;
var maxspeed = 1;
var maxspeedy = 2;
var img = new Image();

var saltando = false;
var check = 0;
var col1 = 0;
var cae, caee;

var scrolling = 25;
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
    //moves
    if (det) {
	xspeed *= friction;
	yspeed *= friction;
	if (saltando) {
	    f = 5;
	} else {
	    f = 0;
	}
    }
    if (movDe){
	if (saltando) {
	    f = 5;
	} else {
	    c++;
	    if (c > 4) { f++; c = 0; }
	    if (f > 3) { f = 1; }
	}
	xspeed += 0.2;
	izz = false;
	dee = true;
    }
    if (movIz){
	if (saltando) {
	    f = 5;
	} else {
	    c++;
	    if (c > 4) { f++; c = 0; }
	    if (f > 3) { f = 1; }
	} 
	xspeed -= 0.2;
	izz = true;
	dee = false;
    }	
    if (dee) {
        ctx.drawImage(img, w*f, 0, w, h, x+worldX, y, w, h);
    }
    if (izz) {
        ctx.scale(-1,1);
        ctx.drawImage(img, w*f, 0, w, h, -x-16-worldX, y, w, h);
	ctx.scale(-1,1);
    }
 
    yspeed+=2;//habia q ponerlo arriba

    if (jump) {
	cj++;
	if (cj===1) {cjj++;}
	if (cjj===1) {yspeed=-2;}
	saltando = true;
	cc++;
	if (cc>45 || caee) {yspeed=+2;}
    }
    if (!jump) {
	cjj=0;
	if (cae) {caee = true;}
    }
	//caendo
    if (check > 0) {cae = true;}
    
    if (xspeed>maxspeed) {xspeed=maxspeed;}
    else if (xspeed<-maxspeed) {xspeed=-maxspeed}
    if (yspeed>maxspeedy) {yspeed=maxspeedy;}
    else if (yspeed<-maxspeedy) {yspeed=-maxspeedy}    

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
	//check = checkIn(horizontalRect, borderRect);
	if (checkIn(horizontalRect, borderRect)) {
	    while (checkIn(horizontalRect, borderRect)) {
		//horizontalRect.x -= Math.sign(xspeed);
		if (xspeed<0) {horizontalRect.x-=-0.1;}
		else {horizontalRect.x-=0.1;}
	    }
	    x = horizontalRect.x;
	    xspeed = 0;
		//check++;
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
	    cj = 0;
		check=2;
	cae = false;
	caee = false;
	}
    }
//var col2 = check -col1;
col1 = check;
   // function colision () {
    //}
    //show coll
    ctx.font = "11px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("caee: "+caee, 20, 20);

    x += xspeed;
    y += yspeed;
}
