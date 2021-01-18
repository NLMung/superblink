QUIZDATA = {
	tittel:
	"Jesus blir født",
	info1:
	"En quiz om Jesu fødsel.",
	info2:
	"Svar så fort du kan!",
	info3:
	"10 spørsmål, 3 alternativer pr spørsmål.",
	info4:
	"Lykke til!",
	oppgaver:
	[
	{spm: "Hva het moren til Jesus?",
	svar: "Maria",
	galt1: "Marta",
	galt2: "Magda"
	},
	{spm: "I hvilken by ble Jesus født?",
	svar: "Betlehem",
	galt1: "Jerusalem",
	galt2: "Nasaret"
	},
	{spm: "Hvem var konge da Jesus ble født?",
	svar: "Herodes",
	galt1: "Augustus",
	galt2: "Pilatus"
	},
	{spm: "Hvilket land måtte Jesus, Josef og Maria flykte til?",
	svar: "Egypt",
	galt1: "Jordan",
	galt2: "Syria"
	},
	{spm: "Hvilket yrke hadde Josef?",
	svar: "Snekker",
	galt1: "Maler",
	galt2: "Rørlegger"
	},
	{spm: "Hvem var keiser da Jesus ble født?",
	svar: "Augustus",
	galt1: "Pilatus",
	galt2: "Herodes"
	},
	{spm: "Hvem var de første som besøkte Jesus?",
	svar: "Gjetere",
	galt1: "Snekkere",
	galt2: "Gartnere"
	},
	/* {spm: "Hvilke dyr passet gjeterne som besøkte Jesus på?",
	svar: "Sauer",
	galt1: "Geiter",
	galt2: "Kyr"
	}, */
	{spm: "Hvem var det som fortalte gjeterne at Jesus var født?",
	svar: "Engel",
	galt1: "Vismann",
	galt2: "Konge"
	},
	{spm: "I hvilken bok i Bibelen finner vi juleevangeliet?",
	svar: "Lukas",
	galt1: "Johannes",
	galt2: "Markus"
	},
	{spm: "Vismennene hadde med gaver, en av disse var:",
	svar: "Myrra",
	galt1: "Sølv",
	galt2: "Diamant"
	},
	{spm: "Hvor lå byen Nasaret?",
	svar: "Galilea",
	galt1: "Judea",
	galt2: "Samaria"
	},
	{spm: "Hva brukte Maria som seng til Jesus??",
	svar: "Krybbe",
	galt1: "Vogge",
	galt2: "Vogn"
	},
	{spm: "Hvor gammel var Jesus da han fikk navnet som engelen hadde sagt til Maria?",
	svar: "Åtte dager",
	galt1: "En måned",
	galt2: "Fire dager"
	},
	/* {spm: "I juleevangeliet finner vi et annet navn på Jesus. Det er",
	svar: "Messias",
	galt1: "Kristus",
	galt2: "Emanuel"
	}, */
	{spm: "Hvilken ætt kom Josef fra?",
	svar: "David",
	galt1: "Benjamin",
	galt2: "Ruben"
	},
	{spm: "Hva var engelens første ord til gjeterne?",
	svar: "Frykt ikke",
	galt1: "Halleluja",
	galt2: "Ære være Gud"
	},
	{spm: "Jesus kalles også Immanuel. Det betyr:",
	svar: "Gud med oss",
	galt1: "Gud elsker oss",
	galt2: "Jeg er Guds sønn"
	},
	{spm: "Vismennene besøkte Jesus. Men hvor kom de fra?",
	svar: "Østen",
	galt1: "Europa",
	galt2: "Australia"
	},
	{spm: "Hvem sa at vismennene skulle fortelle ham hvor barnet var?",
	svar: "Herodes",
	galt1: "Pilatus",
	galt2: "August"
	},
	{spm: "Da Maria fikk vite at hun var gravid, reiste hun for å besøke sin kusine som het:",
	svar: "Elisabeth",
	galt1: "Anna",
	galt2: "Hanna"
	},
	{spm: "Marias kusine fikk en sønn noen måneder før Jesus ble født. Navnet hans var:",
	svar: "Johannes",
	galt1: "Jonathan",
	galt2: "Andreas"
	}]
}

var SCRT = {};
SCRT.game_id = "krybben";

QUIZDATA.save = function(s) {
	SCRT.game_id = "hma"+"l";
	SUPERLOAD.lagre(33,s);
	SCRT.game_id = "stjerne";
}