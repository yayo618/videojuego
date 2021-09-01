var canvas = document.getElementById("mov-cnv");
var context = canvas.getContext("2d");
var coorPos = {x:0, y:0};
var drawing = false;
var rect = canvas.getBoundingClientRect();
var bx, by, dd, bbx, bby;

function Crc () {
    context.strokeStyle = "orange";
    context.lineWidth = 3;
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI*2, true);
    context.closePath();
    context.stroke();
}
function Crl () {
    context.fillStyle = "orange";
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, 45, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
}
Crc (); Crl ();

function animaxion () {//diferente nombre que el de my-cnv
    renderCanvas();
    requestAnimationFrame(animaxion);
}
animaxion();
function renderCanvas () {
    if (drawing) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	Crc();

	bx = (canvas.width/2) - coorPos.x;
	by = (canvas.height/2) - coorPos.y;
	dd = Math.sqrt(Math.pow(bx, 2) + Math.pow(by, 2));
	if (dd > 100) {
	    bbx = (canvas.width/2) - (bx*100/dd);
	    bby = (canvas.height/2) - (by*100/dd);
	} else {
	    bbx = coorPos.x;
	    bby = coorPos.y;
	}
	context.beginPath();
	context.arc(bbx, bby, 45, 0, Math.PI*2, true);
	context.closePath();
	context.fill();
	
	vx = ((canvas.width/2) - bbx)/50;
	vy = ((canvas.height/2) -bby)/50;

	//mueve mario
	if (vx>0) {movDe=false;movIz=true;}
	else {movIz=false;movDe=true;}
    }
}

var firstTouchPressOut;//para el problema de presionar botones
window.addEventListener("touchstart", function (e) {
    if (e.touches[0].clientX > canvas.offsetLeft &&
        e.touches[0].clientX < (canvas.offsetLeft + canvas.offsetWidth) &&
        e.touches[0].clientY > canvas.offsetTop &&
        e.touches[0].clientY < (canvas.offsetTop + canvas.offsetHeight)) {
	firstTouchPressOut = false;
    } else {
	firstTouchPressOut = true;
    }
    //el otro
    if (e.touches[0].clientX > canvasV.offsetLeft &&
        e.touches[0].clientX < (canvasV.offsetLeft + canvasV.offsetWidth) &&
        e.touches[0].clientY > canvasV.offsetTop &&
        e.touches[0].clientY < (canvasV.offsetTop + canvasV.offsetHeight)) {
	firstTouchPressOutV = false;
    } else {
	firstTouchPressOutV = true;
    }
}, false);
window.addEventListener("touchmove", function (e) {
    if (e.touches[0].clientX > canvas.offsetLeft &&
        e.touches[0].clientX < (canvas.offsetLeft + canvas.offsetWidth) &&
        e.touches[0].clientY > canvas.offsetTop &&
        e.touches[0].clientY < (canvas.offsetTop + canvas.offsetHeight)) {
	firstTouchPressOut = false;
    } else {
	firstTouchPressOut = true;
    }
    //el otro
    if (e.touches[0].clientX > canvasV.offsetLeft &&
        e.touches[0].clientX < (canvasV.offsetLeft + canvasV.offsetWidth) &&
        e.touches[0].clientY > canvasV.offsetTop &&
        e.touches[0].clientY < (canvasV.offsetTop + canvasV.offsetHeight)) {
	firstTouchPressOutV = false;
    } else {
	firstTouchPressOutV = true;
    }    
}, false);

canvas.addEventListener("touchstart", function (e) {
    drawing = true;
    det = false;
    
    if (firstTouchPressOut) {
	coorPos.x = e.touches[1].clientX - rect.left;
	coorPos.y = e.touches[1].clientY - rect.top;
    } else {
	coorPos.x = e.touches[0].clientX - rect.left;
	coorPos.y = e.touches[0].clientY - rect.top;
    }    
}, false);
canvas.addEventListener("touchmove", function (e) {
    if (firstTouchPressOut) {
	coorPos.x = e.touches[1].clientX - rect.left;
	coorPos.y = e.touches[1].clientY - rect.top;
    } else {
	coorPos.x = e.touches[0].clientX - rect.left;
	coorPos.y = e.touches[0].clientY - rect.top;
    }
}, false);
canvas.addEventListener("touchend", function (e) {
    drawing = false;
    det = true;
    movIz=false;
    movDe=false;
    context.clearRect(0,0,canvas.width,canvas.height);
    Crc();
    Crl();

    firstTouchPressOut = false;//por siaca
}, false);
