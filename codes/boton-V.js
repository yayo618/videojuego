var canvasV = document.getElementById("mov-cnv-V");
var contextV = canvasV.getContext("2d");
var coorPosV = {x:0, y:0};
var drawingV = false;
var rectV = canvasV.getBoundingClientRect();
var bxV, byV, ddV, bbxV, bbyV;

function CrcV () {
    contextV.strokeStyle = "orange";
    contextV.lineWidth = 3;
    contextV.beginPath();
    contextV.arc(canvasV.width/2, canvasV.height/2, 70, 0, Math.PI*2, true);
    contextV.closePath();
    contextV.stroke();
}
function CrlV () {
    contextV.fillStyle = "orange";
    contextV.beginPath();
    contextV.arc(canvasV.width/2, canvasV.height/2, 35, 0, Math.PI*2, true);
    contextV.closePath();
    contextV.fill();
}
CrcV (); CrlV ();

function animaxionV () {//diferente nombre que el de my-cnv
    renderCanvasV();
    requestAnimationFrame(animaxionV);
}
animaxionV();
function renderCanvasV () {
    if (drawingV) {
	contextV.clearRect(0, 0, canvas.width, canvas.height);
	CrcV();

	bxV = (canvasV.width/2) - coorPosV.x;
	byV = (canvasV.height/2) - coorPosV.y;
	ddV = Math.sqrt(Math.pow(bxV, 2) + Math.pow(byV, 2));
	if (ddV > 70) {
	    bbxV = (canvasV.width/2) - (bxV*70/ddV);
	    bbyV = (canvasV.height/2) - (byV*70/ddV);
	} else {
	    bbxV = coorPosV.x;
	    bbyV = coorPosV.y;
	}
	contextV.beginPath();
	contextV.arc(bbxV, bbyV, 35, 0, Math.PI*2, true);
	contextV.closePath();
	contextV.fill();
	
	vxV = ((canvasV.width/2) - bbxV)/50;
	vyV = ((canvasV.height/2) -bbyV)/50;

	//mueve mario
	if (vyV>0) {movDe=false;movIz=true;}
	else {movIz=false;movDe=true;}
    }
}

var firstTouchPressOutV;//para el problema de presionar botones

canvasV.addEventListener("touchstart", function (e) {
    drawingV = true;
    det = false;
    
    if (firstTouchPressOutV) {
	coorPosV.x = e.touches[1].clientX - rectV.left;
	coorPosV.y = e.touches[1].clientY - rectV.top;
    } else {
	coorPosV.x = e.touches[0].clientX - rectV.left;
	coorPosV.y = e.touches[0].clientY - rectV.top;
    }    
}, false);
canvasV.addEventListener("touchmove", function (e) {
    if (firstTouchPressOutV) {
	coorPosV.x = e.touches[1].clientX - rectV.left;
	coorPosV.y = e.touches[1].clientY - rectV.top;
    } else {
	coorPosV.x = e.touches[0].clientX - rectV.left;
	coorPosV.y = e.touches[0].clientY - rectV.top;
    }
}, false);
canvasV.addEventListener("touchend", function (e) {
    drawingV = false;
    det = true;
    movIz=false;
    movDe=false;
    contextV.clearRect(0,0,canvas.width,canvas.height);
    CrcV();
    CrlV();

    firstTouchPressOutV = false;//por siaca
}, false);
