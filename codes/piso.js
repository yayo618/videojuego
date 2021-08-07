var borders = [];
var img_piso = new Image();
img_piso.src = "img/tile-piso.png";
var img_pipe0 = new Image();
img_pipe0.src = "img/pipe1.png";
var img_pipe1 = new Image();
img_pipe1.src = "img/pipe2.png";

for (let i = 0; i < 12; i++) {
    borders.push(new Border(0+16*i, 208, 16, 16, 1));
}
for (let i = 0; i < 12; i++) {
    borders.push(new Border(0+16*i, 224, 16, 16, 1));
}
borders.push(new Border(160, 144, 32, 16, 2));
for (let i = 0; i < 3; i++) {
    borders.push(new Border(160, 192-16*i, 32, 16, 3));
}

//FUNCTION
function Border (x, y, width, height, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;

    this.draw = function () {
	if (this.type === 1) {
	    ctx.drawImage(img_piso, this.x, this.y, this.width, this.height);	
	}
	else if (this.type === 2) {
	    ctx.drawImage(img_pipe0, this.x, this.y, this.width, this.height);	
	}
	else if (this.type === 3) {
	    ctx.drawImage(img_pipe1, this.x, this.y, this.width, this.height);	
	}
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

function checkPiso (r1, r2) {
    if (r1.y > r2.y + r2.height) {checker= true;}
    else {checker= false;}
	//checker = false;
}
