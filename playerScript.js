//global variables
var config = {
    startLevel: 1,
    currentLevel: 1
};
var hls = new Hls(config);

function onLevelSwitched(event, data) {
    printInfo(hls.currentLevel);
}

function tracking() {
    document.getElementById("tracking").innerHTML += hls.abrController.fragCurrent._url + "<br>";
}

function play(link) {
    hls.destroy();
    hls = new Hls(config);

    // subscribe events
    hls.on(Hls.Events.LEVEL_SWITCHED, onLevelSwitched);
    //show error when is error
    hls.on(Hls.Events.FRAG_CHANGED, tracking);
    hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
            switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                    // try to recover network error
                    hls.startLoad();
                    break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                    hls.recoverMediaError();
                    break;
                default:
                    // cannot recover
                    hls.destroy();
                    break;
            }
        }
    });
    document.getElementById("tracking").innerHTML = "";
    if (Hls.isSupported()) {
        var video = document.getElementById('myvideo');
        // bind them together
        hls.attachMedia(video);

        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls.loadSource(link);
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                printButtons();
            });
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
        video.addEventListener('loadedmetadata', function () {
            //video.play();
        });
    }
}
