var buttons = document.getElementsByClassName('btn');

for (var ii=0, len=buttons.length; ii<len; ii++) {
    buttons[ii].addEventListener('click', function() {
    this.previousElementSibling.classList.toggle('expand');
    this.previousElementSibling.getElementsByClassName('overlay')[0].classList.toggle('transparent');
    this.firstElementChild.innerHTML = (this.firstElementChild.innerHTML === 'See More ...') ? 'Collapse Post' : 'See More ...';
});
}



/*
following
http://web.archive.org/web/20140213105950/http://itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
Allows for smooth scrolling when clicking links to move down the page
*/

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (window.pageYOffset) return window.pageYOffset;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    // return document.getElementById(eID).getBoundingClientRect().top;
    return document.getElementById(eID).offsetTop;
}

function smoothScroll(eID) {
    var posStart = currentYPosition();
    var posTarget = elmYPosition(eID) - document.querySelector('nav').offsetHeight;
    if (posTarget) posTarget -= 20; // Custom padding

    var distance = Math.abs(posStart - posTarget);

    if (distance < 100) { // don't smooth scroll less than 100px
        scrollTo(0, posTarget);
        return;
    }

    // Constant timeStep for simplicity
    // posStep is the effective speed of the scroll
    var timeStep = 10;
    var posStep = Math.round(distance / 100);

    var isScrollingDown = posTarget > posStart;
    var posCurrent = posStart;
    var count = 0;
    if (isScrollingDown) {
        while (posCurrent < posTarget) {
            posCurrent = Math.min(posTarget, posCurrent + posStep);
            setTimeout(window.scrollTo, count++ * timeStep, 0, posCurrent);
        }
    } else {
        while (posCurrent > posTarget) {
            posCurrent = Math.max(posTarget, posCurrent - posStep);
            setTimeout(window.scrollTo, count++ * timeStep, 0, posCurrent);
        }
    }
}

function getSmoothScrollClickHandler(id) {
    return function () {
        smoothScroll(id);
    };
}

var home = document.querySelector('#logo a');
var navLinks = document.querySelectorAll('#menu ul li a');

home.addEventListener('click', getSmoothScrollClickHandler('splash'));

navLinks[0].addEventListener('click', getSmoothScrollClickHandler('blog-container'));
navLinks[1].addEventListener('click', getSmoothScrollClickHandler('profile-container'));

var katherine = document.querySelectorAll('.katherine-link');
for (var i=0; i<katherine.length; i++) {
    katherine[i].addEventListener('click', getSmoothScrollClickHandler('katherine'));
}

var jack = document.querySelectorAll('.jack-link');
for (var i=0; i<jack.length; i++) {
    jack[i].addEventListener('click', getSmoothScrollClickHandler('jack'));
}
