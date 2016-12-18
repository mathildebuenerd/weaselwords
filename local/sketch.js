

// Tableau des expressions à trouver
 var numericallyVague = [	"most", "mostly", "of course", "largely", "some", "probably", "the most common", "or more", "or less", "linked to", "has links to", "scholars", "almost", "certainly", "experts", "many", "often", "it is said", "it is known", "people say", "it has been", "critics", "it stands to reason", "questions have been raised", "experience shows", "may have", "officially", "it turns out", "award-winning", "a recent study", "come to be", "came to be", "up to", "vast majority", "good", "better", "upright", "honorable", "moral", "righteous", "great", "true",
"bad", "worst", "immoral", "evil", "wrong", "corrupt", "wicked", "iniquitous", "unlawful", "naughty", "hateful", "odious", "repugnant", "repellent", "disgusting", "sinful", "harmful"];

 var paragraphe;
 var contentParagraphe;

createButton();


function createButton() {
	// alert('commencé');
	var myButton = document.createElement('button');
	myButton.style.position = "fixed";
	myButton.style.width = "150px";
	myButton.style.height = "100px";
	myButton.style.top = "250px";
	myButton.style.left = "50px";
	myButton.style.zIndex = "9999999";
	myButton.style.padding = "10px";
	myButton.style.backgroundColor = "blue";
	myButton.style.color = "white";
	myButton.innerHTML = "Activer";
	myBody = document.getElementsByTagName('div')[0];
	document.body.insertBefore(myButton,myBody);
	// alert('fini');
	myButton.addEventListener('click', setup);	
	
}

function setup() {

	// createButton();

	// Récupère les textes
	paragraphe = document.querySelectorAll('p, h1, h2,h3,h4,h5,h6,span,aside');
	analyse();
	decouper();

}


// Analyse le texte pour trouver les mots qu'on cherche
function analyse() {

	var foundWord = 0;


	for (var k=0; k<numericallyVague.length;k++) {

		for (var p=0; p<paragraphe.length; p++) {

			contentParagraphe = paragraphe[p].innerHTML;
			
			var maRegex = new RegExp(numericallyVague[k] + " ", "gi");
			// console.log(maRegex);

			var monTableau;


			// Tant que l'on trouve un des mots de la liste dans le paragraphe
			while ((monTableau = maRegex.exec(contentParagraphe)) !== null) {


				// indexOf doesn't work with regExp so we need to combine substr() and search()
    			var index = contentParagraphe.substr(0).search(maRegex);


				//alert("monTableau " + monTableau + " index " + index +" maRegex " + maRegex);

				// si on a trouvé un mot, on lui ajoute la balise
				// if (index != -1) {
					addBalise(index, numericallyVague[k].length, contentParagraphe.length);
				// }

				paragraphe[p].innerHTML = contentParagraphe;

				// searchFrom = maRegex.lastIndex;

				

		}

	} // for

// decouper();

}
}



// Ajoute un span autour des mots trouvés
function addBalise(index, length, textLength) {



			var word = contentParagraphe.slice(index, index + length);
			var debutTexte = contentParagraphe.slice(0, index);
			var ouvertureBalise = "<span class='vague'>";
			var fermetureBalise = "</span>";
			var suiteTexte = contentParagraphe.slice(index+ length, textLength);

			// on assemble le début du texte + la balise + le mot
			contentParagraphe = debutTexte + ouvertureBalise + word + fermetureBalise + suiteTexte;

}




/****** Animation ******/

setInterval( function() {

		var motsHasardeux = document.getElementsByClassName('char');
		var listeAngles = ["-40", "-30", "-20", "-10", "10", "20", "30", "40"];
		
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
	console.log("ça marche la découpe!");
     array = document.getElementsByClassName('vague');    
     for (i=0; i<array.length; i++) {
          expression = array[i].innerHTML; chaine = '';
          for (var j=0; j<expression.length; j++) {
               chaine += "<span class='char'>" + expression.substr(j, 1) + "</span>" ; }
          array[i].innerHTML = chaine; 
      }
} // decouper
