//------Functions------//

function getRandomPhrase(arr){
    var arrLength = arr.length;
    var randomIndex = Math.floor(Math.random() * arrLength);
    return arr[randomIndex].toLowerCase();
}

function addHearts(missed, parent){
    console.log('marge');
    parent.innerHTML = '';
    for (let i = 0; i < (5 - missed); i++){
        var newBlueHeart = document.createElement('IMG');
        newBlueHeart.className = 'blue-heart';
        newBlueHeart.src = '/game_show_app_v1.2/images/liveHeart.png';
        parent.appendChild(newBlueHeart);
    }
    for (let i = 0; i<missed; i++){
        var newWhiteHeart = document.createElement('IMG');
        parent.appendChild(newWhiteHeart);
        newWhiteHeart.className = 'white-heart';
        newWhiteHeart.src = '/game_show_app_v1.2/images/lostHeart.png';
    }
    return
}

function revealLetter(match){
    var matchedLetter = match.textContent;
    for (let i = 0; i < phraseLi.length; i++){
        if (phraseLi[i].textContent === matchedLetter){
            phraseLi[i].style.color === 'black';
            phraseLi[i].className = 'show';
            phraseLi[i].textContent.toUpperCase();
        }
    }
    return;
}

function removeSpace(entry) { 
    return entry.trim() != '';
}

//------Selections & Variables------//
const startGameBtn = document.querySelector('.btn__reset');
const endGameBtn = document.querySelector('.btn__end');
const phrase = document.querySelector('#phrase');
const phraseUl = document.querySelector('.phrase-ul');
const phraseLi = document.getElementsByTagName('LI');
const keyboard = document.querySelector('#qwerty');
const randomPhrases = ["Par For the Course", "Close But No Cigar", "Needle In a Haystack", "Cup Of Joe", "Down To The Wire"];
var randomPhrase = getRandomPhrase(randomPhrases);
var phraseLetters = randomPhrase.split("");
const keys = document.getElementsByTagName('BUTTON');
const heart = document.querySelector('.tries');
const hearts = heart.parentNode;
var missed = 0;
const endScreen = document.querySelector('.end');



//------Event Listeners------//

//STARTS GAME and appends li of letters to ul. Spaces BG color set to white;

    startGameBtn.addEventListener('click', () => {
        startGameBtn.parentNode.style.display = 'none';
        for (let i=0; i<phraseLetters.length; i++){
            var letter = document.createElement('LI');
            letter.textContent = phraseLetters[i];
            letter.className = "letter";
            phraseUl.appendChild(letter);
            if (phraseLetters[i] === " ") {
                letter.style.backgroundColor = "white";
                letter.className = "space";
            }
        }
        const phraseLiLetters = document.querySelectorAll('.letter');
        const revealedLetters = document.querySelectorAll('.show');
        console.log(phraseLiLetters.length);
        console.log(revealedLetters.length);
    });


//LETTERS event listener. Selects text of clicked key.

    for (let i=0; i<keys.length; i++){
        keys[i].addEventListener('click', (e) => {
            var clickedKey = e.target;
            clickedKey.style.opacity = '.5';
            clickedKey.style.zIndex = '-100';
            if(phraseLetters.includes(clickedKey.textContent) === true){
                revealLetter(clickedKey);
            } else { // user clicked wrong answer
                missed += 1;
                addHearts(missed, hearts);
                if (missed === 5) {
                    clickedKey.style.display = 'none';
                    endScreen.style.display = 'flex';
                }
            }
            const phraseLiLetters = document.querySelectorAll('.letter');
            const revealedLetters = document.querySelectorAll('.show');
            console.log(phraseLiLetters.length);
            console.log(revealedLetters.length);
        });
    }

//END GAME Ends game and creates reset screen

endGameBtn.addEventListener('click', () => {
    window.location.reload();
});

//------Conditionals------//

