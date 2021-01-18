OJSettings = {
	tittel: "Himmelfart",
	farge: "#6699FF",
	ordliste:

["JESUS","HIMMELEN","HIMMELFART","OLJEBERGET","FJELL","DISIPLER","ENGLER","VERDEN","MISJON","JERUSALEM","TILBE","VELSIGNE","ÅND","MAKT","DØPE","LÆRE","DAGER","FØRTI","GUD","FAR","MØTE","TALE","JORDEN","BEFALE","ENDE","ROM","TILBAKE","GJENKOMST","FORTELLE","OPPDRAGET","SKY","OPPSTÅTT","FOLKESLAG","SØNNEN","HUS","OPP","REISE","GLADE","FADEREN","ELLEVE"] 
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
	SCRT.game_id = "bre"+"get";
	SUPERLOAD.lagre(45,s);
	SCRT.game_id = "oljeberget";
};
var SCRT = {};
SCRT.game_id = "himmels";