QUIZDATA = {
	tittel:
	"Etiopia",
	info1:
	"En quiz om Etiopia.",
	info2:
	"Svar så fort du kan!",
	info3:
	"10 spørsmål, 3 alternativer pr spørsmål.",
	info4:
	"Lykke til!",
	oppgaver:
	[{spm:
"I hvilken verdensdel ligger Etiopia?",
svar:
"Afrika",
galt1:
"Europa",
galt2:
"Amerika"
},
{spm:
"Hva heter hovedstaden i Etiopia?",
svar:
"Addis Abeba",
galt1:
"Awassa",
galt2:
"Gisma"
},
{spm:
"Hvilket land grenser Etiopia til i sør?",
svar:
"Kenya",
galt1:
"Mali",
galt2:
"Tanzania"
},
{spm:
"Det offisielle språket i Etiopia er:",
svar:
"Amharisk",
galt1:
"Afrikansk",
galt2:
"Etiopisk"
},
{spm:
"Myntenheten i Etiopia heter:",
svar:
"Birr",
galt1:
"Etiopiske kroner",
galt2:
"Ribb"
},
{spm:
"Fargene i Etiopia sitt flagg er:",
svar:
"Rødt, blått, gult og grønt",
galt1:
"Grønt, blått, hvitt og rødt",
galt2:
"Hvitt, blått, rødt og svart"
},
{spm:
"Det høyeste fjellet i Elfenbenskysten heter",
svar:
"Ras Dejen",
galt1:
"Mount Everest",
galt2:
"Mount Ras"
},
{spm:
"Hjemmedrakten til det etiopiske fotball-landslaget er:",
svar:
"Gul og grønn",
galt1:
"Hvit og blå",
galt2:
"Blå og gul"
},
{spm:
"Hvor mange land grenser Etiopia til?",
svar:
"6",
galt1:
"3",
galt2:
"9"
},
{spm:
"Hvor mange mennesker bor det i Etiopia?",
svar:
"Ca 100 millioner",
galt1:
"Ca 50 millioner",
galt2:
"Ca 150 millioner"
},
{spm:
"Når er Etiopia sin nasjonaldag?",
svar:
"28. mai",
galt1:
"17. mai",
galt2:
"17. april"
},
{spm:
"Hvilken farge er ikke med i flagget til Etiopia?",
svar:
"Svart",
galt1:
"Gul",
galt2:
"Grønn"
},
{spm:
"Hvilken religion tilhører de fleste i Etiopia?",
svar:
"Kristendommen",
galt1:
"Islam",
galt2:
"Jødedommen"
},
{spm:
"Den store dalen som går gjennom Etiopia heter:",
svar:
"Rift Valley",
galt1:
"Death Valley",
galt2:
"Tiger Valley"
},
{spm:
"Kirka i Etiopia heter:",
svar:
"Mekane Yesus",
galt1:
"Addis Abeba Church",
galt2:
"Mekane Ethiopia"
},
{spm:
"Den viktigste varen Etiopia eksporterer (selger til andre land), er:",
svar:
"Kaffi",
galt1:
"Jord",
galt2:
"Kakao"
},
{spm:
"Størrelsen på Etiopia i forhold til Norge, er:",
svar:
"Tre ganger så stort",
galt1:
"Dobbelt så stort",
galt2:
"Fire ganger så stort"
},
{spm:
"En av de store elvene i Etiopia heter:",
svar:
"Den blå nil",
galt1:
"Den grønne nil",
galt2:
"Den turkise nil"
},
{spm:
"Hørespill-prosjektet som BM støtter heter:",
svar:
"Healing voice",
galt1:
"Healed body",
galt2:
"Whole world"
},
{spm:
"Ferenge betyr:",
svar:
"Utlending",
galt1:
"Etioper",
galt2:
"Innbygger"
},
{spm:
"Det er mange forskjellige språk i Etiopia, faktisk:",
svar:
"Ca 90",
galt1:
"Ca 50",
galt2:
"Ca 20"
},
{spm:
"Nasjonalretten i Etiopia er:",
svar:
"Injera watt",
galt1:
"Misto",
galt2:
"Kitfo"
},
{spm:
"Berbere er det samme som:",
svar:
"Rød pepper",
galt1:
"Gulrot",
galt2:
"Salt fisk"
},
{spm:
"Et etiopisk år består av:",
svar:
"12 måneder med 30 dager og 1 måned med 5 dager",
galt1:
"12 måneder – som i Norge",
galt2:
"11 måneder med 20 dager og 2 måneder med 10 dager"
},
{spm:
"Etiopias største innsjø heter:",
svar:
"Tana",
galt1:
"Rana",
galt2:
"Lana"
},
{spm:
"Etiopias president heter:",
svar:
"Mulato Teshome",
galt1:
"Gelato Teshome",
galt2:
"Filato Teshome"
},
{spm:
"Hovedstadens navn, Addis Abeba betyr:",
svar:
"Ny blomst",
galt1:
"Hele verden",
galt2:
"Smilets hovedstad"
},
{spm:
"Følgende kan sees fra verdensrommet:",
svar:
"Rift Valley",
galt1:
"Addis Abeba",
galt2:
"Innsjøen Tana"
},
{spm:
"Etiopia har sin julaften på følgende dato:",
svar:
"7. januar",
galt1:
"24. desember",
galt2:
"31. desember"
},
{spm:
"Etiopiske barn begynner på skolen når de er:",
svar:
"7 år",
galt1:
"6 år",
galt2:
"5 år"


}]
}
var SCRT = {};
SCRT.game_id = "rasta";

QUIZDATA.save = function(s) {
	SCRT.game_id = "rat"+"sa";
	SUPERLOAD.lagre(41,s);
	console.log("lagret");
	SCRT.game_id = "selassi";
}