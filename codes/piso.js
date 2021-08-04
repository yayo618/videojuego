var borders = [];
for (let i = 0; i < 6; i++) {
    borders.push(new Border(0+32*i, 208, 32, 32));
}


function Border (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function () {
	ctx.fillStyle = "blue";
	ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
