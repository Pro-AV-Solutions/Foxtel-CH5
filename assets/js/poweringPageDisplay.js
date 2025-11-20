let blackCover = document.getElementById("covering");
let poweringOnPage = document.getElementById("powering-on-sub");
let poweringOffPage = document.getElementById("powering-off-sub");

let volSub = document.getElementById("vol-sub");

let offButton = document.getElementById("src5");


CrComLib.subscribeState("b", "5", (value) => {
    if (value) {
        blackCover.classList.remove("hide-element");
        poweringOffPage.classList.remove("hide-element");
        volSub.classList.add("hide-element");
        setTimeout(() => {
            blackCover.classList.add("hide-element");
            poweringOffPage.classList.add("hide-element");
        }, 5000);
    }
});

// JOIN NUMBER 
// this should be a one shot
CrComLib.subscribeState("b", "6", (value) => {
    if (value) {
        volSub.classList.remove("hide-element");
        blackCover.classList.remove("hide-element");
        poweringOnPage.classList.remove("hide-element");
        setTimeout(() => {
            blackCover.classList.add("hide-element");
            poweringOnPage.classList.add("hide-element");
        }, 5000);
    }
});