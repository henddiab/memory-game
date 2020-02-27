var cards = document.getElementsByClassName('card');
var openCards = [];
var count = 0;
var matched = 0;
var result = document.getElementsByClassName('overlay')[0];
var attempts = document.getElementsByTagName('span')[0];

document.body.onload = play();

function replay() {
    window.location.reload();
    play();
    result.style.display = 'none';
}

function play() {
    for (var i = 0; i < cards.length; i++) {
        var random = Math.floor(Math.random() * cards.length);
        cards[i].style.order = random;
        cards[i].addEventListener('click', flipCard);
    }
}

function disableAll() {
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.add('disabled');
    }
}

function enableAll() {
    //enable all
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove('disabled');
    }
}

function match() {
    openCards[0].removeEventListener('click', flipCard);
    openCards[1].removeEventListener('click', flipCard);
    openCards = [];
}

function unmatch() {
    disableAll();
    setTimeout(function () {
        openCards[0].classList.remove('flipAnimation');
        openCards[1].classList.remove('flipAnimation');
        enableAll();
        openCards = [];
    }, 1000);
}

function flipCard() {
    this.classList.toggle('flipAnimation');
    openCards.push(this);
    var length1 = (openCards.length == 1);
    var length2 = (openCards.length == 2);

    if (length1) {
        openCards[0].classList.add('disabled');
    } else if (length2) {
        count++;
        if (openCards[0].dataset.type === openCards[1].dataset.type) {
            match();
            matched++;
        } else {
            unmatch();
        }
    }
    if (matched == 6) {
        setTimeout(function () {
            result.style.visibility = 'visible';
            attempts.innerText = count;
        }, 1000);
    }
}