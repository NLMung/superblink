var STR = {};


var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
	if (SBFELLES.avatarURL) {
         STR.init(SBFELLES.avatarURL);
} else {
STR.init("");
}

        clearInterval(readyStateCheckInterval);
    }
}, 10);

window.onresize = function () {
    STR.onResize();
}
STR.onResize = function () {
    STR.init2();
};

STR.init = function (avatarPath) {
	
	STR.paused = false;
    console.log("STR.init "+avatarPath);
    STR.avatarPath = avatarPath;
    STR.canvas = document.getElementById("canvas_stripe");
    if (!STR.canvas) {
	    console.log("Ingen canvas_stripe!");
	    return;
    }
 

   // var path = "stripe-assets/";
   var path = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/stripe-assets/";
var mins = path+"minsuperblink.png";
  if (avatarPath==="") {
            avatarPath = path+"minsuperblink.png";
    } else {
	mins = path+"minsuperblink_kuntekst.png";
}
  
    STR.lastX = null;
    STR.lastY = null;
    STR.firstTouch = false;
    if (window.innerWidth>990) {
        STR.firstTouch = true;
    }
    var manifest = [{id: "bg", src: path+"stripetex2.png"},
        // {id: "icons", src: "stripe-assets/stripelinkicon.png"},
        {id: "sky1", src: path+"sky1.png"},
        {id: "sky2", src: path+"sky2.png"},
        {id: "sky3", src: path+"sky3.png"},
        {id: "spill", src: path+"spill.png"},
        {id: "min", src: mins},
  /*      {id: "bm", src: path+"misjonsprosjekt.png"}, */
        {id: "superstoff", src: path+"superstoff.png"},
        /* {id: "klubben", src: path+"klubben.png"}, */
        {id: "stillested", src: path+"stillested.png"},
        {id: "superfortellinger", src: path+"superfortellinger.png"},
        {id: "lyd", src: path+"lyd.png"},
        {id: "video", src: path+"video.png"},
        {id: "sp1", src: path+"superpedia1.png"},
        {id: "sp2", src: path+"superpedia2.png"},
        {id: "sp3", src: path+"superpedia3.png"},
        {id: "avatar", src: avatarPath}];
   
    SUPERLOAD.init("canvas_stripe", "rgba(0,0,0,0)", "rgba(0,0,0,0.25)", manifest, [], STR.init2);
}

STR.bg = function (x,repeatEveryX) {
    var bak = FUNGRID.GameObject("bg"+x,SUPERLOAD.getGraphic("bg"),x/0.5,0,0.5,0.5);
        bak.addSprite("idle",1,0,698,190,0,0,700,190);
        bak.repeatSettings = FUNGRID.RepeatSettings(repeatEveryX);
        return bak;
}

STR.down = function () {
	FUNTOUCH.preventDefault = false;
  STR.firstTouch = true;
}

STR.addMenuElement = function (go) {
    go.posY = 15;
   //  go.repeatSettings = FUNGRID.RepeatSettings(Math.max(window.innerWidth+300, 11*200));
    FUNGRID.addGameObject(go);
}

STR.init2 = function () {
    if (STR.canvas) {
        STR.canvas.width = window.innerWidth;
    }
    FUNGRID.init("canvas_stripe",1);
    FUNGRID.doClearCanvas = true;
    FUNTOUCH.init("canvas_stripe",1);
    FUNTOUCH.customTap = STR.tap;
    FUNTOUCH.customDown = STR.down;
    var bgs = Math.ceil(window.innerWidth/700)+1;
    for (var i = 0; i<bgs; i++) {
        FUNGRID.addGameObject(STR.bg(i*700,bgs*700));
    }

    var sky1 = FUNGRID.GameObject("sky1", SUPERLOAD.getGraphic("sky1"),0*window.innerWidth*0.25/0.7,30,0.7,0.7);
    sky1.speedX = 0.01;
    sky1.moveable = true;
    STR.addMenuElement(sky1);
    var sky2 = FUNGRID.GameObject("sky2", SUPERLOAD.getGraphic("sky2"),1*window.innerWidth*0.25/0.7,30,0.7,0.7);
    sky2.speedX = 0.01;
    sky2.moveable = true;
    STR.addMenuElement(sky2);
    var sky3 = FUNGRID.GameObject("sky3", SUPERLOAD.getGraphic("sky3"),2*window.innerWidth*0.25/0.7,30,0.7,0.7);
    sky3.speedX = 0.01;
    sky3.moveable = true;
    STR.addMenuElement(sky3);
    var sky4 = FUNGRID.GameObject("sky4", SUPERLOAD.getGraphic("sky2"),3*window.innerWidth*0.25/0.7,30,0.7,0.7);
sky4.speedX = 0.01;
    sky4.moveable = true;
    STR.addMenuElement(sky4);


    STR.spill = FUNGRID.GameObject("spill", SUPERLOAD.getGraphic("spill"),0,0,1,1);
    STR.addMenuElement(STR.spill);
    STR.superstoff = FUNGRID.GameObject("superstoff", SUPERLOAD.getGraphic("superstoff"),200,0,1,1);
    STR.addMenuElement(STR.superstoff);
    STR.min = FUNGRID.GameObject("min", SUPERLOAD.getGraphic("min"),400,0,1,1);
    STR.addMenuElement(STR.min);
    /* STR.bm = FUNGRID.GameObject("bm", SUPERLOAD.getGraphic("bm"),600,0,1,1);
    STR.addMenuElement(STR.bm); 
    STR.klubben = FUNGRID.GameObject("klubben", SUPERLOAD.getGraphic("klubben"),800,0,1,1);
    STR.addMenuElement(STR.klubben); */
    STR.stillested = FUNGRID.GameObject("stillested", SUPERLOAD.getGraphic("stillested"),600,0,1,1);
    STR.addMenuElement(STR.stillested);
    STR.superfortellinger = FUNGRID.GameObject("superfortellinger", SUPERLOAD.getGraphic("superfortellinger"),800,0,1,1);
    STR.addMenuElement(STR.superfortellinger);
    STR.video = FUNGRID.GameObject("video", SUPERLOAD.getGraphic("video"),1000,0,1,1);
    STR.addMenuElement(STR.video);
    STR.lyd = FUNGRID.GameObject("lyd", SUPERLOAD.getGraphic("lyd"),1200,0,1,1);
    STR.addMenuElement(STR.lyd);
    STR.sp1 = FUNGRID.GameObject("sp1", SUPERLOAD.getGraphic("sp1"),1400,0,1,1);
    STR.addMenuElement(STR.sp1);
  
if (SUPERLOAD.getGraphic("avatar") && STR.avatarPath!=="") {
    STR.avatar = FUNGRID.GameObject("avatar", SUPERLOAD.getGraphic("avatar"),455,10,1,1);
    STR.avatar.addSprite("idle",0,0,256,420,0,0,96,158);
    // STR.avatar.repeatSettings = FUNGRID.RepeatSettings(Math.max(window.innerWidth+300, 11*200));
    FUNGRID.addGameObject(STR.avatar);
}
    if (STR.updateInterval) {
        clearInterval(STR.updateInterval);
    }
    STR.updateInterval = setInterval(STR.update, FUNGRID.timeInterval);

}

STR.update = function () {
	if (!STR.paused) {
    if (FUNTOUCH.isDown) {
        if (STR.lastX) {
        	if (STR.lastY) {
        	STR.dy = STR.lastY-FUNTOUCH.lastY;
        	}
        	STR.dx = STR.lastX-FUNTOUCH.lastX;
        	if (Math.abs(STR.dy)>Math.abs(STR.dx)) {
	        	FUNTOUCH.preventDefault = false;
        	} else {
	        	FUNTOUCH.preventDefault = true;	
        	}
            FUNGRID.moveViewport(FUNGRID.getViewport().x+STR.dx,FUNGRID.getViewport().y);
        }
        STR.lastY = FUNTOUCH.lastY;
        STR.lastX = FUNTOUCH.lastX;
    } else {
    	if (STR.dx) {
    		STR.dx *= 0.9;
    		if (Math.abs(STR.dx)<1) {
	    		STR.dx = 0;
    		}
    		FUNGRID.moveViewport(FUNGRID.getViewport().x+STR.dx,FUNGRID.getViewport().y);
    		}
        STR.lastX = null;
    }
    if (!STR.firstTouch) {
        FUNGRID.moveViewport(FUNGRID.getViewport().x+1,FUNGRID.getViewport().y);
    }
    FUNGRID.update();
    FUNTOUCH.setCursorStyle("default");
    if (STR.min.inside(FUNTOUCH.X, FUNTOUCH.Y)
    || STR.spill.inside(FUNTOUCH.X, FUNTOUCH.Y)
    || STR.superstoff.inside(FUNTOUCH.X, FUNTOUCH.Y)
   /*  || STR.bm.inside(FUNTOUCH.X, FUNTOUCH.Y)
    || STR.klubben.inside(FUNTOUCH.X, FUNTOUCH.Y) */
    || STR.stillested.inside(FUNTOUCH.X, FUNTOUCH.Y)
    || STR.superfortellinger.inside(FUNTOUCH.X, FUNTOUCH.Y)
    || STR.video.inside(FUNTOUCH.X, FUNTOUCH.Y)
    || STR.lyd.inside(FUNTOUCH.X, FUNTOUCH.Y)
    || STR.sp1.inside(FUNTOUCH.X, FUNTOUCH.Y)) {
	    FUNTOUCH.setCursorStyle("pointer");
    }
    
    }
}
STR.tap = function () {
    console.log(FUNTOUCH.lastX+", "+FUNTOUCH.lastY+"   "+STR.stillested.canvasPosX);

    if (STR.min.inside(FUNTOUCH.lastX, FUNTOUCH.lastY)) {
        window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/min-superblink/";
    } else if (STR.spill.inside(FUNTOUCH.lastX, FUNTOUCH.lastY)) {
        window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/category/spill/";
    } else if (STR.superstoff.inside(FUNTOUCH.lastX, FUNTOUCH.lastY)) {
        window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/category/nyheter/";
        // http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/category/sistenyheter/
   // } else if (STR.bm.inside(FUNTOUCH.lastX, FUNTOUCH.lastY)) {
    //    window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/mer/barnas-misjonsprosjekt/"; 
     //  // window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/category/superpedia/";
    //} else if (STR.klubben.inside(FUNTOUCH.lastX, FUNTOUCH.lastY)) {
     //  window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/klubben/";
       // window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/category/superpedia/";
    } else if (STR.stillested.inside(FUNTOUCH.lastX, FUNTOUCH.lastY)) {
        window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/mer/stille-sted/";
    } else if (STR.superfortellinger.inside(FUNTOUCH.lastX, FUNTOUCH.lastY)) {
        window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/superfortellinger/";
    } else if (STR.video.inside(FUNTOUCH.lastX, FUNTOUCH.lastY)) {
        window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/category/video/";
    } else if (STR.lyd.inside(FUNTOUCH.lastX, FUNTOUCH.lastY)) {
        window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/category/lyd/";
    } else if (STR.sp1.inside(FUNTOUCH.lastX, FUNTOUCH.lastY)) {
        window.location.href = "http://ec2-54-194-141-44.eu-west-1.compute.amazonaws.com/category/superpedia/";
    }
}