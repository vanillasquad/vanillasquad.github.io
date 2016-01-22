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
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

//finds endpoint by looking at parents' y value?
function elmYPosition(eID) {
  var elem = document.getElementById(eID);
  var y = elem.offsetTop;
  var node = elem;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  } return y;
}

function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID) - document.querySelector('nav').offsetHeight;
    if(stopY){
      stopY -= 20;
    }
    //finds distance
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    //if close page will just 'jump'
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    //calculate speed of scroll, maximum speed of 20
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    //??????
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) { //if scrolling down
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    //if scrolling up
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
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
