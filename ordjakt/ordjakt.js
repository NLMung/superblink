var OJ = {};

window.onresize = function () {
    OJ.onResize();
}
OJ.onResize = function () {

};

OJ.init = function (scale) {
	
OJ.s = scale || 1;

var manifest;
  if (OJ.s==2) {
    manifest = [{id: "bg", src: "gfx/ordjakt.png"}];
    } else {
    manifest = [{id: "bg", src: "gfx/ordjakt_05.png"}];
    }

  SUPERLOAD.init("canvas", OJSettings.farge,"rgba(0,0,0,0.25)",manifest,[{id: "riktig", mp3: "gfx/riktig.mp3", ogg: "gfx/riktig.ogg"}, {id: "feil", mp3: "gfx/feil.mp3", ogg: "gfx/feil.ogg"}, {id: "ferdig", mp3: "gfx/ferdig.mp3", ogg: "gfx/ferdig.ogg"}],OJ.init2);    
}


OJ.init2 = function () {
  OJ.rekord = OJSettings.rekord();
  OJ.tilstand = "MENY";
  FUNTOUCH.preventDefault = false;
  OJ.sekund = 0;
  OJ.drag = false;
  OJ.offX = 34;
  OJ.offY = 50;
  OJ.grid = 28;
  OJ.fromX = 0;
  OJ.toX = 0;
  OJ.fromY = 0;
  OJ.toY = 0;
  OJ.w = 10;
  OJ.h = 10;
  OJ.fontsize = 24;
    OJ.canvas = document.getElementById("canvas");
    OJ.context = OJ.canvas.getContext("2d");
    FUNTOUCH.init("canvas", OJ.s);
    FUNTOUCH.customDown = OJ.touchDown;
    FUNTOUCH.customUp = OJ.touchUp;

    window.scrollTo(0, 1);
    OJ.tittel = OJSettings.tittel;
    OJ.initLevel(OJSettings.ordliste,12);

if (OJ.timerId) {
      clearInterval(OJ.timerId);
    }
   OJ.timerId = setInterval(OJ.update, 30);

  }
  OJ.drawLetters = function () {
    OJ.context.rect(0,0,320*OJ.s,372*OJ.s);
    OJ.context.fillStyle = OJSettings.farge;
    OJ.context.fill();
    if (OJ.tilstand==="GAME") {
    OJ.context.drawImage(SUPERLOAD.getGraphic("bg"),0,0,292*OJ.s,294*OJ.s,14*OJ.s,27*OJ.s,292*OJ.s,294*OJ.s);
    }

if (OJ.tilstand==="MENY") {
  OJ.context.font = ""+(48*OJ.s)+'px Roboto Slab';
    OJ.context.fillStyle = 'rgba(0,0,0,0.25)';
    OJ.context.textAlign = 'center';
      OJ.context.fillText(OJSettings.tittel,160*OJ.s,120*OJ.s);
      OJ.context.drawImage(SUPERLOAD.getGraphic("bg"),0,294*OJ.s,275*OJ.s,44*OJ.s,23*OJ.s,145*OJ.s,275*OJ.s,44*OJ.s);
      OJ.context.drawImage(SUPERLOAD.getGraphic("bg"),0,338*OJ.s,201*OJ.s,53*OJ.s,64*OJ.s,220*OJ.s,201*OJ.s,53*OJ.s);
}
if (OJ.tilstand==="GAMEOVER") {
  OJ.context.font = ""+(48*OJ.s)+'px Roboto Slab';
    OJ.context.fillStyle = 'rgba(0,0,0,0.25)';
    OJ.context.textAlign = 'center';
      OJ.context.fillText("Gratulerer!",160*OJ.s,100*OJ.s);
      OJ.context.font = ""+(32*OJ.s)+'px Roboto Slab';
       OJ.context.fillText("Poeng: "+OJ.poeng,160*OJ.s,150*OJ.s);
      OJ.context.fillText("Rekord: "+OJ.rekord,160*OJ.s,185*OJ.s);
      OJ.context.drawImage(SUPERLOAD.getGraphic("bg"),0,391*OJ.s,291*OJ.s,42*OJ.s,12*OJ.s,240*OJ.s,291*OJ.s,42*OJ.s);
}

    OJ.context.fillStyle = 'rgb(0,0,0)';
        OJ.context.font = (OJ.fontsize*OJ.s)+'px Arial';
        OJ.context.textAlign = 'center';
        if (OJ.tilstand!=="MENY" && OJ.tilstand!=="GAMEOVER") {
    for (var x = 0; x<OJ.level[0].length; x++) {
      for (var y = 0; y<OJ.level.length; y++) {
        OJ.context.fillStyle = 'rgb(0,0,0)';
       
         OJ.context.fillText(OJ.level[y][x],OJ.grid*x*OJ.s+OJ.offX*OJ.s,OJ.grid*y*OJ.s+OJ.offY*OJ.s);
       
      }
    }
  }
    
    if (OJ.tilstand==="GAME") {
    for (var i= 0; i<OJ.funn.length; i++) {
      OJ.context.beginPath();
    OJ.context.rect(OJ.funn[i].fromX*OJ.grid*OJ.s+OJ.offX*OJ.s-OJ.grid*OJ.s*0.5, OJ.funn[i].fromY*OJ.grid*OJ.s+OJ.offY*OJ.s-OJ.grid*OJ.s*0.8,(OJ.funn[i].toX-OJ.funn[i].fromX+1)*OJ.grid*OJ.s,(OJ.funn[i].toY-OJ.funn[i].fromY+1)*OJ.grid*OJ.s);
    OJ.context.fillStyle = 'rgba(102,255,102,0.5)';
    OJ.context.fill();
    }
}


if (OJ.tilstand!=="MENY") {    
    OJ.context.font = (12*OJ.s)+'px Arial';
    OJ.context.textAlign = 'left';
    var gameIsOver = true;
    for (var i=0;i<OJ.ordliste.length;i++) {
      
      OJ.context.beginPath();
      OJ.context.rect(20*OJ.s+(i%3)*95*OJ.s,14*Math.floor(i/3)*OJ.s+315*OJ.s,89*OJ.s,12*OJ.s);

    if (!OJ.ordlisteFunn[i]) {
      gameIsOver = false;
      OJ.context.fillStyle = 'rgba(255,255,255,0.7)';
  } else {
    OJ.context.fillStyle = 'rgba(255,255,255,0.2)';
  }
    OJ.context.fill();

        
        if (!OJ.ordlisteFunn[i]) {
      OJ.context.fillStyle = 'rgba(0,0,0,1)';
  } else {
    OJ.context.fillStyle = 'rgba(0,0,0,0.3)';
  }

        OJ.context.fillText(OJ.ordliste[i],21*OJ.s+(i%3)*95*OJ.s,14*Math.floor(i/3)*OJ.s+326*OJ.s);
 
    }
    }


     if (gameIsOver && OJ.tilstand==="GAME") {
      OJ.tilstand = "GAMEOVER";
      FUNTOUCH.preventDefault = false;
      OJ.poeng = Math.max(0,300-OJ.sekund);
      if (OJ.poeng>0) {
      	OJSettings.save(OJ.poeng);
      }
      if (OJ.poeng>OJ.rekord) {
        OJ.rekord = OJ.poeng;
        OJSettings.lagre(OJ.rekord);
      }
      if (OJ.timerId2) {
      clearInterval(OJ.timerId2);
    }
    OJ.drawLetters();
    }

if (OJ.tilstand!=="MENY") { 
OJ.context.font = ""+(17*OJ.s)+'px Roboto Slab';
    OJ.context.fillStyle = 'rgba(0,0,0,0.25)';
    OJ.context.textAlign = 'right';
   OJ.tidstreng = Math.floor(OJ.sekund/600)+""+Math.floor(OJ.sekund/60)+":"+(Math.floor(OJ.sekund/10) % 6)+""+(OJ.sekund % 10);
   OJ.poeng = Math.max(0,300-OJ.sekund);
   //   OJ.context.fillText(OJ.tidstreng,295*OJ.s,20*OJ.s);
OJ.context.fillText(OJ.poeng,295*OJ.s,20*OJ.s);
      OJ.context.textAlign = 'left';
      OJ.context.fillText(OJSettings.tittel,25*OJ.s,20*OJ.s);
    }
  
  }
OJ.initLevel = function (ordliste, antallOrd) {
  var success = false;
   while (!success) {
  var ol =ordliste.slice(0);
    for (var i=0; i<ol.length; i++) {
    if (ol[i].length>Math.max(OJ.w,OJ.h)) {
      console.log("Fjerner "+ol[i]+" pga lengde!");
      ol.splice(i,1);
      i--;
    }
  }
  ol = ol.sort(function(a,b){return Math.random()*2-1});
  ol = ol.splice(0,antallOrd);
  OJ.ordliste = ol.sort(function(a,b){return b.length-a.length});

 
  OJ.level = [];
  for (var y=0; y<OJ.h; y++) {
    OJ.level[y]=[];
  for (var x=0; x<OJ.w; x++) {
      OJ.level[y].push(" ");
    }
  }
   
   var ord = OJ.ordliste.slice(0);
   var c = 0;
   while (ord.length>0 && c<100) {
      var rc = Math.floor(Math.random()*(OJ.level.length+OJ.level[0].length));
      if (rc<OJ.level[0].length) {
         if (OJ.plasserVertikal(rc,ord[0])) {
            ord.shift();
          }
      } else {
          if (OJ.plasserHorisontal(rc-OJ.level[0].length,ord[0])) {
            ord.shift();
          }
      }
      c ++;
   }
   if (ord.length===0) {
    success = true;
   } else {
    console.log("Retry");
   }
 }
 OJ.ordlisteFunn = [false,false,false,false,false,false,false,false,false,false,false,false];
   OJ.bokstaver = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Æ","Ø","Å"];
   for (var x = 0; x<OJ.level[0].length; x++) {
      for (var y = 0; y<OJ.level.length; y++) {
        if (OJ.level[y][x]===" ") {
         OJ.level[y][x]=OJ.bokstaver[Math.floor(Math.random()*OJ.bokstaver.length)];
        }
      }
    }
    OJ.funn = [];
   OJ.drawLetters();
    
}
OJ.plasserHorisontal = function(y,o) {
  var muligeIndexer = [];
  for (var x=0; x<OJ.level[0].length-o.length+1; x++) {
    var mulig = true;
    for (var i=0; i<o.length; i++) {
      if (OJ.level[y][x+i]!==o[i] && OJ.level[y][x+i]!==" ") {
        mulig = false;
      }
    }
    if (mulig) {
      muligeIndexer.push(x);
    }
  }
  if (muligeIndexer.length>0) {
    var i = Math.floor(Math.random()*muligeIndexer.length);
    for (var oi=0; oi<o.length; oi++) {
      OJ.level[y][muligeIndexer[i]+oi] = o.charAt(oi);
    }
    return true;
  }
  return false;
 
}
OJ.plasserVertikal = function(x,o) {
  var muligeIndexer = [];
  for (var y=0; y<OJ.level.length-o.length+1; y++) {
    var mulig = true;
    for (var i=0; i<o.length; i++) {
      if (OJ.level[y+i][x]!==o[i] && OJ.level[y+i][x]!==" ") {
        mulig = false;
      }
    }
    if (mulig) {
      muligeIndexer.push(y);
    }
  }
  if (muligeIndexer.length>0) {
    var i = Math.floor(Math.random()*muligeIndexer.length);
    for (var oi=0; oi<o.length; oi++) {
      OJ.level[muligeIndexer[i]+oi][x] = o.charAt(oi);
    }
    return true;
  }
  return false;
 
}
OJ.update = function () {
  FUNTOUCH.setCursorStyle("default");
  if (OJ.tilstand==="GAME") {
    if (FUNTOUCH.X*OJ.s<=(OJ.w)*OJ.grid*OJ.s+OJ.offX*OJ.s) {
      FUNTOUCH.setCursorStyle("pointer");
    }
  OJ.drawLetters();
  if (OJ.drag) {
    
    OJ.context.beginPath();
    OJ.toX = Math.min(OJ.w-1,Math.max(0,Math.round((FUNTOUCH.lastX-OJ.offX)/OJ.grid)));
    OJ.toY = Math.min(OJ.h-1,Math.max(0,Math.round((FUNTOUCH.lastY-OJ.offY+OJ.grid*0.25)/OJ.grid)));
    if (Math.abs(OJ.toX-OJ.fromX)<Math.abs(OJ.toY-OJ.fromY)) {
        OJ.toX = OJ.fromX;
    } else {
        OJ.toY = OJ.fromY;
    }
    if (OJ.toX===OJ.fromX || OJ.toY===OJ.fromY) {
     OJ.context.fillStyle = 'rgba(255,153,0,0.26)';
    OJ.context.rect(Math.min(OJ.fromX,OJ.toX)*OJ.grid*OJ.s+OJ.offX*OJ.s-OJ.grid*OJ.s*0.5, Math.min(OJ.fromY,OJ.toY)*OJ.grid*OJ.s+OJ.offY*OJ.s-OJ.grid*OJ.s*0.8,(Math.max(OJ.fromX,OJ.toX)-Math.min(OJ.fromX,OJ.toX)+1)*OJ.grid*OJ.s,(Math.max(OJ.fromY,OJ.toY)-Math.min(OJ.fromY,OJ.toY)+1)*OJ.grid*OJ.s);
    OJ.context.fill();
    } 

      OJ.context.beginPath();
      OJ.context.fillStyle = 'rgba(255,153,0,0.26)';
      OJ.context.strokeStyle = 'rgba(255,153,0,0.56)';
      OJ.context.arc(OJ.toX*OJ.grid*OJ.s+OJ.offX*OJ.s, OJ.toY*OJ.grid*OJ.s+OJ.offY*OJ.s-OJ.grid*OJ.s*0.3, OJ.grid*OJ.s, 0, 2 * Math.PI);
      OJ.context.stroke();
      OJ.context.fill();
    
  }
} else if (OJ.tilstand==="MENY") {
   if (FUNTOUCH.Y>110*OJ.s && FUNTOUCH.Y<130*OJ.s && FUNTOUCH.X>30*OJ.s && FUNTOUCH.X<130*OJ.s) {
    FUNTOUCH.setCursorStyle("pointer");
   }
} else if (OJ.tilstand==="GAMEOVER") {
  if (FUNTOUCH.Y>120*OJ.s && FUNTOUCH.Y<140*OJ.s && FUNTOUCH.X>10*OJ.s && FUNTOUCH.X<150*OJ.s) {
    FUNTOUCH.setCursorStyle("pointer");
   }
}
}
OJ.touchDown = function () {
  if (OJ.tilstand==="GAME") {
  if (FUNTOUCH.firstX*OJ.s<=(OJ.w)*OJ.grid*OJ.s+OJ.offX*OJ.s) {
  OJ.drag = true;
  OJ.fromX = Math.min(OJ.w-1,Math.max(0,Math.round((FUNTOUCH.firstX-OJ.offX)/OJ.grid)));
  OJ.fromY = Math.min(OJ.h-1,Math.max(0,Math.round((FUNTOUCH.firstY-OJ.offY+OJ.grid*0.25)/OJ.grid)));
  }
} else if (OJ.tilstand==="GAMEOVER") {
  if (FUNTOUCH.lastY>120*OJ.s && FUNTOUCH.lastY<140*OJ.s && FUNTOUCH.lastX>10*OJ.s && FUNTOUCH.lastX<150*OJ.s) {
     OJ.init2();
   }

  } else if (OJ.tilstand==="MENY") {
    if (FUNTOUCH.lastY>110*OJ.s && FUNTOUCH.lastY<130*OJ.s && FUNTOUCH.lastX>30*OJ.s && FUNTOUCH.lastX<130*OJ.s) {
       OJ.tilstand="GAME";
       FUNTOUCH.preventDefault = true;
    OJ.timerId2 = setInterval(OJ.sekunder, 1000);
    OJ.drawLetters();
  }
  }

}
OJ.sekunder = function() {
  OJ.sekund += 1;
}
OJ.touchUp = function () {
    OJ.toX = Math.min(OJ.w-1,Math.max(0,Math.round((FUNTOUCH.lastX-OJ.offX)/OJ.grid)));
    OJ.toY = Math.min(OJ.h-1,Math.max(0,Math.round((FUNTOUCH.lastY-OJ.offY+OJ.grid*0.25)/OJ.grid)));
    if (Math.abs(OJ.toX-OJ.fromX)<Math.abs(OJ.toY-OJ.fromY)) {
        OJ.toX = OJ.fromX;
    } else {
        OJ.toY = OJ.fromY;
    }
  var ord = "";
    if (OJ.fromX===OJ.toX) {
      for (var y=Math.min(OJ.fromY,OJ.toY); y<=Math.max(OJ.fromY,OJ.toY); y++) {
        ord += OJ.level[y][OJ.fromX];
      }
      
    } else if (OJ.fromY===OJ.toY) {
      for (var x=Math.min(OJ.fromX,OJ.toX); x<=Math.max(OJ.fromX,OJ.toX); x++) {
        ord += OJ.level[OJ.fromY][x];
      }
    }
    var rettlyd = false;
    for (var i=0; i<OJ.ordliste.length; i++) {
      if (OJ.ordliste[i]===ord) {
        if (!OJ.ordlisteFunn[i]) {
         OJ.funn.push({fromX:Math.min(OJ.fromX,OJ.toX),fromY:Math.min(OJ.fromY,OJ.toY),toX:Math.max(OJ.fromX,OJ.toX),toY:Math.max(OJ.fromY,OJ.toY),ord:ord});
          OJ.ordlisteFunn[i] = true;   
          rettlyd = true;
        } 
       }
    }
    if (rettlyd) {
      var alle = true;
       for (var i=0;i<OJ.ordlisteFunn.length;i++) {
      if (!OJ.ordlisteFunn[i]) {
        alle = false;
      }
      }
      if (alle) {
      SUPERLOAD.getSound("ferdig").play();
    } else {
      SUPERLOAD.getSound("riktig").play();
    }
    } else {
      if (OJ.drag) {
      SUPERLOAD.getSound("feil").play();
      }
    }
    OJ.drawLetters();
	OJ.drag = false;
}
