/* javascript */

var path = window.location.pathname;
var page = path.split("/").pop();

// Fixing question mark issue
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
String.prototype.replaceCharacter = function () {
    if (this.includes('?')) {
        if (this.includes('Is It Over Now?') ||
        this.includes('Ready For It') ||
        this.includes('Question...')) {
            return this
        }
        else {
            var index = this.indexOf('?');
            return this.replaceAt(index, "'");
        }
    }
}




if (page === "index.html" || page === "") {
    // Carousel controls
    $(document).ready(function () {
        var multipleCardCarousel = document.querySelector("#carouselExampleControls");
        var carousel = new bootstrap.Carousel(multipleCardCarousel, {
            interval: false,
            wrap: true,
        });
        if (window.matchMedia("(min-width: 768px)").matches) {
            new bootstrap.Carousel(multipleCardCarousel, {
                interval: false,
                wrap: true,
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

    fetch('../assets/php/get_trending.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Accessing data failed');
                }
                return response.json();
            })
            .then(data => {
                var title1 = document.getElementById("song-title1");
                var title2 = document.getElementById("song-title2");
                var title3 = document.getElementById("song-title3");
                var title4 = document.getElementById("song-title4");
                var title5 = document.getElementById("song-title5");
                var album1 = document.getElementById("albumCover1");
                var album2 = document.getElementById("albumCover2");
                var album3 = document.getElementById("albumCover3");
                var album4 = document.getElementById("albumCover4");
                var album5 = document.getElementById("albumCover5");
                var trackNamesArray = Object.keys(data);
                var trackCoversArray = Object.values(data);

                var index = 0
                while (trackNamesArray[0].includes('?') && index < 5) {
                    trackNamesArray[0] = trackNamesArray[0].replaceCharacter();
                    index++;
                }
                index = 0;
                while (trackNamesArray[1].includes('?') && index < 5) {
                    trackNamesArray[1] = trackNamesArray[1].replaceCharacter();
                    index++;
                }
                index = 0;
                while (trackNamesArray[2].includes('?') && index < 5) {
                    trackNamesArray[2] = trackNamesArray[2].replaceCharacter();
                    index++;
                }
                index = 0;
                while (trackNamesArray[3].includes('?') && index < 5) {
                    trackNamesArray[3] = trackNamesArray[3].replaceCharacter();
                    index++;
                }
                index = 0;
                while (trackNamesArray[4].includes('?') && index < 5) {
                    trackNamesArray[4] = trackNamesArray[4].replaceCharacter();
                    index++;
                }
            
                title1.textContent = "1. " + trackNamesArray[0];
                title2.textContent = "2. " + trackNamesArray[1];
                title3.textContent = "3. " + trackNamesArray[2];
                title4.textContent = "4. " + trackNamesArray[3];
                title5.textContent = "5. " + trackNamesArray[4];
                album1.src = trackCoversArray[0];
                album2.src = trackCoversArray[1];
                album3.src = trackCoversArray[2];
                album4.src = trackCoversArray[3];
                album5.src = trackCoversArray[4];
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    
}


if (page === "FindMeASong.html") {
    document.addEventListener("DOMContentLoaded", function () {
        var submit = document.querySelector(".song-submit");
        var reset = document.querySelector(".song-reset");
        var title = document.getElementById("song-title");
        var album = document.getElementById("albumCover");
        reset.onclick = function () {
            document.getElementById("taylors-version").checked = false;
            document.getElementById("era").value = "any";
            document.getElementById("duration").value = "any";
            document.getElementById("tempo").value = "any";
            document.getElementById("energy").value = "any";
            document.getElementById("popularity").value = "any";
            title.textContent = "Song Title";
            album.src = "../assets/img/DefaultImg.jpg";
        }
        submit.onclick = function () {
            var taylorsversion = document.getElementById("taylors-version").checked;
            var era = document.getElementById("era").value;
            var duration = document.getElementById("duration").value;
            var tempo = document.getElementById("tempo").value;
            var energy = document.getElementById("energy").value;
            var popularity = document.getElementById("popularity").value;
            var testString = "SELECT track_name, cover_art FROM trackTable, albumTable WHERE trackTable.album_id = albumTable.album_id";
            //taylor's version check
            if (taylorsversion === true && era === "any"){
                testString += " AND (trackTable.album_id = '4hDok0OAJd57SGIT8xuWJH' OR trackTable.album_id = '5AEDGbliTTfjOB8TSm1sxt' OR trackTable.album_id = '6kZ42qRrzov54LcAk4onW9' OR trackTable.album_id = '1o59UpKw81iHR0HPiSkJR0' OR trackTable.album_id = '1fnJ7k0bllNfL1kVdNVW1A' OR trackTable.album_id = '1pzvBxYgT6OVwJLtHkrdQK' OR trackTable.album_id = '6AORtDjduMM3bupSWzbTSG')";
            }
            // era
            if (era === "any") {
                // don't add any more restrictions
            } else if (era === "debut") {
                testString += " AND (trackTable.album_id = '7mzrIsaAjnXihW3InKjlC3')";
            } else if (era === "fearless") {
                // taylorsversion
                if (taylorsversion === true) {
                    testString += " AND (trackTable.album_id = '4hDok0OAJd57SGIT8xuWJH')";
                // TAYLOR'S VERSION FEARLESS
                } else {
                    testString += " AND (trackTable.album_id = '43OpbkiiIxJO8ktIB777Nn' OR trackTable.album_id = '4hDok0OAJd57SGIT8xuWJH')";
                // REGULAR FEARLESS
                }
            } else if (era === "speak-now") {
                // taylorsversion
                if (taylorsversion === true) {
                    testString += " AND (trackTable.album_id = '5AEDGbliTTfjOB8TSm1sxt')";
                // TAYLOR'S VERSION SPEAK NOW
                } else {
                    testString += " AND (trackTable.album_id = '5EpMjweRD573ASl7uNiHym' OR trackTable.album_id = '5AEDGbliTTfjOB8TSm1sxt')";
                // REGULAR SPEAK NOW
                }
            } else if (era === "red") {
                // taylorsversion
                if (taylorsversion === true) {
                    testString += " AND (trackTable.album_id = '6kZ42qRrzov54LcAk4onW9')";
                // TAYLOR'S VERSION RED
                } else {
                    testString += " AND (trackTable.album_id = '1KlU96Hw9nlvqpBPlSqcTV' OR trackTable.album_id = '6kZ42qRrzov54LcAk4onW9')";
                // REGULAR RED
                }
            } else if (era === "1989") {
                // taylorsvrsion
                if (taylorsversion === true) {
                    testString += " AND (trackTable.album_id = '1o59UpKw81iHR0HPiSkJR0')";
                // TAYLOR'S VERSION 1989
                } else {
                    testString += " AND (trackTable.album_id = '34OkZVpuzBa9y40DCy0LPR' OR trackTable.album_id = '1o59UpKw81iHR0HPiSkJR0')";
                // REGULAR 1989
                }
            } else if (era === "reputation" ){
                testString += " AND (trackTable.album_id = '6DEjYFkNZh67HP7R9PSZvv')";
            } else if (era === "lover"){
                testString += " AND (trackTable.album_id = '1NAmidJlEaVgA3MpcPFYGq')";
            } else if (era === "folklore"){
                testString += " AND (trackTable.album_id = '1pzvBxYgT6OVwJLtHkrdQK')";
            } else if (era === "evermore") {
                testString += " AND (trackTable.album_id = '6AORtDjduMM3bupSWzbTSG')";
            } else {
                // MIDNIGHTS
                testString += " AND (trackTable.album_id = '1fnJ7k0bllNfL1kVdNVW1A')";
            }
            // duration
            if (duration === "any") {
                // don't add any more restrictions
            } else if (duration === "short"){
                testString += " AND (trackTable.duration < 210000)";
            } else if (duration === "medium" ){
                testString += " AND (trackTable.duration BETWEEN 210000 AND 270000)";
            } else {
                testString += " AND (trackTable.duration > 270000)";
                // long
            }
            // tempo
            if (tempo === "any") {
                // don't add any more restrictions
            } else if (tempo === "low" ){
                testString += " AND (trackTable.tempo < 115)";
            } else if (tempo === "regular"){
                testString += " AND (trackTable.tempo BETWEEN 115 AND 140)";
            } else {
                testString += " AND (trackTable.tempo > 140)";
                // fast
            }
            // energy
            if (energy === "any") {
                // don't add any more restrictions
            } else if (energy === "mellow"){
                testString += " AND (trackTable.energy < .50)";
            } else if (energy === "moderate" ){
                testString += " AND (trackTable.energy BETWEEN .50 AND .70)";
            } else {
                testString += " AND (trackTable.energy > .70)";
                // upbeat
            }
            // popularity
            if (popularity === "any") {
                // don't add any more restrictions
            } else if (popularity === "underground"){
                testString += " AND (trackTable.popularity < 60)";
            } else if (popularity === "recognizable" ){
                testString += " AND (trackTable.popularity BETWEEN 60 AND 80)";
            } else {
                testString += " AND (trackTable.popularity > 80)";
                // hot 100
            }
            var url = '../assets/php/find_song.php?q=';
            url = url + testString;
            console.log(url);
            
            fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Accessing data failed');
                }
                return response.json();
            })
            .then(data => {
                var trackNamesArray = Object.keys(data);
                var trackCoversArray = Object.values(data);
    
                function getRandomTrack() {
                    var randomIndex = Math.floor(Math.random() * trackNamesArray.length);
                    var randomTrackName = trackNamesArray[randomIndex];
                    var randomTrackCover = trackCoversArray[randomIndex];
                
                    return {
                        name: randomTrackName,
                        cover: randomTrackCover
                    };
                }
    
                if (trackNamesArray.length === 0) {
                    title.textContent = "No Song Found";
                    album.src = "../assets/img/NoSongPhoto.webp";
                }
                else {
                    var newTrack = getRandomTrack();
                    var newTrackName = newTrack.name;
                    var newTrackCover = newTrack.cover;
                    var index = 0
                    while (newTrackName.includes('?') && index < 5) {
                        newTrackName = newTrackName.replaceCharacter();
                        index++;
                    }
    
                    title.textContent = newTrackName;
                    album.src = newTrackCover;
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    });
}



if (page === "RateSong.html") {
    document.addEventListener("DOMContentLoaded", function () {
        var track1NameElement = document.getElementById("track1Name");
        var track2NameElement = document.getElementById("track2Name");
        var track1CoverElement = document.getElementById("album1Cover");
        var track2CoverElement = document.getElementById("album2Cover");
    
        var track1 = document.querySelector(".track1");
        var track2 = document.querySelector(".track2");
        var title1 = document.querySelector(".track-title-1");
        var title2 = document.querySelector(".track-title-2");
        var skipButtons = document.querySelectorAll(".song-skip");
    
        fetch('../assets/php/get_track_names.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Accessing track data failed');
                }
                return response.json();
            })
            .then(data => {
                var trackNamesArray = Object.keys(data);
                var trackCoversArray = Object.values(data);
    
                function getRandomTrack() {
                    var randomIndex = Math.floor(Math.random() * trackNamesArray.length);
                    var randomTrackName = trackNamesArray[randomIndex];
                    var randomTrackCover = trackCoversArray[randomIndex];
                
                    return {
                        name: randomTrackName,
                        cover: randomTrackCover
                    };
                }
                var newTrack1;
                var newTrack2;
    
                function updateTracks() {
                    newTrack1 = getRandomTrack();
                    newTrack2 = getRandomTrack();
                    while (newTrack2.name === newTrack1.name) {
                        newTrack2 = getRandomTrack();
                    }
                     
                    var index = 0
                    while (newTrack1.name.includes('?') && index < 5) {
                        newTrack1.name = newTrack1.name.replaceCharacter();
                        index++;
                    }
                    index = 0;
                    while (newTrack2.name.includes('?') && index < 5) {
                        newTrack2.name = newTrack2.name.replaceCharacter();
                        index++;
                    }
                    
                    var newTrackName1 = newTrack1.name;
                    var newTrackCover1 = newTrack1.cover;
                    var newTrackName2 = newTrack2.name;
                    var newTrackCover2 = newTrack2.cover;
    
                    track1NameElement.textContent = newTrackName1;
                    track2NameElement.textContent = newTrackName2;
                    track1CoverElement.src = newTrackCover1;
                    track2CoverElement.src = newTrackCover2;
                }
    
                updateTracks();
    
                track1.onclick = function () {
                    var url = '../assets/php/update_track_votes.php?q=' + encodeURI(newTrack1.name);
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        dataType: 'json',
                        data: {functionname: 'add', arguments: [1, 2]},
                    
                        success: function (obj, textstatus) {
                                      if( !('error' in obj) ) {
                                          yourVariable = obj.result;
                                      }
                                      else {
                                          console.log(obj.error);
                                      }
                                }
                    });
                    updateTracks();
                };
                title1.onclick = function () {
                    var url = '../assets/php/update_track_votes.php?q=' + encodeURI(newTrack1.name);
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        dataType: 'json',
                        data: {functionname: 'add', arguments: [1, 2]},
                    
                        success: function (obj, textstatus) {
                                      if( !('error' in obj) ) {
                                          yourVariable = obj.result;
                                      }
                                      else {
                                          console.log(obj.error);
                                      }
                                }
                    });
                    updateTracks();
                };
    
                track2.onclick = function () {
                    var url = '../assets/php/update_track_votes.php?q=' + encodeURI(newTrack2.name);
                    console.log(url);
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        dataType: 'json',
                        data: {functionname: 'add', arguments: [1, 2]},
                    
                        success: function (obj, textstatus) {
                                      if( !('error' in obj) ) {
                                          yourVariable = obj.result;
                                      }
                                      else {
                                          console.log(obj.error);
                                      }
                                }
                    });
                    updateTracks();
                };
                title2.onclick = function () {
                    var url = '../assets/php/update_track_votes.php?q=' + encodeURI(newTrack2.name);
                    console.log(url);
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        dataType: 'json',
                        data: {functionname: 'add', arguments: [1, 2]},
                    
                        success: function (obj, textstatus) {
                                      if( !('error' in obj) ) {
                                          yourVariable = obj.result;
                                      }
                                      else {
                                          console.log(obj.error);
                                      }
                                }
                    });
                    updateTracks();
                };
                skipButtons.forEach(function(skip) {
                    skip.addEventListener("click", function() {
                        updateTracks();
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
}



if (page === "RateAlbum.html") {
    document.addEventListener("DOMContentLoaded", function () {
        var album1NameElement = document.getElementById("album1Name");
        var album2NameElement = document.getElementById("album2Name");
        var album1CoverElement = document.getElementById("album1Cover");
        var album2CoverElement = document.getElementById("album2Cover");

        var title1 = document.querySelector(".album-title-1");
        var title2 = document.querySelector(".album-title-2");
        var album1 = document.querySelector(".album1");
        var album2 = document.querySelector(".album2");
        var skipButtons = document.querySelectorAll(".album-skip");

        fetch('../assets/php/get_album_names.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Accessing album data failed');
                }
                return response.json();
            })
            .then(data => {
                var albumNamesArray = Object.keys(data);
                var albumCoversArray = Object.values(data);
    
                function getRandomAlbum() {
                    var randomIndex = Math.floor(Math.random() * albumNamesArray.length);
                    var randomAlbumName = albumNamesArray[randomIndex];
                    var randomAlbumCover = albumCoversArray[randomIndex];
                
                    return {
                        name: randomAlbumName,
                        cover: randomAlbumCover
                    };
                }
                var newAlbum1;
                var newAlbum2;
    
                function updateAlbums() {
                    newAlbum1 = getRandomAlbum();
                    newAlbum2 = getRandomAlbum();
                    while (newAlbum2.name === newAlbum1.name) {
                        newAlbum2 = getRandomAlbum();
                    }
                     
                    var index = 0
                    while (newAlbum1.name.includes('?') && index < 5) {
                        newAlbum1.name = newAlbum1.name.replaceCharacter();
                        index++;
                    }
                    index = 0;
                    while (newAlbum2.name.includes('?') && index < 5) {
                        newAlbum2.name = newAlbum2.name.replaceCharacter();
                        index++;
                    }
                    
                    var newAlbumName1 = newAlbum1.name;
                    var newAlbumCover1 = newAlbum1.cover;
                    var newAlbumName2 = newAlbum2.name;
                    var newAlbumCover2 = newAlbum2.cover;
    
                    album1NameElement.textContent = newAlbumName1;
                    album2NameElement.textContent = newAlbumName2;
                    album1CoverElement.src = newAlbumCover1;
                    album2CoverElement.src = newAlbumCover2;
                }
    
                updateAlbums();
    
                album1.onclick = function () {
                    var url = '../assets/php/update_album_votes.php?q=' + encodeURI(newAlbum1.name);
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        dataType: 'json',
                        data: {functionname: 'add', arguments: [1, 2]},
                    
                        success: function (obj, textstatus) {
                                      if( !('error' in obj) ) {
                                          yourVariable = obj.result;
                                      }
                                      else {
                                          console.log(obj.error);
                                      }
                                }
                    });
                    updateAlbums();
                };
                title1.onclick = function () {
                    var url = '../assets/php/update_album_votes.php?q=' + encodeURI(newAlbum1.name);
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        dataType: 'json',
                        data: {functionname: 'add', arguments: [1, 2]},
                    
                        success: function (obj, textstatus) {
                                      if( !('error' in obj) ) {
                                          yourVariable = obj.result;
                                      }
                                      else {
                                          console.log(obj.error);
                                      }
                                }
                    });
                    updateAlbums();
                };
    
                album2.onclick = function () {
                    var url = '../assets/php/update_album_votes.php?q=' + encodeURI(newAlbum2.name);
                    console.log(url);
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        dataType: 'json',
                        data: {functionname: 'add', arguments: [1, 2]},
                    
                        success: function (obj, textstatus) {
                                      if( !('error' in obj) ) {
                                          yourVariable = obj.result;
                                      }
                                      else {
                                          console.log(obj.error);
                                      }
                                }
                    });
                    updateAlbums();
                };
                title2.onclick = function () {
                    var url = '../assets/php/update_album_votes.php?q=' + encodeURI(newAlbum2.name);
                    console.log(url);
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        dataType: 'json',
                        data: {functionname: 'add', arguments: [1, 2]},
                    
                        success: function (obj, textstatus) {
                                      if( !('error' in obj) ) {
                                          yourVariable = obj.result;
                                      }
                                      else {
                                          console.log(obj.error);
                                      }
                                }
                    });
                    updateAlbums();
                };
                skipButtons.forEach(function(skip) {
                    skip.addEventListener("click", function() {
                        updateAlbums();
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
}




