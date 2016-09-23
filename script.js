/* For the given progress bar at the top to move */
function move() {
    var elem = document.getElementById("myBar"); 
    var width = 0;
    var time = 175;
    // var id = window.setTimeout(frame, time);
    var id = setInterval(frame, 175);
    // Comment out the above line and uncomment the 3 other lines for the event-dependent progress
    // Note that the ocean is NOT sync-ed for the event-dependent progress
    var i = 0
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%';
            var line = data[i];
            var nextLine = data[i+1];
            if (width >= line.percentage && width < nextLine.percentage) {
                // id = window.setTimeout(frame, time * line.duration);
                $(".progress").html(line.event);
            } else if (width == nextLine.percentage || i == data.length) {
                $(".progress").html(nextLine.event);
            } else {
                // id = window.setTimeout(frame, time * line.duration);
                i++;
            }
            $(".percentage").html(width * 1 + '%');
        }
    }
}

/* Read a text file */
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
                // allTextLines = allText.split(/\r\n|\n/);
                // console.log(allText);
            }
        }
    }
    rawFile.send(null);
}

/* https://codepen.io/loktar00/pen/kfrKC */

// Make some waves.
var ocean = document.getElementById("ocean"),
    waveWidth = 10,
    waveCount = Math.floor(window.innerWidth/waveWidth),
    docFrag = document.createDocumentFragment();

for(var i = 0; i < waveCount; i++){
    var wave = document.createElement("div");
    wave.className += " wave";
    docFrag.appendChild(wave);
    wave.style.left = i * waveWidth + "px";
    wave.style.webkitAnimationDelay = (i/100) + "s";
}

function wave() {
    var elem = document.getElementById("ocean"); 
    var height = 0;
    var time = 175;
    var id = setInterval(frame, time);
    function frame() {
        if (height >= 100) {
            clearInterval(id);
        } else {
            height++; 
            document.getElementById("progress").innerHTML = height * 1 + '%';
        }
    }
}

// Ocean
ocean.appendChild(docFrag);
// Progress Bar
move();
var allText = '';
readTextFile("csv.txt"); // allText now contains a string containing the file contents
// Text to CSV
var data = $.csv.toObjects(allText);