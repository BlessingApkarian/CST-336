var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "http://code.jquery.com/jquery-2.2.1.min.js";

// // declare a variable:
var randomNumber = Math.floor(Math.random() * 99) + 1;
// //consol will help debugging
// document.getElementById("numberToGuess").innerHTML = randomNumber;

//JQUERY code
//var guesses = $("guesses");
//var lastResult = $("#lastResult");
var lowOrHi = $("#lowOrHi");
var gamesWonLabel = $("#gamesWon");
var gamesLostLabel = $("#gamesLost");

//JAVASCRIPT code
var guesses = document.querySelector('#guesses');
var lastResult = document.querySelector('#lastResult');
//var lowOrHi = document.querySelector('#lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

var gamesWon = 0;
var gamesLost = 0;

var guessCount = 1;
guessField.focus();

var resetButton = document.querySelector('#reset');
resetButton.style.display = 'none';

function checkGuess() {
    var userGuess = Number(guessField.value);
    
    if(userGuess > 99){
        alert("Your guess is invalid, retry.");
        return;
    } else if (userGuess < 1) {
        alert("Your guess is invalid, try again.");
        return;
    } else if(isNaN(userGuess)){
        alert("Your guess is not a number.");
        return;
    }
    
    if(guessCount === 1) {
        guesses.innerHTML = 'Previous guesses: ';
    }
    guesses.innerHTML += userGuess + " ";
    
    if(userGuess === randomNumber){
        lastResult.innerHTML = "Congratulations! You got it right!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.html(" "); //jquery
        gamesWon+=1;
        gamesWonLabel.html("Games Won:" + gamesWon);
        gamesWonLabel.css('backgroundColor', 'green');
        setGameOver();
    } else if (guessCount === 7) {
        lastResult.innerHTML = "Sorry, you lost!";
        setGameOver();
        gamesLost+=1;
        gamesLostLabel.html("Games Lost:" + gamesLost);
        gamesLostLabel.css('backgroundColor', 'red');
    } else {
        lastResult.innerHTML = "Wrong!";
        lastResult.style.backgroundColor = "red";
        if(userGuess < randomNumber) {
            lowOrHi.html('Last guess was too low!');//jquery
        } else if (userGuess > randomNumber) {
            lowOrHi.html('Last guess was too high!');//jquery
        }
    }
    
    guessCount++;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
   guessField.disabled = true;
   guessSubmit.disabled = true;
   resetButton.style.display = 'inline';
   resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;
    
    var resetParas = document.querySelectorAll(".resetParas p");
    for(var i = 0; i < resetParas.length; i++){
        resetParas[i].textContent = "";
    }
    
    resetButton.style.display = "none";
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();
    
    lastResult.style.backgroundColor = "white";
    guesses.textContent = "Previous Guesses: ";
    lowOrHi.html(" ");
    lastResult.textContent = " ";
    
    randomNumber = Math.floor(Math.random() * 99) + 1;
}
