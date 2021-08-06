var borders = [];
var img_piso = new Image();
img_piso.src = "tile-piso.png";

for (let i = 0; i < 5; i++) {
    borders.push(new Border(0+16*i, 208, 16, 16));
}
for (let i = 0; i < 3; i++) {
    borders.push(new Border(160, 208-16*i, 16, 16));
}

function Border (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function () {
	//ctx.fillStyle = "blue";
	//ctx.fillRect(this.x, this.y, this.width, this.height);
	ctx.drawImage(img_piso, this.x, this.y, this.width, this.height);	
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
