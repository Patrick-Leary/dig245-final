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
        var songs = ['Better Than Revenge', 'Red', 'All Too Well', 'We Are Never Getting Back Together',
                     'Love Story', 'Lover', 'Delicate'];
    
        var song1NameElement = document.getElementById("song1Name");
        var song2NameElement = document.getElementById("song2Name");
    
        var song1 = document.querySelector(".song1");
        var song2 = document.querySelector(".song2");
    
        function getRandomSong() {
            return songs[Math.floor(Math.random() * songs.length)];
        }
    
        function updateSongNames() {
            var newSong1 = getRandomSong();
            var newSong2 = getRandomSong();
    
            // Prevent duplicates
            while (newSong2 === newSong1) {
                newSong2 = getRandomSong();
            }
    
            song1NameElement.textContent = newSong1;
            song2NameElement.textContent = newSong2;
        }
    

        updateSongNames();
        song1.onclick = function () {
            console.log("clicked song 1:", song1NameElement.textContent);
            updateSongNames();
        };
    
        song2.onclick = function () {
            console.log("clicked song 2:", song2NameElement.textContent);
            updateSongNames();
        };
    });    
}

var albums = {
    'Taylor Swift': 0,
    'Fearless': 0,
    'Speak Now': 0,
    'Red': 0,
    '1989': 0,
    'Reputation': 0,
    'Lover': 0,
    'Folklore': 0,
    'Evermore': 0,
    'Midnights': 0
};

if (page === "RateAlbum.html") {
    document.addEventListener("DOMContentLoaded", function () {

        var album1NameElement = document.getElementById("album1Name");
        var album2NameElement = document.getElementById("album2Name");

        var album1 = document.querySelector(".album1");
        var album2 = document.querySelector(".album2");

        function getRandomAlbum() {
            var albumKeys = Object.keys(albums);
            return albumKeys[Math.floor(Math.random() * albumKeys.length)];
        }

        function updateAlbumNames() {
            var newAlbum1 = getRandomAlbum();
            var newAlbum2 = getRandomAlbum();

            // Ensure that newAlbum2 is different from newAlbum1
            while (newAlbum2 === newAlbum1) {
                newAlbum2 = getRandomAlbum();
            }

            album1NameElement.textContent = newAlbum1;
            album2NameElement.textContent = newAlbum2;
            console.log(albums);
        }

        // Initial setup
        updateAlbumNames();

        album1.onclick = function () {
            albums[album1NameElement.textContent] += 1;
            updateAlbumNames(); // Change albums after user clicks
        };

        album2.onclick = function () {
            albums[album2NameElement.textContent] += 1;
            updateAlbumNames(); // Change albums after user clicks
        };
    });
}

