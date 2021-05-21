AFRAME.registerComponent('titlescroll', {
    init:function() {
      this.el.addEventListener('click', function (evt) {
        var title = document.getElementById("WelcomeText")
        title.setAttribute("animation", "property: position; to: .45 3 -2; dur: 3000; easing: linear; delay: 1000; autoplay: true;")

        var introduction = document.getElementById("IntroductionText")
        introduction.setAttribute("animation","property: text.opacity; to: 1; dur: 3000; easing: linear; delay:3500; autoplay: true;")
        
        var titlepanel = document.getElementById("TitlePanel")
        titlepanel.setAttribute("animation","property: height; to:2.25; dur:3000; easing:linear; delay:1000; autoplay:true;")
        titlepanel.setAttribute("animation__2","property: position; to:0 2.1 -2.025; dur:3000; easing:linear; delay:1000; autoplay:true;")

        document.getElementById("Start").setAttribute("animation","property: visible; to:false; delay:1000; autoplay:true;")
        
        document.getElementById("NextOne").setAttribute("animation","property: visible; to:true; dur:3500; easing:linear; autoplay:true;")
      });
    }
  });

AFRAME.registerComponent('nextone', {
  init:function() {
    this.el.addEventListener('click', function (evt) {
        var camera = document.getElementById("CameraRig")
        var x = camera.getAttribute("position").x + 10
        camera.setAttribute("animation","property: position; to: "+ x +" 1.6 0; dur: 5000; easing: easeInOutQuad; delay:1000; autoplay: true;")

        document.getElementById("Beginning").setAttribute("animation","property: visible; to:false; delay:4000; autoplay:true;")
        document.getElementById("PreExistence").setAttribute("animation","property: visible; to:true; delay:1000; autoplay:true;")
    });
  }
});
