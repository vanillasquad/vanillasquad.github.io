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
    if(posTarget){
        posTarget -= 20;
    }
    //finds absolute distance
    var distance = Math.abs(posStart - posTarget);
    // if within 100px page will just 'jump'
    if (distance < 100) {
        scrollTo(0, posTarget);
        return;
    }
    //calculate speed of scroll, maximum speed of 20
    var delay = Math.max(20, Math.round(distance / 100));

    var step = Math.round(distance / 25);
    var isScrollingDown = posTarget > posStart;
    var posCurrent = posStart;
    var count = 0;
    if (isScrollingDown) {
        while (posCurrent < posTarget) {
            posCurrent = Math.min(posTarget, posCurrent + step);
            setTimeout(window.scrollTo, count++ * delay, 0, posCurrent);
        }
    } else {
        for (var i=posStart; i>posTarget; i-=step) {
            posCurrent = Math.max(posTarget, posCurrent - step);
            setTimeout(window.scrollTo, count++ * delay, 0, posCurrent);
        }
    }
}

var home = document.querySelector('#logo a');
var navLinks = document.querySelectorAll('#menu ul li a');

home.addEventListener('click', function() {
    smoothScroll('splash');
});

navLinks[0].addEventListener('click', function() {
    smoothScroll('blog-container');
});

navLinks[1].addEventListener('click', function() {
    smoothScroll('profile-container');
});


var katherine = document.querySelectorAll('.katherine-link');
for (var i=0; i<katherine.length; i++) {
    katherine[i].addEventListener('click', function() {
        smoothScroll('katherine');
    });
}

var jack = document.querySelectorAll('.jack-link');
for (var i=0; i<jack.length; i++) {
    jack[i].addEventListener('click', function() {
        smoothScroll('jack');
    });
}
