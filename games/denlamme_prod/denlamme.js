var DL = {};
DL.orientationWarning = false;
DL.s = 1;
window.onresize = function () {
    DL.onResize();
}
DL.onResize = function () {
    DL.orientationWarning = false;
    if (window.screen.width<window.screen.height && window.innerWidth<=480*DL.s) {
       DL.orientationWarning = true;
    }
};

DL.init = function (scale) {
	DL.lang = "no";
	DL.s = scale || 1;
    DL.onResize();
    DL.firstJump = true;
  DL.level = 0;
  var manifest;
  
  
  var grls = [106, 107, 201, 204, 206, 207, 1524, 1603, 1606];
  var boyz = [200, 202, 205, 211, 223, 225, 244, 1602, 1605];
  var avatars = [grls[Math.floor(Math.random()*grls.length)],7,8,boyz[Math.floor(Math.random()*boyz.length)]];
  if (Math.random()<0.5) {
	  avatars = [boyz[Math.floor(Math.random()*boyz.length)],8,7,grls[Math.floor(Math.random()*grls.length)]];
  }
  if (user_id!=null && user_id>0) {
	  avatars = [user_id, grls[Math.floor(Math.random()*grls.length)], 7 ,boyz[Math.floor(Math.random()*boyz.length)]];
	  if (Math.random()<0.5) {
		  avatars = [user_id, 7, boyz[Math.floor(Math.random()*boyz.length)], grls[Math.floor(Math.random()*grls.length)]];
		  }
		  avatars = [user_id, v1, v2, v3];
  }
  
  

  if (DL.s==2) {
     manifest = [/* {id: "intro", src: "gfx/intro.png"} ,*/ {id: "sprites", src: "gfx/sprites.png"}, {id: "avatar1", src: "/wp-content/themes/superblink2/avatars/"+avatars[0]+"_128.png"},{id: "avatar2", src: "/wp-content/themes/superblink2/avatars/"+avatars[1]+"_128.png"},{id: "avatar3", src: "/wp-content/themes/superblink2/avatars/"+avatars[2]+"_128.png"},{id: "avatar4", src: "/wp-content/themes/superblink2/avatars/"+avatars[3]+"_128.png"}];
    } else {
    manifest = [/* {id: "intro", src: "gfx/intro_05.png"},*/ {id: "sprites", src: "gfx/sprites_05.png"},{id: "avatar1", src: "/wp-content/themes/superblink2/avatars/"+avatars[0]+"_64.png"},{id: "avatar2", src: "/wp-content/themes/superblink2/avatars/"+avatars[1]+"_64.png"},{id: "avatar3", src: "/wp-content/themes/superblink2/avatars/"+avatars[2]+"_64.png"},{id: "avatar4", src: "/wp-content/themes/superblink2/avatars/"+avatars[3]+"_64.png"}];
    
    }

  SUPERLOAD.init("canvas", "black","#FFFF66",manifest,[{id: "menumusic", mp3: "gfx/menumusic.mp3"}, {id: "ingamemusic", mp3: "gfx/ingamemusic.mp3"}, {id: "hitrock1", mp3: "gfx/hitrock1.mp3"}, {id: "hitrock2", mp3: "gfx/hitrock2.mp3"}, {id: "poeng", mp3: "gfx/poeng.mp3"}, {id: "bonus", mp3: "gfx/bonus2.mp3"}, {id: "star", mp3: "gfx/star.mp3", ogg: "gfx/star.ogg"}, {id: "frisk", mp3: "gfx/frisk.mp3"}, {id: "hitwood", mp3: "gfx/hitwood.mp3"}, {id: "swishstop", mp3: "gfx/swishstop.mp3"}, {id: "swishfall", mp3: "gfx/swishfall.mp3"}, {id: "swish2", mp3: "gfx/swish2.mp3"}, {id: "swish1", mp3: "gfx/swish1.mp3"}],DL.init2);
    
   
    DL.tilstand = "INTRO1";
    
    if(typeof(Storage)!=="undefined") {
    if(localStorage.DLrekord) {
    	DL.rekord = JSON.parse(localStorage.DLrekord);
    } else {
    	DL.rekord = 0;
	    localStorage.DLrekord = JSON.stringify(DL.rekord);
    }
    if(localStorage.DLrekordholder) {
    	DL.rekordholder = JSON.parse(localStorage.DLrekordholder);
    } else {
    	DL.rekordholder = "Linkus";
	    localStorage.DLrekordholder = JSON.stringify(DL.rekordholder);
    }
    if(localStorage.DLrekordtelefon) {
    	DL.rekordtelefon = JSON.parse(localStorage.DLrekordtelefon);
    } else {
    	DL.rekordtelefon = 0;
	    localStorage.DLrekordtelefon = JSON.stringify(DL.rekordtelefon);
    }
    if(localStorage.DLspilleliste) {
    	DL.spilleliste = JSON.parse(localStorage.DLspilleliste);
    } else {
    	DL.spilleliste = [];
	    localStorage.DLspilleliste = JSON.stringify(DL.spilleliste);
    }
  } else {
  // Sorry! No web storage support..
  DL.rekord = 0;
  DL.rekordholder = "Linkus";
  DL.rekordtelefon = 0;
  DL.spilleliste = [];
  }
   
}

SCRT = {};
DL.initGameOver = function (finito) {
	if (finito) {
		DL.menyBildeGO.visible = false;
		DL.a1GO.visible = false;
     	DL.a2GO.visible = true;
         DL.a3GO.visible = true;
		 DL.a4GO.visible = true;
		 DL.a5GO.visible = true;
		 DL.friskGO .visible = true;

	} else {
		DL.menyBildeGO.visible = true;
		DL.a1GO.visible = true;
     	DL.a2GO.visible = false;
         DL.a3GO.visible = false;
		 DL.a4GO.visible = false;
		 DL.a5GO.visible = false;
		 DL.friskGO .visible = false;
	}
	
	SUPERLOAD.lagre(40,(Math.max(DL.hearts,0)*10)+Math.max(DL.stars,0));
	
	DL.tilstand = "GAMEOVER";
	SUPERLOAD.getSound("ingamemusic").stop();
	     SUPERLOAD.getSound("menumusic").loop(true);
                SUPERLOAD.getSound("menumusic").play();
	}
DL.initGame = function (g, x) {
	if (g==1) {
		SCRT.game_id = SCRT.c+SCRT.b;
		DL.score = 0;
		//DL.stars = 0;
		DL.lam.posX = 2495;
		DL.lam.posY = 92;
		DL.lam.visible = true;
		DL.frisk.visible = false;
	DL.scorestar.visible = true;
		DL.pilNed.visible = true;
	       DL.pilOpp.visible = true;
	     DL.lamplukk = false;
		 DL.levelY = 68;
		 DL.levelYsize = 22;
		 DL.playerPosition = 3;
		 DL.friends = 0;
		 DL.fall = false;
		 //DL.lam.setSpriteIndex(0);
		 DL.fallteller = 0;
		  DL.avatarSettings(DL.a1, 0, 0, 0, 0.8);
    DL.avatarSettings(DL.a2, 1, -40, 0, 0.6);
    DL.avatarSettings(DL.a3, 2, -20, DL.levelYsize, 0.7);
    DL.avatarSettings(DL.a4, 3, -60, DL.levelYsize, 0.9);
    
    
    
    if (x==undefined) {
	    DL.stars = 0;
DL.hearts = 3;
    for (var i=0; i<DL.allstars.length; i++) {
		     if (DL.allstars[i].posY<0) {
		  DL.allstars[i].posY += 1000;   
		  }
		  }
		  
		  }
    
    if (x==undefined) {
	} else if (x<885) {
		
	}   else if (x<1300) {
		DL.a1.posX = 895;
		DL.playerPosition = 2;
		DL.a1.posY = DL.levelY+DL.levelYsize*2;
	}  else if (x<1880) {
		DL.a1.posX = 1310;
		DL.a2.plukket = true;
		DL.friends = 1;
		DL.playerPosition = 4;
		DL.a1.posY = DL.levelY+DL.levelYsize*4;
	} else if (x<2495) {
		DL.a1.posX = 1890;
		DL.a2.plukket = true;
		DL.a3.plukket = true;
		DL.friends = 2;
		DL.playerPosition = 4;
		DL.a1.posY = DL.levelY+DL.levelYsize*4;
	} else {
		DL.a1.posX = 2505;
		DL.a2.plukket = true;
		DL.a3.plukket = true;
		DL.a4.plukket = true;
		DL.friends = 3;
		DL.playerPosition = 1;
		DL.a1.posY = DL.levelY+DL.levelYsize*1;
	}
     DL.tilstandTime = 0;
	     DL.tilstand = "GAME1";
		 DL.a1.posY = DL.playerPosition*DL.levelYsize+DL.levelY + Math.floor(3*Math.sin(DL.tilstandTime*0.8));
	     DL.a1.view = "GAME1";
	     DL.a1.scaleX = DL.a1.scaleY = 0.5;
	     FUNGRID.setFutureViewport(DL.a1.posX-140, 0);
	     FUNGRID.moveViewport(DL.a1.posX-140, 0);
	     
	     
	} if (g==3) {
		
    for (var i = 0; i<DL.bonusStars.length; i++) {
   
    	DL.bonusStars[i].visible = true;
    }
    
    for (var i = 0; i<DL.murstein.length; i++) {
			      DL.murstein[i].visible = true;
			      }
		
		DL.nesteMurstein = 1;
		DL.murtid = 0;
		DL.pilNed.visible = false;
	       DL.pilOpp.visible = false;
	       DL.a1.posX = 3675;
	       DL.a2.posX = 3603;
	       DL.a3.posX = 3680;
	       DL.a4.posX = 3595;
	       DL.a3.posY = DL.a4.posY = -278;
	       DL.a1.posY = DL.a2.posY = -282;
	       DL.lam.posY = -299;
	       DL.lam.posX = 3635;
		 DL.tilstand = "GAME3";
	} else if (g==4) {
		for (var i=0; i<DL.vstars.length; i++) {
		     if (DL.vstars[i].posY<-500) {
		  DL.vstars[i].posY += 1000;   
		  }
		  }
		for (var i = 0; i<DL.bonusStars.length; i++) {
    	DL.bonusStars[i].spriteIndex = 0;
    	}
    	DL.murtid = 0;
    	DL.bonus = 10;
		 DL.fall4 = false;
	    DL.gulvtreff = false;
	    DL.gulvtrefftid = 0;
	    DL.lam4.visible = true;
	    DL.lam4.posX = 3635;
	    DL.lam4.posY = -250;
	    DL.lam4.accelerationY = 0;
			     DL.lam4.speedY = 0;
	    DL.lam.visible = false;
	    DL.l4tau1.visible = true;
	    DL.l4tau2.visible = true;
	    DL.l4tau3.visible = true;
	    DL.l4tau4.visible = true;
	     DL.fallstopp = 0;
	    DL.fall4 = false;
	    // FUNGRID.moveViewport(DL.lam4.posX-140, DL.lam4.posY-80);
	    DL.tilstand = "GAME4";
	    
	    DL.flokk.posY = 120;
	    
	}
}

DL.makestar = function(x,y) {
	DL.allstars.push(FUNGRID.GameObject("star",SUPERLOAD.getGraphic("sprites"),20*x,49+22*y,1,1));
	DL.allstars[DL.allstars.length-1].addSprite("star",60,100,26,26);
	FUNGRID.addGameObject(DL.allstars[DL.allstars.length-1],"GAME1");
}
DL.starpick = function(x,y,lyd) {
	if (lyd==null) {
	SUPERLOAD.getSound("poeng").play();
	} else {
		if (SUPERLOAD.getSound(lyd)!==undefined) {
			SUPERLOAD.getSound(lyd).play();
		}
	}
	DL.pickstar.visible = true;
	DL.stars +=1;
	DL.pickstar.posX = x;
	DL.pickstar.posY = y;
}

DL.init2 = function () {
DL.tilstandTime = 0;


FUNKEYS.initArrowsAndSpace();
FUNKEYS.customUpDown = DL.keypressUp;
FUNKEYS.customDownDown = DL.keypressDown;

FUNTOUCH.init("canvas", DL.s);
FUNTOUCH.setCursorStyle("pointer");
FUNTOUCH.customDown = DL.touchDown;
FUNTOUCH.customUp = DL.touchUp;


    FUNGRID.init("canvas", DL.s);
    FUNGRID.setClearCanvas(true);
    FUNGRID.clearCanvas();
    FUNGRID.viewportSettings(null,null,null,null);
    
 
 DL.himmel = FUNGRID.GameObject("himmel",SUPERLOAD.getGraphic("sprites"),0,0,0,0);
    DL.himmel.addSprite("himmel",0,0,50,50);
    DL.himmel.scaleX = 10;
    FUNGRID.addGameObject(DL.himmel,"GAME1");
    
    DL.bakke = FUNGRID.GameObject("bakke",SUPERLOAD.getGraphic("sprites"),0,50,0,0);
    DL.bakke.addSprite("bakke",0,50,50,55);
    DL.bakke.scaleX = 10;
    DL.bakke.scaleY = 3;
    FUNGRID.addGameObject(DL.bakke,"GAME1");
    
     DL.palme1 = FUNGRID.GameObject("palme1",SUPERLOAD.getGraphic("sprites"),500,42,0.5,1, FUNGRID.RepeatSettings(600,null,null,null,1500));
 DL.palme1.addSprite("plm",50,66,26,32);
 FUNGRID.addGameObject(DL.palme1,"GAME1");
 
 DL.palme2 = FUNGRID.GameObject("palme1",SUPERLOAD.getGraphic("sprites"),300,40,0.5,1, FUNGRID.RepeatSettings(520,null,null,null,1500));
 DL.palme2.addSprite("plm",76,66,26,34);
 FUNGRID.addGameObject(DL.palme2,"GAME1");
 
  DL.palme3 = FUNGRID.GameObject("palme1",SUPERLOAD.getGraphic("sprites"),600,42,0.5,1, FUNGRID.RepeatSettings(620,null,null,null,1500));
 DL.palme3.addSprite("plm",102,66,27,32);
 FUNGRID.addGameObject(DL.palme3,"GAME1");
 // 92, 114, 136, 158,180
 DL.s1 = FUNGRID.GameObject("s1",SUPERLOAD.getGraphic("sprites"),90,136,1,1, FUNGRID.RepeatSettings(600,0,-10,0,3000));
 DL.s1.addSprite("hull",50,0,40,22,-7,-18);
 FUNGRID.addGameObject(DL.s1,"GAME1");
 
  DL.s1b = FUNGRID.GameObject("s1b",SUPERLOAD.getGraphic("sprites"),290,136,1,1, FUNGRID.RepeatSettings(600,0,500,0,3000));
 DL.s1b.addSprite("hull",90,0,41,25,-7,-21);
 FUNGRID.addGameObject(DL.s1b,"GAME1");
 
 DL.s1c = FUNGRID.GameObject("s1b",SUPERLOAD.getGraphic("sprites"),490,136,1,1, FUNGRID.RepeatSettings(600,0,500,0,3000));
 DL.s1c.addSprite("hull",131,0,40,25,-10,-21);
 FUNGRID.addGameObject(DL.s1c,"GAME1");
 
  DL.s2 = FUNGRID.GameObject("s2",SUPERLOAD.getGraphic("sprites"),90,158,1,1, FUNGRID.RepeatSettings(800,0,-300,0,3000));
 DL.s2.addSprite("hull",90,0,41,25,-7,-21);
 FUNGRID.addGameObject(DL.s2,"GAME1");
 
 DL.s3 = FUNGRID.GameObject("s3",SUPERLOAD.getGraphic("sprites"),380,180,1,1, FUNGRID.RepeatSettings(800,0,-10,0,3000));
 DL.s3.addSprite("hull",131,0,40,25,-10,-21);
 FUNGRID.addGameObject(DL.s3,"GAME1");
 
 DL.s3b = FUNGRID.GameObject("s3",SUPERLOAD.getGraphic("sprites"),780,180,1,1, FUNGRID.RepeatSettings(800,0,-10,0,3000));
 DL.s3b.addSprite("hull",131,0,40,25,-10,-21);
 FUNGRID.addGameObject(DL.s3b,"GAME1");
 
  DL.s4 = FUNGRID.GameObject("s3",SUPERLOAD.getGraphic("sprites"),240,92,1,1, FUNGRID.RepeatSettings(600,0,-10,0,3000));
 DL.s4.addSprite("hull",50,0,40,22,-7,-18);
 FUNGRID.addGameObject(DL.s4,"GAME1");
 
  DL.s5 = FUNGRID.GameObject("s3",SUPERLOAD.getGraphic("sprites"),260,114,1,1, FUNGRID.RepeatSettings(800,0,-10,0,3000));
 DL.s5.addSprite("hull",131,0,40,25,-10,-21);
 FUNGRID.addGameObject(DL.s5,"GAME1");
 
 DL.s5b = FUNGRID.GameObject("s3",SUPERLOAD.getGraphic("sprites"),660,114,1,1, FUNGRID.RepeatSettings(800,0,-10,0,3000));
 DL.s5b.addSprite("hull",50,0,40,22,-7,-18);
 FUNGRID.addGameObject(DL.s5b,"GAME1");
 
 DL.k1 = FUNGRID.GameObject("s1",SUPERLOAD.getGraphic("sprites"),890,180,1,1);
 DL.k1.addSprite("hull",50,0,40,22,-7,-18);
 FUNGRID.addGameObject(DL.k1,"GAME1");
 
  DL.k2 = FUNGRID.GameObject("s1",SUPERLOAD.getGraphic("sprites"),1290,92,1,1);
 DL.k2.addSprite("hull",50,0,40,22,-7,-18);
 FUNGRID.addGameObject(DL.k2,"GAME1");
 
  DL.k3 = FUNGRID.GameObject("s1",SUPERLOAD.getGraphic("sprites"),1280,114,1,1);
 DL.k3.addSprite("hull",50,0,40,22,-7,-18);
 FUNGRID.addGameObject(DL.k3,"GAME1");
 
  DL.k4 = FUNGRID.GameObject("s1",SUPERLOAD.getGraphic("sprites"),2995,114,1,1);
 DL.k4.addSprite("hull",50,0,40,22,-7,-18);
 FUNGRID.addGameObject(DL.k4,"GAME1");
 
  DL.k5 = FUNGRID.GameObject("s1",SUPERLOAD.getGraphic("sprites"),2990,92,1,1);
 DL.k5.addSprite("hull",50,0,40,22,-7,-18);
 FUNGRID.addGameObject(DL.k5,"GAME1");
 
 DL.k6 = FUNGRID.GameObject("s1",SUPERLOAD.getGraphic("sprites"),3000,136,1,1);
 DL.k6.addSprite("hull",50,0,40,22,-7,-18);
 FUNGRID.addGameObject(DL.k6,"GAME1");
 
 
 DL.hulls = [DL.s1, DL.s1b, DL.s1c, DL.s2, DL.s3, DL.s3b, DL.s4, DL.s5, DL.s5b, DL.k1];
 
 DL.allstars = [];
 // Start
 DL.makestar(2,3);
 DL.makestar(9,1);
 DL.makestar(14,5);
 DL.makestar(18,1);
 DL.makestar(24,5);
  DL.makestar(27,4);
 DL.makestar(30,3);
 DL.makestar(33,1);
 DL.makestar(37,5);
 DL.makestar(39,2);
 // Venn 1
 DL.makestar(49,4);
 DL.makestar(55,1);
 DL.makestar(58,4);
 DL.makestar(61,1);
 // Venn 2
 DL.makestar(69,2);
 DL.makestar(80,1);
 DL.makestar(85,2);
 DL.makestar(90,1);
 // Venn 3
 DL.makestar(100,3);
 DL.makestar(105,4);
 DL.makestar(110,3);
 DL.makestar(118,1);
 DL.makestar(120,3);
 // Lamme
 DL.makestar(130,1);
 DL.makestar(140,1);
 DL.makestar(145,5);
 DL.makestar(148,3);

DL.menysteg = 0;
 
  DL.menyTittel = FUNGRID.GameObject("i",SUPERLOAD.getGraphic("sprites"),-400,35,1,1);
 DL.menyTittel.addSprite("meny",229,0,158,21,-79,0);
 FUNGRID.addGameObject(DL.menyTittel,"GAME1");
 
 DL.menyBilde = FUNGRID.GameObject("i",SUPERLOAD.getGraphic("sprites"),-400,80,1,1);
 DL.menyBilde.addSprite("meny",235,24,140,55,-70,0);
  DL.menyBilde.addSprite("meny",250,325,140,62,-70,-7);
 FUNGRID.addGameObject(DL.menyBilde,"GAME1");
 
  DL.menyBildeGO = FUNGRID.GameObject("i",SUPERLOAD.getGraphic("sprites"),200,160,0,0);
 DL.menyBildeGO.addSprite("meny",235,24,140,55,-70,0);
 FUNGRID.addGameObject(DL.menyBildeGO,"GAMEOVER");
 
 DL.a1GO = FUNGRID.GameObject("a1",SUPERLOAD.getGraphic("avatar1"),180,160,0,0);
    DL.a1GO.addSprite("a1",0,0,64,105,-32,-105);
    FUNGRID.addGameObject(DL.a1GO,"GAMEOVER");
     DL.a2GO = FUNGRID.GameObject("a1",SUPERLOAD.getGraphic("avatar2"),160,120,0,0);
    DL.a2GO.addSprite("a1",0,0,64,105,-32,-105);
    DL.a2GO.scaleX = DL.a2GO.scaleY = 0.5;
    FUNGRID.addGameObject(DL.a2GO,"GAMEOVER");
     DL.a3GO = FUNGRID.GameObject("a1",SUPERLOAD.getGraphic("avatar3"),210,120,0,0);
    DL.a3GO.addSprite("a1",0,0,64,105,-32,-105);
    DL.a3GO.scaleX = DL.a3GO.scaleY = 0.5;
    FUNGRID.addGameObject(DL.a3GO,"GAMEOVER");
     DL.a4GO = FUNGRID.GameObject("a1",SUPERLOAD.getGraphic("avatar4"),260,120,0,0);
    DL.a4GO.addSprite("a1",0,0,64,105,-32,-105);
    DL.a4GO.scaleX = DL.a4GO.scaleY = 0.5;
    FUNGRID.addGameObject(DL.a4GO,"GAMEOVER");
    
    DL.a5GO = FUNGRID.GameObject("a1",SUPERLOAD.getGraphic("avatar1"),310,120,0,0);
    DL.a5GO.addSprite("a1",0,0,64,105,-32,-105);
    DL.a5GO.scaleX = DL.a5GO.scaleY = 0.5;
    FUNGRID.addGameObject(DL.a5GO,"GAMEOVER");
    
    
    DL.friskGO = FUNGRID.GameObject("frisk",SUPERLOAD.getGraphic("sprites"),400,120,0,0);
    DL.friskGO.addSprite("frisk",165,325,72,53,-36,-50);
    FUNGRID.addGameObject(DL.friskGO,"GAMEOVER");
     
 
 DL.hus3 = FUNGRID.GameObject("hus",SUPERLOAD.getGraphic("sprites"),3317,-290,1,1);
    DL.hus3.addSprite("hus",600,0,510,313);
    FUNGRID.addGameObject(DL.hus3,"GAME1");
 
    DL.a1 = FUNGRID.GameObject("a1",SUPERLOAD.getGraphic("avatar1"),-550,160,1,1);
    DL.a1.addSprite("a1",0,0,64,105,-32,-105);
    FUNGRID.addGameObject(DL.a1,"GAME1");
        
    DL.a2 = FUNGRID.GameObject("a2",SUPERLOAD.getGraphic("avatar2"),1290,0,1,1);
    DL.a2.addSprite("a2",0,0,64,105,-32,-105);
    DL.a2.scaleX = DL.a2.scaleY = 0.5;
    FUNGRID.addGameObject(DL.a2,"GAME1");
    
    DL.lam = FUNGRID.GameObject("a2",SUPERLOAD.getGraphic("sprites"),2495,92,1,1);
    DL.lam.addSprite("lam",50,30,70,34,-35,-17);
    FUNGRID.addGameObject(DL.lam,"GAME1");
    
    DL.a3 = FUNGRID.GameObject("a3",SUPERLOAD.getGraphic("avatar3"),1290,0,1,1);
    DL.a3.addSprite("a3",0,0,64,105,-32,-105);
    DL.a3.scaleX = DL.a3.scaleY = 0.5;
    FUNGRID.addGameObject(DL.a3,"GAME1");
    
    DL.a4 = FUNGRID.GameObject("a4",SUPERLOAD.getGraphic("avatar4"),1290,0,1,1);
    DL.a4.addSprite("a4",0,0,64,105,-32,-105);
    DL.a4.scaleX = DL.a4.scaleY = 0.5;
    FUNGRID.addGameObject(DL.a4,"GAME1");
    
    

   
   
    
    DL.hus2 = FUNGRID.GameObject("hus",SUPERLOAD.getGraphic("sprites"),3447,-6,1,1);
    DL.hus2.addSprite("hus",515,320,384,221);
    FUNGRID.addGameObject(DL.hus2,"GAME1");
    
    DL.jesus = FUNGRID.GameObject("jesus",SUPERLOAD.getGraphic("sprites"),3575,175,1,1);
    DL.jesus.addSprite("jesus",0,325,38,66,-19,-66);
    DL.jesus.addSprite("jesus",40,325,50,66,-25,-66);
    FUNGRID.addGameObject(DL.jesus,"GAME1");
    
    DL.frisk = FUNGRID.GameObject("frisk",SUPERLOAD.getGraphic("sprites"),3635,175,1,1);
    DL.frisk.addSprite("frisk",90,325,71,59,-36,-50);
    DL.frisk.addSprite("frisk",165,325,72,53,-36,-50);
    DL.frisk.visible = false;
    FUNGRID.addGameObject(DL.frisk,"GAME1");
    
    
    DL.hus = FUNGRID.GameObject("hus",SUPERLOAD.getGraphic("sprites"),3000,9,1,1);
    DL.hus.addSprite("hus",0,490,494,177);
    FUNGRID.addGameObject(DL.hus,"GAME1");
   
    
    
    DL.scorestar = FUNGRID.GameObject("star",SUPERLOAD.getGraphic("sprites"),5,5,0,0);
	DL.scorestar.addSprite("star",86,100,26,26);
	FUNGRID.addGameObject(DL.scorestar,"GAME1");
    DL.scorestar.visible = false;
    
    DL.bonusStars = [];
    for (var i = 0; i<10; i++) {
    DL.bonusStars.push(FUNGRID.GameObject("star",SUPERLOAD.getGraphic("sprites"),3505+27*i,-195,1,1));
	DL.bonusStars[DL.bonusStars.length-1].addSprite("star",60,100,26,26);
	DL.bonusStars[DL.bonusStars.length-1].addSprite("star",86,100,26,26);
	FUNGRID.addGameObject(DL.bonusStars[DL.bonusStars.length-1],"GAME1");
    DL.bonusStars[DL.bonusStars.length-1].visible = false;
    }
    
    DL.h1 = FUNGRID.GameObject("star",SUPERLOAD.getGraphic("sprites"),400,5,0,0);
	DL.h1.addSprite("heart",114,103,24,20);
	DL.h1.addSprite("heart",140,103,24,20);
	FUNGRID.addGameObject(DL.h1,"GAME1");
    DL.h1.visible = false;
     DL.h2 = FUNGRID.GameObject("star",SUPERLOAD.getGraphic("sprites"),425,5,0,0);
	DL.h2.addSprite("heart",114,103,24,20);
	DL.h2.addSprite("heart",140,103,24,20);
	FUNGRID.addGameObject(DL.h2,"GAME1");
    DL.h2.visible = false;
     DL.h3 = FUNGRID.GameObject("star",SUPERLOAD.getGraphic("sprites"),450,5,0,0);
	DL.h3.addSprite("heart",114,103,24,20);
	DL.h3.addSprite("heart",140,103,24,20);
	FUNGRID.addGameObject(DL.h3,"GAME1");
    DL.h3.visible = false;
	
    DL.pickstar = FUNGRID.GameObject("star",SUPERLOAD.getGraphic("sprites"),5,5,0,0);
	DL.pickstar.addSprite("star",60,100,26,26);
	DL.pickstar.visible = false;
	
	FUNGRID.addGameObject(DL.pickstar,"GAME1");
	DL.pickstar.customLateUpdate = function() {
		if (Math.abs(this.canvasPosX-DL.scorestar.canvasPosX)<1) {
			this.visible = false;
		}
		this.posX += 0.3*(5-this.posX);
		this.posY += 0.3*(5-this.posY);
		
	}
    
    
    
    DL.faris = FUNGRID.GameObject("jesus",SUPERLOAD.getGraphic("sprites"),3725,182,1,1);
    DL.faris.addSprite("jesus",485,66,90,86,-35,-86);
    FUNGRID.addGameObject(DL.faris,"GAME1");
    
     DL.vstar1 = FUNGRID.GameObject("star",SUPERLOAD.getGraphic("sprites"),3623,-129,1,1);
	DL.vstar1.addSprite("star",60,100,26,26);
	FUNGRID.addGameObject(DL.vstar1,"GAME1");
	
DL.vstar2 = FUNGRID.GameObject("star",SUPERLOAD.getGraphic("sprites"),3623,-70,1,1);
	DL.vstar2.addSprite("star",60,100,26,26);
	FUNGRID.addGameObject(DL.vstar2,"GAME1");
	
	DL.vstar3 = FUNGRID.GameObject("star",SUPERLOAD.getGraphic("sprites"),3629,43,1,1);
	DL.vstar3.addSprite("star",60,100,26,26);
	FUNGRID.addGameObject(DL.vstar3,"GAME1");
	
	DL.vstars = [DL.vstar1,DL.vstar2,DL.vstar3];
    
	DL.l4tau1 = FUNGRID.GameObject("l4t1",SUPERLOAD.getGraphic("sprites"),0,-1000,1,1);
    DL.l4tau1.addSprite("stram",433,0,4,205,-2,-205);
    DL.l4tau1.addSprite("slakk",452,0,9,205,-5,-206);
    DL.l4tau1.addSprite("stram0",433,155,4,50,-2,-50);
    DL.l4tau1.visible = false;
    DL.l4tau1.spriteIndex = 2;
    FUNGRID.addGameObject(DL.l4tau1,"GAME1");
    
    DL.l4tau2 = FUNGRID.GameObject("l4t1",SUPERLOAD.getGraphic("sprites"),40,-1000,1,1);
    DL.l4tau2.addSprite("stram",433,0,4,205,-2,-205);
    DL.l4tau2.addSprite("slakk",452,0,9,205,-5,-206);
    DL.l4tau2.addSprite("stram0",433,155,4,50,-2,-50);
    DL.l4tau2.visible = false;
    DL.l4tau2.spriteIndex = 2;
    FUNGRID.addGameObject(DL.l4tau2,"GAME1");
    
    DL.lam4 = FUNGRID.GameObject("a2",SUPERLOAD.getGraphic("sprites"),3635,-250,1,1,null,true);
    DL.lam4.addSprite("lam",50,30,70,34,-35,-17);
    DL.lam4.addSprite("lam",0,395,70,31,-35,-19);
    DL.lam4.visible = false;
    
    DL.lam4.customLateUpdate = function() {
	   
	    // FUNGRID.moveViewport(DL.lam4.posX-240, DL.lam4.posY-100);
	
		if (DL.lam4.posY>170) {
			if (!DL.gulvtreff) {
				SUPERLOAD.getSound("hitwood").play();
			DL.gulvtreff = true;
			DL.gulvtrefftid = DL.tilstandTime;
			}
			DL.lam4.posY = 170;
			DL.lam4.speedY *= -0.1;
		}
		if (DL.gulvtreff) {
			DL.l4tau1.spriteIndex = 0;
			DL.l4tau2.spriteIndex = 0;
			DL.l4tau3.spriteIndex = 0;
			DL.l4tau4.spriteIndex = 0;
			DL.l4tau1.posY -=2;
			DL.l4tau2.posY -=2;
			DL.l4tau3.posY -=2;
			DL.l4tau4.posY -=2;
		} else {
			DL.l4tau1.posX = DL.lam4.posX-28;
			DL.l4tau2.posX = DL.lam4.posX+28;
			DL.l4tau3.posX = DL.lam4.posX-32;
			DL.l4tau4.posX = DL.lam4.posX+32;
			DL.l4tau1.posY = DL.lam4.posY+DL.lam4.speedY-6;
			DL.l4tau2.posY = DL.lam4.posY+DL.lam4.speedY-6;
			DL.l4tau3.posY = DL.lam4.posY+DL.lam4.speedY+10;
			DL.l4tau4.posY = DL.lam4.posY+DL.lam4.speedY+10;
		}
    }
    FUNGRID.addGameObject(DL.lam4,"GAME1");
    
    

    
    DL.l4tau3 = FUNGRID.GameObject("l4t1",SUPERLOAD.getGraphic("sprites"),-20,23,1,1);
    DL.l4tau3.addSprite("stram",433,0,4,205,-2,-205);
    DL.l4tau3.addSprite("slakk",452,0,9,205,-5,-206);
    DL.l4tau3.addSprite("stram0",433,155,4,50,-2,-50);
    DL.l4tau3.visible = false;
    DL.l4tau3.spriteIndex = 2;
    FUNGRID.addGameObject(DL.l4tau3,"GAME1");
    
    DL.l4tau4 = FUNGRID.GameObject("l4t1",SUPERLOAD.getGraphic("sprites"),20,23,1,1);
    DL.l4tau4.addSprite("stram",433,0,4,205,-2,-205);
    DL.l4tau4.addSprite("slakk",452,0,9,205,-5,-206);
    DL.l4tau4.addSprite("stram0",433,155,4,50,-2,-50);
    DL.l4tau4.visible = false;
    DL.l4tau4.spriteIndex = 2;
    FUNGRID.addGameObject(DL.l4tau4,"GAME1");
    
     
    
    DL.flokk = FUNGRID.GameObject("hus",SUPERLOAD.getGraphic("sprites"),3450,120,1,1);
    DL.flokk.addSprite("hus",515,570,375,102);
    FUNGRID.addGameObject(DL.flokk,"GAME1");
    
    
   
    
    DL.murstein = [];
    var order = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var plass = [{x:3500,y:-280},{x:3546,y:-280},{x:3592,y:-280},{x:3638,y:-280},{x:3475,y:-252},{x:3521,y:-252},{x:3567,y:-252},{x:3613,y:-252},{x:3659,y:-252},{x:3450,y:-224},{x:3496,y:-224},{x:3542,y:-224},{x:3588,y:-224},{x:3634,y:-224},{x:3680,y:-224}];
    var pl = 0;
    for (var x = 0; x<5; x++) {
	    for (var y = 0; y<3; y++) {
		
		    DL.murstein.push(FUNGRID.GameObject("murstein",SUPERLOAD.getGraphic("sprites"),plass[pl].x+43,plass[pl].y-2,1,1));
		    pl +=1;
		    DL.murstein[DL.murstein.length-1].addSprite("murstein",134,66,50,30);
		    DL.murstein[DL.murstein.length-1].clicked = false;
		    DL.murstein[DL.murstein.length-1].number = 0;
		    var n = 0;
		    while (DL.murstein[DL.murstein.length-1].number<1) {
			    var r = Math.floor(Math.random()*order.length);
			    DL.murstein[DL.murstein.length-1].number = order[r];
			    order[r] = 0;
		    	
		    
		    }
		    
		    FUNGRID.addGameObject(DL.murstein[DL.murstein.length-1],"GAME1");
	    }
    }
    
    
	SCRT.a = "hus";
    SCRT.b = "tak";
    SCRT.c = "stein";
    SCRT.d = "lamme";
    SCRT.e = "venner";
    SCRT.game_id = "stein";



 DL.intro1 = FUNGRID.GameObject("i",SUPERLOAD.getGraphic("sprites"),-1700,95,1,1);
 DL.intro1.addSprite("hull",0,127,193,185,-97,-90);
 FUNGRID.addGameObject(DL.intro1,"GAME1");
 
  DL.pil1 = FUNGRID.GameObject("i",SUPERLOAD.getGraphic("sprites"),-1500,95,1,1);
 DL.pil1.addSprite("pil",171,0,18,31);
 FUNGRID.addGameObject(DL.pil1,"GAME1");
 
 DL.intro2 = FUNGRID.GameObject("i",SUPERLOAD.getGraphic("sprites"),-1300,95,1,1);
 DL.intro2.addSprite("hull",194,127,212,184,-106,-90);
 FUNGRID.addGameObject(DL.intro2,"GAME1");
 
 DL.pil2 = FUNGRID.GameObject("i",SUPERLOAD.getGraphic("sprites"),-1100,95,1,1);
 DL.pil2.addSprite("pil",171,0,18,31);
 FUNGRID.addGameObject(DL.pil2,"GAME1");
 

 
 DL.pil3 = FUNGRID.GameObject("i",SUPERLOAD.getGraphic("sprites"),-200,95,1,1);
 DL.pil3.addSprite("pil",171,0,18,31);
 FUNGRID.addGameObject(DL.pil3,"GAME1");
 
 DL.pilOpp = FUNGRID.GameObject("i",SUPERLOAD.getGraphic("sprites"),30,30,0,0);
 DL.pilOpp.addSprite("pil",190,0,31,18);
 FUNGRID.addGameObject(DL.pilOpp,"GAME1");
 DL.pilOpp.visible = false;
 
  DL.pilNed = FUNGRID.GameObject("i",SUPERLOAD.getGraphic("sprites"),30,155,0,0);
 DL.pilNed.addSprite("pil",190,18,31,18);
 FUNGRID.addGameObject(DL.pilNed,"GAME1");
 DL.pilNed.visible = false;

FUNGRID.moveViewport(-2000, 0);

    FUNGRID.update("GAME1");
    DL.timerId = setInterval(DL.update, 25);
}


DL.avatarSettings = function (a,n,offX,offY,offT) {
		a.falt = false;
		a.plukket = false;
		a.n = n;
		a.rotation = 0;
		a.fallrot = 0;
		if (n==0) {
			DL.poslog = [];
			DL.poslogI = 0;
			a.posX = -80;
			// a.posX = 2600;
			a.posY = 200;
		} else if (n==1) {
			a.posX = 885;
			a.posY = DL.levelY+DL.levelYsize*2;
		} else if (n==2) {
			a.posX = 1300;
			a.posY = DL.levelY+DL.levelYsize*4;
		} else if (n==3) {
			a.posX = 1880;
			a.posY = DL.levelY+DL.levelYsize*4;
		}
		a.offX = offX;
		a.offY = offY;
		a.offT = offT;
		a.fallrot = 2;
	    a.customLateUpdate = function() {
		  if (DL.tilstand==="GAME1") {
			  for (var i = 0; i< DL.hulls.length; i++) {
			    if (this.posX>DL.hulls[i].posX+2 && this.posX<DL.hulls[i].posX+20 && this.posY<DL.hulls[i].posY && this.posY>DL.hulls[i].posY-12 && !this.falt) {
				    this.falt = true;
				    DL.fall = true;
				    SUPERLOAD.getSound("hitrock1").play();
				    DL.fallteller = 0;
			    }
		    }
		    for (var i = 0; i<DL.allstars.length; i++) {
			   	if (this.posX>DL.allstars[i].posX+2 && this.posX<DL.allstars[i].posX+20 && this.posY>DL.allstars[i].posY && this.posY<DL.allstars[i].posY+20) {
				    DL.starpick(DL.allstars[i].canvasPosX,DL.allstars[i].canvasPosY);    
				    DL.allstars[i].posY-=1000;
				    }	
		    	}
		    if (this.falt) {
			    this.rotation += this.fallrot;
			    this.fallrot +=1;
			    DL.fallteller +=1;
			    if (this.rotation>=90) {
				    this.rotation = 90;
				    
			    }
			    
			    if (DL.fallteller>140) {
				    DL.fallteller = 0;
				    DL.hearts -=1;
				    if (DL.hearts>-1) {
				    DL.initGame(1,DL.a1.posX);
				    } else {
					    DL.initGameOver();
				    }
				    
			    }
			    
			} else {
				if (this.n==0) {
					DL.poslog[DL.poslogI] ={x:this.posX,y:this.posY};
			DL.poslogI +=1;
			if (DL.poslogI>=30) {
				DL.poslogI = 0;
			}
					 if (!DL.fall) {
					this.posX +=2;
					}
					if (this.posX>DL.hus.posX) {
						if (this.posX>DL.hus.posX+900) {
							this.posX = DL.hus.posX+900;
							
						}
					} else if (!DL.fall) {
						this.posY = DL.playerPosition*DL.levelYsize+DL.levelY + Math.floor(1*Math.sin(DL.tilstandTime*this.offT));
					}
				} else if (this.plukket) {
					this.posX = DL.a1.posX+this.offX;
					if (DL.a1.posX>DL.hus.posX+100) {
						this.posY = DL.a1.posY+this.offY;
					} else if (!DL.fall) {
						this.posY = DL.playerPosition*DL.levelYsize+DL.levelY+this.offY + Math.floor(1*Math.sin(DL.tilstandTime*this.offT));
					}
				} else {
					if (DL.a1.posX>this.posX) {
						
						if (!this.plukket) {
							
							// DL.starpick(this.canvasPosX,this.canvasPosY-20,"bonus");
				    		SUPERLOAD.getSound("bonus").play();
							this.plukket = true;
							DL.friends +=1;
				    }
						if (DL.friends==2 && DL.playerPosition==5) {
							DL.keypressUp();
						}
					}
				}
				
			}
			}
	    }
    }


DL.touchDown = function () {
	if (DL.tilstand=="INTRO1") {
      } else if (DL.tilstand==="GAME1") {
	      if (FUNTOUCH.lastY<106) {
		     DL.keypressUp();
	      } else {
		      DL.keypressDown();
	      }
      } else if (DL.tilstand==="GAME3") {
	      for (var i = 0; i<DL.murstein.length; i++) {
		      if (DL.murstein[i].number == DL.nesteMurstein && DL.murstein[i].inside(FUNTOUCH.lastX,FUNTOUCH.lastY)) {
			      DL.murstein[i].visible = false;
			      DL.nesteMurstein +=1;
			      SUPERLOAD.getSound("hitrock"+(DL.nesteMurstein%2+1)).play();
			      if (DL.nesteMurstein==16) {
				      for (var i=0; i<DL.bonus; i++) {
				      	DL.starpick(DL.bonusStars[0].canvasPosX,DL.bonusStars[0].canvasPosY,"");
				      }
				      SUPERLOAD.getSound("bonus").play();
				      DL.initGame(4);
			      }
		      }
		      
	      }
	  } else if (DL.tilstand==="GAME4") {
		 
		  if (!DL.fall4) {
			  SUPERLOAD.getSound("swishfall").play();
		     DL.fall4 = true;
		      DL.lam4.accelerationY = 0.2;
		     // slakk tau
		     DL.l4tau1.spriteIndex = 1;
		     DL.l4tau2.spriteIndex = 1;
		     DL.l4tau3.spriteIndex = 1;
		     DL.l4tau4.spriteIndex = 1;
		     } else {
			     SUPERLOAD.getSound("swishstop").play();
			     DL.fallstopp +=1;
			     if (DL.fallstopp<=3) {
			     DL.fall4 = false;
			     DL.lam4.accelerationY = 0;
			     DL.lam4.speedY = 0;
			     // stram tau
			     DL.l4tau1.spriteIndex = 0;
		     DL.l4tau2.spriteIndex = 0;
		     DL.l4tau3.spriteIndex = 0;
		     DL.l4tau4.spriteIndex = 0;
		     for (var i = 0; i<DL.vstars.length; i++) {
			     if (Math.abs(DL.lam4.posY-15-DL.vstars[i].posY)<15) {
				     DL.starpick(DL.vstars[i].canvasPosX,DL.vstars[i].canvasPosY);
				     DL.vstars[i].posY -= 1000;
				     
			     }
		     }
		     }
		     }
	  } 
}


DL.keypresRight = function () {
 
}
DL.keypressLeft = function () {
 
}
DL.keypressUp = function () {
	if (DL.tilstand==="GAME1" && !DL.fall) {
    	DL.playerPosition -=1;
    	if (DL.playerPosition<1) {
	    	DL.playerPosition = 1;
    	} else {
	    	SUPERLOAD.getSound("swish2").play();
    	}
    }
}
DL.keypressDown = function () {
	if (DL.tilstand==="GAME1" && !DL.fall) {
		DL.playerPosition +=1;
		if (DL.friends>1) {
			if (DL.playerPosition>4) {
				DL.playerPosition = 4;
			} else {
				// SUPERLOAD.getSound("swish1").play();
			}
		}
		if (DL.playerPosition>5) {
			DL.playerPosition = 5;
		} else {
			SUPERLOAD.getSound("swish1").play();
		}
 	}
}
DL.visListe = function () {
	
	var l = "";
	for (var i = 0; i<DL.spilleliste.length; i++) {
		l += DL.spilleliste[i].navn+" "+DL.spilleliste[i].score+" "+DL.spilleliste[i].tlf+"<br>";
	}
	document.getElementById("spilleliste").innerHTML = l;
}
DL.touchUp = function () {
	 if (DL.tilstand==="INTRO1") {
	       DL.tilstand="INTRO2";
	       DL.pil1.visible = false;
	       SUPERLOAD.getSound("swish1").play();
	       SUPERLOAD.getSound("menumusic").loop(true);
                SUPERLOAD.getSound("menumusic").play();
                
           
                
     } else if (DL.tilstand==="INTRO2") {
	     DL.tilstandTime = 0;
	     DL.tilstand = "MENY";
	     SUPERLOAD.getSound("swish1").play();
	     DL.pil2.visible = false;
	     DL.menysteg = 0;
     } else if (DL.tilstand==="MENY") {
	     if (DL.menysteg==0) {
		     if (DL.tilstandTime>100) {
		     DL.menysteg = 1;
		     DL.tilstandTime = 20;
		     }
	     } else if (DL.menysteg==1) {
		     if (DL.tilstandTime>20) {
		     DL.menysteg = 2;
		     DL.tilstandTime = 20;
		     }
	     } else {
	     DL.pil3.visible = false;
	     DL.menyTittel.visible = false;
	     DL.menyBilde.visible = false;
	      SUPERLOAD.getSound("swish2").play();
	     DL.initGame(1);
	     
	     SUPERLOAD.getSound("menumusic").stop();
	     SUPERLOAD.getSound("ingamemusic").loop(true);
                SUPERLOAD.getSound("ingamemusic").play();
	     }
	   
     } else if (DL.tilstand==="GAMEOVER") {
	     console.log("xy "+FUNTOUCH.lastX+" "+FUNTOUCH.lastY);
	     if (FUNTOUCH.lastY>180) { 
		     if (FUNTOUCH.lastX<120) {
			     /*
		      var person = prompt("SKRIV INN NAVN ELLER KALLENAVN", "Linkus");
if (person != null) {
  var telefon = prompt("TELEFONNR FOR Å BLI KONTAKTET OM DU VINNER", "");
  if (person != null) {
	  // alert(person+" "+telefon+" fikk "+DL.score+" poeng");
	  }
	  if (DL.score>DL.rekord) {
	DL.rekord = DL.score;
	DL.rekordholder = person;
	DL.rekordtelefon = telefon;
	localStorage.DLrekord = JSON.stringify(DL.rekord);
	localStorage.DLrekordholder = JSON.stringify(DL.rekordholder);
	localStorage.DLrekordtelefon = JSON.stringify(DL.rekordtelefon);
	}
	DL.spilleliste.push({navn: person, score: DL.score, tlf: telefon});
	localStorage.DLspilleliste = JSON.stringify(DL.spilleliste);
}
*/
		       } 
		  DL.tilstandTime = 90;
		  DL.a1.scaleX = DL.a1.scaleY = 1;
		  DL.a1.posX = -550;
		  DL.a1.posY = 160;
		  DL.a1.rotation = 0;
	     DL.tilstand = "MENY";
	     FUNGRID.moveViewport(DL.menyTittel.posX-230, 0);
	     DL.pil3.visible = true;
	     DL.menyTittel.visible = true;
	     DL.menyBilde.visible = true;
	     DL.menysteg = 0;
	     DL.scorestar.visible = false;
		DL.pilNed.visible = false;
	       DL.pilOpp.visible = false;
	       DL.h1.visible = false;
			DL.h2.visible = false;
			DL.h3.visible = false;
	     SUPERLOAD.getSound("swish1").play();
	    //  }
	  }
}
} 

DL.drawScores = function () {
	FUNGRID.getContext().font="20px Georgia";
			FUNGRID.getContext().fillStyle="#000000";
			if (DL.stars>9) {
				FUNGRID.getContext().fillText(DL.stars,26,41);
			} else {
				FUNGRID.getContext().fillText(DL.stars,30,41);
			}
			DL.h1.visible = true;
			DL.h2.visible = true;
			DL.h3.visible = true;
			DL.h1.spriteIndex = 0;
			DL.h2.spriteIndex = 0;
			DL.h3.spriteIndex = 0;
			if (DL.hearts<3) {
				DL.h3.spriteIndex = 1;
			}
			if (DL.hearts<2) {
				DL.h2.spriteIndex = 1;
			}
			if (DL.hearts<1) {
				DL.h1.spriteIndex = 1;
			}
				
	
}


DL.update = function () {
	DL.tilstandTime +=1;
	
	if (DL.tilstand==="INTRO1") {
		FUNGRID.update("GAME1");
		FUNGRID.setFutureViewport(DL.intro1.posX-220, 0);
		} else if (DL.tilstand==="INTRO2") {
			FUNGRID.update("GAME1");
		FUNGRID.setFutureViewport(DL.intro2.posX-220, 0);
	} else if (DL.tilstand==="MENY") {
		FUNGRID.update("GAME1");
		
		FUNGRID.setFutureViewport(DL.menyTittel.posX-230, 0);
		
		FUNGRID.getContext().fillStyle="#FFFFFF";
		// if (DL.menysteg>0) {
			FUNGRID.getContext().font="15px Georgia";
			// FUNGRID.getContext().fillText("Rekord: "+DL.rekordholder+" "+DL.rekord,20,20);
		// }
		FUNGRID.getContext().font="30px Georgia";
		if (DL.menysteg == 0) {
			DL.menyBilde.spriteIndex = 0;
			if (DL.tilstandTime>100) {
				FUNGRID.getContext().fillText("- Skal jeg ta deg med til Jesus?",40,404);
				if (DL.tilstandTime<230) {
				DL.a1.rotation = Math.sin(DL.tilstandTime);
				}
				if (DL.tilstandTime>250) {
					DL.menysteg = 1;
					DL.a1.rotation = 0;
					DL.tilstandTime = 0;
				}
			}
		} else if (DL.menysteg == 1) {
			DL.menyBilde.spriteIndex = 1;
			if (DL.tilstandTime>20) {
				FUNGRID.getContext().fillText("- Å, JA! Kan du det?",500,404);
				if (DL.tilstandTime>120) {
					DL.menysteg = 2;
					DL.tilstandTime = 0;
				}
				}
		} else if (DL.menysteg == 2) {
			if (DL.tilstandTime>20) {
				FUNGRID.getContext().fillText("- Jeg skal bare finne 3 venner først som kan hjelpe meg å bære...",30,404);
				if (DL.tilstandTime<180) {
					DL.a1.rotation = Math.sin(DL.tilstandTime);
				}
				if (DL.tilstandTime>200) {
					DL.menysteg = 3;
					DL.a1.rotation = 0;
					DL.tilstandTime = 0;
				}
				}
		} else if (DL.menysteg == 3) {
			if (DL.tilstandTime>20) {
				if (DL.tilstandTime>40) {
					DL.menyBilde.spriteIndex = 0;
				}
				DL.a1.posX +=2;
				DL.a1.posY = 160 + Math.floor(3*Math.sin(DL.tilstandTime*0.8));
				if (DL.a1.posX >300) {
					DL.a1.posX = -650;
					DL.menysteg = 4
					DL.tilstandTime = 0;
				}
				}
		} else if (DL.menysteg == 4) {
			
				DL.a1.posX +=1;
				DL.a1.posY = 160 + Math.floor(3*Math.sin(DL.tilstandTime*0.8));
				if (DL.a1.posX >-550) {
					DL.a1.posX = -550;
					DL.menysteg = 0
					DL.tilstandTime = 0;
				}
		}
	} else if (DL.tilstand==="GAME1") {
		FUNGRID.update("GAME1");
		if (DL.friends==3 && DL.a1.posX>=DL.lam.posX) {
			if (!DL.lamplukk) {
				DL.lamplukk = true;
				// DL.starpick(DL.lam.canvasPosX,DL.lam.canvasPosY);
				SUPERLOAD.getSound("bonus").play();
			}
			if (DL.fall) {
				DL.lam.posY = DL.a1.posY;
			} else {
				DL.lam.posX = DL.a1.posX-32;
				DL.lam.posY = DL.a1.posY-13;
			}
		}
		FUNGRID.setFutureViewport(Math.min(3390, DL.a1.posX-140), 0);
		// if (DL.a1.posX-140>3390) {
		if (DL.a1.posX-140>3000) {
			DL.initGame(3);
			
		}
		DL.drawScores();
	} else if (DL.tilstand==="GAME2") {
		DL.drawScores();
	} else if (DL.tilstand==="GAME3") {
		FUNGRID.update("GAME1");
		FUNGRID.setFutureViewport(3390, -360);
		FUNGRID.getContext().fillStyle="#FFFFFF";
		FUNGRID.getContext().font="24px Georgia";
		for (var i = 0; i<DL.murstein.length; i++) {
			if (DL.murstein[i].visible) {
				FUNGRID.getContext().fillText(DL.murstein[i].number,(DL.murstein[i].canvasPosX+22)*DL.s, (DL.murstein[i].canvasPosY+19)*DL.s);
			}
			
		}
		 for (var i = 0; i<DL.bonusStars.length; i++) {
   if (DL.bonus<=i) {
    	DL.bonusStars[i].spriteIndex = 1;
    	}
    }
		if (DL.nesteMurstein==1) {
			if (DL.murstein[0].canvasPosY>0) {
		FUNGRID.getContext().fillText("Fjern alle mursteinene på taket i riktig rekkefølge! (Start med nr 1 ...)",140,404);
		
		}
		} else {
			DL.murtid +=1;
			FUNGRID.getContext().fillText(16-DL.nesteMurstein+" igjen! Neste er nr "+DL.nesteMurstein+" ...",400,404);
			DL.bonus = Math.max(0, 10 - Math.floor(DL.murtid/80));
			//FUNGRID.getContext().fillText("Bonus :"+DL.bonus,20,400);
		}
		DL.drawScores();
	} else if (DL.tilstand==="GAME4") {
		for (var i = 0; i<DL.bonusStars.length; i++) {
			DL.bonusStars[i].visible = false;
    	}

		FUNGRID.update("GAME1");
		FUNGRID.setFutureViewport(3390, Math.min(0,DL.lam4.posY-80));
		FUNGRID.getContext().font="24px Georgia";
		FUNGRID.getContext().fillStyle="#FFFFFF";
		if (DL.gulvtreff) {
			if (DL.tilstandTime-DL.gulvtrefftid<75) {
				DL.flokk.posY += 0.3;
			} else if (DL.tilstandTime-DL.gulvtrefftid<150) {
			
			
			} else if (DL.tilstandTime-DL.gulvtrefftid<300) {
				
				if (DL.tilstandTime-DL.gulvtrefftid>280) {
					DL.lam4.spriteIndex = 0;
				} else if (DL.tilstandTime-DL.gulvtrefftid>180) {
					DL.lam4.spriteIndex = 1;
				}
				DL.jesus.spriteIndex = 1;
				if (DL.tilstandTime-DL.gulvtrefftid<290) {
				FUNGRID.getContext().fillText("- Syndene dine er tilgitt!",370,404);
				}
				if (DL.tilstandTime-DL.gulvtrefftid<280) {
				DL.jesus.rotation = Math.sin(DL.tilstandTime);
				}
			} else if (DL.tilstandTime-DL.gulvtrefftid<450) {
				DL.lam4.spriteIndex = 0;
				DL.faris.rotation = Math.sin(DL.tilstandTime);
				if (DL.tilstandTime-DL.gulvtrefftid<440) {
					FUNGRID.getContext().fillText("- Hmmm... Bare Gud kan tilgi synder!",480,404);
				}
				DL.jesus.spriteIndex = 0;	
			} else if (DL.tilstandTime-DL.gulvtrefftid<700) {
				DL.jesus.rotation = Math.sin(DL.tilstandTime);
				if (DL.tilstandTime-DL.gulvtrefftid<690) {
				FUNGRID.getContext().fillText("- Hva er lettest å si: 'syndene dine er tilgitt' eller 'stå opp, ta båren din og gå'?",80,404);	
				}
			} else if (DL.tilstandTime-DL.gulvtrefftid<950) {
				DL.jesus.rotation = Math.sin(DL.tilstandTime);
				if (DL.tilstandTime-DL.gulvtrefftid<940) {
				FUNGRID.getContext().fillText("For at dere skal vite at jeg har makt til å tilgi synder sier jeg deg:",160,404);
				}
			} else if (DL.tilstandTime-DL.gulvtrefftid<1100) {
				DL.jesus.spriteIndex = 1;
				DL.jesus.rotation = Math.sin(DL.tilstandTime);
				if (DL.tilstandTime-DL.gulvtrefftid>970) {
					DL.lam4.spriteIndex = 1;
				}
				FUNGRID.getContext().fillText("- Stå opp, ta båren din og gå hjem!",350,404);	
			} else if (DL.tilstandTime-DL.gulvtrefftid<1200) {
				DL.jesus.spriteIndex = 0;
				// DL.frisk.posY = 175+1*Math.sin(DL.tilstandTime*0.3);
					DL.lam4.visible = false;
					DL.lam4.spriteIndex = 0;
					if (!DL.frisk.visible) {
						DL.frisk.spriteIndex = 0;
						SUPERLOAD.getSound("frisk").play();
						DL.frisk.visible = true;
						DL.frisk.posX = 3635;
						DL.frisk.posY = 175;
						DL.frisk.spriteIndex = 0;
					}
					
					
			} else if (DL.tilstandTime-DL.gulvtrefftid<1420) {
				DL.frisk.spriteIndex = 1;
				if (DL.tilstandTime-DL.gulvtrefftid>1230) {
					DL.frisk.posX -= 4;
					DL.frisk.posY = 175+1*Math.sin(DL.tilstandTime);
					}
				
			} else {
				DL.initGameOver(true);
			}
		} else {
			FUNGRID.getContext().font="24px Georgia";
			if (!DL.fall4) {
				if (DL.fallstopp==0) {
				FUNGRID.getContext().fillText("Trykk for å starte eller stoppe firingen. Du kan stoppe 3 ganger!",150,380);
			} else if (DL.fallstopp==1) {
				FUNGRID.getContext().fillText("Trykk for å starte igjen. Du har 2 stopp igjen!",200,380);

			} else if (DL.fallstopp==2) {
				FUNGRID.getContext().fillText("Trykk for å starte igjen. Du har 1 stopp igjen!",200,380);

			} else {
				FUNGRID.getContext().fillText("Trykk for å starte igjen!",200,380);
			}
		} else {
			if (DL.fallstopp<3) {
			FUNGRID.getContext().fillText("Trykk for å stoppe båren!",200,380);
			} else {
				// FUNGRID.getContext().fillText("Ingen flere stopp!",20,380);
			}
		}
		}
		DL.drawScores();
	} else if (DL.tilstand==="GAMEOVER") {
		FUNGRID.update("GAMEOVER");
		FUNGRID.getContext().font="40px Georgia";
		FUNGRID.getContext().fillStyle="#FFFFFF";
		if (DL.hearts>0) {
			FUNGRID.getContext().fillText("SPILLET ER FULLFØRT",40,60);
		} else {
			FUNGRID.getContext().fillText("SPILLET ER OVER",40,60);
		}
		FUNGRID.getContext().font="30px Georgia";
		FUNGRID.getContext().fillText(DL.stars+" stjerner",40,120);
		FUNGRID.getContext().fillText("+ "+Math.max(0,DL.hearts)+" hjerter (x 10)",40,160);
		DL.score = (Math.max(DL.hearts,0)*10)+Math.max(DL.stars,0);
		FUNGRID.getContext().fillText("= "+DL.score+" poeng",40,200);
		FUNGRID.getContext().fillStyle="#FFFF00";
		// FUNGRID.getContext().fillText("LAGRE POENG",20,400);
		FUNGRID.getContext().fillText("SPILL IGJEN",700,400);
		}
	
	/*  else if (DL.tilstand==="OUTRO") {
		FUNGRID.getContext().font="20px Georgia";
			FUNGRID.getContext().fillStyle="#FF0000";
			FUNGRID.getContext().fillText("Outro...",270,240);	
	}*/

/*
  if (DL.orientationWarning) {
        var m = DL.meny.visible;
        DL.meny.visible = false;
        FUNGRID.update("game");
        DL.meny.visible = m;
        FUNGRID.update("ow");
    } else {
        FUNGRID.update("game");
    }

   */
}