//make buttons on first call
var target = document.querySelector("#quality");
for (a = 20; a >= 0; a--) {
   var button = document.createElement('button');
   target.parentNode.insertBefore(button, target.nextSibling);
   button.id = a;
   button.onclick = function () { changeQuality(this.id); }
   button.style.visibility = "hidden";
}

function fromList() {
   var link = document.getElementById("choose").value;
   play(link);
}

function changeQuality(a) {
   hls.currentLevel = a;
}

function customLink() {
   document.querySelector("#myForm").addEventListener("click", function (event) {
      event.preventDefault();
   }, false);
   var link = document.getElementById("link").value;
   play(link);
   hls.once(Hls.Events.ERROR, function() {alert("Error! Wrong link?"); location.reload(); });
}

function printInfo(a) {
   var lvls = hls.levels;
   document.getElementById("bitrate").innerHTML = "Bitrate: " + lvls[a].bitrate;
   document.getElementById("height").innerHTML = "Height: " + lvls[a].height;
   document.getElementById("width").innerHTML = "Width: " + lvls[a].width;
   document.getElementById("videoo").innerHTML = "Video codec: " + lvls[a].videoCodec;
   document.getElementById("audio").innerHTML = "Audio codec: " + lvls[a].audioCodec;
}

function printButtons() {
   //show buttons
   var lvls = hls.levels;
   for (a = 0; a <= 20; a++) {
      var button;
      if (a < lvls.length) {
         var i = lvls.length - 1 - a;
         button = document.getElementById(i);
         button.innerHTML = i + " (" + lvls[i].width + "x" + lvls[i].height + ")";
         button.setAttribute('class', 'button');
         button.style.visibility = "visible";
      } else {
         button = document.getElementById(a);
         button.classList.remove("button");
         button.style.visibility = "hidden";
      }
   }
}