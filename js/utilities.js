AFRAME.registerComponent("play-control", {
    init: function () {
        this.el.addEventListener("click", function(e) { 
            var christVideo = document.getElementById("BecauseOfHim");
            var videoControl = document.getElementById("PauseControl");

            christVideo.play();
            videoControl.setAttribute("scale",".25 .25");
            e.target.setAttribute("scale","0 0");
        });
    }
});

AFRAME.registerComponent("pause-control", {
    init: function () {
        this.el.addEventListener("click", function(e) { 
            var christVideo = document.getElementById("BecauseOfHim");
            var videoControl = document.getElementById("PlayControl");
            christVideo.pause();
            videoControl.setAttribute("scale",".5 .5");
            e.target.setAttribute("scale","0 0");
        });
    }
});
