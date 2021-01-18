OJSettings = {
	tittel: "Påske",
	farge: "#FFEE00",
	ordliste:
	["JESUS","JUDAS","PILATUS","PALMEGREN","FOTVASK","NATTVERD","SØLVPENGER","OPPSTÅTT","KORSFESTE","RØVER","GRAV","TOM","LANGFREDAG","TORNEKRONE","KORS","GETSEMANE","BRØD","VIN","ESEL","PETER","HANE","SVIK","KYSS","DØD","JORDSKJELV","ENGEL","MARIA","FULLBRAGT","FORNEKTE","FRELSE","JOHANNES","GARTNER","INRI","LAM","SONE","NAGLER","JERUSALEM","GOLGATA","BLOD","DØDSDØMT","LEVENDE"] 
};
OJSettings.rekord = function() {
if(typeof(Storage)!=="undefined") {
    if(localStorage.OJPaaskeRekord) {
      return JSON.parse(localStorage.OJPaaskeRekord);
    } else {
      localStorage.OJPaaskeRekord = JSON.stringify(0);
      return 0;
    }
  } else {
  // Sorry! No web storage support..
  return 0;
  }
};
OJSettings.lagre = function(s) {
	localStorage.OJPaaskeRekord = JSON.stringify(s);
};
OJSettings.save = function(s) {
	SCRT.game_id = "heroe"+"ds";
	SUPERLOAD.lagre(39,s);
	SCRT.game_id = "herodes";
};
var SCRT = {};
SCRT.game_id = "pilatus";