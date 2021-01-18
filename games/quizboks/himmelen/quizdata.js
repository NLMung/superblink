QUIZDATA = {
	tittel:
	"Jesus drar til Himmelen",
	info1:
	"Quiz",
	info2:
	"Svar så fort du kan!",
	info3:
	"10 spørsmål, 3 alternativer pr spørsmål.",
	info4:
	"Lykke til!",
	oppgaver:
	[
		{spm:
"Hvor mange dager var Jesus på jorda etter oppstandelsen?",
svar:
"40",
galt1:
"10",
galt2:
"20"
},
{spm:
"På hvilket fjell møtte Jesus møtte disiplene før han dro til Himmelen?",
svar:
"Oljeberget",
galt1:
"Hermon",
galt2:
"Saligprisningenes berg"
},
{spm:
"Hvor mange disipler møtte Jesus på fjellet?",
svar:
"11",
galt1:
"12",
galt2:
"13"
},
{spm:
"I hvilket navn skulle disiplene døpe menneskene?",
svar:
"Faderens, Sønnens og Den Hellige Ånds",
galt1:
"Himmelens",
galt2:
"Maria og Josefs"
},
{spm:
"Hvilke dager er Jesus med oss?",
svar:
"Alle dager",
galt1:
"Bare søndager",
galt2:
"Bare de gode dagene"
},
{spm:
"Jesus sa: I min fars hus er det ?? rom:",
svar:
"Mange",
galt1:
"Noen",
galt2:
"350"
},
{spm:
"Noen menn i hvite klær møtte disiplene. Hvor mange?",
svar:
"2",
galt1:
"3",
galt2:
"4"
},
{spm:
"Fjellet lå i nærheten av en by. Hvilken?",
svar:
"Jerusalem",
galt1:
"Betlehem",
galt2:
"Nasaret"
},
{spm:
"Jesu tale på fjellet kalles:",
svar:
"Misjonsbefalingen",
galt1:
"Misjonsutfordringen",
galt2:
"Misjonstalen"
},
{spm:
"Denne talen finnes blant annet i denne boka i Bibelen:",
svar:
"Matteus",
galt1:
"2. Mosebok",
galt2:
"Habakuk"
},
{spm:
"Hvor gammel var Jesus da han dro til Himmelen?",
svar:
"33 år",
galt1:
"40 år",
galt2:
"44 år"
},
{spm:
"Jesus dro til Himmelen for å:",
svar:
"Gjøre i stand et sted for oss",
galt1:
"Hvile",
galt2:
"Gjøre under blant englene"
},
{spm:
"Hva kalles en som reiser til andre land og forteller om Jesus?",
svar:
"Misjonær",
galt1:
"Millionær",
galt2:
"Mosjonist"
},
{spm:
"Disiplene fikk hjelp av:",
svar:
"Den Hellige Ånd",
galt1:
"Maria og Josef",
galt2:
"Moses"
},
{spm:
"I hvilket land ligger fjellet og byen det fortelles om?",
svar:
"Israel",
galt1:
"Syria",
galt2:
"Amerika"
},
{spm:
"Å fortelle om Jesus kalles:",
svar:
"Misjon",
galt1:
"Mosjon",
galt2:
"Porsjon"
},
{spm:
"Superblink og NLM Ung har et eget misjonsprosjekt for barn. Det heter:",
svar:
"Barnas Misjonsprosjekt (BM)",
galt1:
"Barnas Porsjonsprosjekt (BP)",
galt2:
"Misjon for barn (MFB)"
},
{spm:
"2016/17 går pengene fra Barnas Misjonsprosjekt til:",
svar:
"Kina",
galt1:
"Japan",
galt2:
"Indonesia"
},
{spm:
"Superblink er eid av NLM. Når startet de med misjon?",
svar:
"For mer enn 100 år siden",
galt1:
"For 100 år siden",
galt2:
"For mindre enn 100 år siden"
},
{spm:
"Da disiplene gikk ned fra fjellet, var de:",
svar:
"Glade",
galt1:
"Triste",
galt2:
"Sure"
},
{spm:
"Hvordan skal Jesus komme tilbake?",
svar:
"På samme måte som da han dro",
galt1:
"Ved å bli født som et nytt Jesus-barn",
galt2:
"Det står det ingenting i Bibelen om"
}
]
}
var SCRT = {};
SCRT.game_id = "himmels";

QUIZDATA.save = function(s) {
	SCRT.game_id = "oj"+"le";
	SUPERLOAD.lagre(44,s);
	console.log("lagret");
	SCRT.game_id = "oljeberget";
}