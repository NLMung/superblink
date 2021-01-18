// JavaScript Documentconsole.log('FunGrid.js v0.4');var FUNGRID = {};FUNGRID.maxFps = 30; // FUNGRID.timeInterval = 1000 / FUNGRID.maxFps; // in msFUNGRID.canvas = null; // canvas DOM objectFUNGRID.context = null; // canvas contextFUNGRID.lastUpdate = new Date().getTime();FUNGRID.fps = 0;FUNGRID.currentTime = 0;FUNGRID.deltaTime = 0;FUNGRID.drawFPS = false;FUNGRID.gameObjects = [];FUNGRID.canX = 0;FUNGRID.canY = 0;FUNGRID.isDown = 0;FUNGRID.w = 0;FUNGRID.h = 0;// ViewportFUNGRID.vpX = 0;FUNGRID.vpY = 0;FUNGRID.vpW = 0;FUNGRID.vpH = 0;FUNGRID.futureVpX = 0;FUNGRID.futureVpY = 0;FUNGRID.minVpX = null;FUNGRID.maxVpX = null;FUNGRID.minVpY = null;FUNGRID.maxVpY = null;FUNGRID.maxScrollSpeed = 2000;FUNGRID.viewportDelay = 1.5;FUNGRID.init = function (canvasId) {    console.log("FunGrid initialized!");	canvasId = canvasId || "canvas";	FUNGRID.canvas=document.getElementById(canvasId);    FUNGRID.w = FUNGRID.canvas.width;    FUNGRID.h = FUNGRID.canvas.height;    FUNGRID.vpH = FUNGRID.h;    FUNGRID.vpW = FUNGRID.w;    FUNGRID.context= FUNGRID.canvas.getContext("2d");    FUNGRID.gameObjects = [];}FUNGRID.update = function () {    FUNGRID.clearCanvas();    FUNGRID.updateViewport();	FUNGRID.updateGameObjects();	FUNGRID.drawGameObjects();		FUNGRID.updateTimer();}FUNGRID.addGameObject = function (go) {	FUNGRID.gameObjects.push(go);	return go;}FUNGRID.moveViewport = function(x, y) {    FUNGRID.vpX = x;    FUNGRID.vpY = y;    FUNGRID.setFutureViewport(x,y);}FUNGRID.updateViewport = function() {    var dx = FUNGRID.futureVpX - FUNGRID.vpX;    var dy = FUNGRID.futureVpY - FUNGRID.vpY;    var r = Math.sqrt(dx * dx + dy * dy);            if (r < 0.5) {                FUNGRID.moveViewport(FUNGRID.futureVpX,FUNGRID.futureVpY);            } else {                // r = viewportDelay*(r >> 1)*deltaTime;                                r = r*0.4;               /* if (r > maxScrollSpeed*deltaTime) {                    r = maxScrollSpeed*deltaTime;                } */                var v = Math.atan2(dy,dx);                FUNGRID.moveViewport(FUNGRID.vpX + r*Math.cos(v),FUNGRID.vpY +r*Math.sin(v));            }            if (FUNGRID.minVpX!=null) {                FUNGRID.vpX = Math.max(FUNGRID.vpX,FUNGRID.minVpX)            }            if (FUNGRID.maxVpX!=null) {                FUNGRID.vpX = Math.min(FUNGRID.vpX+FUNGRID.vpW,FUNGRID.maxVpX)            }            if (FUNGRID.minVpY!=null) {                FUNGRID.vpY = Math.max(FUNGRID.vpY,FUNGRID.minVpY)            }            if (FUNGRID.maxVpY!=null) {                FUNGRID.vpY = Math.min(FUNGRID.vpY+FUNGRID.vpH,FUNGRID.maxVpY)            }}FUNGRID.setFutureViewport = function(x,y) {            if (FUNGRID.minVpX!=null) {                x = Math.max(x,FUNGRID.minVpX)            }            if (FUNGRID.maxVpX!=null) {                x = Math.min(x+FUNGRID.vpW,FUNGRID.maxVpX)            }            if (FUNGRID.minVpY!=null) {                y = Math.max(y,FUNGRID.minVpY)            }            if (FUNGRID.maxVpY!=null) {                y = Math.min(y+FUNGRID.pH,FUNGRID.maxVpY)            }            FUNGRID.futureVpX = x;            FUNGRID.futureVpY = y;        }FUNGRID.updateTimer = function () {	FUNGRID.currentTime = new Date().getTime();	FUNGRID.deltaTime = FUNGRID.currentTime - FUNGRID.lastUpdate;		// TEMP: Ungår hopp i bevegelser etter zoom etc.	if (FUNGRID.deltaTime>3*FUNGRID.timeInterval) {		FUNGRID.deltaTime = FUNGRID.timeInterval;		}		FUNGRID.fps = (1000 / FUNGRID.deltaTime);	FUNGRID.lastUpdate = FUNGRID.currentTime;	}FUNGRID.clearCanvas = function () {	FUNGRID.context.clearRect(0,0,FUNGRID.w,FUNGRID.h);}FUNGRID.updateGameObjects = function() {	for (var i = 0; i < FUNGRID.gameObjects.length; i++) {    	FUNGRID.gameObjects[i].update();	}}FUNGRID.drawGameObjects = function() {	for (var i = 0; i < FUNGRID.gameObjects.length; i++) {        FUNGRID.gameObjects[i].drawGameObject();	}    if (FUNGRID.drawFPS) {        FUNGRID.context.fillText(Math.round(FUNGRID.fps),1,9);    }}FUNGRID.createRepeatSettings = function (repeatEveryX, repeatEveryY, noRepeatBeforeX, noRepeatBeforeY, noRepeatAfterX, noRepeatAfterY) {    // optional parameters default values:    repeatEveryX = repeatEveryX || null;    repeatEveryY = repeatEveryY || null;    noRepeatBeforeX = noRepeatBeforeX || null;    noRepeatBeforeY = noRepeatBeforeY || null;    noRepeatAfterX = noRepeatAfterX || null;    noRepeatAfterY = noRepeatAfterY || null;    // create repeat settings:    var rs = {};    rs.repeatEveryX = repeatEveryX;    rs.noRepeatBeforeX = noRepeatBeforeX;    rs.noRepeatAfterX = noRepeatAfterX;    rs.repeatEveryY = repeatEveryY;    rs.noRepeatBeforeY = noRepeatBeforeY;    rs.noRepeatAfterY = noRepeatAfterY;    return rs;}FUNGRID.gameObject = function(idName, image, initPosX, initPosY, scrollFactorX, scrollFactorY, repeatSettings, moveable, initSpeedX, initSpeedY, initAccelerationX, initAccelerationY, minSpeedX, maxSpeedX, minSpeedY,maxSpeedY, initRotation, initScaleX, initScaleY) {    // optional parameters default values:    initPosX = initPosX || 0;    initPosY = initPosY || 0;    // TODO: FIX BUG: 0.5 i parameter blir satt til 1 nedanfor...	// scrollFactorX = scrollFactorX || 1;    // scrollFactorY = scrollFactorY || 1;    repeatSettings = repeatSettings || null;    moveable = moveable || false;    initSpeedX = initSpeedX || 0;    initSpeedY = initSpeedY || 0;    initAccelerationX = initAccelerationX || 0;    initAccelerationY = initAccelerationY || 0;    minSpeedX = minSpeedX || null;    maxSpeedX = maxSpeedX || null;    minSpeedY = minSpeedY || null;    maxSpeedY = maxSpeedY || null;    initRotation = initRotation || 0;    initScaleX = initScaleX || 1;    initScaleY = initScaleY || 1;	// create game object:    var go = {};    // game object properties:    go.idName = idName;	go.image = image;	go.posX = initPosX;	go.posY = initPosY;    go.canvasPosX = initPosX;    go.canvasPosY = initPosY;    go.scrollFactorX = scrollFactorX;    go.scrollFactorY = scrollFactorY;    go.repeatSettings = repeatSettings;    go.moveable = moveable;	go.speedX = initSpeedX;	go.speedY = initSpeedY;    go.accelerationX = initAccelerationX;    go.accelerationY = initAccelerationY;    go.minSpeedX = minSpeedX;    go.maxSpeedX = maxSpeedX;    go.minSpeedY = minSpeedY;    go.maxSpeedY = maxSpeedY;    go.rotation = initRotation;    go.scaleX = initScaleX;    go.scaleY = initScaleY;		// game object default functions	go.update = function () {        this.customEarlyUpdate();               if (this.moveable) {		  this.updateSpeed();          this.updateGridPosition();        }               this.customBeforeUpdateCanvasPosition();               this.updateCanvasPosition();               this.customAfterUpdateCanvasPosition();               if (this.repeatSettings!=null) {            this.updateRepetition();        }               this.customLateUpdate();	}    // custom updates    go.customEarlyUpdate = function () {};    go.customBeforeUpdateCanvasPosition = function () {};    go.customAfterUpdateCanvasPosition = function () {};    go.customLateUpdate = function () {};    go.updateSpeed = function () {        this.speedX += this.accelerationX*FUNGRID.deltaTime;        this.speedY += this.accelerationY*FUNGRID.deltaTime;        if (this.maxSpeedX!=null) {            this.speedX = Math.min(this.speedX,this.maxSpeedX);        }        if (this.minSpeedX!=null) {            this.speedX = Math.max(this.speedX,this.minSpeedX);        }        if (this.maxSpeedY!=null) {            this.speedY = Math.min(this.speedY,this.maxSpeedY);        }        if (this.minSpeedY!=null) {            this.speedY = Math.max(this.speedY,this.minSpeedY);        }    }    go.addSprite = function (idName,sx,sy,swidth,sheight,soffsetx,soffsety,imageDrawWidth,imageDrawHeight,rotationOffsetX,rotationOffsetY) {        idName = idName || "idle";        sx = sx || 0;        sy = sy || 0;        swidth = swidth || this.image.width;        sheight = sheight || this.image.height;        soffsetx = soffsetx || 0;        soffsety = soffsety || 0;        imageDrawWidth = imageDrawWidth || swidth;        imageDrawHeight = imageDrawHeight || sheight;        rotationOffsetX = rotationOffsetX || soffsetx;        rotationOffsetY = rotationOffsetY || soffsety;        if (!this.sprites) {            this.sprites = [];            this.spriteIndex = 0;        }        this.sprites.push({idName:idName,sx:sx,sy:sy,swidth:swidth,sheight:sheight,soffsetx:soffsetx,soffsety:soffsety,imageDrawWidth:imageDrawWidth,imageDrawHeight:imageDrawHeight,rotationOffsetX:rotationOffsetX,rotationOffsetY:rotationOffsetY});    }    go.drawGameObject = function () {         // TODO: Rotation http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/         // TODO: CLip and scale context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height); http://www.w3schools.com/tags/canvas_drawimage.asp         // TODO: SpriteSheets         if (this.rotation!==0) {// Rotated drawing            FUNGRID.context.save();            FUNGRID.context.translate(this.canvasPosX, this.canvasPosY);            FUNGRID.context.rotate(this.rotation*Math.PI/180);        if (this.sprites) {            // Sprite drawing            FUNGRID.context.drawImage(this.image, this.sprites[this.spriteIndex].sx, this.sprites[this.spriteIndex].sy, this.sprites[this.spriteIndex].swidth, this.sprites[this.spriteIndex].sheight,this.sprites[this.spriteIndex].rotationOffsetX*this.scaleX, this.sprites[this.spriteIndex].rotationOffsetY*this.scaleY, this.sprites[this.spriteIndex].imageDrawWidth*this.scaleX, this.sprites[this.spriteIndex].imageDrawHeight*this.scaleY);        } else {          // Simple drawing            FUNGRID.context.drawImage(this.image, 0, 0);        }         FUNGRID.context.restore();         } else {// Unrotated drawing        if (this.sprites) {            // Sprite drawing            FUNGRID.context.drawImage(this.image, this.sprites[this.spriteIndex].sx, this.sprites[this.spriteIndex].sy, this.sprites[this.spriteIndex].swidth, this.sprites[this.spriteIndex].sheight,this.canvasPosX+this.sprites[this.spriteIndex].soffsetx*this.scaleX, this.canvasPosY+this.sprites[this.spriteIndex].soffsety*this.scaleY, this.sprites[this.spriteIndex].imageDrawWidth*this.scaleX, this.sprites[this.spriteIndex].imageDrawHeight*this.scaleY);        } else {            // Simple drawing            FUNGRID.context.drawImage(this.image, this.canvasPosX, this.canvasPosY);        }        }    }     go.updateGridPosition = function () {        this.posX += this.speedX*FUNGRID.deltaTime;        this.posY += this.speedY*FUNGRID.deltaTime;    }    go.updateCanvasPosition = function () {        if (this.scrollFactorX !== 0) {                    this.canvasPosX=this.scrollFactorX*(this.posX-FUNGRID.vpX);                    this.canvasPosY=this.scrollFactorY*(this.posY-FUNGRID.vpY);        } else {                    this.canvasPosX = this.posX;                if (this.scrollFactorY !== 0) {                    this.canvasPosY=this.scrollFactorY*(this.posY-FUNGRID.vpY);                } else {                    this.canvasPosY = this.posY;                }    }}    go.updateRepetition = function () {        if (this.repeatSettings.repeatEveryX !=null) {                    if (this.canvasPosX+this.image.width<0) {                        this.posX += this.repeatSettings.repeatEveryX/this.scrollFactorX;                        if (this.repeatSettings.noRepeatAfterX != null) {                            if (this.posX>this.repeatSettings.noRepeatAfterX) {                                this.posX -= this.repeatSettings.repeatEveryX/this.scrollFactorX;                            }                        }                        this.updateCanvasPosition();                    } else if (this.canvasPosX>this.repeatSettings.repeatEveryX-this.image.width) {                        this.posX -= this.repeatSettings.repeatEveryX/this.scrollFactorX;                        if (this.repeatSettings.noRepeatBeforeX != null) {                            if (this.posX<repeatSettings.noRepeatBeforeX) {                                this.posX += repeatSettings.repeatEveryX/this.scrollFactorX;                            }                        }                        this.updateCanvasPosition();                    }                }                if (this.repeatSettings.repeatEveryY != null) {                    if (this.canvasPosY+this.image.height<0) {                        this.posY += this.repeatSettings.repeatEveryY/this.scrollFactorY;                        if (this.repeatSettings.noRepeatAfterY) {                            if (this.posY>this.repeatSettings.noRepeatAfterY) {                                this.posY -= this.repeatSettings.repeatEveryY/this.scrollFactorY;                            }                        }                        this.updateCanvasPosition();                    } else if (this.canvasPosY>this.repeatSettings.repeatEveryY-this.image.height) {                        this.posY -= this.repeatSettings.repeatEveryY/this.scrollFactorY;                        if (this.repeatSettings.noRepeatBeforeY != null) {                            if (this.posY<this.repeatSettings.noRepeatBeforeY) {                                this.posY += this.repeatSettings.repeatEveryY/this.scrollFactorY;                            }                        }                        this.updateCanvasPosition();                    }                }    }    // return new game object	return go;}