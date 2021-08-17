var borders = [];
var img_piso = new Image();
img_piso.src = "img/tile-piso.png";
var img_pipe0 = new Image();
img_pipe0.src = "img/pipe1.png";
var img_pipe1 = new Image();
img_pipe1.src = "img/pipe2.png";

for (let i = 0; i < 18; i++) {
    borders.push(new Border(0+16*i, 208, 16, 16, 1));
}
for (let i = 0; i < 18; i++) {
    borders.push(new Border(0+16*i, 224, 16, 16, 1));
}
borders.push(new Border(160, 144, 32, 16, 2));
for (let i = 0; i < 3; i++) {
    borders.push(new Border(160, 192-16*i, 32, 16, 3));
}
borders.push(new Border(224, 144, 16, 16, 1));
borders.push(new Border(288, 192, 16, 16, 1));
//enemy
var img_goomba = new Image();
img_goomba.src = "img/goomba.png";
var enemies = [];
enemies.push(new Enemy(230, 100, 16, 16, 1));
enemies.push(new Enemy(100, 100, 16, 16, 2));

//FUNCTION
function Border (x, y, width, height, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;

    this.draw = function () {
	if (this.type === 1) {
	    ctx.drawImage(img_piso, this.x+worldX, this.y, this.width, this.height);	
	}
	else if (this.type === 2) {
	    ctx.drawImage(img_pipe0, this.x+worldX, this.y, this.width, this.height);	
	}
	else if (this.type === 3) {
	    ctx.drawImage(img_pipe1, this.x+worldX, this.y, this.width, this.height);	
	}
    }
}

//ENEMY
function Enemy (x, y, w, h, type) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;

    this.xspeed = 0;
    this.yspeed = 0;
    this.change = false;
    this.vel = 0.5;
    this.c = 0;
    this.f = 0;
    this.aplasta = false;
    
    this.draw = function () {
	this.c++;
	if (!this.aplasta){
	    if (this.c > 12) {this.f++; this.c = 0;}
	    if (this.f > 1) {this.f =0;}
	    if (this.type === 1) {
		if (this.change) {this.xspeed = this.vel;}
		else {this.xspeed = -this.vel;}
		this.yspeed = 2;
	    }
	    if (this.type === 2) {
		if (this.change) {this.xspeed = -this.vel;}
		else {this.xspeed = this.vel;}
		this.yspeed = 2;
	    }	
	} else {this.f = 2; this.x = 0; this.y = 0;}
	ctx.drawImage(
	    img_goomba, this.f*16, 0, 16, 16,
	    this.x+worldX, this.y, this.w, this.h
	);

	//HORIZONTAL COLLISION RECT
	let horizontalRect = {
	    x: this.x + this.xspeed,
	    y: this.y,
	    width: this.w,
	    height: this.h
	}
	//VERTICAL COLLISION RECT	    
	let verticalRect = {
	    x: this.x,
	    y: this.y + this.yspeed,
	    width: this.w,
	    height: this.h
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
		    if (this.xspeed<0) {horizontalRect.x+=0.1;}
		    else {horizontalRect.x+=-0.1;}
		}
		this.x = horizontalRect.x;
		this.xspeed = 0;
		//REBOTA
		if (this.change) {this.change = false;}
		else {this.change=true;}
	    }
	    if (checkIn(verticalRect, borderRect)) {
		while (checkIn(verticalRect, borderRect)) {
		    if (this.yspeed<0) {verticalRect.y+=0.1;}
		    else {verticalRect.y+=-0.1;}
		}
		this.y = verticalRect.y;
		this.yspeed = 0;
	    }
	}

	this.x += this.xspeed;
	this.y += this.yspeed;
    }
}

//COLLISION
function checkIn (r1, r2) {
    if (r1.x >= r2.x + r2.width) {return false;}
    else if (r1.x + r1.width <= r2.x) {return false;}
    else if (r1.y >= r2.y + r2.height) {return false;}
    else if (r1.y + r1.height <= r2.y) {return false;}
    else {return true;}
}


