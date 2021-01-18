STR = (function () {
	var paused = false;
	var avatarPath = "";
	var roomPath = "";
	var unreadCount = 0;
	var unreadString = "";
	var canvas;
	var context;
	var lastX = null;
	var lastY = null;
	var firstTouch = false;
	var autoSpeed = 1;
	var updateInterval;
	var buttons;
	var buttonsX = 0;
	var dx;
	var dy;
	var avatar;
	var hasTouch;
	var dg = 0;
	var noFlashURL = "";
	
	

	
	function init(avatarPth, unread, sbid, dgm, noFlash) {
		paused = false;
		console.log("STR.init "+avatarPth);
		avatarPath = avatarPth;
		
		if (noFlash===1) {
			noFlashURL = "?noFlash=1";
		} else if (noFlash===2) {
			noFlashURL = "?noFlash=1&neverFlash=1";
		}
		
		if (unread!==null) {
		unreadCount = unread;
		if (unreadCount>0) {
			if (unreadCount==1) {
				unreadString = " (1 NY!)";
			} else {
				unreadString = " ("+unreadCount+" NYE!)";
			}
		}
		}
		
		if (sbid!==null && sbid!==undefined) {
			roomPath = "../avatars/"+sbid+"_ute_stripe.png";
			dg = dgm;
		} else {
			sbid="";
		}
	    
		canvas = document.getElementById("canvas_stripe");
		if (!canvas) {
	    	console.log("Ingen canvas_stripe!");
			return;
		}
		context = canvas.getContext("2d");
		var path = "../stripe-assets/";
		var mins = path+"minsuperblink.png";
		if (window.innerWidth>990) {
        	// firstTouch = true;
        	autoSpeed = 0.5;
		}
		
		var bgcolors = ["blue","brown","green","green2","orange","pink","purple","red","yellow","orange2","lilla"];
		
		if (sbid!=="") {
			var manifest = [
				{id: "bg", src: path+"stripe_bg_"+bgcolors[SBFELLES.cat]+".png"},
		        {id: "sky1", src: path+"sky1.png"},
		        {id: "sky2", src: path+"sky2.png"},
		        {id: "sky3", src: path+"sky3.png"},
		        {id: "min", src: mins},
				{id: "buttons", src: path+"stripesprites.png?ny=11"},
		        {id: "avatar", src: avatarPath},
		        {id: "room", src: roomPath}
	        ];
        } else {
	        var manifest = [
	        	{id: "bg", src: path+"stripe_bg_"+bgcolors[SBFELLES.cat]+".png"},
		        {id: "sky1", src: path+"sky1.png"},
		        {id: "sky2", src: path+"sky2.png"},
		        {id: "sky3", src: path+"sky3.png"},
		        {id: "min", src: mins},
				{id: "buttons", src: path+"stripesprites.png?ny11"}
			];
        }
   
		SUPERLOAD.init("canvas_stripe", "rgba(0,0,0,0)", "rgba(0,0,0,0.25)", manifest, [], init2);
	}
	function init2() {
	buttonsX = 0;
    if (canvas) {
        canvas.width = (window.innerWidth);
    }
    FUNGRID.init("canvas_stripe",1);
    FUNGRID.doClearCanvas = true;
    FUNTOUCH.init("canvas_stripe",1);
    FUNTOUCH.customTap = tap;
    FUNTOUCH.customDown = down;
    hasTouch = FUNTOUCH.isTouchSupported();
    var bgs = Math.ceil(window.innerWidth/700)+1;
    for (var i = 0; i<bgs; i++) {
        FUNGRID.addGameObject(bg(i*700,bgs*700));
    }

    var sky1 = FUNGRID.GameObject("sky1", SUPERLOAD.getGraphic("sky1"),0*window.innerWidth*0.25/0.7,30,0.7,0.7);
    sky1.speedX = 1;
    sky1.moveable = true;
    addMenuElement(sky1);
    var sky2 = FUNGRID.GameObject("sky2", SUPERLOAD.getGraphic("sky2"),1*window.innerWidth*0.25/0.7,30,0.7,0.7);
    sky2.speedX = 1;
    sky2.moveable = true;
    addMenuElement(sky2);
    var sky3 = FUNGRID.GameObject("sky3", SUPERLOAD.getGraphic("sky3"),2*window.innerWidth*0.25/0.7,30,0.7,0.7);
    sky3.speedX = 1;
    sky3.moveable = true;
    addMenuElement(sky3);
    var sky4 = FUNGRID.GameObject("sky4", SUPERLOAD.getGraphic("sky2"),3*window.innerWidth*0.25/0.7,30,0.7,0.7);
sky4.speedX = 1;
    sky4.moveable = true;
    addMenuElement(sky4);
    buttons = [];
    
    if (SUPERLOAD.getGraphic("avatar") && avatarPath!=="") {
		//  addButton({id:"forsiden", url:"", x:795, w:110, offX:-55, title:"HVA SKJER?"});
    	addButton({id:"forsiden", url:"", x:1885, w:287, offX:-144, title:"HVA SKJER?"});
    } else {
		addButton({id:"forsiden", url:"", x:1885, w:287, offX:-144, title:"FORSIDEN"});
	}
    if (SBFELLES.julekalender) {
		addButton({id:"JULEKALENDER", url:"julekalender/", x:2738, w:152, offX:-76, title:"JULEKALENDER"});
	}
	//addButton({id:"terning", url:"paskekonkurranse/", x:3164, w:129, offX:0, title:"PÅSKEKONKURRANSE"});

    if (SUPERLOAD.getGraphic("avatar") && avatarPath!=="") {
	    addButton({id:"min", url:"min-superblink/", x:646, w:100, offX:0, title:"MIN SUPERBLINK"});
    
    	buttons[buttons.length-1].visible = false;
    	// avatar = FUNGRID.GameObject("avatar", SUPERLOAD.getGraphic("avatar"),80,15,1,1);
    	avatar = FUNGRID.GameObject("avatar", SUPERLOAD.getGraphic("avatar"),buttons[buttons.length-1].posX+40,15,1,1);
    	avatar.addSprite("idle",0,0,128,210,-80,0,85,140);
		// STR.avatar.repeatSettings = FUNGRID.RepeatSettings(Math.max(window.innerWidth+300, 11*200));
		FUNGRID.addGameObject(avatar);
	}
	if (SUPERLOAD.getGraphic("avatar") && avatarPath!=="") {
    	addButton({id:"room", url:"min-superblink/rom/", x:0, w:135, offX:-50, title:"MITT ROM"});
    	addButton({id:"postkassa", url:"min-superblink/postkassa/", x:164, w:200, offX:-96, title:"POSTKASSA"+unreadString});
    	addButton({id:"butikken", url:"min-superblink/butikken/", x:488, w:166, offX:-90, title:"BUTIKKEN"});
    	// addButton({id:"supersnakk", url:"min-superblink/supersnakk/", x:662, w:122, offX:-64, title:"SUPERSNAKK"});
    }
    // addButton({id:"egg", url:"eggjakt/", x:3090, w:71, offX:-35, title:"EGGJAKT"});
	addButton({id:"spill", url:"kategori/spill/"+noFlashURL, x:359, w:132, offX:-73, title:"SPILL"});
    addButton({id:"nyheter", url:"kategori/nyheter/", x:1723, w:119, offX:-79,title:"NYHETER"});
    addButton({id:"lesekroken", url:"kategori/lesekroken/", x:2478, w:120, offX:-55,title:"LESEKROKEN"});
    addButton({id:"stillested", url:"mer/stille-sted/", x:907, w:210,  offX:-112, title:"STILLE STED"});
	addButton({id:"misjonsprosjekt", url:"barnas-misjonsprosjekt", x:2610, w:125,  offX:-67, title:"BARNAS MISJONSPROSJEKT"});
    
    if (SBFELLES.vitsebok) {
	    addButton({id:"vitseboka", url:"vitseboka/alle-vitser/", x:2303, w:174,  offX:-96, title:"VITSEBOKA"});
    }
    
    addButton({id:"superfortellinger", url:"superfortellinger/", x:8, w:137, offX:-70, title:"SUPERFORTELLINGER"});
    addButton({id:"video", url:"kategori/video/", x:1539, w:171, offX:-105, title:"VIDEO"});
    addButton({id:"lyd", url:"kategori/lyd/", x:1368, w:162, offX:-95, title:"LYDROMMET"});
    addButton({id:"sp1", url:"kategori/superpedia/", x:1126, w:219, offX:-124, title:"SUPERPEDIA"});
    
    if (SUPERLOAD.getGraphic("avatar") && avatarPath!=="" && dg>0)  {
	    if (dg==24) {
	    	addButton({id:"julegave", url:"dagens-gullmynt/", x:2900, w:192, offX:-100, title:"JULEGAVE"});
/*	    } else if (dg==10) {
		    addButton({id:"julegave", url:"dagens-gullmynt/", x:2900, w:192, offX:-100, title:"JUBILEUMSGAVE"}); */
	    } else {
		   addButton({id:"gull", url:"dagens-gullmynt/", x:2186, w:109, offX:-55, title:"DAGENS GULLMYNT"}); 
	    }
    }
    
    FUNGRID.viewportSettings(-300,buttonsX+300-FUNGRID.width(),-100,200);
    
    if (updateInterval) {
        clearInterval(updateInterval);
    }
    updateInterval = setInterval(update, 25);


}
	function addButton(b) {
		if (b.id==="room") {
			var btn = FUNGRID.GameObject(b.id, SUPERLOAD.getGraphic("room"),buttonsX+Math.round(0.5*b.w),22,1,1);
		} else {
		var btn = FUNGRID.GameObject(b.id, SUPERLOAD.getGraphic("buttons"),buttonsX+Math.round(0.5*b.w),10,1,1);
		}
		buttonsX += b.w+30;
		var offX = -Math.round(0.5*b.w);
		if (b.offX) {
			offX = b.offX;
		}
		if (b.id==="room") {
			btn.addSprite("idle", 0,0,100,136,offX,0);
		} else {
			btn.addSprite("idle", b.x,0,b.w,160,offX,0);
		}
		btn.url = b.url;
		btn.title = b.title;
		buttons.push(btn);
		FUNGRID.addGameObject(btn);
	}


	function onResize() {
		init2();
	}
	function bg (x,repeatEveryX) {
    	var bak = FUNGRID.GameObject("bg"+x,SUPERLOAD.getGraphic("bg"),x/0.5,0,0.5,0.5);
        bak.addSprite("idle",1,0,698,190,0,0,700,190);
        bak.repeatSettings = FUNGRID.RepeatSettings(repeatEveryX);
        return bak;
	}
	function down() {
		FUNTOUCH.preventDefault = false;
		firstTouch = true;
	}
	function addMenuElement(go) {
	    go.posY = 15;
	   go.repeatSettings = FUNGRID.RepeatSettings(Math.max(window.innerWidth+300, 11*200));
	    FUNGRID.addGameObject(go);
	}
	function update() {
	if (!paused) {
    if (FUNTOUCH.isDown) {
        if (lastX) {
        	if (lastY) {
        	dy = lastY-FUNTOUCH.lastY;
        	}
        	dx = lastX-FUNTOUCH.lastX;
        	if (Math.abs(dy)>Math.abs(dx)) {
	        	FUNTOUCH.preventDefault = false;
        	} else {
	        	FUNTOUCH.preventDefault = true;	
        	}
            FUNGRID.moveViewport(FUNGRID.getViewport().x+dx,FUNGRID.getViewport().y);
        }
        lastY = FUNTOUCH.lastY;
        lastX = FUNTOUCH.lastX;
    } else {
    	if (dx) {
    		dx *= 0.9;
    		if (Math.abs(dx)<1) {
	    		dx = 0;
    		}
    		FUNGRID.moveViewport(FUNGRID.getViewport().x+dx,FUNGRID.getViewport().y);
    		}
        lastX = null;
    }
    if (!firstTouch) {
        FUNGRID.moveViewport(FUNGRID.getViewport().x+autoSpeed,FUNGRID.getViewport().y);
        if (FUNGRID.getViewport().x>buttonsX-canvas.width) {
	        FUNGRID.setFutureViewport(0,0);
	        firstTouch = true;
        }
    }
    FUNGRID.update();
    
    context.font = '14px Open Sans';
    context.textAlign = 'center';
    context.fillStyle = '#FFFFFF';
    
    FUNTOUCH.setCursorStyle("default");
    for (var i=0;i<buttons.length; i++) {
	    if (buttons[i].inside(FUNTOUCH.X,FUNTOUCH.Y) || hasTouch) {
		    FUNTOUCH.setCursorStyle("pointer");
		    context.fillText(buttons[i].title,buttons[i].canvasPosX,175);
	    }
    }    
    }
}
function tap() {
	for (var i=0;i<buttons.length; i++) {
	    if (buttons[i].inside(FUNTOUCH.lastX,FUNTOUCH.lastY)) {
		   window.location.href = "/"+buttons[i].url;
		   return;
	    }
    }    
}
function togglePause() {
	paused = !paused;
}
	
	return {
   		init:init,
   		togglePause:togglePause,
   		onResize:onResize
	};
})();



/* var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
    if (SBFELLES) {
		if (SBFELLES.avatarURL) {
         STR.init(SBFELLES.avatarURL, SBFELLES.unreadCount, SBFELLES.sbid);
		 } else {
			 STR.init("");
		}
		}
        clearInterval(readyStateCheckInterval);
    }
}, 10); */

window.onresize = function () {
    STR.onResize();
}





