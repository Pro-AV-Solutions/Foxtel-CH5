let els = [];

els = document.getElementsByClassName("remote-menu")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        console.log("menu");
        CrComLib.publishEvent("b", "34", true);
        setTimeout(() => CrComLib.publishEvent("b", "34", false), 100);
    });
});

els = document.getElementsByClassName("remote-guide")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "35", true);
        setTimeout(() => CrComLib.publishEvent("b", "35", false), 100);
    });
});

els = document.getElementsByClassName("remote-back")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "41", true);
        setTimeout(() => CrComLib.publishEvent("b", "41", false), 100);
    });
});

els = document.getElementsByClassName("remote-exit")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "42", true);
        setTimeout(() => CrComLib.publishEvent("b", "42", false), 100);
    });
});

els = document.getElementsByClassName("remote-reverse")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "43", true);
        setTimeout(() => CrComLib.publishEvent("b", "43", false), 100);
    });
});

els = document.getElementsByClassName("remote-playpause")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "44", true);
        setTimeout(() => CrComLib.publishEvent("b", "44", false), 100);
    });
});

els = document.getElementsByClassName("remote-forward")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "45", true);
        setTimeout(() => CrComLib.publishEvent("b", "45", false), 100);
    });
});

els = document.getElementsByClassName("remote-stop")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "46", true);
        setTimeout(() => CrComLib.publishEvent("b", "46", false), 100);
        console.log("stop")
    });
});

els = document.getElementsByClassName("remote-record")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "47", true);
        setTimeout(() => CrComLib.publishEvent("b", "47", false), 100);
    });
});

els = document.getElementsByClassName("remote-red")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "48", true);
        setTimeout(() => CrComLib.publishEvent("b", "48", false), 100);
    });
});

els = document.getElementsByClassName("remote-green")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "49", true);
        setTimeout(() => CrComLib.publishEvent("b", "49", false), 100);
    });
});

els = document.getElementsByClassName("remote-yellow")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "50", true);
        setTimeout(() => CrComLib.publishEvent("b", "50", false), 100);
    });
});

els = document.getElementsByClassName("remote-blue")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "51", true);
        setTimeout(() => CrComLib.publishEvent("b", "51", false), 100);
    });
});


let dpads = document.getElementsByClassName("dpad");

function outsideBoundry(x, y, maxWidth, maxHeight) {
    return x < 0 || y < 0 || x > maxWidth || y > maxHeight;
}

function dpadDirectionPressed(x, y, maxWidth, maxHeight) {
    if (x < (maxWidth / 3)) {
        if (y < (maxHeight / 3)) {
            return "dead zone";
        } else if (y > ((maxHeight / 3) * 2)) {
            return "dead zone";
        } else {
            return "left";
        }
    } else if (x > ((maxWidth / 3) * 2)) {
        if (y < 133) {
            return "dead zone";
        } else if (y > ((maxHeight / 3) * 2)) {
            return "dead zone";
        } else {
            return "right";
        }
    } else {
        if (y < (maxHeight / 3)) {
            return "up";
        } else if (y > ((maxHeight / 3) * 2)) {
            return "down";
        } else {
            return "select";
        }
    }
}

function changeAllSigstoFalse(exclusion) {
    switch (exclusion) {
        case "up":
            CrComLib.publishEvent("b", "37", false);
            CrComLib.publishEvent("b", "38", false);
            CrComLib.publishEvent("b", "39", false);
            CrComLib.publishEvent("b", "40", false);
            break;
        case "down":
            CrComLib.publishEvent("b", "36", false);
            CrComLib.publishEvent("b", "38", false);
            CrComLib.publishEvent("b", "39", false);
            CrComLib.publishEvent("b", "40", false);
            break;
        case "left":
            CrComLib.publishEvent("b", "36", false);
            CrComLib.publishEvent("b", "37", false);
            CrComLib.publishEvent("b", "39", false);
            CrComLib.publishEvent("b", "40", false);
            break;
        case "right":
            CrComLib.publishEvent("b", "36", false);
            CrComLib.publishEvent("b", "37", false);
            CrComLib.publishEvent("b", "38", false);
            CrComLib.publishEvent("b", "40", false);
            break;
        case "select":
            CrComLib.publishEvent("b", "36", false);
            CrComLib.publishEvent("b", "37", false);
            CrComLib.publishEvent("b", "38", false);
            CrComLib.publishEvent("b", "49", false);
            break;
        default:
            CrComLib.publishEvent("b", "36", false);
            CrComLib.publishEvent("b", "37", false);
            CrComLib.publishEvent("b", "38", false);
            CrComLib.publishEvent("b", "39", false);
            CrComLib.publishEvent("b", "40", false);
            break;
    }
}


const directionClassArr = ["dpad-up-press", "dpad-down-press", "dpad-left-press", "dpad-right-press", "dpad-select-press"];
Array.from(dpads).forEach(element => {
    const styles = getComputedStyle(element);
    const widthValue = parseFloat(styles.width);
    const heightValue = parseFloat(styles.height);
    const rect = element.getBoundingClientRect();
    var relativeX;
    var relativeY;
    element.addEventListener("touchstart", (e) => {
        relativeX = e.touches[0].clientX - rect.left;
        relativeY = e.touches[0].clientY - rect.top;
        if (outsideBoundry(relativeX, relativeY, widthValue, heightValue)) {
            relativeX = -1;
            relativeY = -1;
            return;
        }
        let direction = dpadDirectionPressed(relativeX, relativeY, widthValue, heightValue);
        switch (direction) {
            case "up":
                element.classList.add("dpad-up-press");
                CrComLib.publishEvent("b", "36", true);
                break;
            case "down":
                element.classList.add("dpad-down-press");
                CrComLib.publishEvent("b", "37", true);
                break;
            case "left":
                element.classList.add("dpad-left-press");
                CrComLib.publishEvent("b", "38", true);
                break;
            case "right":
                element.classList.add("dpad-right-press");
                CrComLib.publishEvent("b", "39", true);
                break;
            case "select":
                element.classList.add("dpad-select-press");
                CrComLib.publishEvent("b", "40", true);
                break;
            default:
                changeAllSigstoFalse("none");
                element.classList.remove(...directionClassArr);
                break;
        }
    });
    element.addEventListener("touchmove", (e) => {
        relativeX = e.touches[0].clientX - rect.left;
        relativeY = e.touches[0].clientY - rect.top;
        if (outsideBoundry(relativeX, relativeY, widthValue, heightValue)) {
            element.classList.remove(...directionClassArr);
            relativeX = -1;
            relativeY = -1;
            return;
        }
        let direction = dpadDirectionPressed(relativeX, relativeY, widthValue, heightValue);
        switch (direction) {
            case "up":
                element.classList.remove(...directionClassArr);
                element.classList.add("dpad-up-press");
                CrComLib.publishEvent("b", "36", true);
                changeAllSigstoFalse("up");
                break;
            case "down":
                element.classList.remove(...directionClassArr);
                element.classList.add("dpad-down-press");
                CrComLib.publishEvent("b", "37", true);
                changeAllSigstoFalse("down");
                break;
            case "left":
                element.classList.remove(...directionClassArr);
                element.classList.add("dpad-left-press");
                CrComLib.publishEvent("b", "38", true);
                changeAllSigstoFalse("left");
                break;
            case "right":
                element.classList.remove(...directionClassArr);
                element.classList.add("dpad-right-press");
                CrComLib.publishEvent("b", "39", true);
                changeAllSigstoFalse("right");
                break;
            case "select":
                // element.classList.remove(...directionClassArr);
                // element.classList.add("dpad-select-press");
                // CrComLib.publishEvent("b", "40", true);
                // changeAllSigstoFalse("select");
                break;
            default:
                changeAllSigstoFalse("none");
                element.classList.remove(...directionClassArr);
                break;
        }

    });

    element.addEventListener("touchend", (e) => {
        changeAllSigstoFalse("none");
        relativeX = -1;
        relativeY = -1;
        element.classList.remove(...directionClassArr);
    });
});




let numpadClasses = [
    { className: "remote-1", joinNumber: 57 },
    { className: "remote-2", joinNumber: 58 },
    { className: "remote-3", joinNumber: 59 },
    { className: "remote-4", joinNumber: 60 },
    { className: "remote-5", joinNumber: 61 },
    { className: "remote-6", joinNumber: 62 },
    { className: "remote-7", joinNumber: 63 },
    { className: "remote-8", joinNumber: 64 },
    { className: "remote-9", joinNumber: 65 },
    { className: "remote-0", joinNumber: 66 }
];


numpadClasses.forEach(item => {
    els = document.getElementsByClassName(item.className);
    Array.from(els).forEach(element => {
        element.addEventListener("click", function (event) {
            CrComLib.publishEvent("b", item.joinNumber, true);
            setTimeout(() => CrComLib.publishEvent("b", item.joinNumber, false), 100);
        });
    });
})


els = document.getElementsByClassName("remote-channel-down")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "68", true);
        setTimeout(() => CrComLib.publishEvent("b", "68", false), 100);
    });
});

els = document.getElementsByClassName("remote-channel-up")
Array.from(els).forEach(element => {
    element.addEventListener("click", function (event) {
        CrComLib.publishEvent("b", "69", true);
        setTimeout(() => CrComLib.publishEvent("b", "69", false), 100);
    });
});
