/* javascript */

var path = window.location.pathname;
var page = path.split("/").pop();
if (page === "index.html") {
    // Carousel controls
    $(document).ready(function () {
        var multipleCardCarousel = document.querySelector(
            "#carouselExampleControls"
        );
        if (window.matchMedia("(min-width: 768px)").matches) {
            var carousel = new bootstrap.Carousel(multipleCardCarousel, {
                interval: false,
            });
            var carouselWidth = $(".carousel-inner")[0].scrollWidth;
            var cardWidth = $(".carousel-item").width();
            var scrollPosition = 0;
            $("#carouselExampleControls .carousel-control-next").on(
                "click",
                function () {
                    if (scrollPosition < carouselWidth - cardWidth * 4) {
                        scrollPosition += cardWidth;
                        $("#carouselExampleControls .carousel-inner").animate(
                            { scrollLeft: scrollPosition },
                            600
                        );
                    }
                }
            );
            $("#carouselExampleControls .carousel-control-prev").on(
                "click",
                function () {
                    if (scrollPosition > 0) {
                        scrollPosition -= cardWidth;
                        $("#carouselExampleControls .carousel-inner").animate(
                            { scrollLeft: scrollPosition },
                            600
                        );
                    }
                }
            );
        } else {
            $(multipleCardCarousel).addClass("slide");
        }
    });

    // navbar hiding (currently not working) <-------
    // keep track of previous scroll position
    let prevScrollPos = window.pageYOffset;

    window.addEventListener("scroll", function () {
        // current scroll position
        const currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos) {
            // user has scrolled up
            document.querySelector(".navbar").classList.add("show");
        } else {
            // user has scrolled down
            document.querySelector(".navbar").classList.remove("show");
        }

        // update previous scroll position
        prevScrollPos = currentScrollPos;
    });
}

if (page === "RateSong.html") {
    document.addEventListener("DOMContentLoaded", function () {
        var song1 = document.querySelector(".song1");
        var song2 = document.querySelector(".song2");

        song1.onclick = function () {
            console.log("clicked song 1");
        };
        song2.onclick = function () {
            console.log("clicked song 2");
        };
    });
}

if (page === "RateAlbum.html") {
    document.addEventListener("DOMContentLoaded", function () {
        var song1 = document.querySelector(".album1");
        var song2 = document.querySelector(".album2");

        song1.onclick = function () {
            console.log("clicked album 1");
        };
        song2.onclick = function () {
            console.log("clicked album 2");
        };
    });
}
