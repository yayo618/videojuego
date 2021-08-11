function draw(){
    if (x>scrolling+125) {worldX-=xspeed;scrolling+=xspeed;}
    else if (x<scrolling) {worldX-=xspeed;scrolling+=xspeed;}
    else {worldX+=0;}
    ctx.imageSmoothingEnabled = false;
    //braw border
    for (let i = 0; i < borders.length; i++) {
	borders[i].draw();
    }
    
    if (det) {
	xspeed *= friction;
	yspeed *= friction;
	if (dee) {
	    if (saltando) {
	        ctx.drawImage(img, w*5, 0, w, h, x+worldX, y, w, h);
	    } else {
		ctx.drawImage(img, 0, 0, w, h, x+worldX, y, w, h);
	    }
	    //ctx.drawImage(img, 0, 0, w, h, x, y, w, h);
	}
	if (izz) {
	    ctx.scale(-1,1);
	    if (saltando) {
                ctx.drawImage(img, w*5, 0, w, h, -x-16-worldX, y, w, h);
	    } else {
		ctx.drawImage(img, 0, 0, w, h, -x-16-worldX, y, w, h);
	    }
	    //ctx.drawImage(img, 0, 0, w, h, -x-16, y, w, h);
	    ctx.scale(-1,1);
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
	ctx.drawImage(img, w*f, 0, w, h, x+worldX, y, w, h);
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
	ctx.scale(-1,1);
	ctx.drawImage(img, w*f, 0, w, h, -x-16-worldX, y, w, h);
	ctx.scale(-1,1);
	xspeed -= 0.2;
	izz = true;
	dee = false;
    }
  
    yspeed+=2;//habia q ponerlo arriba

    if (jump) {
	saltando = true;
	yspeed=-2.5;
    }
    
    if (xspeed>maxspeed) {xspeed=maxspeed;}
    else if (xspeed<-maxspeed) {xspeed=-maxspeed}
    if (yspeed>maxspeedy) {yspeed=maxspeedy;}
    else if (yspeed<-maxspeedy) {yspeed=-maxspeedy}    
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
	    
	    saltando= false;
	}
    }
    //show coll
    ctx.font = "11px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("scrolling: "+scrolling, 20, 20);

    x += xspeed;
    y += yspeed;
}
