QUIZDATA = {
	tittel:
	"Mongolia",
	info1:
	"En quiz om Mongolia.",
	info2:
	"Svar så fort du kan!",
	info3:
	"10 spørsmål, 3 alternativer pr spørsmål.",
	info4:
	"Lykke til!",
	oppgaver:
	[{spm:
"I hvilken verdensdel ligger Mongolia?",
svar:
"Asia",
galt1:
"Europa",
galt2:
"Afrika"
},
{spm:
"Hva heter hovedstaden i Mongolia?",
svar:
"Ulan Bator",
galt1:
"Darkhan",
galt2:
"Erdenet"
},
{spm:
"Hvilke to land grenser til Mongolia?",
svar:
"Kina og Russland",
galt1:
"Russland og Australia",
galt2:
"Russland og Amerika"
},
{spm:
"Hvilken dato er Mongolias nasjonaldag?",
svar:
"11. juli",
galt1:
"11. juni",
galt2:
"11. august"
},
{spm:
"Myntenheten i Mongolia heter:",
svar:
"Mongolsk togrog",
galt1:
"Mongolsk bilrog",
galt2:
"Mongolsk båtrog"
},
{spm:
"Den store ørkenen i Mongolia heter:",
svar:
"Gobiørkenen",
galt1:
"Bigoørkenen",
galt2:
"Giboørkenen"
},
{spm:
"Halvparten av menneskene i Mongolia er:",
svar:
"Buddhister",
galt1:
"Kristne",
galt2:
"Muslimer"
},
{spm:
"Drakten til det mongolske fotball-landslaget for menn er:",
svar:
"Hvit og svart",
galt1:
"Rød og svart",
galt2:
"Rød og hvit"
},
{spm:
"Fargene i det mongolske flagget er:",
svar:
"Rødt, blått og gult",
galt1:
"Rødt, hvitt og blått",
galt2:
"Hvitt og blått"
},
{spm:
"Hvor mange land grenser Mongolia til?",
svar:
"2",
galt1:
"3",
galt2:
"7"
},
{spm:
"Hovedspråket i Mongolia heter?",
svar:
"Mongolsk",
galt1:
"Kinesisk",
galt2:
"Russisk"
},
{spm:
"Hvor mange mennesker bor det i Mongolia (2017)?",
svar:
"Ca 3 millioner",
galt1:
"Ca 30 millioner",
galt2:
"Ca 300 tusen"
},
{spm:
"Den mest kjente mongolske høvdingen het:",
svar:
"Djengis Khan",
galt1:
"Softis Khan",
galt2:
"Ulan Khan"
},
{spm:
"De store slettene i Mongolia kalles:",
svar:
"Stepper",
galt1:
"Slettir",
galt2:
"Svapper"
},
{spm:
"Hva betyr gobi?",
svar:
"Ørkenslette",
galt1:
"Sandørken",
galt2:
"Sletteland"
},
{spm:
"Hvilken farge er IKKE i flagget til Mongolia?",
svar:
"Grå",
galt1:
"Gul",
galt2:
"Hvit"
},
{spm:
"Hva hører IKKE med til Barnas Misjonsprosjekt 19/20?",
svar:
"Flere barn skal lære å svømme",
galt1:
"Flere barn skal få høre om Jesus",
galt2:
"Flere barn skal få godt SFO-tilbud"
},
{spm:
"Tidsforskjell mellom Norge og Mongolia ved sommertid er:",
svar:
"+ 6 timer",
galt1:
"+ 5 timer",
galt2:
"+ 4 timer"
},
{spm:
"Navnet Mongolia betyr:",
svar:
"De tapre og stolte menns land",
galt1:
"De store og høytflyvende ørners land",
galt2:
"Den store og mektige Djengis Khans land"
},
{spm:
"Teltene mange mongoler bor i heter:",
svar:
"Ger",
galt1:
"Gir",
galt2:
"Gor"
},
{spm:
"BATAAR er mongolsk og betyr:",
svar:
"Helt",
galt1:
"Hei!",
galt2:
"Kult!"
},
{spm:
"I Mongolia brukes ørn som:",
svar:
"Jaktfugl",
galt1:
"Kjæledyr",
galt2:
"Sangfugl"
},
{spm:
"Hvilken mongolsk idrett kan du teste på superblink.no?",
svar:
"Mongolsk bryting",
galt1:
"Mongolsk bowling",
galt2:
"Mongolsk høydehopp"
},
{spm:
"Målet for Barnas Misjonsprosjekt 19/20 er å samle inn:",
svar:
"2 mill kr",
galt1:
"20 mill kr",
galt2:
"200 tusen kr"
}]
}
var SCRT = {};
SCRT.game_id = "oern";

QUIZDATA.save = function(s) {
	SCRT.game_id = "on"+"r";
	SUPERLOAD.lagre(49,s);
	SCRT.game_id = "kong";
}