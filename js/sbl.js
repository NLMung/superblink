var SBL = {};SBL.resizeTimeOut = null;SBL.onResize = function() { SBL.initFunGrid()};SBL.lastX = null;SBL.initFunGrid = function () {	canvas.width = window.innerWidth;	FUNGRID.init("canvas");	var i = new Image();	i.src = "wp-content/themes/superblink2/img/canvas_assets/bg_1x220.png";	// var bak = FUNGRID.gameObject("bg",i,window.innerWidth*0.5-640*0.5,0,0,0);	var bak = FUNGRID.gameObject("bg",i,0,0,0,0);	bak.imageDrawWidth = window.innerWidth;	bak.imageDrawHeight = 220;	FUNGRID.addGameObject(bak);		var rs = FUNGRID.createRepeatSettings(Math.max(window.innerWidth+100,1600));		var solImage = new Image();	solImage.src = "wp-content/themes/superblink2/img/canvas_assets/sol.png";	var sol = FUNGRID.gameObject("sol",solImage,1000,0,0.2,0.2,rs);		FUNGRID.addGameObject(sol);			var skyImage2 = new Image();	skyImage2.src = "wp-content/themes/superblink2/img/canvas_assets/minisky.png";	var sky21 = FUNGRID.gameObject("sky21",skyImage2,50,25,0.3,0.3,rs,true,0.1);		FUNGRID.addGameObject(sky21);	var sky22 = FUNGRID.gameObject("sky22",skyImage2,600,35,0.35,0.35,rs,true,0.12);		FUNGRID.addGameObject(sky22);	var sky23 = FUNGRID.gameObject("sky23",skyImage2,1300,40,0.4,0.4,rs,true,0.11);		FUNGRID.addGameObject(sky23);		var skyImage = new Image();	skyImage.src = "wp-content/themes/superblink2/img/canvas_assets/sky.png";	var sky1 = FUNGRID.gameObject("sky1",skyImage,10,10,0.5,0.5,rs,true,0.1);		FUNGRID.addGameObject(sky1);	var sky2 = FUNGRID.gameObject("sky2",skyImage,500,20,0.5,0.5,rs,true,0.12);		FUNGRID.addGameObject(sky2);	var sky3 = FUNGRID.gameObject("sky3",skyImage,1090,30,0.5,0.5,rs,true,0.11);		FUNGRID.addGameObject(sky3);						SBL.stripestuff("wp-content/themes/superblink2/img/canvas_assets/kid.png",10,80);		SBL.stripestuff("wp-content/themes/superblink2/img/canvas_assets/skog.png",310,80);		SBL.stripestuff("wp-content/themes/superblink2/img/canvas_assets/bryter.png",610,105);		SBL.stripestuff("wp-content/themes/superblink2/img/canvas_assets/fjell.png",910,80);		SBL.stripestuff("wp-content/themes/superblink2/img/canvas_assets/isbjorns.png",1210,80);		SBL.stripestuff("wp-content/themes/superblink2/img/canvas_assets/linkus.png",1510,30);		}SBL.stripestuff = function (u,x,y) {	var i = new Image();	i.src=u;	var g = FUNGRID.gameObject(u,i,x,y,1,1,FUNGRID.createRepeatSettings(Math.max(window.innerWidth+100,1600)));		FUNGRID.addGameObject(g);	}SBL.init = function () {	window.onresize = function(){   		if(SBL.resizeTimeOut != null) clearTimeout(SBL.resizeTimeOut);  	 	resizeTimeOut = setTimeout(SBL.onResize, 100);	}	SBL.initFunGrid();		setInterval(SBL.update, FUNGRID.timeInterval);		FUNTOUCH.init();}SBL.update = function () {		if (FUNTOUCH.isDown) {		if (SBL.lastX) {			FUNGRID.moveViewport(FUNGRID.vpX+SBL.lastX-FUNTOUCH.lastX,FUNGRID.vpY);		}		SBL.lastX = FUNTOUCH.lastX;	} else {		SBL.lastX = null;	}	FUNGRID.update();}