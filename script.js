var count = 0;
var score = 0;
var cardID = 0;
var backup;
var spans;

function initialize() {
    spans = document.querySelectorAll("img");
    for (var i = 0; i < spans.length; i ++) {
        spans[i].addEventListener('click', function(i) {
            change(i);
        }.bind(this, i));
    }
}

function change(num) {
    score++;
    if (count == 0) {
        cardID = spans[num];
        backup = cardID.getAttribute("backup");
        const temp = cardID.getAttribute("src");
        cardID.setAttribute("src", backup);
        cardID.setAttribute("backup", temp);
        count ++;
    } else {
        if (cardID != document.getElementById(num + 1)) {
            count = 0;
            if (cardID.getAttribute("src") == spans[num].getAttribute("srcs")) {
                
            } else {

            }
        }    
    }
    console.log("Yes");
}

