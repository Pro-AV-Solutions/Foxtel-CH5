let foxSourceDiv = document.getElementById("fox-sub");
let mediaSourceDiv = document.getElementById("media-sub");

// Collect all sub-pages for easy toggling
let allSourceSubs = [foxSourceDiv, mediaSourceDiv];

let src2 = document.getElementById("src2");       // Foxtel
let srcMedia = document.getElementById("src-media"); // Media Player
let src5 = document.getElementById("src5");       // Off

function hideAllSources() {
    allSourceSubs.forEach(div => {
        if(div) div.classList.add("hide-element");
    });
    // Reset button states
    if(src2) src2.className = "source-btn";
    if(srcMedia) srcMedia.className = "source-btn";
}

// --- FOXTEL EVENT ---
if (src2) {
    src2.addEventListener("touchstart", function (event) {
        hideAllSources();
        if(foxSourceDiv) foxSourceDiv.classList.remove("hide-element");
        
        src2.className = "source-btn source-button-active";
        
        // Publish Crestron Event
        CrComLib.publishEvent("b", "22", true);
        setTimeout(() => CrComLib.publishEvent("b", "22", false), 100);
    });

    // Feedback from Crestron (optional: keeps UI in sync if external change happens)
    CrComLib.subscribeState("b", "22", (value) => {
        if (value) {
            hideAllSources();
            if(foxSourceDiv) foxSourceDiv.classList.remove("hide-element");
            src2.className = "source-btn source-button-active";
        }
    });
}

// --- MEDIA PLAYER EVENT ---
if (srcMedia) {
    srcMedia.addEventListener("touchstart", function (event) {
        hideAllSources();
        if(mediaSourceDiv) mediaSourceDiv.classList.remove("hide-element");
        
        srcMedia.className = "source-btn source-button-active";
        
        // Publish Placeholder Event (e.g., Join 99)
        CrComLib.publishEvent("b", "99", true);
        setTimeout(() => CrComLib.publishEvent("b", "99", false), 100);
    });
}

// --- OFF EVENT ---
if (src5) {
    src5.addEventListener("touchstart", function (event) {
        hideAllSources();
        
        // Trigger Shutdown
        CrComLib.publishEvent("b", "5", true);
        setTimeout(() => CrComLib.publishEvent("b", "5", false), 100);
    });
}