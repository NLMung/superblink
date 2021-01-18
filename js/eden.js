var EDEN = {};

window.onresize = function () {
    EDEN.onResize();
}
EDEN.onResize = function () {
   // T13.init2();
};

EDEN.init = function (scale) {
	EDEN.lang = "no";
	EDEN.s = scale || 1;
  EDEN.level = 0;


var manifest;
  if (EDEN.s==2) {
    manifest = [{id: "bg", src: "gfx/bg.jpg"},{id: "sprites", src: "gfx/eden.png"}];
    } else {
     manifest = [{id: "bg", src: "gfx/bg_05.jpg"},{id: "sprites", src: "gfx/eden_05.png"}];
    }
 SUPERLOAD.init("canvas", "black", "rgba(255,255,255,0.25)", manifest, [{id: "spise", mp3: "gfx/spise.mp3", ogg: "gfx/spise.ogg"},{id: "slange", mp3: "gfx/slange.mp3", ogg: "gfx/slange.ogg"},{id: "level", mp3: "gfx/level.mp3", ogg: "gfx/level.ogg"},{id: "feilfrukt", mp3: "gfx/feilfrukt.mp3", ogg: "gfx/feilfrukt.ogg"}], EDEN.init2);



    EDEN.PRELOADER = "PRELAODER";
    EDEN.MAINMENU = "MAINMENU";
    EDEN.VELG = "VELG";
    EDEN.INSTRUKS = "INSTRUKS";
    EDEN.GAME = "GAME";
    EDEN.WIN = "WIN";
    EDEN.VENT = "VENT";
    EDEN.GAMEOVER = "GAMEOVER";
    EDEN.tilstand = EDEN.PRELOADER;

    FUNTOUCH.preventDefault = false;
    FUNKEYS.preventDefault = false;
    
    if(typeof(Storage)!=="undefined") {
    if(localStorage.EDENrekord) {
    	EDEN.rekord = JSON.parse(localStorage.EDENrekord);
    } else {
    	EDEN.rekord = 0;
	    localStorage.EDENrekord = JSON.stringify(EDEN.rekord);
    }
  } else {
  // Sorry! No web storage support..
  EDEN.rekord = 0;
  }
   // EDEN.timerId = setInterval(EDEN.update, FUNGRID.timeInterval);
   EDEN.timerId = setInterval(EDEN.update, 25);
}

SCRT = {};

EDEN.init2 = function () {

    FUNGRID.init("canvas", EDEN.s);
    FUNGRID.doClearCanvas = false;


        var bgm = FUNGRID.GameObject("bgm",SUPERLOAD.getGraphic("bg"),0,0);
        bgm.addSprite("bgm",0,0,320,372);
        FUNGRID.addGameObject(bgm,"mainmeny");

        var bgv = FUNGRID.GameObject("bgv",SUPERLOAD.getGraphic("bg"),0,0);
        bgv.addSprite("bgv",640,0,320,372);
        FUNGRID.addGameObject(bgv,"valg");

        var bgi = FUNGRID.GameObject("bgi",SUPERLOAD.getGraphic("bg"),0,0);
        bgi.addSprite("bgi",0,372,320,372);
        FUNGRID.addGameObject(bgi,"instruks");

        var bgl = FUNGRID.GameObject("bgl",SUPERLOAD.getGraphic("bg"),0,0);
        bgl.addSprite("bgl",320,372,320,372);
        FUNGRID.addGameObject(bgl,"levelcomplete");

        var bggo = FUNGRID.GameObject("bggo",SUPERLOAD.getGraphic("bg"),0,0);
        bggo.addSprite("bggo",640,372,320,372);
        FUNGRID.addGameObject(bggo,"gameover");

    FUNTOUCH.init("canvas", EDEN.s);
    FUNTOUCH.customDown = EDEN.touchDown;
    FUNTOUCH.customUp = EDEN.touchUp;

    FUNKEYS.initArrowsAndSpace();
    FUNKEYS.customUpDown = EDEN.keypressUp;
    FUNKEYS.customDownDown = EDEN.keypresDown;
    FUNKEYS.customLeftDown = EDEN.keypressLeft;
    FUNKEYS.customRightDown = EDEN.keypresRight;
    
    window.scrollTo(0, 1);
    EDEN.tilstand=EDEN.MAINMENU;
    SCRT.a = "k";
    SCRT.b = "c";
    SCRT.c = "a";
    SCRT.d = "n";
    SCRT.e = "s";
    SCRT.game_id = "kake";
}
EDEN.initGame = function (level, adam) {
  FUNGRID.destroyView("game");
  FUNTOUCH.preventDefault = true;
  FUNKEYS.preventDefault = true;
  var bg = FUNGRID.GameObject("bg",SUPERLOAD.getGraphic("bg"),0,0);
        bg.addSprite("bg",320,0,320,372);
        FUNGRID.addGameObject(bg,"game");
  EDEN.pause = true;
  if (level===1) {
    EDEN.poeng = 0;
    EDEN.slangetimer = 600;
  }
  if (level>5) {
    EDEN.slangetimer -= 20;
  }
  // FUNGRID.destroy();
  EDEN.level = level;
EDEN.frukter = [];
EDEN.initLevel(level);

EDEN.eva = FUNGRID.GameObject("eva",SUPERLOAD.getGraphic("sprites"),25,25,1,1);
EDEN.adam = adam;
var adamtillegg = 75;
/* var adam = true;
if (Math.random()<0.5) {
  adam = false;
} */
if (!adam) {
  adamtillegg = 0;
}
EDEN.eva.addSprite("idleR",50+adamtillegg,0,25,25);
EDEN.eva.addSprite("run1R",75+adamtillegg,0,25,25);
EDEN.eva.addSprite("run2R",100+adamtillegg,0,25,25);
EDEN.eva.addSprite("idleL",50+adamtillegg,25,25,25);
EDEN.eva.addSprite("run1R",75+adamtillegg,25,25,25);
EDEN.eva.addSprite("run1R",100+adamtillegg,25,25,25);
if (adam) {
  EDEN.eva.addSprite("gameover",175,50,25,25);
} else {
  EDEN.eva.addSprite("gameover",25,25,25,25);
}
EDEN.eva.blikk = "R";
EDEN.evaSpeed = 5;
EDEN.eva.customEarlyUpdate = function (funGrid) {
  if (EDEN.tilstand===EDEN.GAME) {
  if (this.posX<this.gridX*25) {
    this.posX += Math.min(EDEN.evaSpeed,this.gridX*25-this.posX);
    this.blikk = "R";
  } else if (this.posX>this.gridX*25) {
    this.posX -= Math.min(EDEN.evaSpeed,this.posX-this.gridX*25);
    this.blikk = "L";
  } else if (this.posY<this.gridY*25) {
    this.posY += Math.min(EDEN.evaSpeed,this.gridY*25-this.posY);
  } else if (this.posY>this.gridY*25) {
    this.posY -= Math.min(EDEN.evaSpeed,this.posY-this.gridY*25);
  } else {
    this.fruktsjekk();
    if (FUNTOUCH.isDown) {
    
EDEN.dpad();

} else if (FUNKEYS.upIsDown) {
  EDEN.eva.newGridPos(this.gridX,this.gridY-1);
  } else if (FUNKEYS.downIsDown) {
    EDEN.eva.newGridPos(this.gridX,this.gridY+1);
    } else if (FUNKEYS.leftIsDown) {
      EDEN.eva.newGridPos(this.gridX-1,this.gridY);
      } else if (FUNKEYS.rightIsDown) {
EDEN.eva.newGridPos(this.gridX+1,this.gridY);
}
}
var d = Math.max(Math.abs(this.posX-this.gridX*25),Math.abs(this.posY-this.gridY*25));
  
    if (EDEN.tilstand===EDEN.GAME) {
    if (d<5) {
      this.spriteIndex = 0;
    } else if (d<20) {
      if ((this.gridX+this.gridY)%2===0) {
      this.spriteIndex = 1;
    } else {
      this.spriteIndex = 2;
    }
    } else {
      this.spriteIndex = 0;
    }
    if (this.blikk==="L") {
    this.spriteIndex += 3;
  }
  }

  
}
};
EDEN.eva.fruktsjekk = function () {
  if (EDEN.tilstand===EDEN.GAME) {
for (var i=0; i<EDEN.frukter.length; i++) {
      if (this.gridX===EDEN.frukter[i].gridX && this.gridY===EDEN.frukter[i].gridY && !EDEN.frukter[i].spist) {
        EDEN.frukter[i].spist = true;
        EDEN.frukter[i].visible = false;
        SUPERLOAD.getSound("spise").play();
        if (EDEN.frukter[i].idName==="frukt10") {
          SCRT.game_id = SCRT.e+SCRT.d+SCRT.e+SCRT.a+"e";
          EDEN.gameOver(false);
          SUPERLOAD.getSound("feilfrukt").play();
        } else {
          EDEN.poeng += 10;
          EDEN.frukterIgjen -=1;
          if (EDEN.frukterIgjen<1) {
            SUPERLOAD.getSound("level").play();
            EDEN.eva.spriteIndex = 0;
            EDEN.tilstand = EDEN.WIN;
            FUNTOUCH.preventDefault = false;
            FUNKEYS.preventDefault = false;
            EDEN.gameOverTid = new Date().getTime();
            FUNGRID.update("game");
          }
        }
      }
    }
    if (EDEN.slangen) {
    for (var i=0;i<EDEN.slangen.length; i++) {
      if (EDEN.slangen[i].x===EDEN.eva.gridX && EDEN.slangen[i].y===EDEN.eva.gridY) {
        SCRT.game_id = SCRT.e+SCRT.d+SCRT.e+SCRT.a+"e";
        EDEN.gameOver(true);
        SUPERLOAD.getSound("slange").play();
      }
    }
  }
  }
};
EDEN.eva.newGridPos = function (gx,gy) {
  this.fruktsjekk();
  if (this.posX===this.gridX*25 && this.posY===this.gridY*25) {
  /* if (gx===19) {
    this.posX = -25;
    gx = 0;
  }
  if (gx===-1) {
    this.posX = 19*25;
    gx = 18;
  } */
  if (gx>=0 && gy>=0 && gx<=12 && gy<=10) {
  if (EDEN.bane[gy][gx]!==1) {
    this.gridX = gx;
    this.gridY = gy;
  }
  }
}
};
EDEN.eva.gridX = 1;
EDEN.eva.gridY = 1;
EDEN.eva.newGridPos(1,1);


   
EDEN.slange = FUNGRID.GameObject("slange",SUPERLOAD.getGraphic("sprites"),25*EDEN.slangen[0].x,25*EDEN.slangen[0].y,1,1);
EDEN.slange.addSprite("ned",0,50,25,25);
EDEN.slange.addSprite("opp",25,50,25,25);
EDEN.slange.addSprite("h",50,50,25,25);
EDEN.slange.addSprite("v",75,50,25,25);
FUNGRID.addGameObject(EDEN.slange,"game");

EDEN.snake = [EDEN.slange];

var kroppsdeler = EDEN.slangen.length-2;
for (var i=0; i<kroppsdeler; i++) {
  EDEN.snake.push(FUNGRID.GameObject("kropp",SUPERLOAD.getGraphic("sprites"),25*EDEN.slangen[i+1].x,25*EDEN.slangen[i+1].y,1,1));
  EDEN.snake[1+i].addSprite("oppned",100,50,25,25);
EDEN.snake[1+i].addSprite("vh",100,75,25,25);
EDEN.snake[1+i].addSprite("vned",0,75,25,25);
EDEN.snake[1+i].addSprite("vopp",25,75,25,25);
EDEN.snake[1+i].addSprite("opph",50,75,25,25);
EDEN.snake[1+i].addSprite("nedh",75,75,25,25);
FUNGRID.addGameObject(EDEN.snake[1+i],"game");
}

EDEN.hale = FUNGRID.GameObject("hale",SUPERLOAD.getGraphic("sprites"),25*EDEN.slangen[EDEN.snake.length].x,25*EDEN.slangen[EDEN.snake.length].y,1,1);
EDEN.hale.addSprite("ned",125,50,25,25);
EDEN.hale.addSprite("v",150,50,25,25);
EDEN.hale.addSprite("h",125,75,25,25);
EDEN.hale.addSprite("opp",150,75,25,25);
FUNGRID.addGameObject(EDEN.hale,"game");


EDEN.snake.push(EDEN.hale);

FUNGRID.addGameObject(EDEN.eva, "game");
EDEN.updateSlange();
// EDEN.snake = [EDEN.slange, EDEN.kropp, EDEN.kropp2, EDEN.kropp3, EDEN.hale];



    FUNGRID.moveViewport(0,0);
  
  EDEN.tilstand = EDEN.GAME;
  FUNGRID.update("game");
  EDEN.drawGameText();
 
 if (EDEN.timerId2) {
  clearInterval(EDEN.timerId2);
 }
  EDEN.timerId2 = setInterval(EDEN.flyttSlange, EDEN.slangetimer);
   
}
EDEN.flyttSlange = function () {
  if (EDEN.tilstand===EDEN.GAME && !EDEN.pause) {
    EDEN.bonus-=1;
    EDEN.bonus = Math.max(EDEN.bonus,0);
  var nyttHode = {x:-1,y:-1};
  var nyRetning = 0;
  var motEva = "";

if (Math.abs(EDEN.slangen[0].x-EDEN.eva.gridX)>Math.abs(EDEN.slangen[0].y-EDEN.eva.gridY)) {
      if (EDEN.slangen[0].x<EDEN.eva.gridX) {
        motEva = "h";
      } else {
        motEva = "v";
      }
    } else {
        if (EDEN.slangen[0].y<EDEN.eva.gridY) {
            motEva = "n";
        } else {
          motEva = "o";
        }
    }

    var forsok = 0;
// console.log("flyttSlange motEva "+motEva+" level "+EDEN.level+ " nyttHode "+nyttHode.x+","+nyttHode.y);
  while (nyttHode.x<0 || nyttHode.y<0 || nyttHode.x>12 || nyttHode.y>10 || EDEN.bane[nyttHode.y][nyttHode.x]===1) {
    nyRetning = Math.floor(Math.random()*3);
    forsok +=1;
     // console.log("forsok "+forsok+" nyRetning "+nyRetning);
  if (EDEN.slangen[0].x<EDEN.slangen[1].x) {

    // VENSTRE
    if (forsok===1) {
    if (motEva==="v") {
      nyRetning = 1;
    } else if (motEva==="n") {
      nyRetning = 0;
    } else if (motEva==="o") {
      nyRetning = 2;
    }
  }
   // console.log("nyRetning "+nyRetning);
    if (nyRetning===0) {
      // NED
      nyttHode = {x:EDEN.slangen[0].x, y:EDEN.slangen[0].y+1};
    } else if (nyRetning===1) {
      if (EDEN.level===2) console.log("EDEN.slangen[0].x "+EDEN.slangen[0].x);
      // VENSTRE
      nyttHode = {x:EDEN.slangen[0].x-1, y:EDEN.slangen[0].y};
    } else {
      // OPP
      nyttHode = {x:EDEN.slangen[0].x, y:EDEN.slangen[0].y-1};
    }
  } else if (EDEN.slangen[0].x>EDEN.slangen[1].x) {
    // HØGRE
    if (forsok===1) {
    if (motEva==="h") {
      nyRetning = 1;
    } else if (motEva==="n") {
      nyRetning = 2;
    } else if (motEva==="o") {
      nyRetning = 0;
    }
  }
    if (nyRetning===0) {
      // OPP
      nyttHode = {x:EDEN.slangen[0].x, y:EDEN.slangen[0].y-1};
    } else if (nyRetning===1) {
      // HØGRE
      nyttHode = {x:EDEN.slangen[0].x+1, y:EDEN.slangen[0].y};
    } else {
      // NED
      nyttHode = {x:EDEN.slangen[0].x, y:EDEN.slangen[0].y+1};
    }
  } else if (EDEN.slangen[0].y<EDEN.slangen[1].y) {
    // OPP
    if (forsok===1) {
    if (motEva==="v") {
      nyRetning = 0;
    } else if (motEva==="h") {
      nyRetning = 2;
    } else if (motEva==="o") {
      nyRetning = 1;
    }
  }
    if (nyRetning===0) {
      // VENSTRE
      nyttHode = {x:EDEN.slangen[0].x-1, y:EDEN.slangen[0].y};
    } else if (nyRetning===1) {
      // OPP
      nyttHode = {x:EDEN.slangen[0].x, y:EDEN.slangen[0].y-1};
    } else {
      // HØGRE
      nyttHode = {x:EDEN.slangen[0].x+1, y:EDEN.slangen[0].y};
    }
  } else {
    // NED
    if (forsok===1) {
    if (motEva==="v") {
      nyRetning = 2;
    } else if (motEva==="h") {
      nyRetning = 0;
    } else if (motEva==="n") {
      nyRetning = 1;
    }
  }
    if (nyRetning===0) {
      // HØGRE
      nyttHode = {x:EDEN.slangen[0].x+1, y:EDEN.slangen[0].y};
    } else if (nyRetning===1) {
      // NED
      nyttHode = {x:EDEN.slangen[0].x, y:EDEN.slangen[0].y+1};
    } else {
      // VENSTRE
      nyttHode = {x:EDEN.slangen[0].x-1, y:EDEN.slangen[0].y};
    }
  }

}
// console.log(nyttHode.x+","+nyttHode.y);
EDEN.slangen.splice(0,0,nyttHode);
  EDEN.slangen.pop();
  for (var i=0; i<EDEN.snake.length; i++) {
    EDEN.snake[i].posX = 25*EDEN.slangen[i].x-2;
    EDEN.snake[i].posY = 25*EDEN.slangen[i].y;
  }
}
}
EDEN.gameOver = function(snakeDeath) {
  FUNTOUCH.preventDefault = false;
    FUNKEYS.preventDefault = false;
  EDEN.eva.spriteIndex = 6;
          EDEN.tilstand = EDEN.GAMEOVER;
          EDEN.gameOverTid = new Date().getTime();
          EDEN.snakeDeath = snakeDeath;
          FUNGRID.update("game");
          SUPERLOAD.lagre(3,EDEN.poeng);
          if (EDEN.poeng>EDEN.rekord) {
        EDEN.rekord = EDEN.poeng;
        EDEN.nyRekord = true;
        if(typeof(Storage)!=="undefined") {
      localStorage.EDENrekord = JSON.stringify(EDEN.rekord);
  }
} else {
  EDEN.nyRekord = false;
}
SCRT.game_id = "";
}
EDEN.updateSlange = function () {
  for (var i=0; i<EDEN.snake.length-2; i++) {

  
if (EDEN.slangen[i+1].x>EDEN.slangen[i].x) {
    // v
    if (i===0) {
    EDEN.slange.spriteIndex = 3;
    }
    if (EDEN.slangen[i+2].y>EDEN.slangen[i+1].y) {
      // vn
      EDEN.snake[i+1].spriteIndex = 2;
      EDEN.hale.spriteIndex = 3;
    } else if (EDEN.slangen[i+2].y<EDEN.slangen[i+1].y) {
      // vo
      EDEN.snake[i+1].spriteIndex = 3;
      EDEN.hale.spriteIndex = 0;
    } else {
      // vh
      EDEN.snake[i+1].spriteIndex = 1;
      EDEN.hale.spriteIndex = 1;
    }
  } else if (EDEN.slangen[i+1].x<EDEN.slangen[i].x) {
    // h
    if (i===0) {
    EDEN.slange.spriteIndex = 2;
   }
    if (EDEN.slangen[i+2].y>EDEN.slangen[i+1].y) {
      // hn
      EDEN.snake[i+1].spriteIndex = 5;
      EDEN.hale.spriteIndex = 3;
    } else if (EDEN.slangen[i+2].y<EDEN.slangen[i+1].y) {
      // ho
      EDEN.snake[i+1].spriteIndex = 4;
      EDEN.hale.spriteIndex = 0;
    } else {
      // hv
      EDEN.snake[i+1].spriteIndex = 1;
      EDEN.hale.spriteIndex = 2;
    }
  } else if (EDEN.slangen[i+1].y>EDEN.slangen[i].y) {
    // opp
    if (i===0) {
    EDEN.slange.spriteIndex = 1;
    }
    if (EDEN.slangen[i+2].x>EDEN.slangen[i+1].x) {
      // ho
      EDEN.snake[i+1].spriteIndex = 4;
      EDEN.hale.spriteIndex = 1;
    } else if (EDEN.slangen[i+2].x<EDEN.slangen[i+1].x) {
      // vo
      EDEN.snake[i+1].spriteIndex = 3;
      EDEN.hale.spriteIndex = 2;
    } else {
      // on
      EDEN.snake[i+1].spriteIndex = 0;
      EDEN.hale.spriteIndex = 3;
    }
  } else {
    // ned
    if (i===0) {
    EDEN.slange.spriteIndex = 0;
    }
    if (EDEN.slangen[i+2].x>EDEN.slangen[i+1].x) {
      // hn
      EDEN.snake[i+1].spriteIndex = 5;
      EDEN.hale.spriteIndex = 1;
    } else if (EDEN.slangen[i+2].x<EDEN.slangen[i+1].x) {
      // vn
      EDEN.snake[i+1].spriteIndex = 2;
      EDEN.hale.spriteIndex = 2;
    } else {
      // on
      EDEN.snake[i+1].spriteIndex = 0;
      EDEN.hale.spriteIndex = 0;
    }
  }

}

}
EDEN.initLevel = function (l) {
  // l = 6;
  EDEN.bane = [];
  EDEN.frukterIgjen = 0;
  EDEN.bonus = 100;
 // EDEN.bane[0] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  if (l%7===1) {
    EDEN.slangen = [{x:10,y:2},{x:11,y:2},{x:11,y:3},{x:11,y:4},{x:11,y:5},{x:11,y:6},{x:11,y:7},{x:10,y:7}];
   EDEN.bane[0] = [0,0,0,0,0,0,3,0,0,0,0,0,0];
   EDEN.bane[1] = [0,0,3,0,7,0,0,0,7,0,3,0,0];
   EDEN.bane[2] = [0,0,0,0,1,1,1,1,1,0,0,0,0];
   EDEN.bane[3] = [0,0,0,0,0,0,0,0,0,0,0,0,0];
   EDEN.bane[4] = [7,0,1,0,1,1,0,1,1,0,1,0,7];
   EDEN.bane[5] = [0,7,1,0,3,0,10,0,3,0,1,0,0];
   EDEN.bane[6] = [7,0,1,0,1,1,0,1,1,7,1,0,7];
   EDEN.bane[7] = [0,0,0,0,7,0,7,0,7,0,0,0,0];
   EDEN.bane[8] = [0,0,0,0,1,1,1,1,1,0,0,0,0];
   EDEN.bane[9] = [0,0,3,0,7,0,0,0,7,0,3,0,0];
   EDEN.bane[10] = [0,0,0,0,0,0,3,0,0,0,0,0,0];
 } else if (l%7===2) {
  EDEN.slangen = [{x:10,y:2},{x:11,y:2},{x:11,y:3},{x:11,y:4},{x:11,y:5},{x:11,y:6},{x:11,y:7},{x:10,y:7}];
   EDEN.bane[0] = [0,0,0,0,0,0,4,0,0,0,0,0,0];
   EDEN.bane[1] = [0,0,4,0,8,0,0,0,8,0,4,0,0];
   EDEN.bane[2] = [0,0,0,0,1,1,0,1,1,0,0,0,0];
   EDEN.bane[3] = [0,0,0,0,0,0,0,0,0,0,0,0,0];
   EDEN.bane[4] = [8,0,1,0,1,1,0,1,1,0,1,0,8];
   EDEN.bane[5] = [0,8,0,0,4,0,10,0,4,0,0,0,0];
   EDEN.bane[6] = [8,0,1,0,1,1,0,1,1,8,1,0,8];
   EDEN.bane[7] = [0,0,0,0,8,0,8,0,8,0,0,0,0];
   EDEN.bane[8] = [0,0,0,0,1,1,0,1,1,0,0,0,0];
   EDEN.bane[9] = [0,0,4,0,8,0,0,0,8,0,4,0,0];
   EDEN.bane[10] = [0,0,0,0,0,0,4,0,0,0,0,0,0];
 } else if (l%7===3) {
  EDEN.slangen = [{x:10,y:2},{x:11,y:2},{x:11,y:3},{x:11,y:4},{x:11,y:5},{x:11,y:6},{x:11,y:7},{x:10,y:7}];
   EDEN.bane[0] = [0,0,0,0,9,0,1,0,9,0,0,0,0];
   EDEN.bane[1] = [0,0,5,0,0,0,1,0,0,0,5,0,0];
   EDEN.bane[2] = [0,0,0,0,1,1,1,1,1,0,0,0,0];
   EDEN.bane[3] = [0,0,0,0,0,0,0,0,0,0,0,0,0];
   EDEN.bane[4] = [9,0,1,0,1,1,0,1,1,0,1,0,9];
   EDEN.bane[5] = [0,0,5,0,5,0,10,0,5,0,5,0,0];
   EDEN.bane[6] = [9,0,1,0,1,1,0,1,1,9,1,0,9];
   EDEN.bane[7] = [0,0,0,0,9,0,9,0,9,0,0,0,0];
   EDEN.bane[8] = [0,0,0,0,1,1,1,1,1,0,0,0,0];
   EDEN.bane[9] = [0,0,5,0,0,0,1,0,0,0,5,0,0];
   EDEN.bane[10] = [0,0,0,0,9,0,1,0,9,0,0,0,0];

 } else if (l%7===4) {
  EDEN.slangen = [{x:10,y:2},{x:11,y:2},{x:11,y:3},{x:11,y:4},{x:11,y:5},{x:11,y:6},{x:11,y:7},{x:10,y:7}];
   EDEN.bane[0] = [0,0,0,0,0,0,1,0,0,0,0,0,0];
   EDEN.bane[1] = [0,0,2,0,6,0,10,0,6,0,2,0,0];
   EDEN.bane[2] = [0,0,0,0,1,1,1,1,1,0,0,0,0];
   EDEN.bane[3] = [0,0,0,0,0,0,0,0,0,0,0,0,0];
   EDEN.bane[4] = [2,0,1,0,1,1,0,1,1,0,1,0,2];
   EDEN.bane[5] = [0,6,2,0,2,0,10,0,2,0,2,6,0];
   EDEN.bane[6] = [2,0,1,0,1,1,0,1,1,6,1,0,2];
   EDEN.bane[7] = [0,0,0,0,6,0,6,0,6,0,0,0,0];
   EDEN.bane[8] = [0,0,0,0,1,1,1,1,1,0,0,0,0];
   EDEN.bane[9] = [0,0,2,0,6,0,10,0,6,0,2,0,0];
   EDEN.bane[10] = [0,0,0,0,0,0,1,0,0,0,0,0,0];
} else if (l%7===5) {
  EDEN.slangen = [{x:9,y:1},{x:10,y:1},{x:11,y:1},{x:11,y:2},{x:11,y:3},{x:11,y:4},{x:10,y:4},{x:9,y:4}];
   EDEN.bane[0] = [7,0,0,0,0,0,1,0,0,0,0,0,8];
   EDEN.bane[1] = [0,0,0,0,0,0,1,0,0,0,0,0,0];
   EDEN.bane[2] = [0,0,0,0,3,0,1,0,4,0,0,0,0];
   EDEN.bane[3] = [0,0,3,0,0,0,1,0,0,0,4,0,0];
   EDEN.bane[4] = [0,0,0,0,0,0,3,0,0,0,0,0,0];
   EDEN.bane[5] = [1,1,1,1,0,5,10,4,0,1,1,1,1];
   EDEN.bane[6] = [0,0,0,0,0,0,2,0,0,0,0,0,0];
   EDEN.bane[7] = [0,0,5,0,0,0,1,0,0,0,2,0,0];
   EDEN.bane[8] = [0,0,0,0,5,0,1,0,2,0,0,0,0];
   EDEN.bane[9] = [0,0,0,0,0,0,1,0,0,0,0,0,0];
   EDEN.bane[10] = [9,0,0,0,0,0,1,0,0,0,0,0,6];
 } else if (l%7===6) {
  EDEN.slangen = [{x:9,y:1},{x:10,y:1},{x:11,y:1},{x:11,y:2},{x:11,y:3},{x:11,y:4},{x:10,y:4},{x:9,y:4}];
   EDEN.bane[0] = [4,0,0,0,0,8,10,7,0,0,0,0,3];
   EDEN.bane[1] = [0,0,0,0,0,0,10,0,0,0,0,0,0];
   EDEN.bane[2] = [0,0,0,0,4,0,10,0,3,0,0,0,0];
   EDEN.bane[3] = [0,0,4,0,0,0,10,0,0,0,3,0,0];
   EDEN.bane[4] = [8,0,0,0,0,0,0,0,0,0,0,0,7];
   EDEN.bane[5] = [10,10,10,10,0,0,10,0,0,10,10,10,10];
   EDEN.bane[6] = [6,0,0,0,0,0,0,0,0,0,0,0,9];
   EDEN.bane[7] = [0,0,2,0,0,0,10,0,0,0,5,0,0];
   EDEN.bane[8] = [0,0,0,0,2,0,10,0,5,0,0,0,0];
   EDEN.bane[9] = [0,0,0,0,0,0,10,0,0,0,0,0,0];
   EDEN.bane[10] = [2,0,0,0,0,6,10,9,0,0,0,0,5];

 } else if (l%7===0) {
  EDEN.slangen = [{x:10,y:1},{x:10,y:0},{x:11,y:0},{x:11,y:1},{x:11,y:2},{x:11,y:3},{x:11,y:4},{x:10,y:4}];
   EDEN.bane[0] = [0,0,0,10,9,9,9,9,9,10,0,0,0];
   EDEN.bane[1] = [0,0,0,10,8,8,8,8,8,10,0,0,0];
   EDEN.bane[2] = [0,0,0,10,0,0,10,0,0,10,0,0,0];
   EDEN.bane[3] = [0,0,0,10,0,0,10,0,0,10,0,0,0];
   EDEN.bane[4] = [0,0,0,5,0,0,10,0,0,5,0,0,0];
   EDEN.bane[5] = [9,5,5,5,5,5,5,5,5,5,5,5,9];
   EDEN.bane[6] = [0,0,0,5,0,0,10,0,0,5,0,0,0];
   EDEN.bane[7] = [6,2,2,10,0,0,10,0,0,10,2,2,6];
   EDEN.bane[8] = [7,3,3,10,0,0,10,0,0,10,3,3,7];
   EDEN.bane[9] = [8,4,4,10,7,7,7,7,7,10,4,4,8];
   EDEN.bane[10] = [9,5,5,10,6,6,6,6,6,10,5,5,9];
 }
// EDEN.bane[10] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
   for (var y=0; y<EDEN.bane.length; y++) {
    for (var x=0; x<EDEN.bane[y].length; x++) {
      var tile = FUNGRID.GameObject("tile",SUPERLOAD.getGraphic("sprites"),x*25,y*25+4,1,1);
      if (EDEN.bane[y][x]==1) {
        tile.addSprite("tile",Math.floor(Math.random()*2)*25,0,25,25);
        FUNGRID.addGameObject(tile,"game");
      } else if (EDEN.bane[y][x]>1) {
          var frukt = FUNGRID.GameObject("frukt"+EDEN.bane[y][x],SUPERLOAD.getGraphic("sprites"),x*25-2,y*25+4,1,1);
          frukt.gridX = x;
          frukt.gridY = y;
          frukt.spist = false;
          if (EDEN.bane[y][x]===2) {
          frukt.addSprite("frukt",0,100,25,25);
          } else if (EDEN.bane[y][x]===3) {
            frukt.addSprite("frukt",75,100,25,25);
            } else if (EDEN.bane[y][x]===4) {
              frukt.addSprite("frukt",175,75,25,25);
              } else if (EDEN.bane[y][x]===5) {
                frukt.addSprite("frukt",125,100,25,25);
              } else if (EDEN.bane[y][x]===6) {
frukt.addSprite("frukt",25,100,25,25);
                } else if (EDEN.bane[y][x]===7) {
                frukt.addSprite("frukt",100,100,25,25);
} else if (EDEN.bane[y][x]===8) {
frukt.addSprite("frukt",175,100,25,25);
} else if (EDEN.bane[y][x]===9) {
frukt.addSprite("frukt",150,100,25,25);
          } else if (EDEN.bane[y][x]===10) {
            frukt.addSprite("frukt",0,25,25,25);
          }
          if (EDEN.bane[y][x]!==10) {
            EDEN.frukterIgjen +=1;
          }
          FUNGRID.addGameObject(frukt,"game");
          EDEN.frukter.push(frukt);
          EDEN.bane[y][x]=0;
        }
    }
  }
  EDEN.pilerX = 90;
  EDEN.pilerY = 285;
  // EDEN.piler = FUNGRID.GameObject("piler",SUPERLOAD.getGraphic("gui"),EDEN.pilerX,EDEN.pilerY,1,1);
  // EDEN.piler.addSprite("piler",0,0,144,80);
  // FUNGRID.addGameObject(EDEN.piler,"game");
 
}
EDEN.dpad = function () {
  
    

  if (FUNTOUCH.firstX>156) {
    if (FUNTOUCH.firstY>282) {
    if (EDEN.pause) {
    EDEN.pause = false;
  }
    if (FUNTOUCH.firstX<195) {
      if (FUNTOUCH.firstY>285 && FUNTOUCH.firstY<366) {
EDEN.eva.newGridPos(EDEN.eva.gridX-1,EDEN.eva.gridY);
      }
  } else if (FUNTOUCH.firstX<265) {
    
      if (FUNTOUCH.firstY<327) {
        EDEN.eva.newGridPos(EDEN.eva.gridX,EDEN.eva.gridY-1);
      } else {
        EDEN.eva.newGridPos(EDEN.eva.gridX,EDEN.eva.gridY+1);
      }
  } else if (FUNTOUCH.firstX<304) {
    if (FUNTOUCH.firstY>285  && FUNTOUCH.firstY<366) {
EDEN.eva.newGridPos(EDEN.eva.gridX+1,EDEN.eva.gridY);
      }
  }
}
}


}
EDEN.touchDown = function () {
  if (EDEN.tilstand===EDEN.MAINMENU) {
    if (FUNTOUCH.firstX>=68 && FUNTOUCH.firstY>=215 && FUNTOUCH.firstX<=320-68 && FUNTOUCH.firstY<=278) {
    EDEN.tilstand = EDEN.VELG;
    }
  } else if (EDEN.tilstand===EDEN.VELG) {
    if (FUNTOUCH.firstY>90 && FUNTOUCH.firstY<320) {
    if (FUNTOUCH.firstX<160) {
      EDEN.velgAdam = true;
    } else {
      EDEN.velgAdam = false;
    }
    EDEN.tilstand = EDEN.INSTRUKS;
    }
  } else if (EDEN.tilstand===EDEN.INSTRUKS) {
    if (FUNTOUCH.firstX>=68 && FUNTOUCH.firstY>=304 && FUNTOUCH.firstX<=320-68 && FUNTOUCH.firstY<=348) {
    EDEN.tilstand = EDEN.VENT;
      setTimeout(EDEN.forsteBrett,500);
    }
  } else if (EDEN.tilstand===EDEN.WIN) {
    if (FUNTOUCH.firstX>=60 && FUNTOUCH.firstY>=292 && FUNTOUCH.firstX<=260 && FUNTOUCH.firstY<=340) {
      EDEN.poeng += EDEN.bonus;
      EDEN.tilstand = EDEN.VENT;
      setTimeout(EDEN.nesteBrett,500);
    }
   } else if (EDEN.tilstand===EDEN.GAMEOVER) {
    if (FUNTOUCH.firstX>=65 && FUNTOUCH.firstY>=225 && FUNTOUCH.firstX<=255 && FUNTOUCH.firstY<270) {
      EDEN.tilstand = EDEN.VENT;
      setTimeout(EDEN.forsteBrett,500);
    } else if (FUNTOUCH.firstX>=90 && FUNTOUCH.firstY>280 && FUNTOUCH.firstX<=230 && FUNTOUCH.firstY<=325) {
      EDEN.tilstand=EDEN.MAINMENU;
    }
  } else if (EDEN.tilstand===EDEN.GAME) {
    EDEN.dpad();
  }
}
EDEN.nesteBrett = function () {
  EDEN.initGame(EDEN.level+1, EDEN.velgAdam);
}
EDEN.forsteBrett = function () {
  EDEN.initGame(1, EDEN.velgAdam);
}

EDEN.skjulPiler = function () {
  // EDEN.piler.visible = false;
}

EDEN.keypresRight = function () {
  if (EDEN.tilstand===EDEN.GAME) {
    if (EDEN.pause) {
    EDEN.pause = false;
    EDEN.skjulPiler();
  }
EDEN.eva.newGridPos(EDEN.eva.gridX+1,EDEN.eva.gridY);
}
}
EDEN.keypressLeft = function () {
  if (EDEN.tilstand===EDEN.GAME) {
  if (EDEN.pause) {
    EDEN.pause = false;
    EDEN.skjulPiler();
  }
  EDEN.eva.newGridPos(EDEN.eva.gridX-1,EDEN.eva.gridY);
  
}
}
EDEN.keypressUp = function () {
  if (EDEN.tilstand===EDEN.GAME) {
  if (EDEN.pause) {
    EDEN.pause = false;
    EDEN.skjulPiler();
  }
  EDEN.eva.newGridPos(EDEN.eva.gridX,EDEN.eva.gridY-1);
  
}
}
EDEN.keypresDown = function () {
  if (EDEN.tilstand===EDEN.GAME) {
  if (EDEN.pause) {
    EDEN.pause = false;
    EDEN.skjulPiler();
  }
  EDEN.eva.newGridPos(EDEN.eva.gridX,EDEN.eva.gridY+1);
  
}
}
EDEN.touchUp = function () {
	
}
EDEN.drawGameText = function () {
FUNGRID.getContext().fillStyle = 'rgba(255,255,255,0.3)';
FUNGRID.getContext().textAlign = 'right';
    FUNGRID.getContext().font = "bold "+(27*EDEN.s)+'px Open sans';
   
    FUNGRID.getContext().textAlign = 'left';
    FUNGRID.getContext().fillStyle = 'rgba(255,255,255,0.7)';
    FUNGRID.getContext().fillText(EDEN.poeng,23*EDEN.s,325*EDEN.s);
    FUNGRID.getContext().fillStyle = 'rgba(126,171,74,0.5)';
     FUNGRID.getContext().fillText(EDEN.bonus,95*EDEN.s,325*EDEN.s);
     FUNGRID.getContext().font = 'bold '+(20*EDEN.s)+'px Open sans';
     FUNGRID.getContext().fillText("Brett "+EDEN.level,23*EDEN.s,355*EDEN.s);
     FUNGRID.getContext().fillStyle = 'rgba(255,255,255,0.1)';
     FUNGRID.getContext().font = (10*EDEN.s)+'px Open sans';
     FUNGRID.getContext().textAlign = 'right';
     FUNGRID.getContext().fillText(EDEN.rekord,315*EDEN.s,305*EDEN.s);
      FUNGRID.getContext().fillText("rekord",EDEN.s*315,EDEN.s*294);
}
EDEN.update = function () {
  FUNTOUCH.setCursorStyle("default");
  if (EDEN.tilstand===EDEN.MAINMENU) {
   
     FUNGRID.update("mainmeny");
     if (FUNTOUCH.X>=68 && FUNTOUCH.Y>=215 && FUNTOUCH.X<=320-68 && FUNTOUCH.Y<=278) {
    FUNTOUCH.setCursorStyle("pointer");
    }
     } else if (EDEN.tilstand===EDEN.VELG) {

FUNGRID.update("valg");
if (FUNTOUCH.Y>90 && FUNTOUCH.Y<320) {
    FUNTOUCH.setCursorStyle("pointer");
    }
  } else if (EDEN.tilstand===EDEN.INSTRUKS) {

      FUNGRID.update("instruks");
      if (FUNTOUCH.X>=68 && FUNTOUCH.Y>=304 && FUNTOUCH.X<=320-68 && FUNTOUCH.Y<=348) {
      FUNTOUCH.setCursorStyle("pointer");
    }

  } else if (EDEN.tilstand===EDEN.GAME) {
    if (!EDEN.pause) {
      EDEN.updateSlange();
     FUNGRID.update("game");
     EDEN.drawGameText();
    }
    
    if (FUNTOUCH.X>156) {
    if (FUNTOUCH.Y>282) {
    if (FUNTOUCH.X<195) {
      if (FUNTOUCH.Y>285 && FUNTOUCH.Y<366) {
        FUNTOUCH.setCursorStyle("pointer");
      }
  } else if (FUNTOUCH.X<265) {
    FUNTOUCH.setCursorStyle("pointer");
  } else if (FUNTOUCH.X<304) {
    if (FUNTOUCH.Y>285  && FUNTOUCH.Y<366) {
      FUNTOUCH.setCursorStyle("pointer");
      }
  }
}
}


   } else if (EDEN.tilstand===EDEN.GAMEOVER) {
    if (new Date().getTime()-EDEN.gameOverTid<1000) {
      FUNGRID.update("game");
      EDEN.drawGameText();
    } else {
      FUNGRID.update("gameover");
      FUNGRID.getContext().textAlign = 'center';
      FUNGRID.getContext().fillStyle = 'rgba(255,255,255,1)';
      // FUNGRID.getContext().font = 'bold '+(46*EDEN.s)+'px Arial';
     //  FUNGRID.getContext().fillText("Spillet er over",160*EDEN.s,145*EDEN.s);
      FUNGRID.getContext().font = 'bold '+(22*EDEN.s)+'px Open sans';
      if (EDEN.snakeDeath) {
FUNGRID.getContext().fillText("Du kom borti slangen",160*EDEN.s,150*EDEN.s);
      } else {
FUNGRID.getContext().fillText("Du spiste frukt",160*EDEN.s,150*EDEN.s);
FUNGRID.getContext().fillText("fra kunnskapens tre",160*EDEN.s,175*EDEN.s);
      }
      FUNGRID.getContext().textAlign = 'right';
      FUNGRID.getContext().font = 'bold '+(22*EDEN.s)+'px Open sans';
      FUNGRID.getContext().fillText(EDEN.poeng,234*EDEN.s,200*EDEN.s);
      if (EDEN.nyRekord) {
        FUNGRID.getContext().textAlign = 'center';
        FUNGRID.getContext().fillText("NY REKORD!",160*EDEN.s,50*EDEN.s);
      } 

    }
    if ((FUNTOUCH.X>=65 && FUNTOUCH.Y>=225 && FUNTOUCH.X<=255 && FUNTOUCH.Y<270) || (FUNTOUCH.X>=90 && FUNTOUCH.Y>280 && FUNTOUCH.X<=230 && FUNTOUCH.Y<=325)) {
      FUNTOUCH.setCursorStyle("pointer");
    }
   
     } else if (EDEN.tilstand===EDEN.WIN) {
      if (new Date().getTime()-EDEN.gameOverTid<1000) {
      FUNGRID.update("game");
      EDEN.drawGameText();
    } else {
      FUNGRID.update("levelcomplete");
      FUNGRID.getContext().textAlign = 'right';
      FUNGRID.getContext().fillStyle = 'rgba(200,255,0,0.6)';
      FUNGRID.getContext().font = (22*EDEN.s)+'px Open sans';
FUNGRID.getContext().font = (22*EDEN.s)+'px Arial';
       FUNGRID.getContext().fillText(EDEN.poeng,225*EDEN.s,168*EDEN.s);
       FUNGRID.getContext().fillText(EDEN.bonus,225*EDEN.s,193*EDEN.s);
       FUNGRID.getContext().font = 'bold '+(22*EDEN.s)+'px Open sans';
        FUNGRID.getContext().fillStyle = 'rgba(255,255,255,1)';
       FUNGRID.getContext().fillText((EDEN.poeng+EDEN.bonus),225*EDEN.s,226*EDEN.s);
    }
    if (FUNTOUCH.X>=60 && FUNTOUCH.Y>=292 && FUNTOUCH.X<=260 && FUNTOUCH.Y<=340) {
       FUNTOUCH.setCursorStyle("pointer");
    }

     } else if (EDEN.tilstand===EDEN.VENT) {
      FUNGRID.clearCanvas();
      // FUNGRID.update("meny");
     }
}