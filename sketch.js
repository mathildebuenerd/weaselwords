

  var texte;
  var numericallyVague = [	"most", "mostly", "Of course","some", "many", "experts", "most", "mainly", "largely", "on the whole", "usually", "commonly", "pretty often",
  							"Most", "Mostly", "Some", "Many", "Experts", "Most", "Mainly", "Largely", "On the whole", "Usually", "Commonly", "Pretty often"];

  var adverbs = [		"probably", "certainly", "often", "in general", "generally", "broadly speaking", "of course", "obviously", "clearly", "evidently", "needless to say",
  						"Probably", "Certainly", "Often", "In general", "Generally", "Broadly speaking", "Of course", "Obviously", "Clearly", "Evidently", "Needless to say"
 	
  							]

  var passive = [		"it is known", "it is said"
  							]


  var vague = "numericallyVague";
 

function setup() {
  createCanvas(windowWidth,windowHeight);
  texte = document.getElementById('texte').innerHTML;
  baliseTexte = document.getElementById('texte');

  // print(baliseTexte);
  analyse();
}


function draw() {


}

function addBalise(index, word, length, textLength) {

			var newText = texte.slice(index, index + length);
			var debutTexte = texte.slice(0, index);
			newText = "<span class='" + vague + "'>" + word + "</span>";
			var suiteTexte = texte.slice(index+ length, textLength);
			

			texte = debutTexte + newText + suiteTexte;

}

function analyse() {

	var foundWord = 0;
	var searchFrom = 0;

	// print("hello");

// var mots = RiTa.tokenize(texte);

// for (var i=0; i<mots.length; i++) {
// print(mots[i] + "  mostly");

	for (var k=0; k<numericallyVague.length;k++) {
		
		// foundWord = 0;

		if(texte.search(numericallyVague[k]) != -1) {

			// si on a déjà trouvé un mot, on cherche le mot suivant à partir de la position du mot précédent
			// var count = 0;
			var index = texte.indexOf(numericallyVague[k], searchFrom);
			
			// while ( index != -1 ) {
   // 				count++;
   // 				index = texte.indexOf( "x",index + 1 );
			// }

			// var index = texte.indexOf(numericallyVague[k] + (" " || "," || "."), searchFrom+50);
			
			print(index);

			if (index != -1) {
				addBalise(index, numericallyVague[k], numericallyVague[k].length, texte.length);
			}

		}

	} // for



	// for (var k=0; k<numericallyVague.length;k++) {

	// 	foundWord = 0;

	// 		if(texte.search(adverbs[k]) != -1) {

	// 		print(adverbs[k] + " index " + texte.search(adverbs[k]));

	// 		// si on a déjà trouvé un mot, on cherche le mot suivant à partir de la position du mot précédent
	// 		if (foundWord > 0) {
	// 			searchFrom = index+1;
	// 		}

	// 		var index = texte.indexOf(adverbs[k], searchFrom+50);

	// 		 // print("index " + index);

	// 		if (index != -1) {

	// 		var newText = texte.slice(index, index + adverbs[k].length);
	// 		var debutTexte = texte.slice(0, index);
	// 		newText = "<span class='adverbs'>" + adverbs[k] + "</span>";
	// 		var suiteTexte = texte.slice(index+adverbs[k].length, texte.length);
			

	// 		texte = debutTexte + newText + suiteTexte;

	// 		foundWord++;

	// 		}
	// 	}

	// }//for

// foundWord = 0;

	// for (var k=0; k<numericallyVague.length;k++) {

	// 	if(texte.search(passive[k]) != -1) {

	// 		// si on a déjà trouvé un mot, on cherche le mot suivant à partir de la position du mot précédent
	// 		if (foundWord > 0) {
	// 			searchFrom = index+1;
	// 		}

	// 		var index = texte.indexOf(passive[k], searchFrom+50);

	// 		 // print("index " + index);

	// 		if (index != -1) {

	// 		var newText = texte.slice(index, index + passive[k].length);
	// 		var debutTexte = texte.slice(0, index);
	// 		newText = "<span class='passive'>" + passive[k] + "</span>";
	// 		var suiteTexte = texte.slice(index+passive[k].length, texte.length);
			

	// 		texte = debutTexte + newText + suiteTexte;

	// 		foundWord++;

	// 		}

	// }


 // } // for k

	document.getElementById('texte').innerHTML = texte;


for (var j=0;j<document.getElementsByClassName(vague).length; j++) {
	document.getElementsByClassName(vague)[j].style.color = "red";
}


}



