QUIZDATA = {
	tittel:
	"Skapelsen",
	info1:
	"En quiz om skapelsen.",
	info2:
	"Svar så fort du kan!",
	info3:
	"10 spørsmål, 3 alternativer pr spørsmål.",
	info4:
	"Lykke til!",
	oppgaver:
	[{spm:
		"Hva er den aller første setningen i Bibelen?",
		svar:
		"I begynnelsen skapte Gud himmelen og jorden.",
		galt1:
		"Dette er historien om himmelen og jorden da de var skapt.",
		galt2:
		"På den første dag skapte Gud himmelen og jorden."
	},
	{spm:
		"Hvilket dyr er verdens største pattedyr?",
		svar:
		"Blåhvalen",
		galt1:
		"Flodhesten",
		galt2:
		"Sjiraffen"
	},
	{spm:
		"På hvilken dag skapte Gud lyset på himmelhvelvingen?",
		svar:
		"Fjerde dag",
		galt1:
		"Tredje dag",
		galt2:
		"Andre dag"
	},
	{spm:
		"Hvor stor del av jorden er dekket av vann?",
		svar:
		"Ca 70 %",
		galt1:
		"Ca 50 %",
		galt2:
		"Ca 30 %"
	},
	{spm:
		"Hvilket dyr er verdens minste pattedyr?",
		svar:
		"Dvergspissmusa",
		galt1:
		"Bladlusa",
		galt2:
		"Marihøna"
	},
	{spm:
		"Når sjimpanser hilser på hverandre, gjør de ofte følgende:",
		svar:
		"Gir hverandre en klem",
		galt1:
		"Gir «Hi five»",
		galt2:
		"Håndhilser"
	},
	{spm:
		"Verdens største blomst, Rafflesia arnoldii, vokser kun i:",
		svar:
		"Indonesia",
		galt1:
		"Japan",
		galt2:
		"Mexico"
	},
	{spm:
		"Hva var de første ordene Gud sa?",
		svar:
		"Det skal bli lys!",
		galt1:
		"Jeg vil skape!",
		galt2:
		"Jorden skal bli til!"
	},
	{spm:
		"Hvilket dyr løper fortest?",
		svar:
		"Geparden",
		galt1:
		"Leoparden",
		galt2:
		"Jaguaren"
	},
	{spm:
		"Hva het de to første menneskene?",
		svar:
		"Adam og Eva",
		galt1:
		"Abraham og Sara",
		galt2:
		"Simon og Hanna"
	},
	{spm:
		"Hvilken fisk har en liten skjeggflipp under haka?",
		svar:
		"Torsk",
		galt1:
		"Laks",
		galt2:
		"Breiflabb"
	},
	{spm:
		"Hva het hagen der de første menneskene var?",
		svar:
		"Edens hage",
		galt1:
		"Evas hage",
		galt2:
		"Evighetens hage"
	},
	
	
	{spm:
		"Hva gjorde Gud den syvende dagen?",
		svar:
		"Hvilte",
		galt1:
		"Skapte fiskene",
		galt2:
		"Skapte menneskene"
	},
	{spm:
		"Hvilken av disse fiskene er ferskvannsfisk?",
		svar:
		"Abbor",
		galt1:
		"Hyse",
		galt2:
		"Sild"
	},
	{spm:
		"Hva har Gud IKKE skapt?",
		svar:
		"Synd",
		galt1:
		"Ormer",
		galt2:
		"Edderkopper"
	},
	{spm:
		"Det sterkeste insektet i verden er:",
		svar:
		"Gjødselbillen",
		galt1:
		"Dronningmauren",
		galt2:
		"Marihønen"
	},
	{spm:
		"Hva var det aller første Gud skapte?",
		svar:
		"Lyset",
		galt1:
		"Gresset",
		galt2:
		"Dyra"
	},
	{spm:
		"Avstanden fra sola til jorda er ca:",
		svar:
		"150 000 000 000 km",
		galt1:
		"15 000 000 km",
		galt2:
		"50 000 000 km"
	},
	{spm:
		"I hvilket «bilde» er mennesket skapt?",
		svar:
		"I Guds bilde",
		galt1:
		"I Adams bilde",
		galt2:
		"I sitt eget bilde"
	},
	{spm:
		"Hvilken dag skapte Gud himmelen?",
		svar:
		"Andre dagen",
		galt1:
		"Tredje dagen",
		galt2:
		"Fjerde dagen"
	},
	
	
	{spm:
		"Hvor tung kan elgen bli?",
		svar:
		"Ca 600 kg",
		galt1:
		"Ca 700 kg",
		galt2:
		"Ca 400 kg"
	}]
}
var SCRT = {};
SCRT.game_id = "skape";

QUIZDATA.save = function(s) {
	SCRT.game_id = "dag"+"2";
	SUPERLOAD.lagre(34,s);
	SCRT.game_id = "skaper";
}