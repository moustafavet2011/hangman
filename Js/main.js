//Generate the letters
const letters = "abcdefghijklmnopqrstuvwxyz-";

//get an array from the letters be ES6

let lettersArray = Array.from(letters);

//select letters container

let lettersContainer = document.querySelector(".letters");

//generate the letters from the Array => loop on the letters in the Array

lettersArray.forEach(letter =>{
    //create span for the letter
    let span = document.createElement("span");

    //create text node for the letter
    let theLetter = document.createTextNode(letter);

    //append the text node in the span
    span.appendChild(theLetter);

    //add class to the span
    span.className = "letter-box";

    //append the whole span to the letter's container
    lettersContainer.appendChild(span);

});

//Create an object for the words + categories

const words ={
    Animaux:["Baleine","Aigle","Carpe","Chauve-souris","Dauphin", "Ecureuil", "Castor", "Chimpanze", "Cigale", "Corbeau", "Gazelle", "Girafe", "Grenouille", "Hamster", "Hibou", "Hyene", "Jaguar", "Koala", "Lama", "Leopard", "Loutre", "Moineau", "Panda", "Perroquet", "Perruche", "Rhinoceros", "Serpent", "Souris", "Zèbre" ],
    pays:["France","Espagne","Allemagne","Egypte","Tunisie","Bresil","Perou","Algerie", "Angola", "Arabie saoudit", "Argentina", "Australie", "Autriche", "Bahrein", "Belgique", "Benin", "Bolivie", "Botswana", "Cameroun", "Canada", "Chili", "chine", "Congo", "Croatie", "Danemark", "Djibouti", "Dominique", "Emirats arabes unis", "Etats-Unis de Amrique", "Finlande", "Gabon", "Grece","Haiti","Hongrie","Inde","Iraq","Irlande","Italie","Japon","Malte","Maroc","Turquie","Ukraine","Russie","Royaume-Uni"],
    celebrites:["Aristote","Archimede","Leonard de Vinci","Galilee","Newton","Faraday","Marie Curie","Louis Pasteur","Alan Turing","Tesla","Einstein","Mohamed","Isaac Newton","Jesus Christ","Bouddha","Confucius","Christophe Colomb","Moise","Charles Darwin","Auguste Cesar","Martin Luther","Karl Marx","William Shakespeare","Alexandre le Grand","Napoleon Bonaparte","Ludwig van Beethoven","Max Planck","Gregor Mendel"],
    plants:["Arachide","Bambou","Aneth","Basilic","Cerfeuil","Curcuma","Gingembre","Persil","pomme de terre","Citrus","cocotier","kiwi","Jasmin","Melissa","Menthe","piment","Tournesol","Radis","oignon","Ali"]
}

//get a random property

let allKeys = Object.keys(words);
// random number depend on the keys
let randomPropertyNumber = Math.floor(Math.random() * allKeys.length);
// the name of the category
let randomPropertyName = allKeys[randomPropertyNumber];
// the category words
let randomPropertyValue = words[randomPropertyName];


// apply the same logic for the value of each key in the Object
// random number depend on words
let randomValueNumber = Math.floor(Math.random()* randomPropertyValue.length);
// the final random word from the whole Object
let randomValueName = randomPropertyValue[randomValueNumber];

//set the category info section for
document.querySelector(".game-info .category span").innerHTML = randomPropertyName;

//select the letter gus element
let letterGuessContainer = document.querySelector(".letters-guess");

//convert chosen word to array of letters and spaces
let lettersAndSpaces = Array.from(randomValueName);

// create the spans for the letters
lettersAndSpaces.forEach(letter =>{
    //create an empty span
    let emptySpan = document.createElement("span");

    //if letter is a space we will add a class to it
    if(letter ===" "){
        //add a class to the span
        emptySpan.className = "has-space game-win";

    }
    //append the span to the letterGuessContainer
    letterGuessContainer.appendChild(emptySpan);

});
//select the guess spans
let theGuessSpans = document.querySelectorAll(".letters-guess span");

 //set the wrong attempts
let wrongAttempts = 0;
tries=0;

//select the draw elements
let theDrawElements = document.querySelector(".hangman-draw");


//Handle the clicking on the letters
document.addEventListener("click", (e)=>{

            //set the status
        let theStatus = false;

    //make sure that you click on a letter
    if(e.target.className==="letter-box"){
        e.target.classList.add("clicked");
        //get the clicked letters
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        //get an array for the guess spans
       // let finalSpans = Array.from(theGuessSpans).innerHTML;

        //get the chosen word
        let theChosenWord = Array.from(randomValueName.toLowerCase());
        // loop on the the chosen word
        theChosenWord.forEach((wordLetter, wordIndex) =>{
            // check if the chosen word contain the same clicked letter
            if(theClickedLetter == wordLetter){

                theStatus = true;
                //loop on all the guess theGuessSpans
                theGuessSpans.forEach((span, spanIndex) =>{
                    if(wordIndex==spanIndex){
                        span.innerHTML = wordLetter;
                        span.className ="game-win";
                    }
                })
            }
        });

        //outside the loop
        // if the chosen letter is wrong
        if(theStatus!==true){
            //increase the number of wrong attempts
            wrongAttempts++;
            //add the wrong class to the draw element
            theDrawElements.classList.add(`wrong-${wrongAttempts}`);
            //paly the sound of the wrong answer
            document.getElementById("wrong-answer").play();
            if(wrongAttempts === 8){
                //the end game function
                endGame();
                //add a class to the whole letters
                lettersContainer.classList.add("finished");
            }
        }else{
            let spanArray = Array.from(theGuessSpans);
            let gameFinale =spanArray.filter(span => span.classList.contains("game-win"));
            //paly the sound of the write answer
            document.getElementById("correct-answer").play();
            if(spanArray.length===gameFinale.length){
            gameWin();
            }
            tries++;
        /* console.log(tries);
            if(theChosenWord.length===){
                console.log("wordIndex");
            }
            */
        }
    }
});


//the end game function
function endGame(){

    //create a popup div into the package
    let div = document.createElement("div");

    //create the text that will be in the div
    let divText = document.createTextNode(`Vous Avez Perdu, La Repons est : ${randomValueName}`);

    //append the text into the div
    div.appendChild(divText);

    //add a class to the div popup
    div.className = "lost-popup";

    // append the whole div into the body
    document.body.appendChild(div);

    //play the fail sound
    document.getElementById("fail").play();
}
function gameWin(){
    //create a popup div into the package
    let div = document.createElement("div");

     //create the text that will be in the div
    let divText = document.createTextNode(`Bravo Vous Gagné  Après : ${wrongAttempts} Mauvais Essais Le Mot Est ${randomValueName} `);

     //append the text into the div
    div.appendChild(divText);

    //add a class to the div popup
    div.className = "win-popup";

    // append the whole div into the body
    document.body.appendChild(div);

    //play the winner sound
    document.getElementById("winner").play();
}
  //get the elements for the hint button
let hintBtn = document.querySelector(".hint");
hintBtn.onclick = function() {
    if(theGuessSpans[0].innerHTML===""){
        //Create the span for the hint
        let hintSpan= document.createElement("span");
        //give a class to the span
        hintSpan.className = "hint-span";
        //append the hint span into lettersContainer
        lettersContainer.appendChild(hintSpan);
        //get the value of the first letter of the word into the hint spanArray
        hintSpan.innerHTML=lettersAndSpaces[0];
    }

}