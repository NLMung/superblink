var FKR = {};
FKR.orientationWarning = false;
FKR.s = 1;
window.onresize = function () {
    FKR.onResize();
}
FKR.onResize = function () {
    FKR.orientationWarning = false;
    if (window.screen.width<window.screen.height && window.innerWidth<=480*FKR.s) {
       FKR.orientationWarning = true;
    }
};

FKR.init = function (scale) {
	FKR.lang = "no";
	FKR.s = scale || 1;
    FKR.onResize();
    FKR.firstJump = true;
  FKR.level = 0;
  var manifest;
  if (FKR.s==2) {
    manifest = [{id: "sprites", src: "gfx/finnkrybben.png"}];
    } else {
    manifest = [{id: "sprites", src: "gfx/finnkrybben_05.png"}];
    }

  SUPERLOAD.init("canvas", "black","#FFFF66",manifest,[{id: "bae", mp3: "gfx/bae.mp3", ogg: "gfx/bae.ogg"}, {id: "bae2", mp3: "gfx/bae2.mp3", ogg: "gfx/bae2.ogg"}, {id: "start", mp3: "gfx/start.mp3", ogg: "gfx/start.ogg"}, {id: "busk", mp3: "gfx/busk.mp3", ogg: "gfx/busk.ogg"}, {id: "theme", mp3: "gfx/theme.mp3", ogg: "gfx/theme.ogg"}, {id: "win", mp3: "gfx/win.mp3", ogg: "gfx/win.ogg"}, {id: "star", mp3: "gfx/star.mp3", ogg: "gfx/star.ogg"}, {id: "lande", mp3: "gfx/lande.mp3", ogg: "gfx/lande.ogg"}, {id: "die", mp3: "gfx/die.mp3", ogg: "gfx/die.ogg"}],FKR.init2);
    
   
    FKR.tilstand = "MENY";
    
    if(typeof(Storage)!=="undefined") {
    if(localStorage.FKrekord1) {
    	FKR.rekord = JSON.parse(localStorage.FKrekord1);
    } else {
    	FKR.rekord = 0;
	    localStorage.FKrekord1 = JSON.stringify(FKR.rekord);
    }
  } else {
  // Sorry! No web storage support..
  FKR.rekord = 0;
  }
   
}

SCRT = {};


FKR.init2 = function () {
FKR.score = 0;
    FUNGRID.init("canvas", FKR.s);
    FUNGRID.setClearCanvas(false);
   //  FUNGRID.viewportSettings(100,null,-100,-70);
    FUNGRID.viewportSettings(null,null,null,null);
 
    FKR.bg = FUNGRID.GameObject("bg",SUPERLOAD.getGraphic("sprites"),0,-500,0,0.2);
        FKR.bg.addSprite("bg",0,0,480,320);
        FUNGRID.addGameObject(FKR.bg,"game");

    FKR.busk = FUNGRID.GameObject("busk",SUPERLOAD.getGraphic("sprites"),700, 120,1,1,FUNGRID.RepeatSettings(2200));
    FKR.busk.addSprite("pf",0,393,38,21,-18,-20);
    FUNGRID.addGameObject(FKR.busk,"game");
    FKR.busk.customBeforeUpdateCanvasPosition = function () {
         if (FKR.protagonist.posX>this.posX-15 && FKR.protagonist.posX<this.posX+15 && FKR.protagonist.posY>this.posY-12 && FKR.protagonist.posY<this.posY+25) {
                FKR.protagonist.hit();
            }
    }

    
    FKR.hus3 = FUNGRID.GameObject("hus3",SUPERLOAD.getGraphic("sprites"),2280,0,1,1,FUNGRID.RepeatSettings(4400));
    FKR.hus3.addSprite("hus3",245,345,100,100);
    FUNGRID.addPolyLineToGameObject(FKR.hus3,FUNGRID.PolyLine([{x:-5,y:0},{x:108,y:0}]));
    FUNGRID.addGameObject(FKR.hus3,"game");

    FKR.hus4= FUNGRID.GameObject("hus3",SUPERLOAD.getGraphic("sprites"),1130,0,1,1,FUNGRID.RepeatSettings(3300));
    FKR.hus4.addSprite("hus3",345,345,50,100);
    FUNGRID.addPolyLineToGameObject(FKR.hus4,FUNGRID.PolyLine([{x:-5,y:0},{x:58,y:0}]));
    FUNGRID.addGameObject(FKR.hus4,"game");

    FKR.hus2 = FUNGRID.GameObject("hus2",SUPERLOAD.getGraphic("sprites"),2500,39,1,1,FUNGRID.RepeatSettings(3300));
    FKR.hus2.addSprite("hus2",145,393,100,61);
    FUNGRID.addPolyLineToGameObject(FKR.hus2,FUNGRID.PolyLine([{x:-5,y:0},{x:108,y:0}]));
    FUNGRID.addGameObject(FKR.hus2,"game");

    FKR.hus1 = FUNGRID.GameObject("hus1",SUPERLOAD.getGraphic("sprites"),1400,50,1,1,FUNGRID.RepeatSettings(2200));
    FKR.hus1.addSprite("hus1",95,393,50,50);
    FUNGRID.addPolyLineToGameObject(FKR.hus1,FUNGRID.PolyLine([{x:-5,y:0},{x:58,y:0}]));
    FUNGRID.addGameObject(FKR.hus1,"game");

    FKR.gbusk = FUNGRID.GameObject("gbusk",SUPERLOAD.getGraphic("sprites"),270,86,1,1,FUNGRID.RepeatSettings(4400));
    FKR.gbusk.addSprite("gbusk",432,404,29,15);
    FUNGRID.addGameObject(FKR.gbusk,"game");

    FKR.gbusk2 = FUNGRID.GameObject("gbusk",SUPERLOAD.getGraphic("sprites"),4450,86,1,1,FUNGRID.RepeatSettings(2210,null,1000));
    FKR.gbusk2.addSprite("gbusk",432,404,29,15);
    FUNGRID.addGameObject(FKR.gbusk2,"game");

    

    var pl = FUNGRID.PolyLine([{x:-5, y:0},{x:488,y:0}]);
    FKR.pf = FUNGRID.GameObject("pf",SUPERLOAD.getGraphic("sprites"),0,100,1,1,FUNGRID.RepeatSettings(1100));
    FKR.pf.addSprite("pf",0,320,480,25);
    FUNGRID.addPolyLineToGameObject(FKR.pf, pl);
    FUNGRID.addGameObject(FKR.pf,"game");

    FKR.pf2 = FUNGRID.GameObject("pf2",SUPERLOAD.getGraphic("sprites"),550,120,1,1,FUNGRID.RepeatSettings(1100));
    FKR.pf2.addSprite("pf2",0,320,480,25);
    FUNGRID.addPolyLineToGameObject(FKR.pf2, pl);
    FUNGRID.addGameObject(FKR.pf2,"game");


    var pl3 = FUNGRID.PolyLine([{x:-5, y:0},{x:83,y:0}]);

    FKR.pf4 = FUNGRID.GameObject("pf3",SUPERLOAD.getGraphic("sprites"),1200,50,1,1,FUNGRID.RepeatSettings(2300));
    FKR.pf4.addSprite("pf4",0,414,75,25);
    FUNGRID.addPolyLineToGameObject(FKR.pf4, pl3);
    FUNGRID.addGameObject(FKR.pf4,"game");

    FKR.pf3 = FUNGRID.GameObject("pf3",SUPERLOAD.getGraphic("sprites"),1000,65,1,1,FUNGRID.RepeatSettings(2000));
    FKR.pf3.addSprite("pf3",0,414,75,25);
    FUNGRID.addPolyLineToGameObject(FKR.pf3, pl3);
    FUNGRID.addGameObject(FKR.pf3,"game");

    FKR.stall = FUNGRID.GameObject("stall",SUPERLOAD.getGraphic("sprites"),11800,66);
    FKR.stall.addSprite("stall",395,345,64,58);
    FUNGRID.addGameObject(FKR.stall,"game");

    FKR.pf5 = FUNGRID.GameObject("pf5",SUPERLOAD.getGraphic("sprites"),10550,-10,1,1);
    FKR.pf5.addSprite("pf5",0,414,75,25);
    FUNGRID.addPolyLineToGameObject(FKR.pf5, pl3);
    FUNGRID.addGameObject(FKR.pf5,"game");
   
    FKR.lagStjerne(500,50,1200);
    FKR.lagStjerne(1500,-10,2200);
    FKR.lagStjerne(2590,-30,6550);
    FKR.lagStjerne(1220,-75,9480);

    FKR.protagonist = FUNGRID.GameObject("hyrde", SUPERLOAD.getGraphic("sprites"),-12,96);
    FKR.protagonist.addSprite("ro",0,358,16,33,-6,-31);
    FUNGRID.addPhysicsToGameObject(FKR.protagonist);
    
    FKR.protagonist.visible  = false;
    FKR.protagonist.readyForChange = false;

    FKR.protagonist.hopp = function () {
        if (FKR.tilstand==="WIN") {
            SUPERLOAD.getSound("start").play();
            FKR.win.visible = false;
            FKR.resetTilMeny();
            return;
        } else if (FKR.tilstand==="MENY") {
            FUNTOUCH.preventDefault = true;
            FUNKEYS.preventDefault = true;
            SUPERLOAD.getSound("start").play();
            if (FKR.firstJump) {  
            
                SUPERLOAD.getSound("theme").loop(true);
                SUPERLOAD.getSound("theme").play();
                FKR.firstJump = false;
            }
            FKR.tilstand = "GAME";
            FKR.meny.visible = false;
             FKR.protagonist.parameterSpeed = 3;
             FUNGRID.viewportSettings(100,null,-100,-70);
             SCRT.game_id = SCRT.d+SCRT.c+"l"+SCRT.a;
        } else {
            
            if (this.polyLineGameObject) {
                this.leavePolyLineGameObject();
                this.speedY = -9;
                this.speedX = this.parameterSpeed;
                this.posX -=2;
            }
        }
    };
    FKR.protagonist.customBeforeUpdateCanvasPosition = function (funGrid) {
        var ikkero = true;
        if (FKR.tilstand==="MENY") {
            if (this.posX>=200) {
                FKR.protagonist.parameterSpeed = 0;
                this.posX=200;
                this.spriteIndex = 0;
                ikkero = false;
            }
        }
        if (this.posX>=11800 && FKR.tilstand==="GAME") {
            FKR.tilstand = "WIN";
            SUPERLOAD.getSound("win").play();
            SUPERLOAD.getSound("bae").play();
            SUPERLOAD.getSound("bae2").play();
            FKR.win.visible = true;
            FKR.score +=100;
            SUPERLOAD.lagre(28,FKR.score);
        }
        if (FKR.tilstand==="WIN") {
            this.speedX = 0;
            this.parameterSpeed = 0;
                this.posX=11800;
                this.spriteIndex = 0;
                ikkero = false;
        }
        
        if (ikkero) {
        if (this.polyLineGameObject) {
            var s = Math.floor(this.posX*0.2) % 10;
            if (s<3) {
                this.spriteIndex = 2;
            } else if (s<5) {
                this.spriteIndex = 3;
            } else if (s<8) {
                this.spriteIndex = 4;
            } else {
                this.spriteIndex = 5;
            }
            // console.log(this.spriteIndex);

        } else {
        this.spriteIndex = 1;
        }

        if (this.posY>125) {
            this.spriteIndex = 6;
        }
        }
        
    }
    FKR.protagonist.hit = function () {
        if (this.polyLineGameObject) {
            SUPERLOAD.getSound("busk").play();
        this.polyLineGameObject = null;
        this.posY+=1;
        this.speedY = 0;
        }
    };
    FKR.protagonist.customEnterPolyLineGameObject = function () {
        if (this.posX>100) {
            SUPERLOAD.getSound("lande").play();
        }
        if (this.readyForChange) {
            if (Math.random()<0.5) {
            SUPERLOAD.getSound("bae").play();
        } else {
            SUPERLOAD.getSound("bae2").play();
        }
            this.readyForChange = false;
            FKR.newLeader();
        }
        this.spriteIndex = 2;
    };
    FUNGRID.addGameObject(FKR.protagonist,"game");
    
    FKR.sauer = [];
FKR.lagSau(1,true);
FKR.lagSau(12);
FKR.lagSau(26);
FKR.lagSau(42);
FKR.bjellesau = FKR.sauer[0];


FKR.meny = FUNGRID.GameObject("meny",SUPERLOAD.getGraphic("sprites"),40,-95,1,1);
FKR.meny.addSprite("meny",0,454,423,201);
FUNGRID.addGameObject(FKR.meny,"game");

FKR.ow = FUNGRID.GameObject("orientationWarning",SUPERLOAD.getGraphic("sprites"),50,50,0,0);
FKR.ow.addSprite("orientationWarning",133,657,162,102);
FUNGRID.addGameObject(FKR.ow,"ow");

FKR.win = FUNGRID.GameObject("win",SUPERLOAD.getGraphic("sprites"),200,70,0,0);
FKR.win.addSprite("win",0,657,133,67);
FUNGRID.addGameObject(FKR.win,"game");
FKR.win.visible = false;


FKR.stbg = FUNGRID.GameObject("stbg",SUPERLOAD.getGraphic("sprites"),440,5,0,0);
FKR.stbg.addSprite("stbg",395,404,37,37);
FUNGRID.addGameObject(FKR.stbg,"game");

    FUNTOUCH.init("canvas", FKR.s);
    FUNTOUCH.setCursorStyle("pointer");
    FUNTOUCH.customDown = FKR.touchDown;
    FUNTOUCH.customUp = FKR.touchUp;

    FUNKEYS.initArrowsAndSpace();
    FUNKEYS.customUpDown = FKR.keypressUp;
    
    window.scrollTo(0, 1);
    FUNGRID.setFutureViewport(FKR.protagonist.posX-FUNGRID.width(), FKR.protagonist.posY-FUNGRID.height()*0.9);
    FUNGRID.moveViewport(FKR.meny.posX-40, FKR.meny.posY-10);
    FKR.viewOffX = FUNGRID.width()*0.2;
    FKR.viewOffY = FUNGRID.height()*0.65;

FKR.resetTilMeny();


SCRT.a = "m";
    SCRT.b = "c";
    SCRT.c = "a";
    SCRT.d = "h";
    SCRT.e = "s";
    SCRT.game_id = "kake";


    FUNGRID.update("game");
   //  FKR.timerId = setInterval(FKR.update, 1000/30);
    FKR.timerId = setInterval(FKR.update, 25);
}
FKR.newLeader = function () {
    if (FKR.bjellesau.hyrde) {
    var r = Math.floor(Math.random()*FKR.sauer.length);
        while (r===FKR.bjellesau.i) {
           r =  Math.floor(Math.random()*FKR.sauer.length);
        }
        FKR.sauer[r].futureDelay = 1;
    } else {
        FKR.hyrde.futureDelay = 1;
    }
}
FKR.changeOver = function (delay, i) {
    if (delay===1) {
        // FKR.bjellesau.futureDelay = Math.floor(Math.random()*200)+20;
        FKR.bjellesau.futureDelay = FKR.sauer[i].oldDelay;
        FKR.bjellesau = FKR.sauer[i];
    } else {
        FKR.sauer[i].oldDelay = FKR.sauer[i].delay;
    }
    /* else {
        var r = Math.floor(Math.random()*FKR.sauer.length);
        while (r===i || r===FKR.bjellesau.i) {
           r =  Math.floor(Math.random()*FKR.sauer.length);
        }
        FKR.sauer[r].futureDelay = 1;
    } */
}
FKR.lagStjerne = function (x,y,repX) {
    var stjerne = FUNGRID.GameObject("stjerne", SUPERLOAD.getGraphic("sprites"),x,y,1,1,FUNGRID.RepeatSettings(repX));
    stjerne.addSprite("stjerne",218,345,26,26,-13,-13);
    stjerne.customOnRepeat = function () {
        this.visible = true;
    };
    stjerne.customBeforeUpdateCanvasPosition = function () {
        if (this.visible) {
         if (FKR.protagonist.posX>this.posX-10 && FKR.protagonist.posX<this.posX+10 && FKR.protagonist.posY>this.posY-10 && FKR.protagonist.posY<this.posY+25) {
                this.visible = false;
                FKR.score +=1;
                // FKR.newLeader();
                SUPERLOAD.getSound("star").play();
                FKR.protagonist.readyForChange = true;
            }
        }
    }
    FUNGRID.addGameObject(stjerne,"game");
}
FKR.lagSau = function (delay, hyrde) {
    var sau = FUNGRID.GameObject("sau"+FKR.sauer.length, SUPERLOAD.getGraphic("sprites"),100,100,1,1);
    if (hyrde) {
        sau.addSprite("ro",0,360,16,33,-6,-30);
        sau.addSprite("jump",27,361,24,29,-12,-29);
        sau.addSprite("w1",65,360,23,32,-8,-31);
        sau.addSprite("w2",100,362,21,30,-5,-29);
        sau.addSprite("w3",121,362,30,30,-20,-29);
        sau.addSprite("w4",166,362,20,30,-7,-29);
        sau.addSprite("die",193,360,25,30,-12,-30);
        sau.hyrde = true;
        FKR.hyrde = sau;
    } else {
        sau.addSprite("ro",117,346,16,13,-8,-11);
        sau.addSprite("jump",92,345,19,12,-9,-18);
        sau.addSprite("w1",0,345,15,14,-7,-12);
        sau.addSprite("w2",23,345,16,14,-7,-12);
        sau.addSprite("w3",47,345,15,14,-7,-12);
        sau.addSprite("w4",70,345,16,14,-7,-12);
        sau.addSprite("die",92,345,19,12,-9,-18);
        sau.hyrde = false;
    }
    sau.track = [];
    sau.i = FKR.sauer.length;
    sau.delay = delay;
    sau.oldDelay = delay;
    sau.changing = false;
    sau.futureDelay = delay;
    sau.customBeforeUpdateCanvasPosition = function (funGrid) {
        if (FKR.tilstand==="MENY") {
            this.track.push({x: FKR.protagonist.posX-this.delay*0.5, y: FKR.protagonist.posY, i: FKR.protagonist.spriteIndex});
        } else {
            this.track.push({x: FKR.protagonist.posX, y: FKR.protagonist.posY, i: FKR.protagonist.spriteIndex});
        }
        
        if(this.delay<this.futureDelay) {
            this.delay +=1;
            if (this.delay<this.futureDelay-15) {
                this.delay +=1;
            }
            this.changing = true;
        } else if (this.delay>this.futureDelay) {
            this.delay -=1;
            if (this.delay>this.futureDelay+15) {
                this.delay -=1;
            }
            this.changing = true;
        } else if (this.changing) {
            FKR.changeOver(this.delay, this.i);
            this.changing = false;
        }
        while (this.track.length>this.delay) {
            this.track.shift();
        }
        this.posX = this.track[0].x;
        this.posY = this.track[0].y;
        this.spriteIndex = Math.min(this.track[0].i,this.sprites.length-1);
    };
    FUNGRID.addGameObject(sau, "game");
    FKR.sauer.push(sau);
}



FKR.touchDown = function () {
        FKR.protagonist.hopp();
 
}


FKR.keypresRight = function () {
 
}
FKR.keypressLeft = function () {
 
}
FKR.keypressUp = function () {
    FKR.protagonist.hopp();

}
FKR.keypresDown = function () {

}
FKR.touchUp = function () {
	
} 
FKR.resetTilMeny = function () {
	SCRT.game_id = "stjerne";
    FUNTOUCH.preventDefault = false;
    FUNKEYS.preventDefault = false;
    FKR.score = 0;
    FKR.protagonist.polyLineGameObject = null;
    FKR.protagonist.posY = 96;
    FKR.protagonist.posX = -12;
    FKR.protagonist.speedY = -1;
    FKR.protagonist.speedX = 3;
    FKR.protagonist.accelerationY = 0.5;
    FKR.protagonist.parameterSpeed = 3;
    FKR.tilstand = "MENY";
    FKR.meny.visible = true;
    FUNGRID.viewportSettings(null,null,null,null);
}
FKR.update = function () {
    
    //  console.log(FKR.hyrde.posX+" "+FKR.hyrde.posY);
 if (FKR.protagonist) {
    if (FKR.protagonist.posY >1000)  {
        if (FKR.tilstand==="GAME") {
            SUPERLOAD.getSound("die").play();
            if (FKR.score>0) {
            	SUPERLOAD.lagre(28,FKR.score);
            }
        }
        FKR.resetTilMeny();
    }
    if (FKR.tilstand==="MENY") {
FUNGRID.setFutureViewport(FKR.meny.posX-40, FKR.meny.posY-10);
    } else {
  FUNGRID.setFutureViewport(FKR.protagonist.posX-FKR.viewOffX, FKR.protagonist.posY-FKR.viewOffY);
    }

  if (FKR.orientationWarning) {
        var m = FKR.meny.visible;
        FKR.meny.visible = false;
        FUNGRID.update("game");
        FKR.meny.visible = m;
        FUNGRID.update("ow");
    } else {
        FUNGRID.update("game");
    }

  // console.log(FKR.protagonist.posX);
 FUNGRID.getContext().textAlign = 'center';
      FUNGRID.getContext().fillStyle = '#FFFF66';
      FUNGRID.getContext().font = (12*FKR.s)+'px Arial';
      FUNGRID.getContext().fillText(FKR.score,458.5*FKR.s,29*FKR.s);
      if (FKR.score>FKR.rekord) {
        FKR.rekord = FKR.score;
        if(typeof(Storage)!=="undefined") {
      localStorage.FKrekord1 = JSON.stringify(FKR.rekord);
        }
      }
      FUNGRID.getContext().fillStyle = 'rgba(255,255,255,0.2)';
      FUNGRID.getContext().font = (12*FKR.s)+'px Arial';
       FUNGRID.getContext().fillText(FKR.rekord,430*FKR.s,29*FKR.s);
      
  }
  
}