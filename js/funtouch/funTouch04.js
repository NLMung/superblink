// JavaScript Document
var FUNTOUCH = {};
FUNTOUCH.canvas = null; // canvas DOM object

FUNTOUCH.scale = 1;
FUNTOUCH.scalefactor = 1;

FUNTOUCH.isDown = false;

FUNTOUCH.firstX = -1; // x-pos for mousedown/touchstart
FUNTOUCH.firstY = -1; // y-pos for mousedown/touchstart

FUNTOUCH.lastX = -1; // Last x-pos for any event (down/start, move, up/end)
FUNTOUCH.lastY = -1; // Last y-pos for any event (down/start, move, up/end)

FUNTOUCH.touches = [];

FUNTOUCH.customDown = null;
FUNTOUCH.customUp = null;
FUNTOUCH.customTap = null;

FUNTOUCH.preventDefault = true;
// FUNTOUCH.preventDefaultsHorisontalOnly = false;

FUNTOUCH.init = function (canvasId, scale) {
    canvasId = canvasId || "canvas";
    FUNTOUCH.canvas = document.getElementById(canvasId);

    FUNTOUCH.scale = scale || 1;
    FUNTOUCH.scalefactor = 1/FUNTOUCH.scale;

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


FUNTOUCH.mouseDown = function (e) {
    FUNTOUCH.isDown = true;
    FUNTOUCH.firstX = e.pageX - FUNTOUCH.canvas.offsetLeft;
    FUNTOUCH.firstY = e.pageY - FUNTOUCH.canvas.offsetTop;
    FUNTOUCH.firstX *= FUNTOUCH.scalefactor;
    FUNTOUCH.firstY *= FUNTOUCH.scalefactor;
    FUNTOUCH.mouseXY(e);
    if (FUNTOUCH.customDown) {
        FUNTOUCH.customDown();
    }
}
FUNTOUCH.mouseXY = function (e) {
    if (!e)
        var e = event;
    if (FUNTOUCH.isDown) {
        FUNTOUCH.lastX = e.pageX - FUNTOUCH.canvas.offsetLeft;
        FUNTOUCH.lastY = e.pageY - FUNTOUCH.canvas.offsetTop;
        FUNTOUCH.lastX *= FUNTOUCH.scalefactor;
        FUNTOUCH.lastY *= FUNTOUCH.scalefactor;
        FUNTOUCH.touches[0] = e;
    }
}
FUNTOUCH.mouseUp = function (e) {
    FUNTOUCH.isDown = false;
    FUNTOUCH.mouseXY(e);
    FUNTOUCH.touches[0] = null;
    if (FUNTOUCH.customUp) {
        FUNTOUCH.customUp();
    }
    if (FUNTOUCH.customTap) {
        if (Math.abs(FUNTOUCH.lastX - FUNTOUCH.firstX) < 10 && Math.abs(FUNTOUCH.lastY - FUNTOUCH.firstY) < 10) {
            FUNTOUCH.customTap();
        }
    }
}

// Touch 

FUNTOUCH.touchDown = function (e) {
    FUNTOUCH.isDown = true;
    FUNTOUCH.firstX = e.targetTouches[0].pageX - FUNTOUCH.canvas.offsetLeft;
    FUNTOUCH.firstY = e.targetTouches[0].pageY - FUNTOUCH.canvas.offsetTop;
    FUNTOUCH.firstX *= FUNTOUCH.scalefactor;
    FUNTOUCH.firstY *= FUNTOUCH.scalefactor;
  //  FUNTOUCH.touches = e.targetTouches;
   /* for (var i = 0; i < e.changedTouches.length; i++) {
        FUNTOUCH.first[e.changedTouches[i].identifier] = {x: e.targetTouches[i].pageX - FUNTOUCH.canvas.offsetLeft, y: e.targetTouches[i].pageY - FUNTOUCH.canvas.offsetTop};
        FUNTOUCH.down[e.changedTouches[i].identifier] = true;
    } */
    FUNTOUCH.touchXY(e);
    if (FUNTOUCH.customDown) {
        FUNTOUCH.customDown();
    }
}
FUNTOUCH.touchXY = function (e) {
    if (!e) var e = event;

    FUNTOUCH.lastX = e.targetTouches[0].pageX - FUNTOUCH.canvas.offsetLeft;
    FUNTOUCH.lastY = e.targetTouches[0].pageY - FUNTOUCH.canvas.offsetTop;
    FUNTOUCH.lastX *= FUNTOUCH.scalefactor;
    FUNTOUCH.lastY *= FUNTOUCH.scalefactor;
    /* for (var i = 0; i < e.changedTouches.length; i++) {
        FUNTOUCH.last[e.changedTouches[i].identifier] = {x: e.targetTouches[i].pageX - FUNTOUCH.canvas.offsetLeft, y: e.targetTouches[i].pageY - FUNTOUCH.canvas.offsetTop};
    }  */
    FUNTOUCH.touches = e.targetTouches;

    if (FUNTOUCH.preventDefault) {
        e.preventDefault();
    }

}
FUNTOUCH.touchUp = function (e) {
    FUNTOUCH.isDown = false;
    /* for (var i = 0; i < e.changedTouches.length; i++) {
        FUNTOUCH.down[e.changedTouches[i].identifier] = false;
    }  */
    FUNTOUCH.touches = e.targetTouches;
    if (FUNTOUCH.customUp) {
        FUNTOUCH.customUp();
    }
    if (FUNTOUCH.customTap) {
        if (Math.abs(FUNTOUCH.lastX - FUNTOUCH.firstX) < 10 && Math.abs(FUNTOUCH.lastY - FUNTOUCH.firstY) < 10) {
            FUNTOUCH.customTap();
        }
    }
}