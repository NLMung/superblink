QUIZDATA = {
	tittel:
	"Kina",
	info1:
	"En quiz om Kina",
	info2:
	"Svar så fort du kan!",
	info3:
	"10 spørsmål, 3 alternativer pr spørsmål.",
	info4:
	"Lykke til!",
	oppgaver:
	[
		{spm:
"I hvilken verdensdel ligger Kina?",
svar:
"Asia",
galt1:
"Afrika",
galt2:
"Amerika"
},
{spm:
"Hva heter hovedstaden i Kina?",
svar:
"Beijing",
galt1:
"Taiwan",
galt2:
"Taipei"
},
{spm:
"Hvor mange mennesker bor i Kina?",
svar:
"Over 1 milliard",
galt1:
"Akkurat 1 milliard",
galt2:
"Mindre enn 1 milliard"
},
{spm:
"Hva blir regnet som jordens største byggverk?",
svar:
"Den kinesiske mur",
galt1:
"Den himmelske freds plass",
galt2:
"Silkeveien"
},
{spm:
"Hvor lang er Den kinesiske mur?",
svar:
"6352 km",
galt1:
"260 km",
galt2:
"98 km"
},
{spm:
"Hva er fargene i Kina sitt flagg?",
svar:
"Rødt og gult",
galt1:
"Rødt, gult og hvitt",
galt2:
"Gult, rødt og blått"
},
{spm:
"Hvor stor del av menneskene i Kina tror på Jesus?",
svar:
"5,1 %",
galt1:
"10,1 %",
galt2:
"15,1 %"
},
{spm:
"Kan den kinesiske mur sees fra verdensrommet?",
svar:
"Nei",
galt1:
"Ja",
galt2:
"Bare i klarvær"
},
{spm:
"Hva er den største helligdagen for de fleste kinesere?",
svar:
"Kinesisk nyttår",
galt1:
"Kinesisk jul",
galt2:
"Kinesisk påske"
},
{spm:
"Hvilken farge er sørgefarge i Kina?",
svar:
"Hvit",
galt1:
"Svart",
galt2:
"Grå"
},
{spm:
"Når er Kinas nasjonaldag?",
svar:
"1. oktober",
galt1:
"1. mai",
galt2:
"1. november"
},
{spm:
"Kina er landet som produserer aller mest ...",
svar:
"Ris",
galt1:
"Spaghetti",
galt2:
"Kaffi"
},
{spm:
"Dette produktet er oppfunnet i Kina:",
svar:
"Is",
galt1:
"Sjokolade",
galt2:
"Popcorn"
},
{spm:
"Ni hao er kinesisk og betyr ...",
svar:
"Hei",
galt1:
"Halv ni",
galt2:
"Tiger"
},
{spm:
"Hva er målet for Barnas Misjonsprosjekt i Kina?",
svar:
"2 millioner",
galt1:
"100 tusen",
galt2:
"1 milliard"
},
{spm:
"Hva heter den norske jenta Linkus besøkte i Kina?",
svar:
"Isabella",
galt1:
"Isadora",
galt2:
"Iselin"
},
{spm:
"Hva lærer barna på lørdagsskolen lærer utenat?",
svar:
"Salmer",
galt1:
"Eventyr",
galt2:
"Dikt"
},
{spm:
"Barn i Kina bor ofte uten foreldre, fordi ...",
svar:
"Foreldrene jobber på fabrikker utenbys",
galt1:
"Barna er så uskikkelige",
galt2:
"Voksne liker ikke barn"
},
{spm:
"I Kina spiser de maten sin med ...",
svar:
"Spisepinner",
galt1:
"Strikkepinner",
galt2:
"Trommestikker"
},
{spm:
"Hva ville de fleste barna Linkus prata med bli når de blir store?",
svar:
"Lærer",
galt1:
"Bilmekaniker",
galt2:
"Statsminister"
}

	]
}
var SCRT = {};
SCRT.game_id = "ris";

QUIZDATA.save = function(s) {
	SCRT.game_id = "rs"+"is";
	SUPERLOAD.lagre(43,s);
	console.log("lagret");
	SCRT.game_id = "siris";
}