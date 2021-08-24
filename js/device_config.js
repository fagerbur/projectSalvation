
if(navigator.userAgent.includes("Firefox"))
{
    var mobileCheck = AFRAME.utils.device.isMobile();
    if(mobileCheck)
    {
        document.getElementById('Scene').setAttribute("vr-mode-ui","enabled: false");
    }
}

document.querySelector('a-scene').addEventListener('enter-vr', function () {
    var headsetCheck = AFRAME.utils.device.checkHeadsetConnected();
    var mobileCheck = AFRAME.utils.device.isMobile();

    if(headsetCheck)
    {
        document.getElementById('left-hand').object3D.visible = true;
        document.getElementById('right-hand').object3D.visible = true;
    }
    else if (mobileCheck)
    {
        var gazeCursor = document.createElement('a-cursor');
        document.getElementById('Camera').appendChild(gazeCursor);
    }
});

document.querySelector('a-scene').addEventListener('exit-vr', function () {
    var mobileCheck = AFRAME.utils.device.isMobile();

    if (mobileCheck)
    {
        var gazeCursor = document.querySelector('a-cursor')
        document.getElementById('Camera').removeChild(gazeCursor);
    }

    document.getElementById('left-hand').object3D.visible = false;
    document.getElementById('right-hand').object3D.visible = false;
});