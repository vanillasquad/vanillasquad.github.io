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

//finds endpoint by looking at parents' y value?
// function elmYPosition(eID) {
//     var elem = document.getElementById(eID);
//     var y = elem.offsetTop;
//     // code below is unnecessary for 1 level of nesting
//     // useful for multiple levels of nesting
//     var node = elem;
//     while (node.offsetParent && node.offsetParent != document.body) {
//         console.log(node);
//         node = node.offsetParent;
//         y += node.offsetTop;
//     }
//     return y;
// }

function elmYPosition(eID) {
    // return document.getElementById(eID).getBoundingClientRect().top;
    return document.getElementById(eID).offsetTop;
}

function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID) - document.querySelector('nav').offsetHeight;
    if(stopY){
        stopY -= 20;
    }
    //finds absolute distance
    var distance = Math.abs(startY - stopY);
    // if within 100px page will just 'jump'
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    //calculate speed of scroll, maximum speed of 20
    var delay = Math.round(distance / 100);
    if (delay >= 20) delay = 20;

    var step = Math.round(distance / 25);
    var screenPos = stopY > startY ? startY + step : startY - step;
    var count = 0;
    if (stopY > startY) { //if scrolling down
        for (var i=startY; i<stopY; i+=step) {
            setTimeout("window.scrollTo(0, " + screenPos + ")", count * delay);
            console.log(count);
            screenPos += step;
            if (screenPos > stopY) screenPos = stopY;
            count++;
        }
    } else {
    //if scrolling up
        for (var i=startY; i>stopY; i-=step) {
            setTimeout("window.scrollTo(0, " + screenPos+")", count * delay);
            screenPos -= step;
            if (screenPos < stopY) screenPos = stopY;
            count++;
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
