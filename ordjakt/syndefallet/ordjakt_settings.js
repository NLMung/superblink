OJSettings = {
	tittel: "Syndefallet",
	farge: "#A9908E",
	ordliste: ["EDEN","ADAM","EVA","HAGEN","SLANGEN","KUNNSKAP","GUD","SYND","FRUKTEN","SPISE","REDD","NAKEN","DØD","INNSIKT","TRE","FORLOKKENDE","GODT","VONDT","TRÆRNE","NARRET","LISTIG","GJEMTE","KLÆR","SKINN","ADSKILT"]
};
OJSettings.rekord = function() {
if(typeof(Storage)!=="undefined") {
    if(localStorage.OJSyndefallRekord) {
      return JSON.parse(localStorage.OJSyndefallRekord);
    } else {
      localStorage.OJSyndefallRekord = JSON.stringify(0);
      return 0;
    }
  } else {
  // Sorry! No web storage support..
  return 0;
  }
};
OJSettings.lagre = function(s) {
	localStorage.OJSyndefallRekord = JSON.stringify(s);
};
OJSettings.save = function(s) {
	SCRT.game_id = "sny"+"d";
	SUPERLOAD.lagre(32,s);
	SCRT.game_id = "busk";
};
var SCRT = {};
SCRT.game_id = "eple";