
// Tableau des expressions à trouver
 var numericallyVague = [	"most", "mostly", "of course", "largely", "some", "a lot of", "probably", "countless", "the most common", "or more", "or less", "linked to", "has links to", "scholars", "almost", "certainly", "really", "experts", "many", "often", "it is said", "it is known", "it's said", "it's known", "people say", "it has been", "it's been", "critics", "it stands to reason", "questions have been raised", "experience shows", "may have", "officially", "it turns out", "award-winning", "a recent study", "come to be", "came to be", "up to", "vast majority", "good", "better", "upright", "honorable", "moral", "righteous", "hopefully", "great", "greatest", "grateful", "fantastic", "true", "beautiful", "very", "tough", "highly", "by the way", "bad", "worst", "nasty", "immoral", "evil", "wrong", "corrupt", "wicked", "iniquitous", "unlawful", "naughty", "hateful", "odious", "repugnant", "repellent", "disgusting", "sinful", "harmful", "horrible", "special", "let me tell", "i'll tell you", "believe me", "that's right", "nah", "media", "elite"];

 var paragraphe;
 var contentParagraphe;


 var afficheRatio = document.createElement('p');

// statistiques
 var nbWeaselWords = 0;
 var nbLettres = 0;
 var foundWords = [];


createButton();


function createButton() {

	 var myButton = document.createElement('div');

	myButton.setAttribute('id', 'weaselExtensionController');
	myButton.style.position = "fixed";
	myButton.style.top = "200px";
	myButton.style.right = "30px";
	myButton.style.margin = "0!important";
	myButton.style.zIndex = "9999999";
	myButton.style.padding = "10px";
	myButton.style.backgroundColor = "rgba(255,255,255,0.8)";
	myButton.style.color = "blue";
	myButton.style.cursor = "pointer";
	myButton.style.border = "3px solid blue";
	myButton.style.fontSize = "15px";
	myButton.innerHTML = "Find weasel words";
	myBody = document.getElementsByTagName('div')[0];
	document.body.insertBefore(myButton,myBody);
	// alert('fini');
	myButton.addEventListener('click', setup);	
	
}

function setup() {

	// Récupère les textes
	// paragraphe = document.querySelectorAll('p, h1, h2,h3,h4,h5,h6,span,aside, section, div');
	paragraphe = document.getElementsByTagName('body')[0];

	// console.log(paragraphe.innerHTML + "  " + paragraphe.innerHTML.length);


		nbLettres+=paragraphe.textContent.length;


	analyse();
	decouper();
	statistique();
}


function analyse() {



	for (var k=0; k<numericallyVague.length;k++) {

			contentParagraphe = paragraphe.innerHTML;
			console.log("contentParagraphe " + contentParagraphe);
			var maRegex = new RegExp(numericallyVague[k] + " ", "gi");
			var monTableau;

			// Tant que l'on trouve un des mots de la liste dans le paragraphe
			while ((monTableau = maRegex.exec(contentParagraphe)) !== null) {

				// indexOf doesn't work with regExp so we need to combine substr() and search()
    			var index = contentParagraphe.substr(0).search(maRegex);
				addBalise(index, numericallyVague[k].length, contentParagraphe.length);
				paragraphe.innerHTML = contentParagraphe;

				var isNew = true;

				for (var i=0; i<foundWords.length; i++) {
					// si le mot est déjà dans le tableau on incrémente l'occurence
					if (foundWords[i].word == numericallyVague[k]) {
						foundWords[i].occurence++;
						isNew = false;
					}
				}

				// si le mot n'a pas été trouvé dans le tableau
				if (isNew) {
					foundWords.push(new FoundWord(numericallyVague[k]));
				}

			// console.log("numericallyVague[k] " + numericallyVague[k]);
		}
	}


	// range le tableau en fonction du nombre d'occurence
	foundWords.sort(function (a, b) {
 		return b.occurence - a.occurence;
	});
	console.log(foundWords);
}


// Ajoute un span class="vague" autour des mots trouvés

function addBalise(index, length, textLength) {

			var word = contentParagraphe.slice(index, index + length);
			var debutTexte = contentParagraphe.slice(0, index);
			var ouvertureBalise = "<span class='vague'>";
			var fermetureBalise = "</span>";
			var suiteTexte = contentParagraphe.slice(index+ length, textLength);

			// on assemble le début du texte + la balise + le mot
			contentParagraphe = debutTexte + ouvertureBalise + word + fermetureBalise + suiteTexte;
}




/****** Animation des lettres ******/

setInterval( function() {

		var motsHasardeux = document.getElementsByClassName('char');
		var listeAngles = ["-30", "-20", "-10", "0", "10", "20", "30"];
		
		for(var i=0; i<motsHasardeux.length; i++) {
			var hasard= Math.ceil(Math.random()*listeAngles.length);
			
			motsHasardeux[i].style.display = "inline-block";
			motsHasardeux[i].style.position = "relative";
			motsHasardeux[i].style.transition = "2s ease";
			motsHasardeux[i].style.transform = "rotate(" + listeAngles[hasard-1] + "deg)";

		}
}, 2000);





/******** Découpe les mots ********/

function decouper() {

	var listeMots = [];
    array = document.getElementsByClassName('vague');   

// permet d'avoir les mots trouvés mais pas la regex concernée ('most' et 'Most' sont différents);
// corrigé avec l'utilisation de toUpperCase puis toLowerCase
for (var k=0; k<array.length; k++) {
	var mot = array[k].innerHTML.toUpperCase();
	mot = mot.toLowerCase();
	listeMots[k] = mot;
	console.log(listeMots[k]);
}
    

    	for (var j=0; j<array.length; j++) {
			nbWeaselWords += array[j].textContent.length;
		}

	// console.log("nbWeaselWords " + nbWeaselWords);

     for (i=0; i<array.length; i++) {
          expression = array[i].innerHTML; chaine = '';
          for (var j=0; j<expression.length; j++) {
               chaine += "<span class='char'>" + expression.substr(j, 1) + "</span>" ; }
          array[i].innerHTML = chaine; 
      }
} // decouper



/******** Donne les statistiques à l'internaute ********/

function statistique() {
	var initRatio = (nbWeaselWords*100/nbLettres);
	var ratio = Math.round(initRatio*1000)/1000;

	var myButton = document.getElementById('weaselExtensionController');

	afficheRatio.innerHTML = "Ratio | " + ratio;
	afficheRatio.innerHTML += "<br/>Most used | " + foundWords[0].word;
	
	afficheRatio.style.position = "fixed";
	afficheRatio.style.right = "30px";
	afficheRatio.style.zIndex = "9999999";	
	afficheRatio.style.opacity = "0.9999";
	afficheRatio.style.top = "300px";
	afficheRatio.style.color = "red";
	afficheRatio.style.border = "3px solid red";
	afficheRatio.style.backgroundColor = "rgba(255,255,255,0.8)";
	afficheRatio.style.padding = "10px";
	afficheRatio.style.margin = "0!important";
	afficheRatio.style.fontSize = "15px";

	document.body.insertBefore(afficheRatio,myButton);


}




// class FoundWord
function FoundWord(_word) {

	this.word = _word;
	this.occurence = 1;

}
