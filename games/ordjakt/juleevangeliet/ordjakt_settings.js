OJSettings = {
	tittel: "Jesu fødsel",
	farge: "#FF8E8E",
	ordliste: ["NASARET","MARIA","JOSEF","FORLOVET","GABRIEL","NÅDE","JESUS","KONGE","HELLIG","SØNN","AUGUSTUS","BEFALING","MANNTALL","INNSKRIVE","BETLEHEM","FØDE","KRYBBE","HUSROM","GJETERE","NATTEVAKT","GLEDE","FRELSER","MESSIAS","HERREN","SVØPT","TEGN","HÆRSKARE","FRED","ÆRE","BARNET","GUD","ENGEL","VISMENN","GULL","RØKELSE","MYRRA","STJERNE"]
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

var SCRT = {};
OJSettings.save = function(s) {
	SCRT.game_id = "ham"+"l";
	SUPERLOAD.lagre(31,s);
	SCRT.game_id = "stjerne";
};
var SCRT = {};
SCRT.game_id = "krybbe";