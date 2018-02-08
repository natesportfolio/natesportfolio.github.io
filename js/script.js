var activeLink;

$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 50
                }, 1000);

                if (activeLink != null) {
                    $(activeLink).css("animation-name", "link-fadeOut");
                    $(activeLink).css("animation-fill-mode", "none");
                }

                activeLink = this;

                $(this).css("animation-name", "link-fadeIn");
                $(this).css("animation-duration", "1000ms");
                $(this).css("animation-timing-function", "linear");
                $(this).css("animation-fill-mode", "forwards");

                return false;
            }
        }
    });
});

var currentDisplayed;

$('.showcase-collapse').on('click', function(e) {
    e.preventDefault();
    if ($("#" + this.id + "-dropdown").css("display") === "none") {
        if (currentDisplayed != null) {
            $("#" + currentDisplayed.id + "-showcase-arrow").css("animation-name", "rotateBack");
            $("#" + currentDisplayed.id + "-dropdown").slideToggle("0.5s");
        }

        $("#" + this.id + "-showcase-arrow").css("animation-name", "rotate");
        $("#" + this.id + "-showcase-arrow").css("animation-duration", "0.45s");
        $("#" + this.id + "-showcase-arrow").css("animation-timing-function", "linear");
        $("#" + this.id + "-showcase-arrow").css("animation-fill-mode", "forwards");
        $("#" + this.id + "-dropdown").slideToggle("0.5s");

        currentDisplayed = this;
    } else {
        $("#" + this.id + "-dropdown").slideToggle("0.5s");
        $("#" + this.id + "-showcase-arrow").removeClass("fa-rotate-90");
        $("#" + this.id + "-showcase-arrow").css("animation-name", "rotateBack");

        currentDisplayed = null;
    }
});

$('.overlay-show').on('click', function(e) {
    e.preventDefault();
    $('body').css("position", "relative");
    $('body').css("overflow", "hidden");
    $('.overlay').css("display", "block");
    $('.fixed-nav-bar').css("display", "none");

    $('.document-content').load("documents/" + $(this).attr("id") + ".html");
});

$('#overlay-close').on('click', function(e) {
    $('body').css("overflow", "visible");
    $('.overlay').css("display", "none");
    $('.fixed-nav-bar').css("display", "block");
});

var EventListener = function(element, callback) {
    this._el = element;
    this._cb = callback;
    this._at = false;
    this._hasBeenVisible = false;
    this._hasBeenInvisible = true;
    var _me = this;

    window.onscroll = function() {
        for (q in EventListener.queue.onvisible) {
            EventListener.queue.onvisible[q].call();
        }
        for (q in EventListener.queue.oninvisible) {
            EventListener.queue.oninvisible[q].call();
        }
    };

    return {
        onvisible: function() {
            EventListener.queue.onvisible.push(function() {
                if (!_me._at && _me._hasBeenInvisible && (window.pageYOffset + window.innerHeight) > _me._el.offsetTop && window.pageYOffset < (_me._el.offsetTop + _me._el.scrollHeight)) {
                    _me._cb.call();
                    _me._at = true;
                    _me._hasBeenVisible = true;
                }
            });
            EventListener.queue.oninvisible.push(function() {
                if (_me._hasBeenVisible && ((window.pageYOffset + window.innerHeight) < _me._el.offsetTop || window.pageYOffset > (_me._el.offsetTop + _me._el.scrollHeight))) {
                    _me._hasBeenInvisible = true;
                    _me._hasBeenVisible = false;
                    _me._at = false;
                }
            });
        },
        oninvisible: function() {
            EventListener.queue.oninvisible.push(function() {
                if (!_me._at && _me._hasBeenVisible && ((window.pageYOffset + window.innerHeight) < _me._el.offsetTop || window.pageYOffset > (_me._el.offsetTop + _me._el.scrollHeight))) {
                    _me._cb.call();
                    _me._at = true;
                    _me._hasBeenInvisible = true;
                }
            });
            EventListener.queue.onvisible.push(function() {
                if (_me._hasBeenInvisible && (window.pageYOffset + window.innerHeight) > _me._el.offsetTop && window.pageYOffset < (_me._el.offsetTop + _me._el.scrollHeight)) {
                    _me._hasBeenVisible = true;
                    _me._hasBeenInvisible = false;
                    _me._at = false;
                }
            });
        }
    };
}
EventListener.queue = {
    onvisible: [],
    oninvisible: []
};

function addListener(element, event, fn) {
    if (typeof element == 'string')
        element = document.getElementById(element);

    var listener = new EventListener(element, fn);

    if (listener['on' + event.toLowerCase()])
        return listener['on' + event.toLowerCase()].call();
}

window.onload = function() {
    if ($(document).width() > 450) {
        addListener('activities-showcase', 'visible', function() {
            $("#activities-showcase").css("animation-name", "element-fadeIn");
            $("#activities-showcase").css("animation-duration", "1s");
            $("#activities-showcase").css("animation-timing-function", "linear");
            $("#activities-showcase").css("animation-fill-mode", "forwards");
        });
    }
    if ($(document).width() > 670) {
        addListener('camp-showcase', 'visible', function() {
            $("#camp-showcase").css("animation-name", "element-fadeIn");
            $("#camp-showcase").css("animation-duration", "1s");
            $("#camp-showcase").css("animation-timing-function", "linear");
            $("#camp-showcase").css("animation-fill-mode", "forwards");
        });
    }
}