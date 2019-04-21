console.log(`je lis le script`);

class FindWeaselWords {

    constructor() {
        // The words we will be looking for
        this.foundWords = [];
        this.pageContent = "";
        // this.pageContent = document.body.innerHTML;

    }

    init() {
        console.log(`j'init`)
        this.createButton();
    }

    findWeaselWords() {
        console.log(`je vais findWeaselWords`)

        this.analyze();
        this.separateLetters();
        this.doStats();
    }

    createButton() {
        // Create the main UI button and add it to the DOM
        const myButton = document.createElement('div');

        // Add some style 8D
        Object.assign(myButton.style, {
            position: "fixed",
            top: "100px",
            right: "30px",
            margin: "0 !important",
            zIndex: "9999",
            padding: "20px",
            backgroundColor: "#30e391",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
            fontSize: "1.2em",
            fontWeight: "700"
        });
        myButton.setAttribute('id', 'weaselExtensionController');

        myButton.innerHTML = `🙊  Find weasel words`;
        document.body.appendChild(myButton);

        // Add the listener to launch the analysis when we click the button
        myButton.addEventListener('click', this.findWeaselWords.bind(this));
    }

    analyze() {

        this.pageContent = document.body.innerHTML;

        for (const word of weaselWordList) {

            // The regexp should be improved
            // Be careful cause it can find the word in an href url
            const weaselRegex = new RegExp(`${word} `, "gi");

            // While we are finding some words from the weaselWords list
            while ((weaselRegex.exec(this.pageContent)) !== null) {

                // indexOf doesn't work with regExp so we need to combine substr() and search()
                const index = this.pageContent.substr(0).search(weaselRegex);

                // Add a span around the word
                this.pageContent = this.addTag(index, word.length);

                let isNew = true;

                for (const oneWord of this.foundWords) {
                    // si le mot est déjà dans le tableau on incrémente l'occurence
                    if (oneWord.word === word) {
                        oneWord.occurence++;
                        isNew = false;
                    }
                }

                // si le mot n'a pas été trouvé dans le tableau
                if (isNew) {
                    this.foundWords.push(new FoundWord(word));
                }
            }
        }

        // range le tableau en fonction du nombre d'occurence
        this.foundWords.sort( (a, b) => {
            return b.occurence - a.occurence;
        });

        console.log("foundwords", this.foundWords);

        document.body.innerHTML = this.pageContent;
    }

    doStats() {}

    addTag(index, length) {

        const textLength = this.pageContent.length;

        // Add a span class="single-weasel-word" around each weasel word
        const word = this.pageContent.slice(index, index + length);
        console.log(`word`, word)
        const textBefore = this.pageContent.slice(0, index);
        const textAfter = this.pageContent.slice(index + length, textLength);

        return `${textBefore}<span class="single-weasel-word">${word}</span>${textAfter}`;
    }

    getAllWords() {

        console.log(`getallwords`)
        let wordList = [];
        const allWords = document.querySelectorAll('.single-weasel-word');

// permet d'avoir les mots trouvés mais pas la regex concernée ('most' et 'Most' sont différents);
// corrigé avec l'utilisation de toUpperCase puis toLowerCase
        for (const word of allWords) {
            const formattedWord = word.innerHTML.toUpperCase().toLowerCase();
            wordList.push(formattedWord);
        }

        return wordList;
    }

    separateLetters() {
        console.log(`separate letters`)

        const allWords = document.querySelectorAll('.single-weasel-word');

        for (const wordTag of allWords) {
            console.log(`wordTag`, wordTag);
            const word = wordTag.textContent;
            let newWord = '';
            for (const letter in word) {
                newWord += `<span class='char'>${word.substr(letter, 1)}</span>` ;
            }
            wordTag.innerHTML = newWord;
        }
    } // decouper

    animateLetters() {
        setInterval( () => {
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
    }

    doStats() {
        const afficheRatio = document.createElement(`div`);
        const initRatio = (nbWeaselWords*100/ (document.body.textContent.length));
        const ratio = Math.round(initRatio*1000)/1000;

        const myButton = document.querySelector('#weaselExtensionController');

        // Add some style 8D
        Object.assign(afficheRatio.style, {
            position: "fixed",
            right: "30px",
            zIndex: "9999999",
            opacity: "0.9999",
            top: "300px",
            color: "red",
            border: "3px solid red",
            backgroundColor: "rgba(255,255,255,0.8)",
            padding: "10px",
            margin: "0!important",
            fontSize: "15px"
        });
        afficheRatio.innerHTML = `Ratio: ${ratio} <br>Most used: ${this.foundWords[0].word}`;

        document.body.appendChild(myButton);

    }

}

const app = new FindWeaselWords();
app.init();




// class FoundWord
class FoundWord {
    constructor(word, occurence) {
        this.word = word;
        this.occurence = 1;
    }
}

const weaselWordList = ["most", "mostly", "of course", "largely", "some", "a lot of", "probably", "countless", "the most common", "or more", "or less", "linked to", "has links to", "scholars", "almost", "certainly", "really", "experts", "many", "often", "it is said", "it is known", "it's said", "it's known", "people say", "it has been", "it's been", "critics", "it stands to reason", "questions have been raised", "experience shows", "may have", "officially", "it turns out", "award-winning", "a recent study", "come to be", "came to be", "up to", "vast majority", "good", "better", "upright", "honorable", "moral", "righteous", "hopefully", "great", "greatest", "grateful", "fantastic", "true", "beautiful", "very", "tough", "highly", "by the way", "bad", "worst", "nasty", "immoral", "evil", "wrong", "corrupt", "wicked", "iniquitous", "unlawful", "naughty", "hateful", "odious", "repugnant", "repellent", "disgusting", "sinful", "harmful", "horrible", "special", "let me tell", "i'll tell you", "believe me", "that's right", "nah", "media", "elite"];