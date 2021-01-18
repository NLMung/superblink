QUIZDATA = {
	tittel:
	"Sør-Amerika",
	info1:
	"En quiz om misjonsprosjektlandene.",
	info2:
	"Svar så fort du kan!",
	info3:
	"10 spørsmål, 3 alternativer pr spørsmål.",
	info4:
	"Lykke til!",
	oppgaver:
	[
		{spm:
"Hvilke land i Sør-Amerika er BM’s prosjektland?",
svar:
"Peru og Bolivia",
galt1:
"Brasil og Chile",
galt2:
"Chile og Peru"
},
{spm:
"Hva heter hovedstaden i Peru?",
svar:
"Lima",
galt1:
"Arequipa",
galt2:
"Cuzco"
},
{spm:
"Hva heter hovedstadene i Bolivia?",
svar:
"Sucre og La Paz",
galt1:
"Santa Cruz de la Sierra og La Paz",
galt2:
"El Alto og Sucre"
},
{spm:
"Hvilket land grenser Peru til helt i vest?",
svar:
"Chile",
galt1:
"Brazil",
galt2:
"Ecuador"
},
{spm:
"Hvilke land grenser Bolivia til helt i sør?",
svar:
"Chile og Peru",
galt1:
"Brazil og Colombia",
galt2:
"Argentina og Paraguay"
},
{spm:
"Myntenheten i Peru heter:",
svar:
"Peruansk nuevo sol",
galt1:
"Peruansk monetas",
galt2:
"Euro"
},
{spm:
"Myntenheten i Bolivia heter:",
svar:
"Boliviansk boliviano",
galt1:
"Boliviansk monetas",
galt2:
"Euro"
},
{spm:
"Det høyeste fjellet i Bolivia heter Nevado Sajama og er",
svar:
"6542 meter",
galt1:
"2224 meter",
galt2:
"7436 meter"
},
{spm:
"Hjemmedrakten til det peruanske fotball-landslaget er:",
svar:
"Hvit og rød",
galt1:
"Rød og blå",
galt2:
"Blå og hvit"
},
{spm:
"Hjemmedrakten til det bolivianske fotball-landslaget er:",
svar:
"Grønn, hvit, gul og rød",
galt1:
"Rød, gul, grønn og svart",
galt2:
"Gul, grønn, rød og oransje"
},
{spm:
"Hvor mange land grenser Peru til?",
svar:
"5",
galt1:
"3",
galt2:
"7"
},
{spm:
"Hvor mange land grenser Bolivia til?",
svar:
"5",
galt1:
"4",
galt2:
"6"
},
{spm:
"Hvor mange mennesker bor det i Peru?",
svar:
"Ca 31 millioner",
galt1:
"Ca 21 millioner",
galt2:
"Ca 71 millioner"
},
{spm:
"Hvor mange mennesker bor det i Bolivia?",
svar:
"Ca 10 millioner",
galt1:
"Ca 15 millioner",
galt2:
"Ca 18 millioner"
},
{spm:
"Når er Peru sin nasjonaldag?",
svar:
"28. juli",
galt1:
"1. mai",
galt2:
"18. september"
},
{spm:
"Når er Bolivia sin nasjonaldag?",
svar:
"6. august",
galt1:
"4. juli",
galt2:
"20. desember"
},
{spm:
"Hvilken farge er ikke med i flagget til Peru?",
svar:
"Grå",
galt1:
"Rød",
galt2:
"Hvit"
},
{spm:
"Hvilken farge er ikke med i flagget til Bolivia?",
svar:
"Blå",
galt1:
"Gul",
galt2:
"Grønn"
},
{spm:
"Den store innsjøen som ligger i både Peru og Bolivia heter:",
svar:
"Titicaca-sjøen",
galt1:
"Areaquipa-sjøen",
galt2:
"Gjørmesjøen"
},
{spm:
"Titicaca-sjøen er:",
svar:
"Verdens høyeste innsjø",
galt1:
"Verdens laveste innsjø",
galt2:
"Verdens varmeste innsjø"
},
{spm:
"Andesfjellene er verdens lengste fjellkjede, og er:",
svar:
"9000 km",
galt1:
"2000 km",
galt2:
"15000 km"
},
{spm:
"Den eneste bjørnen som lever vilt i Sør-Amerika, er:",
svar:
"Brillebjørn",
galt1:
"Nesebjørn",
galt2:
"Vaskebjørn"
},
{spm:
"PARE er spansk og betyr:",
svar:
"Stopp",
galt1:
"Hei!",
galt2:
"Kul!"
},
{spm:
"Urbefolkningen i Sør-Amerika kalles:",
svar:
"Indianere",
galt1:
"Samer",
galt2:
"Eskimoer"
},
{spm:
"Sør-Amerikansk kakao har en litt uvanlig ingrediens:",
svar:
"Chili",
galt1:
"Hvitløk",
galt2:
"Banan"
},
{spm:
"På menyen i Peru står blant annet:",
svar:
"Helstekt marsvin",
galt1:
"Grillet gresshoppe",
galt2:
"Marinert brillebjørn"
},
{spm:
"Når lamaen er redd, gjør den følgende:",
svar:
"Spytter",
galt1:
"Graver hodet i sanden",
galt2:
"Sparker"
},
{spm:
"Ull får vi jo fra sauen. Men i Sør-Amerika lever et dyr som gir ekstra fin ull:",
svar:
"Alpakka",
galt1:
"Brillebjørn",
galt2:
"Steinbukk"
},
{spm:
"På Titicaca-sjøen finnes det øyer og båter laget av:",
svar:
"Siv",
galt1:
"Tre",
galt2:
"Plast"
}

	]
}
var SCRT = {};
SCRT.game_id = "lama";

QUIZDATA.save = function(s) {
	SCRT.game_id = "lll"+"ama";
	SUPERLOAD.lagre(42,s);
	console.log("lagret");
	SCRT.game_id = "titikaka";
}