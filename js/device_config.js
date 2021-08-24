function isMobile() {
    var hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        } else if ('orientation' in window) {
            hasTouchScreen = true; // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            var UA = navigator.userAgent;
            hasTouchScreen = (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            );
        }
    }

    return hasTouchScreen;
}

if(navigator.userAgent.includes("Firefox"))
{
    var mobileCheck = AFRAME.utils.device.isMobile();
    if(mobileCheck)
    {
        document.getElementById('Scene').setAttribute("vr-mode-ui","enabled: false");
    }
}

document.querySelector('a-scene').addEventListener('enter-vr', function () {
    var mobileCheck = AFRAME.utils.device.isMobile();

    if (mobileCheck)
    {
        var gazeCursor = document.createElement('a-cursor');
        document.getElementById('Camera').appendChild(gazeCursor);
    }

    var headsetCheck = AFRAME.utils.device.checkHeadsetConnected();
    if(headsetCheck)
    {
        document.getElementById('left-hand').object3D.visible = true;
        document.getElementById('right-hand').object3D.visible = true;
    }
});

document.querySelector('a-scene').addEventListener('exit-vr', function () {
    var mobileCheck = AFRAME.utils.device.isMobile();

    if (mobileCheck)
    {
        var gazeCursor = document.querySelector('a-cursor')
        document.getElementById('Camera').removeChild(gazeCursor);
    }

    document.getElementById('left-hand').object3D.visible = true;
    document.getElementById('right-hand').object3D.visible = true;
});