
// Words to find
let weaselWordList = ["most", "mostly", "of course", "largely", "some", "a lot of", "probably", "countless", "the most common", "or more", "or less", "linked to", "has links to", "scholars", "almost", "certainly", "really", "experts", "many", "often", "it is said", "it is known", "it's said", "it's known", "people say", "it has been", "it's been", "critics", "it stands to reason", "questions have been raised", "experience shows", "may have", "officially", "it turns out", "award-winning", "a recent study", "come to be", "came to be", "up to", "vast majority", "good", "better", "upright", "honorable", "moral", "righteous", "hopefully", "great", "greatest", "grateful", "fantastic", "true", "beautiful", "very", "tough", "highly", "by the way", "bad", "worst", "nasty", "immoral", "evil", "wrong", "corrupt", "wicked", "iniquitous", "unlawful", "naughty", "hateful", "odious", "repugnant", "repellent", "disgusting", "sinful", "harmful", "horrible", "special", "let me tell", "i'll tell you", "believe me", "that's right", "nah", "media", "elite"];

let paragraphe;
let contentParagraphe;


let afficheRatio = document.createElement('p');

// statistiques
let nbWeaselWords = 0;
let nbLettres = 0;
let foundWords = [];


createButton();


function createButton() {

    // Create the main button and add it to the DOM
    let myButton = document.createElement('div');

    // Add some style 8D
    Object.assign(myButton.style, {
        position: "fixed",
        top: "100px",
        right: "30px",
        margin: "0 !important",
        zIndex: "9999",
        padding: "15px",
        backgroundColor: "#30e391",
        color: "white",
        cursor: "pointer",
        boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
        fontSize: "1.5em",
    });
    myButton.setAttribute('id', 'weaselExtensionController');

    myButton.innerHTML = "🙊  Find weasel words";
    document.body.appendChild(myButton);

    // Add the listener to lauche the analyze when we click the button
    myButton.addEventListener('click', findWeaselWords);

}

function findWeaselWords() {

    // Get all the text of the body
    // paragraphe = document.querySelectorAll('p, h1, h2,h3,h4,h5,h6,span,aside, section, div');
    paragraphe = document.getElementsByTagName('body')[0];

    nbLettres+=paragraphe.textContent.length;


    analyze();
    separateLetters();
    doStats();
}


function analyze() {

    for (const word of weaselWordList) {

        contentParagraphe = paragraphe.innerHTML;
        console.log("contentParagraphe " + contentParagraphe);
        const maRegex = new RegExp(word + " ", "gi");
        let monTableau;

        // Tant que l'on trouve un des mots de la liste dans le paragraphe
        while ((monTableau = maRegex.exec(contentParagraphe)) !== null) {

            // indexOf doesn't work with regExp so we need to combine substr() and search()
            const index = contentParagraphe.substr(0).search(maRegex);
            addBalise(index, word.length, contentParagraphe.length);
            paragraphe.innerHTML = contentParagraphe;

            let isNew = true;

            for (let i=0; i<foundWords.length; i++) {
                // si le mot est déjà dans le tableau on incrémente l'occurence
                if (foundWords[i].word == word) {
                    foundWords[i].occurence++;
                    isNew = false;
                }
            }

            // si le mot n'a pas été trouvé dans le tableau
            if (isNew) {
                foundWords.push(new FoundWord(word));
            }
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

    const word = contentParagraphe.slice(index, index + length);
    const debutTexte = contentParagraphe.slice(0, index);
    const ouvertureBalise = "<span class='vague'>";
    const fermetureBalise = "</span>";
    const suiteTexte = contentParagraphe.slice(index+ length, textLength);

    // on assemble le début du texte + la balise + le mot
    contentParagraphe = debutTexte + ouvertureBalise + word + fermetureBalise + suiteTexte;
}




/****** Animation des lettres ******/

setInterval( function() {
    const weaselWords = document.querySelectorAll(`.char`);
    const angleList = ["-30", "-20", "-10", "0", "10", "20", "30"];

    for (let i=0; i<weaselWords.length; i++) {
        const hazard = Math.ceil(Math.random()*angleList.length);

        weaselWords[i].style.display = "inline-block";
        weaselWords[i].style.position = "relative";
        weaselWords[i].style.transition = "2s ease";
        weaselWords[i].style.transform = "rotate(" + angleList[hazard-1] + "deg)";
    }
}, 2000);





/******** Découpe les mots ********/

function separateLetters() {

    let listeMots = [];
    array = document.getElementsByClassName('vague');

// permet d'avoir les mots trouvés mais pas la regex concernée ('most' et 'Most' sont différents);
// corrigé avec l'utilisation de toUpperCase puis toLowerCase
    for (let k=0; k<array.length; k++) {
        let mot = array[k].innerHTML.toUpperCase();
        mot = mot.toLowerCase();
        listeMots[k] = mot;
        console.log(listeMots[k]);
    }


    for (let j=0; j<array.length; j++) {
        nbWeaselWords += array[j].textContent.length;
    }

    // console.log("nbWeaselWords " + nbWeaselWords);

    for (i=0; i<array.length; i++) {
        expression = array[i].innerHTML; chaine = '';
        for (let j=0; j<expression.length; j++) {
            chaine += "<span class='char'>" + expression.substr(j, 1) + "</span>" ; }
        array[i].innerHTML = chaine;
    }
} // decouper



/******** Donne les statistiques à l'internaute ********/

function doStats() {
    const initRatio = (nbWeaselWords*100/nbLettres);
    const ratio = Math.round(initRatio*1000)/1000;

    const myButton = document.querySelector('weaselExtensionController');

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

    document.body.appendChild(myButton);


}




// class FoundWord
function FoundWord(_word) {

    this.word = _word;
    this.occurence = 1;

}
