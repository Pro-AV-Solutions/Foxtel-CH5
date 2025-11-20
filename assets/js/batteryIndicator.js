const batteryLevel = document.getElementById("battery-level");
const batteryLevelIcon = document.getElementById("battery-level-icon");
const batteryChargingIcon = document.getElementById("battery-charging-icon");

const currentTime = document.getElementById("current-time");

let batteryIsCharging = false;

navigator.getBattery().then((battery) => {
    batteryIsCharging = battery.charging;
    if (batteryIsCharging) {
        batteryChargingIcon.style.visibility = "visible";
    } else {
        batteryChargingIcon.style.visibility = "hidden";
    }

    battery.addEventListener("chargingchange", () => {
        batteryIsCharging = battery.charging;
        if (batteryIsCharging) {
            batteryChargingIcon.style.visibility = "visible";
        } else {
            batteryChargingIcon.style.visibility = "hidden";
        }
    });
});

navigator.getBattery().then((battery) => {
    batteryLevel.innerHTML = Math.round(battery.level*100) + "%";
    batteryLevelIcon.style.width = battery.level*20 + "px";

    if (battery.level < 0.2) {
        batteryLevelIcon.style.backgroundColor = "red"
    }

    if (battery.level > 0.2) {
        batteryLevelIcon.style.backgroundColor = "white"
    }

    battery.addEventListener("levelchange", () => {
        batteryLevel.innerHTML = Math.round(battery.level*100) + "%";
        batteryLevelIcon.style.width = battery.level*20 + "px";

        if (battery.level < 0.2) {
            batteryLevelIcon.style.backgroundColor = "red"
        }
    
        if (battery.level > 0.2) {
            batteryLevelIcon.style.backgroundColor = "white"
        }
    })
});

function updateDateTime() {
    const datetime = new Date();
    currentTime.innerHTML = datetime.toLocaleDateString() + " " + datetime.toLocaleTimeString([], { hour: "numeric", minute: "numeric" })
}

setInterval(updateDateTime, 1000);