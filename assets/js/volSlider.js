const volumeSlider = document.getElementById("volume-slider");
const volMuteButton = document.getElementById("volume-mute");

// --- HELPER: CALCULATE FILL PERCENTAGE ---
function setBackgroundSize(input) {
	input.style.setProperty("--background-size", `${getBackgroundSize(input)}%`);
}

function getBackgroundSize(input) {
	const min = +input.min || 0;
	const max = +input.max || 100;
	const value = +input.value;
	return (value - min) / (max - min) * 100;
}

// --- SLIDER LOGIC ---
if (volumeSlider) {
    setBackgroundSize(volumeSlider);

    volumeSlider.addEventListener("input", () => {
        setBackgroundSize(volumeSlider);
        CrComLib.publishEvent("n", "1", Number(volumeSlider.value));
    });

    CrComLib.subscribeState("n", '1', (value) => {
        volumeSlider.value = value;
        setBackgroundSize(volumeSlider);
    });
}

// --- MUTE BUTTON LOGIC ---
if (volMuteButton) {
    // 1. CLICK HANDLER
    volMuteButton.addEventListener("click", (e) => {
        CrComLib.publishEvent("b", "1", true);
        setTimeout(() => CrComLib.publishEvent("b", "1", false), 100);
    });

    // 2. FEEDBACK HANDLER
    CrComLib.subscribeState("b", '1', (isMuted) => {
        if (isMuted) {
            // --- STATE: MUTED ---
            volMuteButton.classList.add("muted-active");
            volMuteButton.innerHTML = "🔇";
            
            // Turn Slider Red
            if(volumeSlider) volumeSlider.classList.add("slider-muted");

        } else {
            // --- STATE: UNMUTED ---
            volMuteButton.classList.remove("muted-active");
            volMuteButton.innerHTML = "🔊";

            // Turn Slider Blue (Default)
            if(volumeSlider) volumeSlider.classList.remove("slider-muted");
        }
    });
}