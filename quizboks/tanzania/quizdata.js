QUIZDATA = {
	tittel:
	"Tanzania",
	info1:
	"En quiz om Tanzania",
	info2:
	"Svar så fort du kan!",
	info3:
	"10 spørsmål, 3 alternativer pr spørsmål.",
	info4:
	"Lykke til!",
	oppgaver:
	[{spm:
"Hvilke farger er det i det Tanzanianske flagget?",
svar:
"Grønt, gult, svart og blått",
galt1:
"Rødt, gult, svart og blått",
galt2:
"Grønt, hvitt, rødt og blått"
},
{spm:
"Hvilken verdensdel tilhører Tanzania?",
svar:
"Afrika",
galt1:
"Asia",
galt2:
"Oseania"
},
{spm:
"I Tanzania finner vi Afrikas høyeste fjell. Hva heter det?",
svar:
"Kilimanjanro",
galt1:
"Mount Everest",
galt2:
"Galdhøpiggen"
},
{spm:
"Afrikas største innsjø ligger i Tanzania. Hva heter den?",
svar:
"Victoriasjøen",
galt1:
"Svanesjøen",
galt2:
"Flamingosjøen"
},
{spm:
"Hva heter den største byen i Tanzania?",
svar:
"Dar-es-Salaam",
galt1:
"Dodoma",
galt2:
"Arusha"
},
{spm:
"Hva heter hovedstaden i Tanzania?",
svar:
"Dodoma",
galt1:
"Dar-es-Salaam",
galt2:
"Arusha"
},
{spm:
"Hva er Tanzanias nasjonalspråk?",
svar:
"Swahili",
galt1:
"Sukuma",
galt2:
"Nyamwezi"
},
{spm:
"Hvilket av Løve, Tiger, Elefant, Flodhest lever IKKE villt i Tanzania?",
svar:
"Tiger",
galt1:
"Flodhest",
galt2:
"Elefant"
},
{spm:
"Hvilket av Kenya, Etiopia, Uganda er IKKE naboland med Tanzania?",
svar:
"Etiopia",
galt1:
"Kenya",
galt2:
"Uganda"
},
{spm:
"Folk i Tanzania er veldig glad i chai, men hva er egentlig det?",
svar:
"Te, gjerne med melk og sukker",
galt1:
"Kaffi med fløte",
galt2:
"Kakao, gjerne med krem"
},
{spm:
"Linkus besøkte en barnehage da vi var i Tanzania. Hvor ligger den?",
svar:
"Kiabakari",
galt1:
"Dodoma",
galt2:
"Moshi"
},
{spm:
"Oppdraget til Linkus var å levere et barneblad. Hva heter det?",
svar:
"Twende",
galt1:
"Superblink",
galt2:
"Asante"
},
{spm:
"Hei på swahili er ..?",
svar:
"Habari",
galt1:
"Sawa",
galt2:
"Twende"
},
{spm:
"Takk på swahili er ..?",
svar:
"Asante",
galt1:
"Habari",
galt2:
"Sawa"
},
{spm:
"Ikke noe problem på swahili er ..?",
svar:
"Hakuna matata",
galt1:
"Makuna hatata",
galt2:
"Kahuna matata"
},
{spm:
"Hva heter mannen som gir Linkus et viktig oppdrag?",
svar:
"Cathbert",
galt1:
"Egbert",
galt2:
"Cuthbert"
},
{spm:
"Tanzanias første president hadde same fornavn som en kjent ape. Hva var det?",
svar:
"Julius",
galt1:
"Rafiki",
galt2:
"Nils"
},
{spm:
"Hvor mange penger håper Barnas Misjonsprosjekt Tanzania å samle inn?",
svar:
"2 000 000 kr",
galt1:
"200 000 kr",
galt2:
"1 200 000 kr"
}]
}
var SCRT = {};
SCRT.game_id = "chai";

QUIZDATA.save = function(s) {
	SCRT.game_id = "ca"+"hi";
	SUPERLOAD.lagre(48,s);
	SCRT.game_id = "tanzania";
}