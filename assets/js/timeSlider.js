var slider = document.getElementById("length-slider");
var output = document.getElementById("slideshow-length");

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    return formattedTime;
}

function setBackgroundSize(input) {
    input.style.setProperty("--background-size", `${getBackgroundSize(input)}%`);
}

function getBackgroundSize(input) {
    const min = +input.min || 0;
    const max = +input.max || 100;
    const value = +input.value;

    const size = (value - min) / (max - min) * 100;

    return size;
}


setBackgroundSize(slider);

output.innerHTML = formatTime(slider.value);

slider.oninput = function () {
    setBackgroundSize(slider);
    output.innerHTML = formatTime(this.value);
    CrComLib.publishEvent("n", "2", Number(this.value) * 100);
}