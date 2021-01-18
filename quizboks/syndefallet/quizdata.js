QUIZDATA = {
	tittel:
	"Syndefallet",
	info1:
	"En quiz om syndefallet.",
	info2:
	"Svar så fort du kan!",
	info3:
	"10 spørsmål, 3 alternativer pr spørsmål.",
	info4:
	"Lykke til!",
	oppgaver:
	[{spm:
		"Hva betyr navnene Adam og Eva?",
		svar:
		"Menneske og kvinne",
		galt1:
		"Mann og dame",
		galt2:
		"Gutt og jente"
	},
	{spm:
		"Hva sa Gud om frukten i Edens hage?",
		svar:
		"De kunne spise av all frukt, bortsett fra frukten på et bestemt tre",
		galt1:
		"De kunne spise all frukt, bortsett fra eplene",
		galt2:
		"De kunne ikke spise frukten i hagen"
	},
	{spm:
		"Hva kalte Gud treet som var forbudt å spise av?",
		svar:
		"Treet til kunnskap om godt og ondt",
		galt1:
		"Treet med de farlige eplene",
		galt2:
		"Ungdommens tre"
	},
	{spm:
		"Hvem fristet Eva til å spise av den forbudte frukten?",
		svar:
		"Slangen",
		galt1:
		"Adam",
		galt2:
		"Ingen"
	},
	{spm:
		"Hvem var egentlig slangen?",
		svar:
		"Djevelen",
		galt1:
		"En ubuden gjest",
		galt2:
		"Adam"
	},
	{spm:
		"De første ordene slangen sa til Eva, var...",
		svar:
		"Har Gud virkelig sagt...",
		galt1:
		"Hør nå her, Eva...",
		galt2:
		"Denne frukten er kjempegod!"
	},
	{spm:
		"Hva hadde Adam og Eva på seg før de spiste av frukten?",
		svar:
		"Ingenting",
		galt1:
		"Fikenblader",
		galt2:
		"Bananblader"
	},
	{spm:
		"Hva hadde Adam og Eva på seg da de gjemte seg for Gud?",
		svar:
		"Fikenblader",
		galt1:
		"Bananblader",
		galt2:
		"Ingenting"
	},
	{spm:
		"Hva gjorde Adam og Eva da Gud kom, etter at de hadde spist av frukten?",
		svar:
		"De gjemte seg",
		galt1:
		"De ropte på ham og sa «hei»",
		galt2:
		"De rømte"
	},
	{spm:
		"Hva skjedde da Gud fant Adam og Eva, etter at de hadde syndet?",
		svar:
		"Han sendte dem ut av hagen",
		galt1:
		"Han satte dem i fengsel",
		galt2:
		"Han sendte dem på havet i en båt"
	},
	{spm:
		"Hvorfor måtte Adam og Eva ut av hagen?",
		svar:
		"For at de ikke skulle spise av livets tre",
		galt1:
		"Fordi Gud var sint",
		galt2:
		"Fordi det ikke var plass til dem"
	},
	{spm:
		"Hvorfor kunne de ikke spise av livets tre?",
		svar:
		"For da kom de til å leve evig i en syndig verden",
		galt1:
		"For da ville de dø",
		galt2:
		"For da var ikke Gud glad i dem lenger"
	},
	{spm:
		"Gud lagde klær til Adam og Eva etter syndefallet. Hva var de lagd av?",
		svar:
		"Skinn",
		galt1:
		"Bomull",
		galt2:
		"Palmeblader"
	},
	
	{spm:
		"Hva betyr ordet «synd»?",
		svar:
		"Å bomme på målet",
		galt1:
		"Å gå i blinde",
		galt2:
		"Å oppleve noe leit"
	},
	{spm:
		"Hva het de to første barna til Adam og Eva?",
		svar:
		"Kain og Abel",
		galt1:
		"Kam og Jafet",
		galt2:
		"Sem og Abel"
	},
	{spm:
		"Gud har gitt oss gode regler som vi skal leve etter. Hvor finner vi disse?",
		svar:
		"I Bibelen",
		galt1:
		"I kirka",
		galt2:
		"På bedehuset"
	},
	{spm:
		"Når vi synder, tilgir Gud oss. Hvorfor?",
		svar:
		"Jesus har tatt straffen vår",
		galt1:
		"Han synes ikke det er så farlig",
		galt2:
		"Han synes så synd på oss"
	},
	
	
	
	{spm:
		"Hvilken betydning fikk syndefallet for alle mennesker?",
		svar:
		"De ble skilt fra Gud og kunne ikke komme til Himmelen",
		galt1:
		"De måtte være slaver for farao",
		galt2:
		"De måtte være i ørkenen i 40 år"
	}]
}
var SCRT = {};
SCRT.game_id = "synden";

QUIZDATA.save = function(s) {
	SCRT.game_id = "frut"+"k";
	SUPERLOAD.lagre(35,s);
	SCRT.game_id = "slangen";
}