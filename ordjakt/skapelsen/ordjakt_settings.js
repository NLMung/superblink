OJSettings = {
	tittel: "Skapelsen",
	farge: "#8E90A9",
	ordliste: ["SKAPE","DAG","GUD","GODT","HIMMELEN","JORDEN","ØDE","TOM","ÅND","MØRKET","MORGEN","KVELD","VANN","LYS","FISKER","KRYP","MÅNEN","SOLEN","RÅDE","FUGLER","VELSIGNE","BEGYNNELSE","HAV","GRØNN","PLANTER","VEKSTER","FRUKTTRÆR","FRØ","STJERNER","SJØDYR","SKAPNINGER","FRUKTBARE","MENNESKET","BILDE","MANN","KVINNE","DYR","ADAM","EVA","HVILEDAG"]
};
OJSettings.rekord = function() {
if(typeof(Storage)!=="undefined") {
    if(localStorage.OJSkapelsenRekord) {
      return JSON.parse(localStorage.OJSkapelsenRekord);
    } else {
      localStorage.OJSkapelsenRekord = JSON.stringify(0);
      return 0;
    }
  } else {
  // Sorry! No web storage support..
  return 0;
  }
};
OJSettings.lagre = function(s) {
	localStorage.OJSkapelsenRekord = JSON.stringify(s);
};
OJSettings.save = function(s) {
	SCRT.game_id = "dag"+"1";
	SUPERLOAD.lagre(30,s);
	SCRT.game_id = "skape";
};
var SCRT = {};
SCRT.game_id = "dyr";