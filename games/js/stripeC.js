var SBL = {};SBL.resizeTimeOut = null;SBL.onResize = function() { SBL.initFunGrid()};SBL.lastX = null;SBL.initFunGrid = function () {	canvas.width = window.innerWidth;	FUNGRID.init("canvas");	var i = new Image();	i.src = "../imgimg/canvas_assets/stripe_bg_rosa190.png";	// var bak = FUNGRID.gameObject("bg",i,window.innerWidth*0.5-640*0.5,0,0,0);	var bak = FUNGRID.gameObject("bg",i,0,0,0,0);	bak.addSprite("idle",0,0,1,190,0,0,window.innerWidth,190);	// bak.imageDrawWidth = window.innerWidth;	// bak.imageDrawHeight = 200;	FUNGRID.addGameObject(bak);		var rs = FUNGRID.createRepeatSettings(Math.max(window.innerWidth+100,1600));		var solImage = new Image();	solImage.src = "../imgimg/canvas_assets/soloppgang.png";	var sol = FUNGRID.gameObject("sol",solImage,4000,-40,0.2,0.2,rs);		FUNGRID.addGameObject(sol);		var granImage1 = new Image();	granImage1.src = "../imgimg/canvas_assets/gran1.png";	var gran11 = FUNGRID.gameObject("gran11",granImage1,50,50,0.3,1,rs);		FUNGRID.addGameObject(gran11);	var gran12 = FUNGRID.gameObject("gran12",granImage1,250,50,0.3,1,rs);		FUNGRID.addGameObject(gran12);	var gran13 = FUNGRID.gameObject("gran13",granImage1,600,50,0.3,1,rs);		FUNGRID.addGameObject(gran13);	var gran14 = FUNGRID.gameObject("gran14",granImage1,1090,50,0.3,1,rs);		FUNGRID.addGameObject(gran14);			var granImage2 = new Image();	granImage2.src = "../imgimg/canvas_assets/gran2.png";	var gran21 = FUNGRID.gameObject("gran21",granImage2,450,59,0.3,1,rs);		FUNGRID.addGameObject(gran21);	var gran22 = FUNGRID.gameObject("gran22",granImage2,700,59,0.3,1,rs);		FUNGRID.addGameObject(gran22);		var gran23 = FUNGRID.gameObject("gran23",granImage2,900,59,0.3,1,rs);		FUNGRID.addGameObject(gran23);		var gran24 = FUNGRID.gameObject("gran24",granImage2,1200,59,0.3,1,rs);		FUNGRID.addGameObject(gran24);			var skyImage2 = new Image();	skyImage2.src = "../imgimg/canvas_assets/minisky.png";	var sky21 = FUNGRID.gameObject("sky21",skyImage2,50,25,0.3,0.3,rs,true,0.1);		FUNGRID.addGameObject(sky21);	var sky22 = FUNGRID.gameObject("sky22",skyImage2,600,35,0.35,0.35,rs,true,0.12);		FUNGRID.addGameObject(sky22);	var sky23 = FUNGRID.gameObject("sky23",skyImage2,1300,40,0.4,0.4,rs,true,0.11);		FUNGRID.addGameObject(sky23);		var skyImage = new Image();	skyImage.src = "../imgimg/canvas_assets/sky.png";	var sky1 = FUNGRID.gameObject("sky1",skyImage,10,10,0.5,0.5,rs,true,0.1);		FUNGRID.addGameObject(sky1);	var sky2 = FUNGRID.gameObject("sky2",skyImage,500,20,0.5,0.5,rs,true,0.12);		FUNGRID.addGameObject(sky2);	var sky3 = FUNGRID.gameObject("sky3",skyImage,1090,30,0.5,0.5,rs,true,0.11);		FUNGRID.addGameObject(sky3);						SBL.avatar = SBL.stripestuff("../imgimg/canvas_assets/avatar_krolle.png",1230,10);		SBL.linkus = SBL.stripestuff("../imgimg/canvas_assets/linkus_stripe.png",310,20);		SBL.fjell = SBL.stripestuff("../imgimg/canvas_assets/fjell_stripe.png",610,30);		SBL.bryter = SBL.stripestuff("../imgimg/canvas_assets/bryter_stripe.png",1010,60);		}SBL.stripestuff = function (u,x,y) {	var i = new Image();	i.src=u;	var g = FUNGRID.gameObject(u,i,x,y,1,1,FUNGRID.createRepeatSettings(Math.max(window.innerWidth+100,1600)));		return FUNGRID.addGameObject(g);	}SBL.init = function () {	window.onresize = function(){   		if(SBL.resizeTimeOut != null) clearTimeout(SBL.resizeTimeOut);  	 	resizeTimeOut = setTimeout(SBL.onResize, 100);	}	SBL.initFunGrid();		setInterval(SBL.update, FUNGRID.timeInterval);	FUNTOUCH.init();	FUNTOUCH.customTap = SBL.tap;}SBL.tap = function () {	// trace("tap "+FUNTOUCH.lastX+", "+FUNTOUCH.lastY+" hus: "+SBL.hus.canvasPosX+", "+SBL.hus.canvasPosY);	if (FUNTOUCH.lastX>=SBL.linkus.canvasPosX && FUNTOUCH.lastX<=SBL.linkus.canvasPosX+SBL.linkus.image.width) {		window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/?p=68";	}	if (FUNTOUCH.lastX>=SBL.bryter.canvasPosX && FUNTOUCH.lastX<=SBL.bryter.canvasPosX+SBL.bryter.image.width) {		window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/?p=72";	}	if (FUNTOUCH.lastX>=SBL.avatar.canvasPosX && FUNTOUCH.lastX<=SBL.avatar.canvasPosX+SBL.avatar.image.width) {		window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/?page_id=169";	}}SBL.update = function () {		if (FUNTOUCH.isDown) {		if (SBL.lastX) {			FUNGRID.moveViewport(FUNGRID.vpX+SBL.lastX-FUNTOUCH.lastX,FUNGRID.vpY);		}		SBL.lastX = FUNTOUCH.lastX;	} else {		SBL.lastX = null;	}	FUNGRID.update();}