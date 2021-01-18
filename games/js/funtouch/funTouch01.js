// JavaScript Document
var trace = console.log.bind(console);
trace("FunTouch.js v0.1")
var FUNTOUCH = {};
FUNTOUCH.canvas = null; // canvas DOM object

FUNTOUCH.isDown = false;

FUNTOUCH.lastX = -1; // Last x-pos for any event (down/start, move, up/end)
FUNTOUCH.lastY = -1; // Last y-pos for any event (down/start, move, up/end)


FUNTOUCH.init = function (canvasId) {
	canvasId = canvasId || "canvas";
	FUNTOUCH.canvas=document.getElementById(canvasId);
    
    // Mouse
	FUNTOUCH.canvas.addEventListener("mousedown", FUNTOUCH.mouseDown, false);
   	FUNTOUCH.canvas.addEventListener("mousemove", FUNTOUCH.mouseXY, false);
   	document.body.addEventListener("mouseup", FUNTOUCH.mouseUp, false);

   	// Touch
    FUNTOUCH.canvas.addEventListener("touchstart", FUNTOUCH.touchDown, false);
    FUNTOUCH.canvas.addEventListener("touchmove", FUNTOUCH.touchXY, true);
    FUNTOUCH.canvas.addEventListener("touchend", FUNTOUCH.touchUp, false);
    document.body.addEventListener("touchcancel", FUNTOUCH.touchUp, false);
}


// Mouse

FUNTOUCH.mouseUp = function (e) {
            FUNTOUCH.isDown = false;
            FUNTOUCH.mouseXY(e);
        }
FUNTOUCH.mouseDown = function (e) {
            FUNTOUCH.isDown = true;
            FUNTOUCH.mouseXY(e); 
        }
FUNTOUCH.mouseXY = function (e) {
            if (!e)
                var e = event;
            if (FUNTOUCH.isDown) {
            FUNTOUCH.lastX = e.pageX - FUNTOUCH.canvas.offsetLeft;
            FUNTOUCH.lastY = e.pageY - FUNTOUCH.canvas.offsetTop;
            }
        }

// Touch 
FUNTOUCH.touchUp = function (e) {
            FUNTOUCH.isDown = false;
        }
FUNTOUCH.touchDown = function (e) {
            FUNTOUCH.isDown = true;
            FUNTOUCH.touchXY(e);
        }
FUNTOUCH.touchXY = function (e) {
            if (!e)
                var e = event;
            e.preventDefault();
            FUNTOUCH.lastX = e.targetTouches[0].pageX - FUNTOUCH.canvas.offsetLeft;
            FUNTOUCH.lastY = e.targetTouches[0].pageY - FUNTOUCH.canvas.offsetTop;
        }