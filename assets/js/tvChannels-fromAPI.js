
let channels_by_network = {}
let urls_by_network = {}
let network_chosen = 0;
let num_networks = 0;
let tvChannelDiv = document.querySelector(".tv-channel-div")
let currentNetwork = document.getElementById("current-network")

channels_by_network["Ten"] = {};
urls_by_network["Ten"] = {};

function getTVDataStartup() {
  fetch("https://www.yourtv.com.au/api/regions/101/channels", {
    method: 'GET',
  })
  .then((repsonse) => repsonse.json())
  .then((data) => {
    for (let index = 0; index < data.length; index++) {
      var current = data[index];
      var current_network = current.network;
      var current_id = current.id
      
      if (current_id == 432260) {
        continue;
      }
      if (channels_by_network[current_network] == undefined) {
        channels_by_network[current_network] = {};
        urls_by_network[current_network] = {};
      }
      try {
        if (current_id == 431212) {
          channels_by_network["Seven"][current_id] = current.number;
          urls_by_network["Seven"][current_id] = current.logo.url;
        } else if (current.name.includes("10")) {
          channels_by_network["Ten"][current_id] = current.number;
          urls_by_network["Ten"][current_id] = current.logo.url;
          continue;
        } else {
          channels_by_network[current_network][current_id] = current.number;
          urls_by_network[current_network][current_id] = current.logo.url;
        }
      } catch (error) {
        console.log(error);
      }
    }
    all_networks = Object.keys(channels_by_network);
    num_networks = all_networks.length;
    currentNetwork.innerHTML = all_networks[network_chosen];
    getTVData();
  });
};

function tvButtonHandler(event) {
  try {
    const value = event.target.value;
    console.log(value);
    CrComLib.publishEvent("s", "1", value);
  } catch (error) {
    console.log("Pressed on undefined button");
  }
}

function getTVData() {
  var test = document.getElementsByClassName("tv-channel");
  var old_clone = test[0];
  
  let networks_list = Object.keys(channels_by_network);
  console.log(channels_by_network)
  var network_channel_ids = Object.keys(channels_by_network[networks_list[network_chosen]]);

  for (let index = 0; index < network_channel_ids.length; index++) {
    var new_clone = old_clone.cloneNode(true);
    if (index == 0) {
      // console.log("url('http://localhost:8090/channel-icons/" + urls_by_network[networks_list[network_chosen]][network_channel_ids[index]] +".png')");
      console.log(urls_by_network[networks_list[network_chosen]][network_channel_ids[index]])
      old_clone.style.backgroundImage  = "url('" + urls_by_network[networks_list[network_chosen]][network_channel_ids[index]] +"')";
      old_clone.value = channels_by_network[networks_list[network_chosen]][network_channel_ids[index]]
    } else {
      try {
        new_clone.style.backgroundImage  = "url('" + urls_by_network[networks_list[network_chosen]][network_channel_ids[index]] +"')";
        new_clone.value = channels_by_network[networks_list[network_chosen]][network_channel_ids[index]]
      } catch (error) {
        new_clone.style.backgroundImage = "url('\assets\img\button_9HD_290x170.png')";
      }
      old_clone.after(new_clone);
      old_clone = new_clone;
    }  
  }

  tvChannelDiv.addEventListener("click", tvButtonHandler );
  if (tvChannelDiv.scrollHeight < window.innerHeight*51/100) {
    console.log(tvChannelDiv.scrollHeight)
    tvChannelDiv.style.overflowY = "hidden";
  } else {
    tvChannelDiv.style.overflowY = "scroll";
  }
};

getTVDataStartup();

document.querySelector("#network-navigation-button-next").addEventListener("click", function (event) {
  if (network_chosen + 1 == num_networks) {
    network_chosen = 0;
  } else {
    network_chosen++;
  }
  currentNetwork.innerHTML = all_networks[network_chosen];
  var div = document.getElementById("tv-test"); 
  while(div.childElementCount > 1) { 
      div.removeChild(div.firstChild); 
  }
  getTVData();
});

document.querySelector("#network-navigation-button-previous").addEventListener("click", function (event) {
  if (network_chosen == 0) {
    network_chosen = num_networks-1;
  } else {
    network_chosen--;
  }
  currentNetwork.innerHTML = all_networks[network_chosen];
  var div = document.getElementById("tv-test"); 
  while(div.childElementCount > 1) { 
      div.removeChild(div.firstChild); 
  }
  getTVData();
});