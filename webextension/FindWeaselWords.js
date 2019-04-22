class FindWeaselWords {

    constructor() {
        // The words we will be looking for
        this.foundWords = [];
        this.pageContent = "";
        // this.pageContent = document.body.innerHTML;

    }

    init() {
        this.createButton();
    }

    findWeaselWords() {
        this.addStyleTag();
        this.analyze();
        this.separateLetters();
        this.animateLetters();
        this.doStats();
    }

    addStyle(element, properties) {
        Object.assign(element.style, properties);
    }

    addStyleTag() {
        const properties = `
        #weasel-stats {
            position: fixed;
            right: 30px;
            width: 450px;
            min-width: 400px;
            max-width: 600px;
            z-index: 9999999;
            top: 170px;
            color: #333;
            background-color: white;
            padding: 0 30px 20px 30px;
            font-size: 1.2em;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 5px;
            border-left: 10px solid #2196F3;
            animation: fadeIn 0.5s;
        }
        
        @keyframes fadeIn {
            0% {opacity: 0}
            100% {opacity: 1}
        }
        .weasel-page-title {
            font-style: italic;
            width: 50%;
            min-width: 200px;
            margin-right: 30px;
        }
        #weasel-stats-intro {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 20px;
        }
        .weasel-ratio {
            display: flex;
            flex-direction: column;
            background-color: #ececec;
            border-radius: 100%;
            justify-content: center;
            align-items: center;
            height: 200px;
            width: 200px;
            color: #3e3e3e;
            box-shadow: 2px 10px 0 #0003;
        }
        .weasel-ratio .weasel-emoji {
            font-size: 1.5em;
            margin-bottom: 10px;
        }
        .weasel-ratio .weasel-label {
            text-align: center;
            padding: 2px 10px;
        }
        .weasel-label {
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .weasel-top-list {
            display: flex;
            flex-wrap: wrap;
            padding: 0;
        }
        .weasel-top-list li {
            display: flex;
            flex-direction: column;
            margin: 10px;
            background-color: #2196F3;
            padding: 10px;
            border-radius: 100%;
            align-items: center;
            height: 100px;
            width: 100px;
            box-shadow: 1px 5px 0px #0003;
            justify-content: center;
            color: white;
        }
        .weasel-top-list .weasel-emoji {
            font-size: 1.4em;
        }
        .single-top-word {
            font-weight: bold;
            font-size: 1.1em;
        }`;

        const myStyleTag = document.createElement(`style`);
        myStyleTag.appendChild(document.createTextNode(properties));
        document.head.appendChild(myStyleTag);
    }

    createButton() {
        // Create the main UI button and add it to the DOM
        const myButton = document.createElement('div');

        // Add some style 8D
        this.addStyle(myButton, {
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

        document.body.innerHTML = this.pageContent;
    }

    addTag(index, length) {

        const textLength = this.pageContent.length;

        // Add a span class="single-weasel-word" around each weasel word
        const word = this.pageContent.slice(index, index + length);
        const textBefore = this.pageContent.slice(0, index);
        const textAfter = this.pageContent.slice(index + length, textLength);

        return `${textBefore}<span class="single-weasel-word">${word}</span>${textAfter}`;
    }

    getAllWords() {

        let wordList = [];
        const allWords = document.querySelectorAll('.single-weasel-word');

        for (const word of allWords) {
            // As "most" and "Most" are two different strings, we combine toUpperCase and toLowerCase to brings them together
            const formattedWord = word.innerHTML.toUpperCase().toLowerCase();
            wordList.push(formattedWord);
        }

        return wordList;
    }

    separateLetters() {
        // surround each letter with a <span> so that we can animate each letter individually
        const allWords = document.querySelectorAll('.single-weasel-word');

        for (const wordTag of allWords) {
            const word = wordTag.textContent;
            let newWord = '';
            for (const letter in word) {
                newWord += `<span class='char'>${word.substr(letter, 1)}</span>` ;
            }
            wordTag.innerHTML = newWord;
        }
    }

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
        console.log("do stats");
        const afficheRatio = document.createElement(`div`);
        afficheRatio.setAttribute(`id`, `weasel-stats`);
        const totalWeaselWords = this.getAllWords().length;
        // console.log(this.getAllWords());
        const initRatio = (totalWeaselWords*100/ (document.body.textContent.length));
        const ratio = Math.round(initRatio*1000)/1000;

        afficheRatio.innerHTML = `
            <h3>Clues</h3>
         
            <div id="weasel-stats-intro">
                <p class="weasel-page-title">${document.title}</p>
                <span class="weasel-ratio">
                    <span class="weasel-emoji">📈</span>
                    <span class="weasel-label">Weasel word ratio</span>
                    <span>${ratio}</span>
                </span>
            </div>
            
            <span class="weasel-top"> 
                <span class="weasel-label">Top used</span>
                <ol class="weasel-top-list">
                    <li>
                        <span class="weasel-emoji">👑</span>
                        <span class="single-top-word">${this.foundWords[0].word}</span>
                        <span class="single-top-word-occurence">${this.foundWords[0].occurence}</span>
                    </li>
                    <li>
                        <span class="single-top-word">${this.foundWords[1].word}</span>
                        <span class="single-top-word-occurence">${this.foundWords[1].occurence}</span>
                    </li>
                    <li>
                        <span class="single-top-word">${this.foundWords[2].word}</span>
                        <span class="single-top-word-occurence">${this.foundWords[2].occurence}</span>
                    </li>
                    <li>
                        <span class="single-top-word">${this.foundWords[3].word}</span>
                        <span class="single-top-word-occurence">${this.foundWords[3].occurence}</span>
                    </li>
                    <li>
                        <span class="single-top-word">${this.foundWords[4].word}</span>
                        <span class="single-top-word-occurence">${this.foundWords[4].occurence}</span>
                    </li>
                </ol>
            </span>
            `;

        document.body.appendChild(afficheRatio);

        console.log(`--- Weasel words found ---`);
        console.table(this.foundWords);

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

const weaselWordList = ["most", "mostly", "of course", "largely", "some", "a lot of", "probably", "countless", "the most common", "or more", "or less", "linked to", "has links to", "scholars", "almost", "certainly", "really", "experts", "so many", "many", "often", "it is said", "it is known", "it's said", "it's known", "people say", "it has been", "it's been", "critics", "it stands to reason", "questions have been raised", "experience shows", "may have", "officially", "it turns out", "award-winning", "a recent study", "come to be", "came to be", "up to", "vast majority", "good", "better", "upright", "honorable", "moral", "righteous", "hopefully", "great", "greatest", "grateful", "fantastic", "true", "beautiful", "every", "very", "tough", "highly", "by the way", "bad", "worst", "nasty", "immoral", "evil", "wrong", "corrupt", "wicked", "iniquitous", "unlawful", "naughty", "hateful", "odious", "repugnant", "repellent", "disgusting", "sinful", "harmful", "horrible", "special", "let me tell", "i'll tell you", "believe me", "that's right", "nah", "media", "elite"];