let processor_ip = "10.10.10.201/html"
let channels_by_network = {}
let urls_by_network = {}
let network_chosen = 0;
let all_networks = [];
let num_networks = 0;
let tvChannelDiv = document.getElementById("fox-channel-div")
let currentNetwork = document.getElementById("fox-network-name")

import data from '../foxtel-channels.json';

function getTVDataStartup() {
  for (let index = 0; index < data.length; index++) {
    var current = data[index];
    var current_network = current.network;
    var current_id = current.id

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
  all_networks = Object.keys(channels_by_network)
  num_networks = all_networks.length;
  currentNetwork.innerHTML = all_networks[network_chosen];
  getTVData();
};

function tvButtonHandler(event) {
  try {
    const value = event.target.value;
    console.log(value);
    CrComLib.publishEvent("s", "2", value);
  } catch (error) {
    console.log("Pressed on undefined button");
  }
}

function getTVData() {
  var tvChannelButtons = tvChannelDiv.children;
  var old_clone = tvChannelButtons[0];

  let networks_list = Object.keys(channels_by_network);
  var network_channel_ids = Object.keys(channels_by_network[networks_list[network_chosen]]);

  for (let index = 0; index < network_channel_ids.length; index++) {
    var new_clone = old_clone.cloneNode(true);
    if (index == 0) {
      old_clone.style.backgroundImage = "url('http://" + processor_ip + "/channel-icons/" + urls_by_network[networks_list[network_chosen]][network_channel_ids[index]] + ".png')";
      old_clone.value = channels_by_network[networks_list[network_chosen]][network_channel_ids[index]]
    } else {
      try {
        new_clone.style.backgroundImage = "url('http://" + processor_ip + "/channel-icons/" + urls_by_network[networks_list[network_chosen]][network_channel_ids[index]] + ".png')";
        new_clone.value = channels_by_network[networks_list[network_chosen]][network_channel_ids[index]]
      } catch (error) {
        new_clone.style.backgroundImage = "url('\assets\img\button_9HD_290x170.png')";
      }
      old_clone.after(new_clone);
      old_clone = new_clone;
    }
  }

  tvChannelDiv.addEventListener("touchstart", tvButtonHandler);
  if (tvChannelDiv.scrollHeight < window.innerHeight * 51 / 100) {
    tvChannelDiv.style.overflowY = "hidden";
  } else {
    tvChannelDiv.style.overflowY = "scroll";
  }
};

getTVDataStartup();


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