var FTRIKS = {};FTRIKS.resizeTimeOut = null;FTRIKS.onResize = function() { SBL.initFunGrid()};FTRIKS.touchToStart = true;FTRIKS.touchToStartReady = true;FTRIKS.lastX = null;FTRIKS.lastY = null;FTRIKS.boy = null;FTRIKS.ball = null;FTRIKS.score = 0;FTRIKS.rekord = 0;FTRIKS.lastScore = 0;FTRIKS.gameOver = false;FTRIKS.initFunGrid = function () {	FTRIKS.touchToStart = true;	if (FUNTOUCH.isDown) {		FTRIKS.touchToStartReady = false;	}	FTRIKS.score = 0;	FTRIKS.gameOver = false;	FUNGRID.init("canvas");	var i = new Image();	i.src = "wp-content/themes/superblink2/img/ftriks/ftriks_sbl_bg.png";	var bak = FUNGRID.gameObject("bg",i,0,0,1,1);	FUNGRID.addGameObject(bak);	var bi = new Image();	bi.src = "wp-content/themes/superblink2/img/ftriks/ftriks_boy.png";	FTRIKS.boy = FUNGRID.gameObject("boy",bi,360,775,1,1);	FTRIKS.boy.accelerationY = 0.001;	FTRIKS.boy.customBeforeUpdateCanvasPosition = function () {		if (this.posY>775) {		this.posY = 775;		this.moveable = false;		}	}	FUNGRID.addGameObject(FTRIKS.boy);	var ba = new Image();	ba.src = "wp-content/themes/superblink2/img/ftriks/ftriks_ball.png";	FTRIKS.ball = FUNGRID.gameObject("ball",ba,360,300,1,1,null,true);	FTRIKS.ball.accelerationY = 0.001;	FTRIKS.ball.customEarlyUpdate = function () {	}	FTRIKS.ball.customBeforeUpdateCanvasPosition = function () {		if (!FTRIKS.gameOver) {		if (this.speedY>0) {		if (Math.abs((this.posX+19)-(FTRIKS.boy.posX+26))<25) {						if (this.posY>FTRIKS.boy.posY) {				if (this.speedY>0.2) {				this.posY = FTRIKS.boy.posY-(this.posY-FTRIKS.boy.posY);				this.speedY *= -0.8;				this.speedY += 0.9*FTRIKS.boy.speedY;				FTRIKS.score +=1;				this.speedX += 0.005*((this.posX+19)-(FTRIKS.boy.posX+26))+0.002*Math.random()-0.001;			} else {				FTRIKS.gameOver = true;			}		}		}		}	}		if (this.posY>820) {			FTRIKS.gameOver = true;			this.posY = 820-(this.posY-820);			this.speedY *= -0.5;			if (this.speedY>-0.1) {				FTRIKS.initFunGrid();			}		}		if (this.posX<0) {			this.speedX *= -1;			this.posX = 0;		}		if (this.posX+19>720) {			this.speedX *= -1;			this.posX = 720-19;		}	}	FUNGRID.addGameObject(FTRIKS.ball);FUNGRID.update();}FTRIKS.init = function () {	FTRIKS.initFunGrid();	setInterval(FTRIKS.update, FUNGRID.timeInterval);	FUNTOUCH.init();}FTRIKS.update = function () {	if (FTRIKS.touchToStart) {		if (!FTRIKS.touchToStartReady) {			if (!FUNTOUCH.isDown) {				FTRIKS.touchToStartReady = true;			}		} else {		if (FUNTOUCH.isDown) {			FTRIKS.touchToStart = false;		} else {			FUNGRID.drawGameObjects();			FUNGRID.context.fillText("SWIPE LEFT/RIGHT TO MOVE, SWIPE UP TO JUMP!",260,280);			FUNGRID.context.fillText("- TOUCH TO START -",320,360);		}		}	} else {	if (FUNTOUCH.isDown) {		if (FTRIKS.lastX) {			FTRIKS.boy.posX += FUNTOUCH.lastX-FTRIKS.lastX;			if (FTRIKS.boy.posX<10) FTRIKS.boy.posX = 10;			if (FTRIKS.boy.posX>660) FTRIKS.boy.posX = 660;			// FUNGRID.moveViewport(FUNGRID.vpX+SBL.lastX-FUNTOUCH.lastX,FUNGRID.vpY);		}		FTRIKS.lastX = FUNTOUCH.lastX;		if (FTRIKS.firstY) {			if (!FTRIKS.boy.moveable) {			if (FTRIKS.firstY-FUNTOUCH.lastY>30) {				FTRIKS.boy.speedY = -0.5;				FTRIKS.boy.moveable = true;			}			}		} else {			FTRIKS.firstY = FUNTOUCH.lastY;		}	} else {		FTRIKS.lastX = null;		FTRIKS.firstY = null;	}	FUNGRID.update();	if (FTRIKS.score>FTRIKS.rekord) {		FTRIKS.rekord = FTRIKS.score;	}	if (FTRIKS.gameOver) {		FUNGRID.context.fillText("SCORE: "+FTRIKS.score+" - GAME OVER",20,20);		FUNGRID.context.fillText("GAME OVER!",320,360);		FTRIKS.lastScore = FTRIKS.score;	} else {		FUNGRID.context.fillText("SCORE: "+FTRIKS.score,20,20);	}			}FUNGRID.context.fillText("LAST SCORE: "+FTRIKS.lastScore,20,40);	FUNGRID.context.fillText("RECORD: "+FTRIKS.rekord,20,60);}