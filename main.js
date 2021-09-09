// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

$(document).ready(function(){
    var scroll_pos = 0;
    $(document).scroll(function() {
        scroll_pos = $(this).scrollTop();
        if(scroll_pos > 70) {

            // $('#name').css('background', 'linear-gradient(to right, #221d6a, #7f62e8, #5e98eb)');
            $('#name').css('background-image', 'linear-gradient(to right, #af680e, #d7a633, #deb915)');
            $('#name').css('-webkit-text-fill-color', 'transparent');
            $('#name').css('-webkit-background-clip', 'text');

            // $('.pen').css('filter', 'grayscale(100%)');

            $('#topBar').css('background-color', 'rgb(234, 234, 234, 0.97)');
            $('#navDemo').css('background-color', 'rgb(234, 234, 234, 0.97)');

        } else {
            $('#name').css('background-image', 'linear-gradient(to right, #212121, #212121)');
            $('#name').css('-webkit-text-fill-color', 'transparent');
            $('#name').css('-webkit-background-clip', 'text');

            // $('.pen').css('filter', 'grayscale(0%)');
            // $('.pen').css('transition', 'filter 1s');

            $('#topBar').css('background-color', 'rgb(234, 234, 234, 1)');
            $('#navDemo').css('background-color', 'rgb(234, 234, 234, 1)');
        }
    });
});



var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    // css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid black;}";
    document.body.appendChild(css);
};
