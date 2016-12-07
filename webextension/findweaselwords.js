// document.body.style.border = "10px solid blue";

// Tableau des expressions à trouver
 var numericallyVague = [	"most", "mostly", "of course", "largely", "some", "bonjour", "autre"];

 var paragraphe;
 var contentParagraphe;

// console.log("ça marche!");

// document.body.style.border = "10px solid blue";

// for (var i =0; i<paragraphe.length; i++) {
// 	paragraphe[i].style.color = "green";
// 	console.log("ça marche la boucle!");
// }

setup();

function setup() {

	// Récupère les textes
	paragraphe = document.querySelectorAll('p, h1, h2,h3,h4,h5,h6');
	analyse();
	console.log("j'ai analysé");

	decouper();
	console.log("j'ai découpé");

}


// Analyse le texte pour trouver les mots qu'on cherche
function analyse() {

	var foundWord = 0;
	var searchFrom = 0;


	for (var k=0; k<numericallyVague.length;k++) {

		for (var p=0; p<paragraphe.length; p++) {

			contentParagraphe = paragraphe[p].innerHTML;

			// console.log("paragraphe[p] : " + paragraphe[p].innerHTML);

			// Si on trouve un des mots de la liste dans le paragraphe
			if(contentParagraphe.search(numericallyVague[k]) != -1) {

				console.log("j'ai trouvé une correspondance " + numericallyVague[k]);

				var index = contentParagraphe.indexOf(numericallyVague[k], searchFrom);

				console.log("index " + index);
				
				// print(index);

				if (index != -1) {
					addBalise(index, numericallyVague[k], numericallyVague[k].length, contentParagraphe.length);
				}

			}

			paragraphe[p].innerHTML = contentParagraphe;

		}

	} // for



for (var j=0;j<document.getElementsByClassName("vague").length; j++) {
	document.getElementsByClassName("vague")[j].style.color = "blue";
}

// decouper();

}



// Ajoute un span autour des mots trouvés
function addBalise(index, word, length, textLength) {

	console.log("addBalise");

			var newText = contentParagraphe.slice(index, index + length);
			var debutTexte = contentParagraphe.slice(0, index);
			newText = "<span class='vague'>" + word + "</span>";
			var suiteTexte = contentParagraphe.slice(index+ length, textLength);
			

			contentParagraphe = debutTexte + newText + suiteTexte;

			// return texte;

}




/****** Animation ******/

setInterval( function() {

		var motsHasardeux = document.getElementsByClassName('char');
		var listeAngles = ["-30", "-20", "-10", "10", "20", "30"];
		
		for(var i=0; i<motsHasardeux.length; i++) {
			var hasard= Math.ceil(Math.random()*6);
			
			motsHasardeux[i].style.display = "inline-block";
			motsHasardeux[i].style.position = "relative";
			motsHasardeux[i].style.transition = "2s ease";
			motsHasardeux[i].style.transform = "rotate(" + listeAngles[hasard-1] + "deg)";

	}
	}, 2000);





/******** Découpe les mots ********/

function decouper() {
	console.log("ça marche la découpe!");
     array = document.getElementsByClassName('vague');    
     for (i=0; i<array.length; i++) {
          expression = array[i].innerHTML; chaine = '';
          for (var j=0; j<expression.length; j++) {
               chaine += "<span class='char'>" + expression.substr(j, 1) + "</span>" ; }
          array[i].innerHTML = chaine; 
      }
} // decouper
