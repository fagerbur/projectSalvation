AFRAME.registerComponent('title-scroll', {
    init:function() {
      this.el.addEventListener('click', function (evt) {
        var title = document.getElementById("WelcomeText")
        title.setAttribute("animation", "property: position; to:0 3.025 -2; dur: 3000; easing: linear; delay: 1000; autoplay: true;")

        var introduction = document.getElementById("IntroductionText")
        introduction.setAttribute("animation","property: text.opacity; to: 1; dur: 3000; easing: linear; delay:3500; autoplay: true;")
        
        var titlepanel = document.getElementById("TitlePanel")
        titlepanel.setAttribute("animation","property: height; to:2.5; dur:3000; easing:linear; delay:1000; autoplay:true;")
        titlepanel.setAttribute("animation__2","property: position; to:0 2 -2.025; dur:3000; easing:linear; delay:1000; autoplay:true;")

        document.getElementById("Start").setAttribute("animation","property: visible; to:false; delay:1000; autoplay:true;")
        
        document.getElementById("NextOne").setAttribute("animation","property: visible; to:true; dur:3500; easing:linear; autoplay:true;")
        document.getElementById("Music").components.sound.playSound();
      });
    }
});

AFRAME.registerComponent('next-one', {
  init:function() {
    this.el.addEventListener('click', function (evt) {
        var camera = document.getElementById("CameraRig")
        var x = Math.trunc(camera.getAttribute("position").x) + 10
        updatePositionVisibility(x);
    });
  }
});

AFRAME.registerComponent('prev-one', {
    init:function() {
      this.el.addEventListener('click', function (evt) {
          var camera = document.getElementById("CameraRig")
          var x = Math.trunc(camera.getAttribute("position").x) - 10
          updatePositionVisibility(x);
      });
    }
  });

function updatePositionVisibility(position)
{
    var camera = document.getElementById("CameraRig")

    if(position === 0)
    {
        document.getElementById("Beginning").setAttribute("animation","property: visible; to:true; delay:1000; autoplay:true;")
        document.getElementById("PreExistence").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
    }
    else if(position === 10)
    {
        document.getElementById("Beginning").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
        document.getElementById("PreExistence").setAttribute("animation","property: visible; to:true; delay:1000; autoplay:true;")
        document.getElementById("CreationFall").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
    }
    else if(position === 20)
    {
        document.getElementById("PreExistence").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
        document.getElementById("CreationFall").setAttribute("animation","property: visible; to:true; delay:1000; autoplay:true;")
        document.getElementById("EarthLife").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
    }
    else if(position === 30)
    {
        document.getElementById("CreationFall").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
        document.getElementById("EarthLife").setAttribute("animation","property: visible; to:true; delay:1000; autoplay:true;")
        document.getElementById("Atonement").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
    }
    else if(position === 40)
    {
        document.getElementById("EarthLife").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
        document.getElementById("Atonement").setAttribute("animation","property: visible; to:true; delay:1000; autoplay:true;")
        document.getElementById("SpiritWorld").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
    }
    else if(position === 50)
    {
        document.getElementById("Atonement").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
        document.getElementById("SpiritWorld").setAttribute("animation","property: visible; to:true; delay:1000; autoplay:true;")
        document.getElementById("Resurrection").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
    }
    else if(position === 60)
    {
        document.getElementById("SpiritWorld").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
        document.getElementById("Resurrection").setAttribute("animation","property: visible; to:true; delay:1000; autoplay:true;")
        document.getElementById("Kingdoms").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
    }
    else if(position === 70)
    {
        document.getElementById("Resurrection").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
        document.getElementById("Kingdoms").setAttribute("animation","property: visible; to:true; delay:1000; autoplay:true;")
        document.getElementById("Conclusion").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
    }
    else if(position === 80)
    {
        document.getElementById("Kingdoms").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
        document.getElementById("Conclusion").setAttribute("animation","property: visible; to:true; delay:1000; autoplay:true;")
    }

    camera.setAttribute("animation","property: position; to: "+ position +" 1.6 0; dur: 5000; easing: easeInOutQuad; delay:1000; autoplay: true;")
};

AFRAME.registerComponent("play-control", {
    init: function () {
        this.el.addEventListener("click", function(e) { 
            var christVideo = document.getElementById("BecauseOfHim");
            var videoControl = document.getElementById("PauseControl");
            document.getElementById("Music").components.sound.pauseSound();

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
            setTimeout(function () {
                document.getElementById("Music").components.sound.playSound();
            }, 3000);

            christVideo.pause();
            videoControl.setAttribute("scale",".5 .5");
            e.target.setAttribute("scale","0 0");
        });
    }
});

AFRAME.registerComponent("video-end", {
    init: function() {
        document.getElementById("BecauseOfHim").addEventListener("ended", (e) => {
            setTimeout(function () {
                document.getElementById("Music").components.sound.playSound();
            }, 3000);
            document.getElementById("PlayControl").setAttribute("scale",".5 .5");
            document.getElementById("PauseControl").setAttribute("scale","0 0");
        });
    }
});

AFRAME.registerComponent('tombstone-roll', {
    init:function() {
      this.el.addEventListener('click', function (evt) {
          var tombStone = document.getElementById("TombStone")
          tombStone.setAttribute("animation__rollrotation","property: rotation; to: -360 90 -90; easing:linear; dur:10000;")
          tombStone.setAttribute("animation__rollposition","property: position; to: -7 .15 -1; easing:linear; dur:10000;")
          tombStone.setAttribute("animation__rollopacity","property: opacity; to: 0; easing:linear; delay: 6000 dur:4000;")
      });
    }
});

AFRAME.registerComponent("light-telestial", {
    init: function () {
        this.el.addEventListener("click", function(e) { 
            document.getElementById("telestialLight").object3D.visible = true;
        });
    }
});

AFRAME.registerComponent("light-terrestrial", {
    init: function () {
        this.el.addEventListener("click", function(e) { 
            document.getElementById("terrestrialLight").object3D.visible = true;
        });
    }
});

AFRAME.registerComponent("light-celestial", {
    init: function () {
        this.el.addEventListener("click", function(e) { 
            document.getElementById("celestialLight").object3D.visible = true;
        });
    }
});

AFRAME.registerComponent("undo-kingdom-lights", {
    init: function () {
        this.el.addEventListener("click", function(e) { 
            document.getElementById("telestialLight").object3D.visible = false;
            document.getElementById("terrestrialLight").object3D.visible = false;
            document.getElementById("celestialLight").object3D.visible = false;
        });
    }
});