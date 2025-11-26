// --- STANDARD REMOTE BUTTONS ---

// Helper function to handle button presses
function setupButton(className, joinNumber) {
    let elements = document.getElementsByClassName(className);
    Array.from(elements).forEach(element => {
        element.addEventListener("touchstart", function (event) {
            // Visual feedback handled by CSS :active state
            CrComLib.publishEvent("b", joinNumber, true);
            setTimeout(() => CrComLib.publishEvent("b", joinNumber, false), 100);
        });
    });
}

// Map classes to Crestron Join Numbers
setupButton("remote-menu", "34");
setupButton("remote-guide", "35");
setupButton("remote-back", "41");
setupButton("remote-exit", "42");

// Transport Controls
setupButton("remote-reverse", "43");
setupButton("remote-playpause", "44");
setupButton("remote-forward", "45");
setupButton("remote-stop", "46");
setupButton("remote-record", "47");

// Color Buttons
setupButton("remote-red", "48");
setupButton("remote-green", "49");
setupButton("remote-yellow", "50");
setupButton("remote-blue", "51");

// --- DPAD BUTTONS (Updated to use individual buttons) ---
setupButton("remote-up", "36");
setupButton("remote-down", "37");
setupButton("remote-left", "38");
setupButton("remote-right", "39");
setupButton("remote-select", "40");


// --- NUMPAD BUTTONS ---
setupButton("remote-1", "57");
setupButton("remote-2", "58");
setupButton("remote-3", "59");
setupButton("remote-4", "60");
setupButton("remote-5", "61");
setupButton("remote-6", "62");
setupButton("remote-7", "63");
setupButton("remote-8", "64");
setupButton("remote-9", "65");
setupButton("remote-0", "66");


// --- CHANNEL +/- BUTTONS ---
setupButton("remote-channel-down", "68");
setupButton("remote-channel-up", "69");

// --- DISPLAY POWER CONTROL ---
setupButton("power-btn", "80");