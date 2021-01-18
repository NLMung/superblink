// JavaScript Document
console.log("FunKeys.js v0.3");
var FUNKEYS = {};
FUNKEYS.preventDefault = true;

FUNKEYS.initArrowsAndSpace = function () {
    FUNKEYS.upIsDown = false;
    FUNKEYS.customUpDown = function () {
    }
    FUNKEYS.customUpUp = function () {
    }
    FUNKEYS.downIsDown = false;
    FUNKEYS.customDownDown = function () {
    }
    FUNKEYS.customDownUp = function () {
    }
    FUNKEYS.leftIsDown = false;
    FUNKEYS.customLeftDown = function () {
    }
    FUNKEYS.customLeftUp = function () {
    }
    FUNKEYS.rightIsDown = false;
    FUNKEYS.customRightDown = function () {
    }
    FUNKEYS.customRightUp = function () {
    }
    FUNKEYS.spaceIsDown = false;
    FUNKEYS.customSpaceDown = function () {
    }
    FUNKEYS.customSpaceUp = function () {
    }
    document.onkeydown = FUNKEYS.checkKeyDown;
    document.onkeyup = FUNKEYS.checkKeyUp;


}

FUNKEYS.checkKeyDown = function (e) {
                               e = e || window.event;
                               if (FUNKEYS.preventDefault) {
                               e.preventDefault();
                           }
    if (e.keyCode == '38') {
        FUNKEYS.upIsDown = true;
        FUNKEYS.customUpDown();
    }  else if (e.keyCode == '40') {
        FUNKEYS.downIsDown = true;
        FUNKEYS.customDownDown();
    }  else if (e.keyCode == '37') {
        FUNKEYS.leftIsDown = true;
        FUNKEYS.customLeftDown();
    } else if (e.keyCode == '39') {
        FUNKEYS.rightIsDown = true;
        FUNKEYS.customRightDown();
    } else if (e.keyCode == '32') {
        FUNKEYS.spaceIsDown = true;
        FUNKEYS.customSpaceDown();
    }

}
FUNKEYS.checkKeyUp = function (e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        FUNKEYS.upIsDown = false;
        FUNKEYS.customUpUp();
    }  else if (e.keyCode == '40') {
        FUNKEYS.downIsDown = false;
        FUNKEYS.customDownUp();
    }  else if (e.keyCode == '37') {
        FUNKEYS.leftIsDown = false;
        FUNKEYS.customLeftUp();
    } else if (e.keyCode == '39') {
        FUNKEYS.rightIsDown = false;
        FUNKEYS.customRightUp();
    } else if (e.keyCode == '32') {
        FUNKEYS.spaceIsDown = false;
        FUNKEYS.customSpaceUp();
    }

}