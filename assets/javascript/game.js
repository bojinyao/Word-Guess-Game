/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const WORDS = ["airplane", "ears", "piano"];

var Game = {

    wordBank : shuffle(WORDS),
    alreadyGuessed : [],
    wins : 0,
    losses : 0,
    guessesRemaining : 12,
    soFar : [],
    
    answer : "",
    gameOver : false,

    /**
     * Give a new word after each game.
     * @returns {String} a word if wordBank 
     * isn't empty, else, an empty string.
     */
    getWord : function() {
        if (this.wordBank.length > 0) {
            return this.wordBank.pop();
        }
        return "";
    },

    /**
     * @param {String} answer put answer as param
     * to get correct number of '_' in soFar.
     */
    initialize : function(answer) {
        this.alreadyGuessed = [];
        this.soFar = [];
        for (let i = 0; i < answer.length; i++) {
            this.soFar.push("_");
        }
    },  


    /**
     * Put contents of soFar into a String, 
     * each element separated by space.
     * @returns {String} elements of soFar separated by space
     */
    presentSoFar : function() {
        let result = "";
        for (let i = 0; i < this.soFar.length - 1; i++) {
            result += `${this.soFar[i]} `;
        }
        result += this.soFar[this.soFar.length - 1];
        return result;
    },

    /**
     * @returns {String} elements of alreadyGuessed separated by commas
     */
    presentAlreadyGuessed : function() {
        let result = "";
        for (let i = 0; i < this.alreadyGuessed.length - 1; i++) {
            result += `${this.alreadyGuessed[i]}, `;
        }
        result += this.alreadyGuessed[this.alreadyGuessed.length - 1];
        return result;
    },

    /**
     * Goes through "answer" and check if a character
     * is the same as c, if true, elem at the same index
     * in soFar array gets changed to c.
     * @param {String} c a character to be replaced
     */
    updateSoFar : function(c) {
        for (let i = 0; i < this.soFar.length; i++) {
            if (this.answer.charAt(i) == c) {
                this.soFar[i] = c;
            }
        }
    },


    /**
     * @param {String} userKey perform check on a userKey,
     * and update corresponding attributes. 
     */
    checkGuess : function(userKey) {
        if (this.alreadyGuessed.indexOf(userKey) >= 0) {
            return;
        }
        if (this.answer.indexOf(userKey) >= 0) {
            this.updateSoFar(userKey);
        } else {
            this.guessesRemaining--;
        }
        this.alreadyGuessed.push(userKey);
    },

    /**
     * @returns {boolean} true if current word is completely 
     * guessed, false otherwise.
     */
    gotWord : function() {
        return this.soFar.indexOf("_") == -1;
    },
}

var winText = document.getElementById("win-text");
var soFarText = document.getElementById("soFar-text");
var guessRemaining = document.getElementById("guess-remaining-text");
var lettersGuessed = document.getElementById("letters-guessed-text");
var validify = /^[a-zA-Z]$/;

Game.answer = Game.getWord();
Game.initialize(Game.answer);

soFarText.textContent = Game.presentSoFar();
// lettersGuessed.textContent = Game.presentAlreadyGuessed();

document.onkeyup = function(event) {
    if (Game.gameOver) {
        return;
    }
    var userKey = event.key;
    if (!validify.test(userKey)) {
        return;
    }
    userKey = userKey.toLowerCase();
    Game.checkGuess(userKey);
    soFarText.textContent = Game.presentSoFar();
    lettersGuessed.textContent = Game.presentAlreadyGuessed();
    guessRemaining.textContent = Game.guessesRemaining;

    if (Game.gotWord()) {
        Game.wins += 1;
        winText.textContent = Game.wins;
        Game.answer = Game.getWord();
        if (Game.answer.length == 0) {
            Game.gameOver = true;
        } else {
            Game.initialize(Game.answer);
            soFarText.textContent = Game.presentSoFar();
        }
    } else if (Game.guessesRemaining < 1){
        Game.gameOver = true;
    }
}