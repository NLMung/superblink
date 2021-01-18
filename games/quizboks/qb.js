var QB = {};
QB.tittel = QUIZDATA.tittel;
QB.infotekst1 = QUIZDATA.info1;
QB.infotekst2 = QUIZDATA.info2;
QB.infotekst3 = QUIZDATA.info3;
QB.infotekst4 = QUIZDATA.info4;

// window.onresize = function () {
//     QB.onResize();
// }
// QB.onResize = function () {
   // QB.init2();
// };

QB.init = function (scale) {
	path = "gfx/";
	window.scrollTo(0, 1);
	QB.s = scale || 1;

var manifest;
  if (QB.s==2) {
    manifest = [{id: "bg", src: path+"qb_bg.jpg"},{id: "gui", src: path+"qb_gui.png"}];
    } else {
    manifest = [{id: "bg", src: path+"qb_bg_05.jpg"},{id: "gui", src: path+"qb_gui_05.png"}];
    }


  SUPERLOAD.init("canvas", "white", "rgba(0,0,0,0.25)", manifest, [{id: "feil", mp3: path+"feil.mp3", ogg: path+"feil.ogg"},
    {id: "poeng", mp3: path+"poeng.mp3", ogg: path+"poeng.ogg"},
    {id: "tune", mp3: path+"tune.mp3", ogg: path+"tune.ogg"},
    {id: "riktig1", mp3: path+"riktig1.mp3", ogg: path+"riktig1.ogg"},
    {id: "riktig2", mp3: path+"riktig2.mp3", ogg: path+"riktig2.ogg"},
    {id: "riktig3", mp3: path+"riktig3.mp3", ogg: path+"riktig3.ogg"},
    {id: "riktig4", mp3: path+"riktig4.mp3", ogg: path+"riktig4.ogg"}], QB.init2);

      
    QB.PRELOADER = "PRELAODER";
    QB.MAINMENU = "MAINMENU";
    QB.GETREADY = "GETREADY";
    QB.SPM = "SPM";
    QB.SVAR = "SVAR";
    QB.GAMEOVER = "GAMEOVER";
    QB.tilstand = QB.PRELOADER;
    
    QB.startknappY = 317*QB.s;
    QB.instruksknappY = 365*QB.s;
    QB.tilbakeknappY = 388*QB.s;
    QB.tilbakeknappX = 60*QB.s;
    QB.spillfeltX = 10*QB.s;
    QB.spillfeltY = 60*QB.s;
    QB.grid = 50*QB.s;

    QB.interfaceWaitTime = 150;
    
}



QB.init2 = function () {
  FUNTOUCH.preventDefault = false;
  FUNGRID.init("canvas", QB.s);
    FUNGRID.doClearCanvas = false;
    var bg = FUNGRID.GameObject("bg", SUPERLOAD.getGraphic("bg"),0,0,1,1);
    bg.addSprite("idle",0,0,320,372);
    FUNGRID.addGameObject(bg);
    // MAINMENU
    var main_bg = FUNGRID.GameObject("main_bg", SUPERLOAD.getGraphic("gui"),0,0,1,1);
    main_bg.addSprite("idle",0,0,320,316);
    main_bg.view = QB.MAINMENU;
    FUNGRID.addGameObject(main_bg);
    // GETREADY
    var logo_spm = FUNGRID.GameObject("logo_spm", SUPERLOAD.getGraphic("gui"),160,16,1,1);
    logo_spm.addSprite("idle",320,113,111,96,-55,0);
    logo_spm.view = QB.GETREADY;
    FUNGRID.addGameObject(logo_spm);

    var greenfield_spm = FUNGRID.GameObject("logo_spm", SUPERLOAD.getGraphic("gui"),0,123,1,1);
    greenfield_spm.addSprite("idle",0,384,320,60);
    greenfield_spm.view = QB.GETREADY;
    FUNGRID.addGameObject(greenfield_spm);

    QB.indikatorer = [];
    for (var i = 0; i<10; i++) {
    QB.indikatorer.push(FUNGRID.GameObject("indikator"+i, SUPERLOAD.getGraphic("gui"),45+25*i,200,1,1));
    QB.indikatorer[i].addSprite("idle",320,92,10,9,-5,-5);
    QB.indikatorer[i].addSprite("active",330,92,19,19,-10,-10);
    QB.indikatorer[i].view = QB.GETREADY;
    FUNGRID.addGameObject(QB.indikatorer[i]);
    }
    // SPM
    QB.tidshjul= FUNGRID.GameObject("tidshjul", SUPERLOAD.getGraphic("gui"),160,50,1,1);
    QB.tidshjul.addSprite("idle",320,0,92,92,-46,-46);
    QB.tidshjul.view = QB.SPM;
    FUNGRID.addGameObject(QB.tidshjul);

    QB.alternativ = [];
    for (var i = 0; i<3; i++) {
      QB.alternativ.push(FUNGRID.GameObject("alt"+i, SUPERLOAD.getGraphic("gui"), 0,145+65*i,1,1));
      QB.alternativ[i].addSprite("idle", 0,452,320,68);
      QB.alternativ[i].addSprite("correct", 0,452-68,320,68);
      QB.alternativ[i].addSprite("wrong", 0,452-68*2,320,68);
      QB.alternativ[i].addSprite("wrong2", 0,636,320,68);
      QB.alternativ[i].view = QB.SPM;
      FUNGRID.addGameObject(QB.alternativ[i]);
    }

    QB.indikatorer2 = [];
    for (var i = 0; i<10; i++) {
    QB.indikatorer2.push(FUNGRID.GameObject("indikator"+i, SUPERLOAD.getGraphic("gui"),45+25*i,360,1,1));
    QB.indikatorer2[i].addSprite("idle",320,92,10,9,-5,-5);
    QB.indikatorer2[i].addSprite("active",330,92,19,19,-10,-10);
    QB.indikatorer2[i].view = QB.SPM;
    FUNGRID.addGameObject(QB.indikatorer2[i]);
    }

    // GAMEOVER
    var prikker = FUNGRID.GameObject("prikker",SUPERLOAD.getGraphic("gui"),160,160,1,1);
    prikker.addSprite("prikker", 320,111,140,2,-70,0);
    prikker.view = QB.GAMEOVER;
    FUNGRID.addGameObject(prikker);

    QB.spilligjen = FUNGRID.GameObject("spilligjen",SUPERLOAD.getGraphic("gui"),0,247,1,1);
    QB.spilligjen.addSprite("idle",0,520,320,68);
    QB.spilligjen.view = QB.GAMEOVER;
    FUNGRID.addGameObject(QB.spilligjen);
    QB.menyknapp = FUNGRID.GameObject("menyknapp",SUPERLOAD.getGraphic("gui"),0,320,1,1);
    QB.menyknapp.addSprite("idle",0,588,320,48);
    QB.menyknapp.view = QB.GAMEOVER;
    FUNGRID.addGameObject(QB.menyknapp);

    FUNTOUCH.init("canvas", QB.s);
    FUNTOUCH.customDown = QB.touchDown;
    FUNTOUCH.customUp = QB.touchUp;
    window.scrollTo(0, 1);  
  
FUNGRID.moveViewport(0,0);

  QB.tilstand = QB.MAINMENU;
  
  QB.drawMainMenu();
   setInterval(QB.update, FUNGRID.timeInterval);
   
}

QB.drawMainMenu = function () {
  FUNGRID.update(QB.MAINMENU);
  FUNGRID.getContext().font = (22*QB.s)+'px Roboto Slab';
  FUNGRID.getContext().fillStyle = 'rgba(255,255,255,1)';
  FUNGRID.getContext().textAlign = 'center';
  FUNGRID.getContext().fillText(QB.tittel,160*QB.s,130*QB.s,300*QB.s);
  FUNGRID.getContext().fillStyle = 'rgba(0,0,0,0.5)';
  FUNGRID.getContext().textAlign = 'left';
  FUNGRID.getContext().font = (16*QB.s)+'px Roboto Slab';
  FUNGRID.getContext().fillText(QB.infotekst1,QB.s*20,250*QB.s,280*QB.s);
  FUNGRID.getContext().fillText(QB.infotekst2,QB.s*20,275*QB.s,280*QB.s);
  FUNGRID.getContext().fillText(QB.infotekst3,QB.s*20,300*QB.s,280*QB.s);
  FUNGRID.getContext().fillText(QB.infotekst4,QB.s*20,325*QB.s,280*QB.s);

}
QB.drawGetReady = function () {
  
    for (var i = 0; i<QB.indikatorer.length; i++) {
      if (QB.oppgavenr===i) {
        QB.indikatorer[i].spriteIndex = 1;
        QB.indikatorer2[i].spriteIndex = 1;
      } else {
        QB.indikatorer[i].spriteIndex = 0;
        QB.indikatorer2[i].spriteIndex = 0;
      }
    }
    FUNGRID.update(QB.GETREADY);
    FUNGRID.getContext().font = (48*QB.s)+'px Roboto Slab';
  FUNGRID.getContext().fillStyle = '#FFFFFF';
  FUNGRID.getContext().textAlign = 'center';
  FUNGRID.getContext().fillText((QB.oppgavenr+1),160*QB.s,170*QB.s,300*QB.s);
  FUNGRID.getContext().font = (16*QB.s)+'px Roboto Slab';
  FUNGRID.getContext().fillStyle = 'rgba(0,0,0,0.3)';
  FUNGRID.getContext().fillText("Du har",QB.s*160,250*QB.s);
  FUNGRID.getContext().fillStyle = '#FC7465';
  FUNGRID.getContext().font = (48*QB.s)+'px Roboto Slab';
  FUNGRID.getContext().fillText(QB.score,QB.s*160,290*QB.s);
  FUNGRID.getContext().font = (16*QB.s)+'px Roboto Slab';
  FUNGRID.getContext().fillText("poeng",QB.s*160,305*QB.s);
  FUNGRID.getContext().fillStyle = '#333333';
  FUNGRID.getContext().fillText("Trykk for å starte",QB.s*160,350*QB.s);
  QB.fasit = Math.floor(Math.random()*3);
}
QB.drawSpm = function () {
  if (QB.tilstand===QB.SPM) {
  QB.tid = Math.ceil((QB.time-(new Date().getTime()-QB.startTime))*0.001);
  if (QB.tid<0) {
    QB.startTime = new Date().getTime();
    QB.tilstand = QB.SVAR;
  }
  }
  FUNGRID.update(QB.SPM);
  FUNGRID.getContext().font = (48*QB.s)+'px Roboto Slab';
  FUNGRID.getContext().fillStyle = 'rgba(0,0,0,0.1)';
  FUNGRID.getContext().textAlign = 'center';
  FUNGRID.getContext().fillText(QB.tid,QB.s*160,68*QB.s);
  FUNGRID.getContext().fillStyle = '#333333';
  FUNGRID.getContext().font = (16*QB.s)+'px Roboto Slab';
  FUNGRID.getContext().fillText(QB.oppgaver[QB.oppgavenr].spm,QB.s*160,125*QB.s,300*QB.s);
  FUNGRID.getContext().fillStyle = '#FFFFFF';
  if (QB.fasit===0) {
    FUNGRID.getContext().fillText(QB.oppgaver[QB.oppgavenr].svar,QB.s*160,185*QB.s,300*QB.s);
  FUNGRID.getContext().fillText(QB.oppgaver[QB.oppgavenr].galt1,QB.s*160,250*QB.s,300*QB.s);
  FUNGRID.getContext().fillText(QB.oppgaver[QB.oppgavenr].galt2,QB.s*160,315*QB.s,300*QB.s);

  } else if (QB.fasit===1) {
    FUNGRID.getContext().fillText(QB.oppgaver[QB.oppgavenr].svar,QB.s*160,255*QB.s,300*QB.s);
  FUNGRID.getContext().fillText(QB.oppgaver[QB.oppgavenr].galt1,QB.s*160,190*QB.s,300*QB.s);
  FUNGRID.getContext().fillText(QB.oppgaver[QB.oppgavenr].galt2,QB.s*160,320*QB.s,300*QB.s);

  } else {
FUNGRID.getContext().fillText(QB.oppgaver[QB.oppgavenr].svar,QB.s*160,320*QB.s,300*QB.s);
  FUNGRID.getContext().fillText(QB.oppgaver[QB.oppgavenr].galt1,QB.s*160,255*QB.s,300*QB.s);
  FUNGRID.getContext().fillText(QB.oppgaver[QB.oppgavenr].galt2,QB.s*160,190*QB.s,300*QB.s);
  }
  
}
QB.drawGameOver = function () {
  FUNGRID.update(QB.GAMEOVER);
  FUNGRID.getContext().font = (16*QB.s)+'px Roboto Slab';
  FUNGRID.getContext().fillStyle = 'rgba(0,0,0,0.36)';
  FUNGRID.getContext().textAlign = 'center';
  FUNGRID.getContext().fillText("Gratulerer!",QB.s*160,48*QB.s);
  FUNGRID.getContext().fillText("Du fikk",QB.s*160,68*QB.s);
  FUNGRID.getContext().fillStyle = '#47D1A3';
  FUNGRID.getContext().font = (48*QB.s)+'px Roboto Slab';
  FUNGRID.getContext().fillText(QB.riktige,QB.s*160,125*QB.s);
  FUNGRID.getContext().font = (16*QB.s)+'px Roboto Slab';
  FUNGRID.getContext().fillText("riktige",QB.s*160,145*QB.s);
  FUNGRID.getContext().fillStyle = '#FC7465';
  FUNGRID.getContext().fillText("poeng",QB.s*160,230*QB.s);
  FUNGRID.getContext().font = (48*QB.s)+'px Roboto Slab';
  FUNGRID.getContext().fillText(QB.score,QB.s*160,210*QB.s);
}
QB.drawSvar = function () {
  QB.drawSpm();
  if (new Date().getTime()-QB.startTime>=3000) {
    QB.next();
  }
}
QB.next = function () {
QB.oppgavenr +=1;
    if (QB.oppgavenr>=10) {
      QB.tilstand=QB.GAMEOVER;
      FUNTOUCH.preventDefault = false;
      QB.drawGameOver();
      SUPERLOAD.getSound("poeng").play();
    } else {
     QB.tilstand=QB.GETREADY;
     QB.drawGetReady();
    }
}
QB.startNewQuiz = function() {
  QB.oppgavenr = 0;
  QB.score = 0;
  QB.riktige = 0;
  QB.tilstand = QB.GETREADY;
  QB.drawGetReady();
  QUIZDATA.oppgaver.sort(function(a,b){return Math.random()*2-1});
  QB.oppgaver = QUIZDATA.oppgaver.slice(0,10);

}

QB.touchDown = function () {
  if (QB.tilstand===QB.MAINMENU) {
      if (FUNTOUCH.lastY>=159 && FUNTOUCH.lastY<=159+60) {
        QB.startNewQuiz();
        SUPERLOAD.getSound("poeng").play();
        FUNTOUCH.preventDefault = true;
      }
  } else if (QB.tilstand===QB.GETREADY) {
    SUPERLOAD.getSound("tune").stop();
    SUPERLOAD.getSound("tune").play();
    for (var i = 0; i<QB.alternativ.length; i++) {
      QB.alternativ[i].spriteIndex = 0;
    }
    QB.tilstand = QB.SPM;
    QB.time = 30000;
    QB.startTime = new Date().getTime();
  } else if (QB.tilstand===QB.GAMEOVER) {
    if (QB.menyknapp.inside(FUNTOUCH.lastX,FUNTOUCH.lastY)) {
      QB.tilstand = QB.MAINMENU;
      SUPERLOAD.getSound("poeng").play();
      QB.drawMainMenu();
    } else if (QB.spilligjen.inside(FUNTOUCH.lastX,FUNTOUCH.lastY)) {
      SUPERLOAD.getSound("poeng").play();
      QB.startNewQuiz();
    }
  } else if (QB.tilstand===QB.SVAR) {
    QB.next();
  } else if (QB.tilstand===QB.SPM) {
    for (var i = 0; i<QB.alternativ.length; i++) {
      if (QB.alternativ[i].inside(FUNTOUCH.lastX,FUNTOUCH.lastY)) {
        QB.svar = i;
        SUPERLOAD.getSound("tune").stop();
        if (QB.fasit===i) {
          QB.riktige +=1;
          QB.score += 100+QB.tid;
           if (QB.oppgavenr===9) {
      		QUIZDATA.save(QB.score);
      		}
          
          SUPERLOAD.getSound("riktig"+Math.ceil(Math.random()*4)).play();
          
        } else {
          SUPERLOAD.getSound("feil").play();
        }
        for (var j = 0; j<QB.alternativ.length; j++) {
          if (j===QB.fasit) {
            if (QB.svar===QB.fasit) {
              QB.alternativ[j].spriteIndex = 1;
            } else {
              QB.alternativ[j].spriteIndex = 0;
            }
          } else {
            if (QB.svar===j) {
QB.alternativ[j].spriteIndex = 3;
            } else {
            QB.alternativ[j].spriteIndex = 2;
            }
          }
        }
        QB.tilstand=QB.SVAR;
        QB.startTime = new Date().getTime();
        return;
      }
    }
  }
}
QB.touchUp = function () {
 
}
QB.update = function () {
  FUNTOUCH.setCursorStyle("default");
  if (QB.tilstand===QB.MAINMENU) {
    if (FUNTOUCH.Y>=159 && FUNTOUCH.Y<=159+60) {
      FUNTOUCH.setCursorStyle("pointer");
    } 
  } else if (QB.tilstand===QB.GETREADY) {
    FUNTOUCH.setCursorStyle("pointer");
	} else if (QB.tilstand===QB.SPM) {
    QB.tidshjul.rotation +=1;
   QB.drawSpm();
   for (var i = 0; i<QB.alternativ.length; i++) {
      if (QB.alternativ[i].inside(FUNTOUCH.X,FUNTOUCH.Y)) {
        FUNTOUCH.setCursorStyle("pointer");
      }
    }
  } else if (QB.tilstand===QB.SVAR) {
    QB.drawSvar();
  } else if (QB.tilstand===QB.GAMEOVER) {
    if (QB.menyknapp.inside(FUNTOUCH.X,FUNTOUCH.Y)) {
      FUNTOUCH.setCursorStyle("pointer");
    } else if (QB.spilligjen.inside(FUNTOUCH.X,FUNTOUCH.Y)) {
      FUNTOUCH.setCursorStyle("pointer");
    }
  }
}