var count = 0;
var score = 0;
var cardID;
var previousCardNum; 
var backup;
var spans;

function initialize() { // adds a "click" action to each image of the table
    spans = document.querySelectorAll("img");
    for (var i = 0; i < spans.length; i ++) {
        spans[i].addEventListener('click', function(i) {
            change(i);
        }.bind(this, i));
    }
    const button = document.querySelector("button");
    button.addEventListener('click', function() {
        reset();
    });
    randomize();
}

function change(num) {
    if (count == 0) { // checks to see if it is the first card clicked
        if (spans[num].getAttribute("flipped") === "false") { // checks to see if that card has already been flipped
            previousCardNum = num; // keeps track of this card number
            flip(num);
            score++; // keeps track of the number of card flips/attempts
            document.getElementById("score").innerHTML = "Score: " + score; // updates the score text 
            count ++; // keeps track of the current card flip
        }
    } else {
        if (spans[num].getAttribute("flipped") === "false") { // checks to see if that card has already been flipped
            if (cardID != spans[num]) { // checks to see if the previous card is equal to the new card clicked (can't click a card and click on it again after)
                count = 0; // resets the "first card clicked" variable
                flip(num);
                score++; // keeps track of number of card flips/attempts
                document.getElementById("score").innerHTML = "Score: " + score; // updates the score text
                if (cardID.getAttribute("src") != spans[previousCardNum].getAttribute("src")) { // checks to see if the two cards have the same image
                    // if they don't have the same image
                    setTimeout(flip, 1000, num); // flips the card back on a delay
                    setTimeout(flip, 1000, previousCardNum); // flips the card back on a delay
                } else {
                    cardID.setAttribute("flipped", "true"); // sets the "flipped" attribute to true (keeps track of flipped cards)
                    spans[previousCardNum].setAttribute("flipped", "true"); // sets the "flipped" attribute to true (keeps track of flipped cards)
                }
            } 
        }  
    }
}

function flip(num) {
    cardID = spans[num]; // sets a variable to the element itself
    backup = cardID.getAttribute("backup");  // sets a new variable to the "backup" attribute of the image element
    const temp = cardID.getAttribute("src"); // temp variable to store the "src" attribute
    cardID.setAttribute("src", backup); // sets the "src" attirbute to the "backup" attribute
    cardID.setAttribute("backup", temp); // sets the "backup" attribute back to the original "src" attribute
}

function reset() {
    for (var i = 0; i < spans.length; i ++) {
        if (spans[i].getAttribute("src") != "cardBack.PNG") {
            flip(i);
        }
        spans[i].setAttribute("flipped", "false");
    }
    count = 0;
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score;
    randomize();
}

function randomize() {
    imgs = ["bokkari.png", "jiniret.png", "Dwaekki.png", "Foxl.ny.png", "Han.png", "Leebit.png", "PuppyM.png", "WolfChan.png"]
    imgcount = [0, 0, 0, 0, 0, 0, 0, 0]
    for (var i = 0; i < spans.length; i ++) {
        num = Math.floor(Math.random() * 8);
        while (imgcount[num] > 1) {
            num = Math.floor(Math.random() * 8);
        }   
        spans[i].setAttribute("backup", imgs[num]);
        imgcount[num]++;
    }
}