var DYREMIX = {};

window.onresize = function () {
    DYREMIX.onResize();
}
DYREMIX.onResize = function () {
};

DYREMIX.init = function (scale, path, canvasid) {
	DYREMIX.lang = "no";
  DYREMIX.path = path;
  DYREMIX.canvasid = canvasid;
	DYREMIX.s = scale || 1;
	
	// Bugfix på samsung - dobbeltouch
	DYREMIX.touchReady = true;

var manifest;
  if (DYREMIX.s==2) {
    manifest = [{id: "bg", src: "gfx/bg.jpg"},{id: "sprites", src: "gfx/dyremix.png"}];
    } else {
     manifest = [{id: "bg", src: "gfx/bg_05.jpg"},{id: "sprites", src: "gfx/dyremix_05.png"}];
    }
 SUPERLOAD.init(canvasid, "rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)", manifest,
  [{id: "start", mp3: "gfx/start.mp3", ogg: "gfx/start.ogg"},{id: "slutt", mp3: "gfx/slutt.mp3", ogg: "gfx/slutt.ogg"},{id: "elefant", mp3: "gfx/elefant.mp3", ogg: "gfx/elefant.ogg"},{id: "elg", mp3: "gfx/elg.mp3", ogg: "gfx/elg.ogg"},
  {id: "fisk", mp3: "gfx/fisk.mp3", ogg: "gfx/fisk.ogg"},{id: "gris", mp3: "gfx/gris.mp3", ogg: "gfx/gris.ogg"},{id: "hest", mp3: "gfx/hest.mp3", ogg: "gfx/hest.ogg"},{id: "isbjorn", mp3: "gfx/isbjorn.mp3", ogg: "gfx/isbjorn.ogg"},
  {id: "klikk", mp3: "gfx/klikk.mp3", ogg: "gfx/klikk.ogg"},{id: "krokodille", mp3: "gfx/krokodille.mp3", ogg: "gfx/krokodille.ogg"},{id: "loeve", mp3: "gfx/loeve.mp3", ogg: "gfx/loeve.ogg"},{id: "nesehorn", mp3: "gfx/nesehorn.mp3", ogg: "gfx/nesehorn.ogg"},
  {id: "sebra", mp3: "gfx/sebra.mp3", ogg: "gfx/sebra.ogg"},{id: "match", mp3: "gfx/match.mp3", ogg: "gfx/match.ogg"},{id: "sjiraff", mp3: "gfx/sjiraff.mp3", ogg: "gfx/sjiraff.ogg"},{id: "sommerfugl", mp3: "gfx/sommerfugl.mp3", ogg: "gfx/sommerfugl.ogg"},
  {id: "ugle", mp3: "gfx/ugle.mp3", ogg: "gfx/ugle.ogg"}], DYREMIX.init2);

    DYREMIX.PRELOADER = "PRELAODER";
    DYREMIX.MAINMENU = "MAINMENU";
    DYREMIX.INSTRUCTIONS = "INSTRUCTIONS";
    DYREMIX.GAME = "GAME";
    DYREMIX.GAMEOVER = "GAMEOVER";
    DYREMIX.tilstand = DYREMIX.PRELOADER;
    
    if(typeof(Storage)!=="undefined") {
    if(localStorage.DYREMIXrekord) {
    	DYREMIX.rekord = JSON.parse(localStorage.DYREMIXrekord);
    } else {
    	DYREMIX.rekord = 1000;
	    localStorage.DYREMIXrekord = JSON.stringify(DYREMIX.rekord);
    }
  } else {
  // Sorry! No web storage support..
  DYREMIX.rekord = 1000;
  }
  
}

SCRT = {};
SCRT.game_id = "krokofant";

DYREMIX.lagDyr = function (navnA, navnB, lyd, x, y, w, h, splitX, splitY) {
  x *=0.5;
  y*=0.5;
  w*=0.5;
  h*=0.5;
  splitX *=0.5;
  splitY *= 0.5;

  DYREMIX.conY = 146;
  DYREMIX.avstY = 180;

  var dyrA = FUNGRID.GameObject(navnA, SUPERLOAD.getGraphic("sprites"),160,DYREMIX.conY ,1,1);
  dyrA.addSprite(navnA, x*0.8, y*0.8, (splitX-x)*0.8+1, h*0.8, (x-splitX)*0.8, (y-splitY)*0.8);
  dyrA.off = DYREMIX.a.length;
  dyrA.navn = navnA+navnB;
  dyrA.posY = DYREMIX.avstY *(DYREMIX.offA+dyrA.off)+DYREMIX.conY;
  dyrA.targetY = dyrA.posY;
  dyrA.lyd = lyd;
  dyrA.customEarlyUpdate = function () {
    var dy = this.targetY-this.posY;
      var limit = 500;
      if (DYREMIX.a.length===3) {
        limit = 300;
      }
    if (Math.abs(dy)>limit && this.targetY!==296) {
      if (DYREMIX.a.length<=4) {
        if (this.targetY<0) {
          this.posY = this.targetY-200;
        } else if (this.targetY>280) {
          this.posY = this.targetY+250;
        } else {
          this.posY = this.targetY;
        }
      } else {
      this.posY = this.targetY;
      }
    } else {
    this.posY += 0.2*dy;
    }
  };
  dyrA.match = function () {
    this.posY = this.targetY;
    DYREMIX.pause = true;
    setTimeout(DYREMIX.match2, 1000);
    this.speedX = 0;
    this.accelerationX = 0.01;
    if (DYREMIX.a.length===1) {
SUPERLOAD.getSound("slutt").play();
    } else {
      SUPERLOAD.getSound("match").play();
    }
  };
  FUNGRID.addGameObject(dyrA,"game");
  var dyrB = FUNGRID.GameObject(navnB, SUPERLOAD.getGraphic("sprites"),160,DYREMIX.conY ,1,1);
  dyrB.addSprite(navnB, splitX*0.8, y*0.8, (w-(splitX-x))*0.8, h*0.8, 0, (y-splitY)*0.8);
   dyrB.off = DYREMIX.a.length;
   dyrB.navn = navnA+navnB;
   dyrB.posY = DYREMIX.avstY *(DYREMIX.offB+dyrB.off)+DYREMIX.conY;
   dyrB.targetY = dyrB.posY;
   dyrB.customEarlyUpdate = function () {
    var dy = this.targetY-this.posY;
     var limit = 500;
      if (DYREMIX.a.length===3) {
        limit = 300;
      }
    if (Math.abs(dy)>limit && this.targetY!==296) {
      if (DYREMIX.a.length<=4) {
        if (this.targetY<0) {
          this.posY = this.targetY-200;
        } else if (this.targetY>280) {
          this.posY = this.targetY+250;
        } else {
          this.posY = this.targetY;
        }
      } else {
      this.posY = this.targetY;
      }
    } else {
    this.posY += 0.2*dy;
    }
  };
  dyrB.match = function (posY) {
    this.posY = posY;
    this.speedX = 0;
    this.accelerationX = 0.01;
  };
  FUNGRID.addGameObject(dyrB,"game");
  DYREMIX.a.push(dyrA);
  DYREMIX.b.push(dyrB);
  return {a: dyrA, b: dyrB};
}
DYREMIX.match2 = function () {
//DYREMIX.matchA.visible = false;
//DYREMIX.matchB.visible = false;
// DYREMIX.ov.visible = true;
// DYREMIX.oh.visible = true;
SUPERLOAD.getSound(DYREMIX.matchA.lyd).play();
// DYREMIX.howls[DYREMIX.matchA.lyd].play();
DYREMIX.matchA.moveable = true;
DYREMIX.matchB.moveable = true;
DYREMIX.pause = false;
}


DYREMIX.init2 = function () {
  SUPERSTARS.destroy();
    FUNGRID.init(DYREMIX.canvasid,DYREMIX.s);
    FUNGRID.doClearCanvas = false;
    FUNTOUCH.init(DYREMIX.canvasid,DYREMIX.s);
    FUNTOUCH.customDown = DYREMIX.touchDown;
    FUNTOUCH.customUp = DYREMIX.touchUp;
    FUNTOUCH.preventDefault = false;
   DYREMIX.trykk = 0;
    DYREMIX.pause = false;
    window.scrollTo(0, 1);
var bg= FUNGRID.GameObject("bg",SUPERLOAD.getGraphic("bg"),0,0,0,0);
bg.addSprite("bg",0,0,320,372);
FUNGRID.addGameObject(bg,"game");
var bggo= FUNGRID.GameObject("bggo",SUPERLOAD.getGraphic("bg"),0,0,0,0);
bggo.addSprite("bggo",640,0,320,372);
FUNGRID.addGameObject(bggo,"gameover");
var bgm= FUNGRID.GameObject("bgm",SUPERLOAD.getGraphic("bg"),0,0,0,0);
bgm.addSprite("bg",320,0,320,372);
FUNGRID.addGameObject(bgm,"menu");
  FUNGRID.update("menu");
  FUNGRID.getContext.fillStyle = 'rgb(255,255,255)';
  DYREMIX.a = [];
  DYREMIX.b = [];
  DYREMIX.funnet = [];
   DYREMIX.offA = -Math.floor(Math.random()*13);
 DYREMIX.offB = -Math.floor(Math.random()*13);
  
    DYREMIX.lagDyr("NESE", "HORN","nesehorn", 0,0,508,350,306,84);
    DYREMIX.lagDyr("GRI", "S","gris", 0,350,538,270,300,350);
    DYREMIX.lagDyr("FI", "SK","fisk", 0,620,566,274,258,674);
    DYREMIX.lagDyr("LØ", "VE","loeve", 0,894,692,462,352,998);
    DYREMIX.lagDyr("ELE", "FANT","elefant", 508,0,442,310,750,18);
    DYREMIX.lagDyr("SOMMER", "FUGL","sommerfugl", 538,310,486,376,780,420);
    DYREMIX.lagDyr("U", "GLE","ugle", 694,686,414,274,868,720);
    DYREMIX.lagDyr("KROKO", "DILLE", "krokodille", 694,960,714,338,1040,960);
    DYREMIX.lagDyr("SE", "BRA","sebra", 1024,0,386,425,1260,92);
    DYREMIX.lagDyr("SJI", "RAFF","sjiraff", 1108,426,398,522,1294,604);
    DYREMIX.lagDyr("IS", "BJØRN","isbjorn", 1412,0,554,280,1724,2);
    DYREMIX.lagDyr("HE", "ST", "hest",1476,280,478,374,1760,320);
    DYREMIX.lagDyr("EL", "G", "elg", 1410,946,570,464,1782,1078); 
 SCRT.game_id = DYREMIX.b[7].idName.toLowerCase()+DYREMIX.a[7].idName.toLowerCase();
DYREMIX.a = DYREMIX.a.sort(function(a,b){return Math.random()*2-1});
DYREMIX.b = DYREMIX.b.sort(function(a,b){return Math.random()*2-1});

while (DYREMIX.a[Math.abs(DYREMIX.offA)].navn===DYREMIX.b[Math.abs(DYREMIX.offB)].navn) {
//  console.log("omstokk...");
DYREMIX.b = DYREMIX.b.sort(function(a,b){return Math.random()*2-1});
  }
DYREMIX.distribuerDyr();
 
var fg2 = FUNGRID.GameObject("fg2",SUPERLOAD.getGraphic("sprites"),0,0,0,0);
fg2.addSprite("fg2",792,0,320,372);
FUNGRID.addGameObject(fg2,"game");

   
    FUNGRID.moveViewport(0,0);
  
  DYREMIX.tilstand = DYREMIX.MAINMENU;

if (DYREMIX.timerId) {
  clearInterval(DYREMIX.timerId);
}
  DYREMIX.timerId = setInterval(DYREMIX.update, FUNGRID.timeInterval);
   
}
DYREMIX.distribuerDyr = function () {
  
  for (var i=0; i<DYREMIX.a.length; i++) {

var oa = DYREMIX.offA + i;
while (oa > DYREMIX.a.length-3) {
  oa -= DYREMIX.a.length;
}
while (oa < -(DYREMIX.a.length-3)) {
  oa += DYREMIX.a.length;
}
if (DYREMIX.a.length<4) {
  oa -= 1;
}
if (DYREMIX.a.length===1) {
  oa = 0;
}
  DYREMIX.a[i].targetY = DYREMIX.avstY *oa+DYREMIX.conY;
var ob = DYREMIX.offB + i;
while (ob > DYREMIX.b.length-3) {
  ob -= DYREMIX.b.length;
}
while (ob < -(DYREMIX.b.length-3)) {
  ob += DYREMIX.b.length;
}
if (DYREMIX.b.length<4) {
  ob -= 1;
}
if (DYREMIX.b.length===1) {
  ob = 0;
}
  DYREMIX.b[i].targetY = DYREMIX.avstY *ob+DYREMIX.conY;

  }
}

DYREMIX.touchDown = function () {
  // console.log("DM tD "+FUNTOUCH.lastX+","+FUNTOUCH.lastY);
  if (DYREMIX.tilstand===DYREMIX.MAINMENU) {
    if (FUNTOUCH.lastY>135 && FUNTOUCH.lastY<200 && FUNTOUCH.lastX>80 && FUNTOUCH.lastX<240) {
      SUPERLOAD.getSound("start").play();
    DYREMIX.tilstand = DYREMIX.GAME;
    FUNTOUCH.preventDefault = true;
    FUNGRID.update("game");
    }
  } else if (DYREMIX.tilstand===DYREMIX.GAMEOVER) {
    if (FUNTOUCH.lastY<300 && FUNTOUCH.lastY>252) {
    SUPERLOAD.getSound("klikk").play();
    DYREMIX.init2();
    } else if (FUNTOUCH.lastY<248 && FUNTOUCH.lastY>190) {
      SUPERLOAD.getSound("start").play();
      DYREMIX.init2();
    DYREMIX.tilstand = DYREMIX.GAME;
    FUNTOUCH.preventDefault = true;
    FUNGRID.update("game");
    }
	} else if (!DYREMIX.pause && DYREMIX.touchReady) {
  if (FUNTOUCH.lastX<68) {
    if (FUNTOUCH.lastY<170 && FUNTOUCH.lastY>100) {
      DYREMIX.offA-=1;
       DYREMIX.trykk +=1;
       SUPERLOAD.getSound("klikk").play();
       DYREMIX.touchReady = false;
    } else if (FUNTOUCH.lastY>185 && FUNTOUCH.lastY<255) {
DYREMIX.offA+=1;
 DYREMIX.trykk +=1;
 SUPERLOAD.getSound("klikk").play();
 DYREMIX.touchReady = false;
    }
  } else if (FUNTOUCH.lastX>252) {
    if (FUNTOUCH.lastY<170 && FUNTOUCH.lastY>100) {
DYREMIX.offB-=1;
 DYREMIX.trykk +=1;
 SUPERLOAD.getSound("klikk").play();
 DYREMIX.touchReady = false;
    } else if (FUNTOUCH.lastY>185 && FUNTOUCH.lastY<255) {
      DYREMIX.offB+=1;
       DYREMIX.trykk +=1;
       SUPERLOAD.getSound("klikk").play();
       DYREMIX.touchReady = false;
    }

  }
  if (FUNTOUCH.lastY > 342 && FUNTOUCH.lastY < 358 && FUNTOUCH.lastX>5 && FUNTOUCH.lastX<60) {
   SUPERLOAD.getSound("sjiraff").play();
    DYREMIX.init2();
  } 
 
  DYREMIX.distribuerDyr();
  // console.log(DYREMIX.offA+" "+DYREMIX.offB);
}
}

DYREMIX.touchUp = function () {
 
}
DYREMIX.update = function () {
  FUNTOUCH.setCursorStyle("default");
  if (DYREMIX.tilstand===DYREMIX.GAMEOVER) {

    if ((FUNTOUCH.Y<300 && FUNTOUCH.Y>252 && FUNTOUCH.X>90 && FUNTOUCH.X<230) || (FUNTOUCH.Y<248 && FUNTOUCH.Y>190 && FUNTOUCH.X>60 && FUNTOUCH.X<260)) {
      FUNTOUCH.setCursorStyle("pointer");
    }

	} else if (DYREMIX.tilstand===DYREMIX.MAINMENU) {
    if (FUNTOUCH.Y>135 && FUNTOUCH.Y<200  && FUNTOUCH.X>80 && FUNTOUCH.X<240) {
      FUNTOUCH.setCursorStyle("pointer");
    }
  } else if (DYREMIX.a.length===0 && DYREMIX.sisteFjerna.posX > 350) {
    FUNGRID.update("gameover");
   
FUNGRID.getContext().textAlign = 'center';
FUNGRID.getContext().font = "bold "+(60*DYREMIX.s)+'px Open sans';
FUNGRID.getContext().fillStyle ='#FFFFFF';
FUNGRID.getContext().fillText(DYREMIX.trykk,160*DYREMIX.s,DYREMIX.s*140);
FUNGRID.getContext().font = "bold "+(32*DYREMIX.s)+'px Open sans';
SUPERLOAD.lagre(29,DYREMIX.trykk);
var kommentar = "";
  if (DYREMIX.rekord>DYREMIX.trykk) {
    DYREMIX.rekord=DYREMIX.trykk;
    kommentar ="NY REKORD!";
    if(typeof(Storage)!=="undefined") {
    localStorage.DYREMIXrekord = JSON.stringify(DYREMIX.rekord);
    }
  } else {
    if (DYREMIX.trykk<10) {
      kommentar = "SUVERENT!";
    } else if (DYREMIX.trykk<20) {
      kommentar = "Veldig bra!";
    } else if (DYREMIX.trykk<30) {
      kommentar = "Bra jobba!";
    } else if (DYREMIX.trykk<40) {
      kommentar = "Grei skuring!";
    } else if (DYREMIX.trykk<50) {
      kommentar = "Du har klart bedre!";
    } else if (DYREMIX.trykk<60) {
      kommentar = "Du kan klare bedre!";
    } else {
      kommentar = "PRØV IGJEN!";
  }
}
  FUNGRID.getContext().fillText(kommentar,160*DYREMIX.s,DYREMIX.s*343);
  DYREMIX.tilstand = DYREMIX.GAMEOVER;
  SCRT.game_id = "ellediller";
  FUNTOUCH.preventDefault = false;
} else {
if (!DYREMIX.pause) {
  FUNGRID.update("game");
  FUNGRID.getContext().fillStyle = 'rgb(255,255,255)';
        
        FUNGRID.getContext().textAlign = 'center';
        
FUNGRID.getContext().font = "bold "+(22*DYREMIX.s)+'px Open sans';
        for (var i=0; i<DYREMIX.a.length; i++) {
          if (Math.abs(DYREMIX.a[i].posY-DYREMIX.conY)<2) {
            for (var j=0; j<DYREMIX.b.length; j++) {
              if (Math.abs(DYREMIX.b[j].posY-DYREMIX.conY)<2) {
                FUNGRID.getContext().textAlign = 'center';
                FUNGRID.getContext().fillText(DYREMIX.a[i].idName+DYREMIX.b[j].idName,160*DYREMIX.s,278*DYREMIX.s);
                if (DYREMIX.a[i].navn===DYREMIX.b[j].navn) {
      DYREMIX.funnet.push(DYREMIX.a[i].idName+DYREMIX.b[j].idName);
       DYREMIX.a[i].match();
       DYREMIX.b[j].match(DYREMIX.a[i].posY);
       FUNGRID.update("game");
       FUNGRID.getContext().textAlign = 'center';
       FUNGRID.getContext().fillText(DYREMIX.a[i].idName+DYREMIX.b[j].idName,160*DYREMIX.s,278*DYREMIX.s);
       DYREMIX.matchA = DYREMIX.a[i];
       DYREMIX.matchB = DYREMIX.b[j];
       DYREMIX.sisteFjerna = DYREMIX.matchA;
       DYREMIX.a.splice(i,1);
       DYREMIX.b.splice(j,1);
       DYREMIX.distribuerDyr();

    }

              }
            }
          }
        }



FUNGRID.getContext().fillStyle ='#FFFFFF';
FUNGRID.getContext().textAlign = 'center';
/* FUNNETLISTE
for (var i = 0; i<DYREMIX.funnet.length; i++) {  
FUNGRID.getContext().fillText(DYREMIX.funnet[i],DYREMIX.s*320*0.9,DYREMIX.s*(280+7*i));
} */
FUNGRID.getContext().font = (12*DYREMIX.s)+'px Open sans';
FUNGRID.getContext().fillText(DYREMIX.funnet.length+" / "+(DYREMIX.a.length+DYREMIX.funnet.length),DYREMIX.s*36,DYREMIX.s*71);

FUNGRID.getContext().font = "bold "+(35*DYREMIX.s)+'px Open sans';

var tier = "0";
var ener = "0";
if (Math.min(99,DYREMIX.trykk).toString().length===1) {
  
  FUNGRID.getContext().fillStyle = 'rgba(255,255,255,0.3)';
  ener = Math.min(99,DYREMIX.trykk).toString().charAt(0);
} else {
  tier = Math.min(99,DYREMIX.trykk).toString().charAt(0);
  FUNGRID.getContext().fillStyle ='#FFFFFF';
  ener = Math.min(99,DYREMIX.trykk).toString().charAt(1);
}
FUNGRID.getContext().fillText(tier,24*DYREMIX.s,DYREMIX.s*54);
FUNGRID.getContext().fillStyle ='#FFFFFF';

FUNGRID.getContext().fillText(ener,48*DYREMIX.s,DYREMIX.s*54);
FUNGRID.getContext().fillStyle = 'rgba(0,0,0,0.3)';
var rx1 = 277;
var rx2 = rx1+24;
if (DYREMIX.rekord===1000) {
FUNGRID.getContext().fillText("-",rx1*DYREMIX.s,DYREMIX.s*54);
FUNGRID.getContext().fillText("-",rx2*DYREMIX.s,DYREMIX.s*54);
} else {
if (DYREMIX.rekord<10) {
FUNGRID.getContext().fillText("0",rx1*DYREMIX.s,DYREMIX.s*54);
} else {
  FUNGRID.getContext().fillText(Math.min(99,DYREMIX.rekord).toString().charAt(0),rx1*DYREMIX.s,DYREMIX.s*54);
}
FUNGRID.getContext().fillText(Math.min(99,DYREMIX.rekord).toString().charAt(DYREMIX.rekord.length-1),rx2*DYREMIX.s,DYREMIX.s*54);
}
FUNGRID.getContext().font = "bold "+(12*DYREMIX.s)+'px Open sans';
FUNGRID.getContext().fillStyle = 'rgba(255,255,255,0.2)';
if (DYREMIX.a.length>0) {
FUNGRID.getContext().fillText("AVSLUTT",32*DYREMIX.s,DYREMIX.s*355);
}


if (FUNTOUCH.X<68) {
    if ((FUNTOUCH.Y<170 && FUNTOUCH.Y>100) || (FUNTOUCH.Y>185 && FUNTOUCH.Y<255)) {
FUNTOUCH.setCursorStyle("pointer");
    }
  } else if (FUNTOUCH.X>252) {
    if ((FUNTOUCH.Y<170 && FUNTOUCH.Y>100) || (FUNTOUCH.Y>185 && FUNTOUCH.Y<255)) {
      FUNTOUCH.setCursorStyle("pointer");
    }

  }
  if (FUNTOUCH.Y > 342 && FUNTOUCH.Y < 358 && FUNTOUCH.X>5 && FUNTOUCH.X<60) {
  FUNTOUCH.setCursorStyle("pointer");
  } 



} 
}
DYREMIX.touchReady = true;
}