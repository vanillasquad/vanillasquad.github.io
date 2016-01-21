var buttons = document.getElementsByClassName('btn');

for (var ii=0, len=buttons.length; ii<len; ii++) {
    buttons[ii].addEventListener('click', function() {
        this.previousElementSibling.classList.toggle('expand');
        this.previousElementSibling.getElementsByClassName('overlay')[0].classList.toggle('transparent');
        this.innerHTML = (this.innerHTML === 'See More ...') ? 'Collapse Post' : 'See More ...';
    });
}
