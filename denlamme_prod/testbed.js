var TESTBED = (function () {
    function init() {
        var manifest = [{id: "sprites", src: "gfx/finnkrybben.png"}];
        SUPERLOAD.init("canvas", "black","yellow",manifest,[{id: "bae", mp3: "gfx/bae.mp3", ogg: "gfx/bae.ogg"}, {id: "bae2", mp3: "gfx/bae2.mp3", ogg: "gfx/bae2.ogg"}, /* {id: "theme", mp3: "gfx/theme.mp3", ogg: "gfx/theme.ogg"}, */ {id: "star", mp3: "gfx/star.mp3", ogg: "gfx/star.ogg"}],init2);
    }
    function init2 () {
        FUNGRID.init("canvas", 2);
          var bg = FUNGRID.GameObject("bg",SUPERLOAD.getGraphic("sprites"),0,0,1,1);
        bg.addSprite("bg",0,0,480,320);
        FUNGRID.addGameObject(bg,"game");
        FUNGRID.moveViewport(-150,50);
        FUNGRID.update("game");
    }
    return {
        init:init
    }
})();