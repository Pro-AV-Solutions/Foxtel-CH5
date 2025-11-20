
let fetchSourceDiv = document.getElementById("fetch-sub");
let foxSourceDiv = document.getElementById("fox-sub");
let appletvSourceDiv = document.getElementById("applettv-sub");
let webexSourceDiv = document.getElementById("webex-sub");
let webexSelfViewDiv = document.getElementById("webex-selfview");
let webexContactDiv = document.getElementById("webex-contacts");
let webexDirectoryDiv = document.getElementById("webex-directory");
let webexPresentationDiv = document.getElementById("webex-presentation");
let webexInCall = document.getElementById("webex-in-call");
let laptopSourceDiv = document.getElementById("laptop-sub")
let brightsignDiv = document.getElementById("brightsign-sub");
let brightsignVideoControlDiv = document.getElementById("brightsign-video-control-sub");
let lightingDiv = document.getElementById("lighting-sub");
let lightingAdvancedDiv = document.getElementById("lighting-sub-advanced");
let webexBookingsDiv = document.getElementById("upcoming-meetings-sub");
let lightingSceneDiv = document.getElementById("lighting-scene-sub");
let allSourceSubs = [fetchSourceDiv, foxSourceDiv, laptopSourceDiv, appletvSourceDiv, webexSourceDiv, webexSelfViewDiv, webexContactDiv, brightsignDiv, brightsignVideoControlDiv, webexBookingsDiv];

let src1 = document.getElementById("src1")
let src2 = document.getElementById("src2")
let src3 = document.getElementById("src3")
let src4 = document.getElementById("src4")
let src5 = document.getElementById("src5")
let src6 = document.getElementById("src6")
let src7 = document.getElementById("src7")
let src8 = document.getElementById("src8")
let src9 = document.getElementById("src9")

//Fetch
src1.addEventListener("touchstart", function (event) {
    src5.style.display = "none"
    src9.style.display = "inline"
    CrComLib.publishEvent("b", "21", true);
    setTimeout(() => CrComLib.publishEvent("b", "21", false), 100);
});

CrComLib.subscribeState("b", "21", (value) => {
    if (value) {
        fetchSourceDiv.style.visibility = "visible";
        src1.className = "source-button-active";
    }
    else {
        fetchSourceDiv.style.visibility = "hidden";
        src1.className = "source-button";
    }
});

//Foxtel
src2.addEventListener("touchstart", function (event) {
    src5.style.display = "none"
    src9.style.display = "inline"
    CrComLib.publishEvent("b", "22", true);
    setTimeout(() => CrComLib.publishEvent("b", "22", false), 100);
});

CrComLib.subscribeState("b", "22", (value) => {
    if (value) {
        foxSourceDiv.style.visibility = "visible";
        src2.className = "source-button-active";
    }
    else {
        foxSourceDiv.style.visibility = "visible";
        src2.className = "source-button";
    }
});

//Off
src5.addEventListener("touchstart", function (event) {
    allSourceSubs.forEach(sourceSub => {
        sourceSub.style.visibility = "hidden";
    });
    CrComLib.publishEvent("b", "5", true);
    setTimeout(() => CrComLib.publishEvent("b", "5", false), 100);
});

