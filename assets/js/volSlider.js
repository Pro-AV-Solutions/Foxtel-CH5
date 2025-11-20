const volumeSlider = document.getElementById("volume-slider");

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

setBackgroundSize(volumeSlider);

volumeSlider.addEventListener("input", () => {
	setBackgroundSize(volumeSlider);
	CrComLib.publishEvent("n", "1", Number(volumeSlider.value));
});

CrComLib.subscribeState("n", '1', (value) => {
	console.log(value);
	volumeSlider.value = value;
	setBackgroundSize(volumeSlider);
});

let volMuteButton = document.getElementById("volume-mute");
volMuteButton.addEventListener("click", () => {
	CrComLib.publishEvent("b", "1", true);
	setTimeout(() => CrComLib.publishEvent("b", "1", false), 100);
});


CrComLib.subscribeState("b", '1', (value) => {
	if (value) {
		volMuteButton.classList.add("sound-muted-icon");
		volMuteButton.classList.remove("sound-unmuted-icon");
	}
	else {
		volMuteButton.classList.remove("sound-muted-icon");
		volMuteButton.classList.add("sound-unmuted-icon");
	}
});