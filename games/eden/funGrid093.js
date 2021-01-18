// JavaScript DocumentFUNGRID = function() {    function log(message) {        try {            console.log(message);        } catch (exception) {            return;        }    }// Returns Rectangle objectfunction Rectangle(x, y, width, height) {    x = x || 0;    y = y || 0;    width = width || 0;    height = height || 0;    var r = {x: x, y: y, width: width, height: height};    // Returns true if the Rectangle object contains Point p    r.containsPoint = function (p) {        return p.x >= this.x && p.x <= this.x + this.width && p.y >= this.y && p.y <= this.y + this.height;    }    // Returns true if the Rectangle object intersects Rectangle rect    r.intersects = function (rect) {        return rect.x < this.x + this.width && rect.x + rect.width > this.x && rect.y < this.y + this.height && rect.y + rect.height > this.y;    }    return r;}// Returns Point objectfunction Point(x, y) {    x = x || 0;    y = y || 0;    p = {x: x, y: y};    p.toString = function () {        return "{x:" + x + ", y:" + y + "}";    }    return p;}log('FunGrid.js v0.93b');var scale = 1;var maxFps = 30; // var timeInterval = 1000 / maxFps; // in msvar canvas = null; // canvas DOM objectvar context = null; // canvas contextvar lastUpdate = new Date().getTime();var fps = 0;var currentTime = 0;var deltaTime = 0;var drawFPS = false;var gameObjects = [];var polyLineGameObjects = [];var zoneGameObjects = [];var canX = 0;var canY = 0;var isDown = 0;var w = 0;var h = 0;// Viewportvar viewport = Rectangle();var futureViewport = Point();var minVpX = null;var maxVpX = null;var minVpY = null;var maxVpY = null;var maxScrollSpeed = 2000;var viewportDelay = 1.5;var doClearCanvas = true;function init(canvasId,scale) {    this.scale = scale || 1;    canvasId = canvasId || "canvas";    canvas = document.getElementById(canvasId);    w = canvas.width/scale;    h = canvas.height/scale;    viewport = Rectangle(0, 0, w, h);    context = canvas.getContext("2d");    gameObjects = [];    if (!canvas || !context) {        log("FunGrid init failed!");        return;    }    log("FunGrid initialized! "+this.scale);}function update(view) {    view = view || "";    updateViewport();    updateGameObjects(view);    if (this.doClearCanvas) {    	clearCanvas();    }    drawGameObjects(this,view);    updateTimer();}function addGameObject(go, view) {    view = view || "";    go.view = view;    gameObjects.push(go);    if (go.polyLine) {        polyLineGameObjects.push(go);    }    if (go.zone) {        zoneGameObjects.push(go);    }    return go;}function getContext() {    return context;}function moveViewport(x, y) {   viewport.x = x;   viewport.y = y;   setFutureViewport(x, y);}function updateViewport() {    var dx = futureViewport.x - viewport.x;    var dy = futureViewport.y - viewport.y;    var r = Math.sqrt(dx * dx + dy * dy);    if (r < 0.5) {        moveViewport(futureViewport.x, futureViewport.y);    } else {        // r = viewportDelay*(r >> 1)*deltaTime;        r = r * 0.4;        /* if (r > maxScrollSpeed*deltaTime) {         r = maxScrollSpeed*deltaTime;     } */     var v = Math.atan2(dy, dx);     viewport.x += r * Math.cos(v);     viewport.y += r * Math.sin(v);    }    if (minVpX !== null) {        viewport.x = Math.max(viewport.x, minVpX);    }    if (maxVpX !== null) {        viewport.x = Math.min(viewport.x, maxVpX);    }    if (minVpY !== null) {        viewport.y = Math.max(viewport.y, minVpY);    }    if (maxVpY !== null) {        viewport.y = Math.min(viewport.y, maxVpY);    }}function setFutureViewport(x, y) {    if (minVpX !== null) {        x = Math.max(x, minVpX)    }    if (maxVpX !== null) {        x = Math.min(x, maxVpX)    }    if (minVpY !== null) {        y = Math.max(y, minVpY)    }    if (maxVpY !== null) {        y = Math.min(y, maxVpY)    }    futureViewport.x = x;    futureViewport.y = y;}function updateTimer () {    currentTime = new Date().getTime();    deltaTime = currentTime - lastUpdate;    // TEMP: Ungår hopp i bevegelser etter zoom etc.    if (deltaTime > 3 * timeInterval) {        deltaTime = timeInterval;    }    fps = (1000 / deltaTime);    lastUpdate = currentTime;}function clearCanvas() {   context.clearRect(0, 0, w*this.scale, h*this.scale);}function updateGameObjects(view) {    var deleteObject = -1;    var l = gameObjects.length;    var ll;    var ii;    for (var i = 0; i < l; i++) {        if (gameObjects[i]) {            if (gameObjects[i].view===view) {                if (!gameObjects[i].update({deltaTime:deltaTime,viewport:viewport,scale:scale,w:w,h:h})) {                    if (gameObjects[i].polyLine) {                        ll = polyLineGameObjects.length;                        for (ii = 0; ii < ll; ii++) {                            if (gameObjects[i] === polyLineGameObjects[ii]) {                                polyLineGameObjects.splice(ii, 1);                                ii = ll;                            }                        }                    }                    if (gameObjects[i].zone) {                        ll = zoneGameObjects.length;                        for (ii = 0; ii < ll; ii++) {                            if (gameObjects[i] === zoneGameObjects[ii]) {                                zoneGameObjects.splice(ii, 1);                                ii = ll;                            }                        }                    }                    gameObjects[i].destroy();                    gameObjects[i] = null;                    gameObjects.splice(i, 1);                    i--;                    l--;                }            }        }    }}function destroyView(view) {    view = view || "";    var l = gameObjects.length;    for (var i = 0; i < l; i++) {        if (gameObjects[i].view===view) {            gameObjects[i].destroy();        }    }}function destroy() {	var l = gameObjects.length;    for (var i = 0; i < l; i++) {    	gameObjects[i].destroy();    }    gameObjects = [];}function drawGameObjects(funGrid,view) {    for (var i = 0; i < gameObjects.length; i++) {        gameObjects[i].drawGameObject(funGrid,view);        if ((gameObjects[i].polyLine && gameObjects[i].polyLineVisible) || (gameObjects[i].zone && gameObjects[i].zoneVisible)) {            gameObjects[i].drawPolyLines();        }    }    if (drawFPS) {        context.fillText(Math.round(fps), 1, 9);    }}function RepeatSettings(repeatEveryX, repeatEveryY, noRepeatBeforeX, noRepeatBeforeY, noRepeatAfterX, noRepeatAfterY) {    // optional parameters default values:    repeatEveryX = repeatEveryX || null;    repeatEveryY = repeatEveryY || null;    noRepeatBeforeX = noRepeatBeforeX || null;    noRepeatBeforeY = noRepeatBeforeY || null;    noRepeatAfterX = noRepeatAfterX || null;    noRepeatAfterY = noRepeatAfterY || null;    // create repeat settings:    var rs = {};    rs.repeatEveryX = repeatEveryX;    rs.noRepeatBeforeX = noRepeatBeforeX;    rs.noRepeatAfterX = noRepeatAfterX;    rs.repeatEveryY = repeatEveryY;    rs.noRepeatBeforeY = noRepeatBeforeY;    rs.noRepeatAfterY = noRepeatAfterY;    return rs;}function polyLineCollision(from, to, checkOutsideViewport) {    var closestCollision;    var l = polyLineGameObjects.length;    var col;    for (var i = 0; i < l; i++) {        col = polyLineGameObjects[i].collision(from, to, checkOutsideViewport);        if (col) {            if (closestCollision) {                if ((to.x - from.x) * (to.x - from.x) + (to.y - from.y) * (to.y - from.y) < (closestCollision.point.x - from.x) * (closestCollision.point.x - from.x) + (closestCollision.point.y - from.y) * (closestCollision.point.y - from.y)) {                    closestCollision = col;                }            } else {                closestCollision = col;            }        }    }    return closestCollision;}function zonesContainsPoint(p, type) {    type = type || "";    var zones = [];    var l = zoneGameObjects.length;    for (var i = 0; i < l; i++) {        if (zoneGameObjects[i].containsPoint(p, type)) {            zones.push(zoneGameObjects[i]);        }    }    return zones;}function addPolyLineToGameObject(go, pl) {    go.polyLine = pl;    go.polyLineVisible = false;    go.polyLineLeft = null;    go.polyLineRight = null;    go.collision = function (funGrid, from, to, checkOutsideViewport) {        checkOutsideViewport = checkOutsideViewport || false;        var p;        var fromPoint = Point(from.x - this.posX, from.y - this.posY);        var toPoint = Point(to.x - this.posX, to.y - this.posY);        if (checkOutsideViewport || this.inViewport(funGrid)) {            p = this.polyLine.collisionPoint(fromPoint, toPoint);            if (p) {                return {point: Point(p.x + this.posX, p.y + this.posY), parameter: this.polyLine.lastCollisionPointParameter, polyLineGameObject: this};            }        }        return null;    };    go.pointFromParameter = function (parameter, returnPointsOutsidePolyLine) {        returnPointsOutsidePolyLine = returnPointsOutsidePolyLine || false;        var p = this.polyLine.pointFromParameter(parameter, returnPointsOutsidePolyLine);        if (p) {            return Point(p.x + this.posX, p.y + this.posY);        }        return null;    };    return go;}function connectPolyLineGameObjects(gos) {	for (var i = 0; i<gos.length-1; i++) {		gos[i].polyLineRight = gos[i+1];		gos[i+1].polyLineLeft = gos[i];	}}function addZoneToGameObject(go, pl, zoneType) {    zoneType = zoneType || "";    go.zone = pl;    go.zoneVisible = false;    go.zoneType = zoneType;    go.zoneEnabled = true;    go.containsPoint = function (p, type) {        if (!this.zoneEnabled) {            return false;        }        if (type === "" || type === this.zoneType) {            if (this.zone.containsPoint(Point(p.x - this.posX, p.y - this.posY))) {                return true;            }        }    };}function addPhysicsToGameObject(go) {    go.physics = true;    go.moveable = true;}// Returns GameObjectfunction GameObject(idName, image, initPosX, initPosY, scrollFactorX, scrollFactorY, repeatSettings, moveable, initSpeedX, initSpeedY, initAccelerationX, initAccelerationY, minSpeedX, maxSpeedX, minSpeedY, maxSpeedY, initRotation, initScaleX, initScaleY) {    // optional parameters default values:    image = image || null;    if (!image) log(idName+" GameObject(...) WARNING: image = null");    initPosX = initPosX || 0;    initPosY = initPosY || 0;    scrollFactorX = scrollFactorX || 1;    scrollFactorY = scrollFactorY || 1;    repeatSettings = repeatSettings || null;    moveable = moveable || false;    initSpeedX = initSpeedX || 0;    initSpeedY = initSpeedY || 0;    initAccelerationX = initAccelerationX || 0;    initAccelerationY = initAccelerationY || 0;    minSpeedX = minSpeedX || null;    maxSpeedX = maxSpeedX || null;    minSpeedY = minSpeedY || null;    maxSpeedY = maxSpeedY || null;    initRotation = initRotation || 0;    initScaleX = initScaleX || 1;    initScaleY = initScaleY || 1;    // create game object:    var go = {};    // game object properties:    go.idName = idName;    go.image = image;    go.posX = initPosX;    go.posY = initPosY;    go.canvasPosX = initPosX;    go.canvasPosY = initPosY;    go.scrollFactorX = scrollFactorX;    go.scrollFactorY = scrollFactorY;    go.repeatSettings = repeatSettings;    go.moveable = moveable;    go.speedX = initSpeedX;    go.speedY = initSpeedY;    go.accelerationX = initAccelerationX;    go.accelerationY = initAccelerationY;    go.minSpeedX = minSpeedX;    go.maxSpeedX = maxSpeedX;    go.minSpeedY = minSpeedY;    go.maxSpeedY = maxSpeedY;    go.rotation = initRotation;    go.scaleX = initScaleX;    go.scaleY = initScaleY;    go.destroyMe = false;    go.visible = true;    go.zone = null;    go.polyLine = null;    go.view = "";    go.physics = false;    go.polyLineGameObject = null;    go.parameter = 0;    go.parameterSpeed = 0;    go.lifetime = 0;    go.dieAfterLifetime = null;    go.dieOutsideViewport = null;    go.dieOutsideRectangle = null;    // game object default functions    go.toString = function () {        return this.idName+" "+this.posX+","+this.posY+" "+this.canvasPosX+","+this.canvasPosY;    };    go.update = function (funGrid) {        go.lifetime += deltaTime;        if (this.destroyMe) {            return false;        }        this.customEarlyUpdate(funGrid);        if (this.moveable) {            this.updateSpeed(funGrid);            if (this.physics) {                this.updatePhysics(funGrid);            } else {                this.updateGridPosition(funGrid);            }        }        this.customBeforeUpdateCanvasPosition(funGrid);        this.updateCanvasPosition(funGrid);        this.customAfterUpdateCanvasPosition(funGrid);        if (this.repeatSettings != null) {            this.updateRepetition();        }        this.customLateUpdate(funGrid);        return this.updateDies(funGrid);    };    go.updateDies = function(funGrid) {        if (this.dieAfterLifetime) {            if (this.lifetime >= this.dieAfterLifetime)  {                this.destroyMe = true;                return false;            }        }        if (this.dieOutsideViewport) {           if (!this.inViewport(funGrid)) {               this.destroyMe = true;               return false;           }       }       if (this.dieOutsideRectangle) {        if (!this.dieOutsideViewport.containsPoint(Point(this.posX,this.posY))) {            this.destroyMe = true;            return false;        }    }    return true;}go.destroy = function () {    this.destroyMe = true;    log(this.idName+ " destroyed!");}    // custom updates    go.customEarlyUpdate = function (funGrid) {    };    go.customBeforeUpdateCanvasPosition = function (funGrid) {    };    go.customAfterUpdateCanvasPosition = function (funGrid) {    };    go.customLateUpdate = function (funGrid) {    };    go.customOnRepeat = function (funGrid) {    };    go.customEnterPolyLineGameObject = function (funGrid){    };    // Update speed    go.updateSpeed = function (funGrid) {        this.speedX += this.accelerationX * funGrid.deltaTime;        this.speedY += this.accelerationY * funGrid.deltaTime;        if (this.maxSpeedX != null) {            this.speedX = Math.min(this.speedX, this.maxSpeedX);        }        if (this.minSpeedX != null) {            this.speedX = Math.max(this.speedX, this.minSpeedX);        }        if (this.maxSpeedY != null) {            this.speedY = Math.min(this.speedY, this.maxSpeedY);        }        if (this.minSpeedY != null) {            this.speedY = Math.max(this.speedY, this.minSpeedY);        }    };    go.addSprite = function (idName, sx, sy, swidth, sheight, soffsetx, soffsety, imageDrawWidth, imageDrawHeight, rotationOffsetX, rotationOffsetY) {        idName = idName || "idle";        sx = sx || 0;        sy = sy || 0;        if (this.image) {            swidth = swidth || this.image.width;            sheight = sheight || this.image.height;        } else {            swidth = swidth || 0;            sheight = sheight || 0;        }        soffsetx = soffsetx || 0;        soffsety = soffsety || 0;        imageDrawWidth = imageDrawWidth || swidth;        imageDrawHeight = imageDrawHeight || sheight;        rotationOffsetX = rotationOffsetX || soffsetx;        rotationOffsetY = rotationOffsetY || soffsety;        var maxDrawingRadius = Math.max(imageDrawWidth + rotationOffsetX, imageDrawHeight + rotationOffsetY);        if (!this.sprites || (this.sprites.length == 1 && this.sprites[0].autosprite)) {            this.sprites = [];            this.spriteIndex = 0;        }        this.sprites.push({idName: idName, sx: sx, sy: sy, swidth: swidth, sheight: sheight, soffsetx: soffsetx, soffsety: soffsety, imageDrawWidth: imageDrawWidth, imageDrawHeight: imageDrawHeight, rotationOffsetX: rotationOffsetX, rotationOffsetY: rotationOffsetY, maxDrawingRadius: maxDrawingRadius});    };    // Draw polyLine or zone on the canvas    go.drawPolyLines = function (funGrid) {        if (this.polyLine) {            context.beginPath();            context.moveTo((this.polyLine.points[0].x + this.canvasPosX)*funGrid.scale, (this.polyLine.points[0].y + this.canvasPosY)*funGrid.scale);            for (var i = 1; i < this.polyLine.length; i++) {                context.lineTo((this.polyLine.points[i].x + this.canvasPosX)*funGrid.scale, (this.polyLine.points[i].y + this.canvasPosY)*funGrid.scale);            }            context.stroke();        }        if (this.zone) {            context.beginPath();            context.moveTo((this.zone.points[0].x + this.canvasPosX)*funGrid.scale, (this.zone.points[0].y + this.canvasPosY)*funGrid.scale);            for (var i = 1; i < this.zone.length; i++) {                context.lineTo((this.zone.points[i].x + this.canvasPosX)*funGrid.scale, (this.zone.points[i].y + this.canvasPosY)*funGrid.scale);            }            context.stroke();        }    };    // Draw GameObject on the canvas using FUNGRID.context    go.drawGameObject = function (funGrid, view) {        if (!this.visible || !this.image || !this.inViewport(funGrid) || (this.view!==view && this.view!=='')) {            return;        }        var sx = this.sprites[this.spriteIndex].sx * funGrid.scale;        var sy = this.sprites[this.spriteIndex].sy * funGrid.scale;        var swidth = this.sprites[this.spriteIndex].swidth * funGrid.scale;        var sheight = this.sprites[this.spriteIndex].sheight * funGrid.scale;        var x = Math.round(this.canvasPosX + this.sprites[this.spriteIndex].soffsetx * this.scaleX)*funGrid.scale;        var y = Math.round(this.canvasPosY + this.sprites[this.spriteIndex].soffsety * this.scaleY)*funGrid.scale;        var w = this.sprites[this.spriteIndex].imageDrawWidth * this.scaleX*funGrid.scale;        var h = this.sprites[this.spriteIndex].imageDrawHeight * this.scaleY*funGrid.scale;        if (this.rotation !== 0) {            // Rotated drawing            var roffx = this.sprites[this.spriteIndex].rotationOffsetX * this.scaleX * funGrid.scale;            var roffy = this.sprites[this.spriteIndex].rotationOffsetY * this.scaleY * funGrid.scale;              var r = this.rotation * Math.PI / 180;            var tx = x-roffx;            var ty = y-roffy;            context.translate(tx, ty);            context.rotate(r);            context.drawImage(this.image, sx, sy, swidth, sheight, roffx, roffy, w, h);            context.rotate(-r);            context.translate(-tx, -ty);        } else {            // Unrotated drawing            context.drawImage(this.image, sx, sy, swidth, sheight, x, y, w, h);        }    }    // Returns true if GameObject is inside the viewport (and should be rendered)    go.inViewport = function (funGrid) {        if (this.rotation !== 0) {            // Rotated...            if (this.canvasPosX - this.sprites[this.spriteIndex].maxDrawingRadius * this.scaleX > funGrid.w) {                return false;            }            if (this.canvasPosX + this.sprites[this.spriteIndex].maxDrawingRadius * this.scaleX < 0) {                return false;            }            if (this.canvasPosY - this.sprites[this.spriteIndex].maxDrawingRadius * this.scaleY > funGrid.h) {                return false;            }            if (this.canvasPosY + this.sprites[this.spriteIndex].maxDrawingRadius * this.scaleY < 0) {                return false;            }        } else {            // Not rotated            var x = this.canvasPosX + this.sprites[this.spriteIndex].soffsetx * this.scaleX;            if (x > funGrid.w) {                return false;            }            var w = this.sprites[this.spriteIndex].imageDrawWidth * this.scaleX;            if (x + w < 0) {                return false;            }            var y = this.canvasPosY + this.sprites[this.spriteIndex].soffsety * this.scaleY;            if (y > funGrid.h) {                return false;            }            var h = this.sprites[this.spriteIndex].imageDrawHeight * this.scaleY;            if (y + h < 0) {                return false;            }        }        // In viewport! (at least almost)        return true;    }    // Update the position on the grid based on speed    go.updateGridPosition = function (funGrid) {        this.posX += this.speedX * funGrid.deltaTime;        this.posY += this.speedY * funGrid.deltaTime;    }    go.updatePhysics = function (funGrid) {        if (this.polyLineGameObject) {            // If attached to a PolyLine GameObject...            this.parameter += this.parameterSpeed * funGrid.deltaTime;            var p = this.polyLineGameObject.pointFromParameter(this.parameter);            if (p) {                this.posX = p.x;                this.posY = p.y;            } else {                if (this.parameter < 0 && this.polyLineGameObject.polyLineLeft) {                    while (this.parameter < 0) {                        if (this.polyLineGameObject.polyLineLeft) {                            if (this.jumpCheckLeft()) {                                this.leavePolyLineGameObject(funGrid);                                break;                            } else {                                this.polyLineGameObject = this.polyLineGameObject.polyLineLeft;                                this.parameter += this.polyLineGameObject.polyLine.totalLength;                                p = this.polyLineGameObject.pointFromParameter(this.parameter);                                if (p) {                                    this.posX = p.x;                                    this.posY = p.y;                                }                            }                        } else {                            this.leavePolyLineGameObject(funGrid);                        }                    }                } else if (this.parameter > this.polyLineGameObject.polyLine.totalLength && this.polyLineGameObject.polyLineRight) {                    while (this.parameter > this.polyLineGameObject.polyLine.totalLength) {                        if (this.polyLineGameObject.polyLineRight) {                            if (this.jumpCheckRight()) {                                this.leavePolyLineGameObject(funGrid);                                break;                            } else {                                this.parameter -= this.polyLineGameObject.polyLine.totalLength;                                this.polyLineGameObject = this.polyLineGameObject.polyLineRight;                                p = this.polyLineGameObject.pointFromParameter(this.parameter);                                if (p) {                                    this.posX = p.x;                                    this.posY = p.y;                                }                            }                        } else {                            this.leavePolyLineGameObject(funGrid);                        }                    }                } else {                    this.leavePolyLineGameObject(funGrid);                }            }        } else {            // If not attached to a PolyLine Game Object ...            var c = polyLineCollision(Point(this.posX, this.posY), funGrid.Point(this.posX + this.speedX * deltaTime, this.posY + this.speedY * funGrid.deltaTime));            if (c && this.speedY > 0) {                // Collision with a PolyLine GameObject                this.polyLineGameObject = c.polyLineGameObject;                this.parameter = c.parameter;                this.posX = c.point.x;                this.posY = c.point.y;                this.customEnterPolyLineGameObject();                // FUNGRID.log("kollisjon " + c.point.toString());            } else {                // No collision                this.updateGridPosition();            }        }    }    go.leavePolyLineGameObject = function (funGrid) {        var p = this.polyLineGameObject.pointFromParameter(this.parameter, true);        // FUNGRID.log("p:" + p.toString() + " " + this.posX + "," + this.posY);        this.speedX = (p.x - this.posX) / funGrid.deltaTime;        this.speedY = (p.y - this.posY) / funGrid.deltaTime;        this.polyLineGameObject = null;        this.updateGridPosition();    }    go.jumpCheckLeft = function () {        return false;    }    go.jumpCheckRight = function () {        return false;    }    // Returns true if (x,y) is inside the current sprite bounding box    go.inside = function (x, y) {        x += this.sprites[this.spriteIndex].soffsetx * this.scaleX;        if (x >= this.posX && x <= this.posX + this.sprites[this.spriteIndex].imageDrawWidth * this.scaleX) {            y += this.sprites[this.spriteIndex].soffsety * this.scaleY;            if (y >= this.posY && y <= this.posY + this.sprites[this.spriteIndex].imageDrawHeight * this.scaleY) {                return true;            }        }        return false;    }    go.updateCanvasPosition = function (funGrid) {        if (this.scrollFactorX !== 0) {            this.canvasPosX = this.scrollFactorX * (this.posX - funGrid.viewport.x);            this.canvasPosY = this.scrollFactorY * (this.posY - funGrid.viewport.y);        } else {            this.canvasPosX = this.posX;            if (this.scrollFactorY !== 0) {                this.canvasPosY = this.scrollFactorY * (this.posY - funGrid.viewport.y);            } else {                this.canvasPosY = this.posY;            }        }    }    go.updateRepetition = function (funGrid) {        if (this.repeatSettings.repeatEveryX != null) {            if (this.canvasPosX + this.image.width < 0) {                this.posX += this.repeatSettings.repeatEveryX;                if (this.repeatSettings.noRepeatAfterX != null) {                    if (this.posX > this.repeatSettings.noRepeatAfterX) {                        this.posX -= this.repeatSettings.repeatEveryX;                    }                }                this.customOnRepeat();                this.updateCanvasPosition(funGrid);            } else if (this.canvasPosX > this.repeatSettings.repeatEveryX - this.image.width) {                this.posX -= this.repeatSettings.repeatEveryX;                if (this.repeatSettings.noRepeatBeforeX != null) {                    if (this.posX < this.repeatSettings.noRepeatBeforeX) {                        this.posX += this.repeatSettings.repeatEveryX;                    }                }                this.customOnRepeat();                this.updateCanvasPosition(funGrid);            }        }        if (this.repeatSettings.repeatEveryY != null) {            if (this.canvasPosY + this.image.height < 0) {                this.posY += this.repeatSettings.repeatEveryY;                if (this.repeatSettings.noRepeatAfterY) {                    if (this.posY > this.repeatSettings.noRepeatAfterY) {                        this.posY -= this.repeatSettings.repeatEveryY;                    }                }                this.customOnRepeat();                this.updateCanvasPosition(funGrid);            } else if (this.canvasPosY > this.repeatSettings.repeatEveryY - this.image.height) {                this.posY -= this.repeatSettings.repeatEveryY;                if (this.repeatSettings.noRepeatBeforeY != null) {                    if (this.posY < this.repeatSettings.noRepeatBeforeY) {                        this.posY += this.repeatSettings.repeatEveryY;                    }                }                this.customOnRepeat(funGrid);                this.updateCanvasPosition(funGrid);            }        }    }    go.addSprite();    go.sprites[0].autosprite = true;    // return new game object    return go;}// Returns PolyLine object// Line of 2 or more points (1 or more line segments).// Commonly used to define platforms (open PolyLine) or zones (closed PolyLine) .// Positions are relative to the game object.// The first point is recommended to be the left-most point when creating platforms.function PolyLine(points) {    points = points || [];    // create polyline object    var pl = {};    pl.points = points;    pl.lastCollisionPointParameter;    pl.init = function () {        this.lengths = [];        this.length = this.points.length;        this.derivatives = [];        this.totalLength = 0;        this.closed = false;        var minX;        var minY;        var maxX;        var maxY;        for (var i = 0; i < this.length; i++) {            if (i < this.length - 1) {                var l = Math.sqrt((this.points[i + 1].x - this.points[i].x) * (this.points[i + 1].x - this.points[i].x) + (this.points[i + 1].y - this.points[i].y) * (this.points[i + 1].y - this.points[i].y));                this.lengths.push(l);                this.derivatives.push((this.points[i + 1].y - this.points[i].y) / (this.points[i + 1].x - this.points[i].x));                this.totalLength += l;            }            if (i === 0) {                minX = maxX = this.points[i].x;                minY = maxY = this.points[i].y;            } else {                if (this.points[i].x < minX) {                    minX = this.points[i].x;                } else if (this.points[i].x > maxX) {                    maxX = this.points[i].x;                }                if (this.points[i].y < minY) {                    minY = this.points[i].y;                } else if (this.points[i].y > maxY) {                    maxY = this.points[i].y;                }            }        }        this.boundRect = FUNGRID.Rectangle(minX, minY, maxX - minX, maxY - minY);        if (points[0].x == this.points[this.length - 1].x && this.points[0].y == this.points[this.length - 1].y) {            this.closed = true;        }    }    pl.init();    // Returns true if a Point p is inside a closed PolyLine object    pl.containsPoint = function (p) {        if (!this.closed || !this.boundRect.containsPoint(p)) {            return false;        }        var inside = false;        var xold = this.points[this.length - 1].x;        var yold = this.points[this.length - 1].y;        var x1;        var y1;        var x2;        var y2;        var xnew;        var ynew;        for (var i = 0; i < this.length; i++) {            xnew = this.points[i].x;            ynew = this.points[i].y;            if (xnew > xold) {                x1 = xold;                x2 = xnew;                y1 = yold;                y2 = ynew;            } else {                x1 = xnew;                x2 = xold;                y1 = ynew;                y2 = yold;            }            if ((xnew < p.x) == (p.x <= xold) && ((p.y - y1) * (x2 - x1) < (y2 - y1) * (p.x - x1))) {                inside = !inside;            }            xold = xnew;            yold = ynew;        }        return inside;    }    // Returns true if Rectangle rect intersects boundRect of the PolyLine object    pl.intersectsBoundRect = function (rect) {        return this.boundRect.intersects(rect);    }    // Returns an intersection Point between two line segments if the point is within both line segments    // First line segment from Point line1a to Point line1b, second from Point line2a to Point line2B    pl.intersectionPoint = function (line1a, line1b, line2a, line2b) {        // FUNGRID.log(line1a.toString() + "-" + line1b.toString() + " x " + line2a.x+","+line2a.y + " - " + line2b.x+","+line2b.y);        // Formula based on http://local.wasp.uwa.edu.au/~pbourke/geometry/lineline2d/        var nemnar = (line2b.y - line2a.y) * (line1b.x - line1a.x) - (line2b.x - line2a.x) * (line1b.y - line1a.y);        if (nemnar !== 0) {            var ua_teljar = (line2b.x - line2a.x) * (line1a.y - line2a.y) - (line2b.y - line2a.y) * (line1a.x - line2a.x);            var ub_teljar = (line1b.x - line1a.x) * (line1a.y - line2a.y) - (line1b.y - line1a.y) * (line1a.x - line2a.x);            var ua = ua_teljar / nemnar;            var ub = ub_teljar / nemnar;            // Check if we are inside both line segments:            if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {                return Point(line1a.x + ua * (line1b.x - line1a.x), line1a.y + ua * (line1b.y - line1a.y));            }        }        return null;    }    // Returns closest collision Point between line segment and the PolyLine object or null if there are no collision    pl.collisionPoint = function (from, to) {        var closestPoint = null;        var parameter = 0;        var ip;        for (var i = 0; i < this.length - 1; i++) {            ip = this.intersectionPoint(from, to, this.points[i], this.points[i + 1]);            if (ip) {                if (closestPoint) {                    if (Math.sqrt((ip.x - from.x) * (ip.x - from.x) + (ip.y - from.y) * (ip.y - from.y)) < Math.sqrt((closestPoint.x - from.x) * (closestPoint.x - from.x) + (closestPoint.y - from.y) * (closestPoint.y - from.y))) {                        closestPoint = ip;                        this.lastCollisionPointParameter = parameter + Math.sqrt((ip.x - this.points[i].x) * (ip.x - this.points[i].x) + (ip.y - this.points[i].y) * (ip.y - this.points[i].y));                    }                } else {                    closestPoint = ip;                    this.lastCollisionPointParameter = parameter + Math.sqrt((ip.x - this.points[i].x) * (ip.x - this.points[i].x) + (ip.y - this.points[i].y) * (ip.y - this.points[i].y));                }            }            parameter += this.lengths[i];        }        return closestPoint;    }    // Returns the derivative for a point on the Polyline defined by a parameter value    // The parameter defines a point on the PolyLine by the distance along the line from the first point on the PolyLine    pl.derivativeFromParameter = function (parameter) {        for (var i = 0; i < this.length; i++) {            if (parameter > this.lengths[i]) {                parameter -= this.lengths[i];            } else {                return derivatives[i];            }        }        if (parameter < 0) {            return derivatives[0];        }        return derivatives[derivatives.length - 1];    }    // Returns a point on the PolyLine defined by a parameter value or null if the parameter is outside the PolyLine (unless returnPointsOutsidePolyLine is true)    // The parameter defines a point on the PolyLine by the distance along the line from the first point on the PolyLine    pl.pointFromParameter = function (parameter, returnPointsOutsidePolyLine) {        returnPointsOutsidePolyLine = returnPointsOutsidePolyLine || false;        if (returnPointsOutsidePolyLine) {            if (parameter < 0) {                var a = Math.atan(this.derivatives[0]);                return Point(parameter * Math.cos(a) + this.points[0].x, parameter * Math.sin(a) + this.points[0].y);                // AS3: return Point.polar(parameter,Math.atan(derivatives[0])).add(points[0]);            } else if (parameter > this.totalLength) {                parameter -= this.totalLength;                var a = Math.atan(this.derivatives[this.derivatives.length - 1]);                return Point(parameter * Math.cos(a) + this.points[this.length - 1].x, parameter * Math.sin(a) + this.points[this.length - 1].y);                // AS3: return Point.polar(parameter,Math.atan(derivatives[derivatives.length-1])).add(points[this.length-1]);            }        }        if (this.closed) {            // Move parameter to a point within the totalLength if the polyline is closed.            while (parameter < 0) {                parameter += this.totalLength;            }            while (parameter > this.totalLength) {                parameter -= this.totalLength;            }        } else if (parameter < 0 || parameter > this.totalLength) {            return null;        }        for (var i = 0; i < this.length; i++) {            if (parameter > this.lengths[i]) {                parameter -= this.lengths[i];            } else {                return Point(this.points[i].x + parameter * (this.points[i + 1].x - this.points[i].x) / this.lengths[i], this.points[i].y + parameter * (this.points[i + 1].y - this.points[i].y) / this.lengths[i]);            }        }        return null;    }    // If not already closed, make the polyLine closed by adding a Point withe same coordinates as the first point.    pl.close = function () {        if (!this.closed) {            this.points.push(Point(this.points[0].x, this.points[0].y));            this.init();        }    }    return pl;}// Returns canvas with tinted image. Everything is tinted except for transparent pixelsfunction simpleTint(image,r,g,b) {    var canvas = document.createElement('canvas');    canvas.width  = image.width;    canvas.height = image.height;    var context = canvas.getContext("2d");    context.drawImage(image, 0, 0);    var imageData = context.getImageData(0,0,canvas.width, canvas.height);    var pos = 0;    for (var i = 0; i<imageData.data.length; i+=4) {        if (imageData.data[i+3]>0) {            imageData.data[i] = Math.max(0,Math.min(255, r));            imageData.data[i+1] = Math.max(0,Math.min(255, g));            imageData.data[i+2] = Math.max(0,Math.min(255, b));        }    }    context.putImageData(imageData,0,0);    return canvas;}return {    log:log,    Rectangle:Rectangle,    Point:Point,    init:init,    update:update,    addGameObject:addGameObject,    moveViewport:moveViewport,    updateViewport:updateViewport,    setFutureViewport:setFutureViewport,    updateTimer:updateTimer,    clearCanvas:clearCanvas,    updateGameObjects:updateGameObjects,    destroy:destroy,    destroyView:destroyView,    drawGameObjects:drawGameObjects,    RepeatSettings:RepeatSettings,    polyLineCollision:polyLineCollision,    zonesContainsPoint:zonesContainsPoint,    addPolyLineToGameObject:addPolyLineToGameObject,    connectPolyLineGameObjects:connectPolyLineGameObjects,    addZoneToGameObject:addZoneToGameObject,    addPhysicsToGameObject:addPhysicsToGameObject,    GameObject:GameObject,    PolyLine:PolyLine,    simpleTint:simpleTint,    doClearCanvas:doClearCanvas,    timeInterval:timeInterval,    getContext:getContext};}();