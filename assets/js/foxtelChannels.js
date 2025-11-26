let processor_ip = "10.10.10.201/html";
let channels_by_network = {};
let urls_by_network = {};
let network_chosen = 0;
let all_networks = [];
let num_networks = 0;
let tvChannelDiv = document.getElementById("fox-channel-div");
let currentNetwork = document.getElementById("fox-network-name");

// --- SCROLL DETECTION VARIABLES ---
let activeChannelValue = null;
let isScrolling = false;
let startX = 0;
let startY = 0;

import data from '../foxtel-channels.json';

function getTVDataStartup() {
  for (let index = 0; index < data.length; index++) {
    var current = data[index];
    var current_network = current.network;
    var current_id = current.id;

    if (channels_by_network[current_network] == undefined) {
      channels_by_network[current_network] = {};
      urls_by_network[current_network] = {};
    }
    try {
      channels_by_network[current_network][current_id] = current.channel;
      urls_by_network[current_network][current_id] = current.imageId;
    } catch (error) {
      console.log(error);
    }
  }
  all_networks = Object.keys(channels_by_network);
  num_networks = all_networks.length;
  currentNetwork.innerHTML = all_networks[network_chosen];
  getTVData();
}

// --- TOUCH HANDLERS ---
function handleTouchStart(e) {
    isScrolling = false;
    // Record the starting position of the touch
    if (e.touches.length > 0) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }
}

function handleTouchMove(e) {
    if (isScrolling) return; // If already flagged as scroll, ignore
    
    if (e.touches.length > 0) {
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        // Calculate how far the finger moved
        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);
        
        // If moved more than 10px, assume user is scrolling
        if (diffX > 10 || diffY > 10) {
            isScrolling = true;
        }
    }
}

function handleTouchEnd(e) {
    // Only trigger the button if we did NOT scroll
    if (!isScrolling) {
        tvButtonHandler(e);
    }
}

function tvButtonHandler(event) {
  try {
    // 1. Identify the button (handle clicks on internal text/spans)
    let btn = event.target;
    while (!btn.classList.contains('channel-btn') && btn !== tvChannelDiv) {
        btn = btn.parentElement;
    }
    
    // Safety check: if we didn't find a button, exit
    if (!btn || !btn.classList.contains('channel-btn')) return;

    // 2. Remove 'active-channel' from all other buttons currently visible
    let allBtns = tvChannelDiv.getElementsByClassName("channel-btn");
    Array.from(allBtns).forEach(b => b.classList.remove("active-channel"));

    // 3. Add 'active-channel' to the clicked button
    btn.classList.add("active-channel");

    // 4. Update Global State
    const value = btn.value;
    activeChannelValue = value; 

    console.log("Channel Selected:", value);
    CrComLib.publishEvent("s", "2", value);

  } catch (error) {
    console.log("Pressed on undefined button", error);
  }
}

function getTVData() {
  var tvChannelButtons = tvChannelDiv.children;
  var old_clone = tvChannelButtons[0];

  let networks_list = Object.keys(channels_by_network);
  var network_channel_ids = Object.keys(channels_by_network[networks_list[network_chosen]]);

  for (let index = 0; index < network_channel_ids.length; index++) {
    var new_clone = old_clone.cloneNode(true);
    
    // Reset classes
    new_clone.className = "channel-btn"; 
    
    let chVal = channels_by_network[networks_list[network_chosen]][network_channel_ids[index]];
    
    if (index == 0) {
      old_clone.style.backgroundImage = "url('http://" + processor_ip + "/channel-icons/" + urls_by_network[networks_list[network_chosen]][network_channel_ids[index]] + ".png')";
      old_clone.value = chVal;
      old_clone.innerHTML = ""; 

      if (old_clone.value === activeChannelValue) {
        old_clone.classList.add("active-channel");
      } else {
        old_clone.classList.remove("active-channel");
      }

    } else {
      try {
        new_clone.style.backgroundImage = "url('http://" + processor_ip + "/channel-icons/" + urls_by_network[networks_list[network_chosen]][network_channel_ids[index]] + ".png')";
        new_clone.value = chVal;
        new_clone.innerHTML = "";
      } catch (error) {
        new_clone.style.backgroundImage = "url('assets/img/button_9HD_290x170.png')";
      }

      if (new_clone.value === activeChannelValue) {
          new_clone.classList.add("active-channel");
      }

      old_clone.after(new_clone);
      old_clone = new_clone;
    }
  }

  // --- CHANGED: Separate Listeners for Scroll Detection ---
  tvChannelDiv.removeEventListener("touchstart", handleTouchStart);
  tvChannelDiv.removeEventListener("touchmove", handleTouchMove);
  tvChannelDiv.removeEventListener("touchend", handleTouchEnd);

  // Use 'passive: true' for move/start to ensure smooth scrolling performance
  tvChannelDiv.addEventListener("touchstart", handleTouchStart, { passive: true });
  tvChannelDiv.addEventListener("touchmove", handleTouchMove, { passive: true });
  tvChannelDiv.addEventListener("touchend", handleTouchEnd);
}

getTVDataStartup();

// --- NUMPAD / DPAD TOGGLE LOGIC ---
const toggleBtn = document.getElementById("foxtel-remote-style");
const dpadContainer = document.getElementById("fox-remote-casing-dpad");
const numpadContainer = document.getElementById("fox-remote-casing-numpad");

if (toggleBtn && dpadContainer && numpadContainer) {
    toggleBtn.addEventListener("touchstart", function(e) {
        // Toggle the visibility class
        dpadContainer.classList.toggle("display-none-class");
        numpadContainer.classList.toggle("display-none-class");
        
        // Optional: Change button text to indicate current mode
        if (dpadContainer.classList.contains("display-none-class")) {
            toggleBtn.innerHTML = "Nav"; // Showing Numbers, so button says "Go to Nav"
            toggleBtn.classList.add("active"); // Visual feedback
        } else {
            toggleBtn.innerHTML = "123"; // Showing Nav, so button says "Go to 123"
            toggleBtn.classList.remove("active");
        }
    });
}

document.querySelector("#fox-network-navigation-button-next").addEventListener("touchstart", function (event) {
  if (network_chosen + 1 == num_networks) {
    network_chosen = 0;
  } else {
    network_chosen++;
  }
  currentNetwork.innerHTML = all_networks[network_chosen];
  var div = document.getElementById("fox-channel-div");
  while (div.childElementCount > 1) {
    div.removeChild(div.firstChild);
  }
  getTVData();
});

document.querySelector("#fox-network-navigation-button-previous").addEventListener("touchstart", function (event) {
  if (network_chosen == 0) {
    network_chosen = num_networks - 1;
  } else {
    network_chosen--;
  }
  currentNetwork.innerHTML = all_networks[network_chosen];
  var div = document.getElementById("fox-channel-div");
  while (div.childElementCount > 1) {
    div.removeChild(div.firstChild);
  }
  getTVData();
});