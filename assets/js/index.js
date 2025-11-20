// Import the Crestron Com Library
import * as CrComLib from "@crestron/ch5-crcomlib";

window.CrComLib = CrComLib;
window.bridgeReceiveIntegerFromNative = CrComLib.bridgeReceiveIntegerFromNative;
window.bridgeReceiveBooleanFromNative = CrComLib.bridgeReceiveBooleanFromNative;
window.bridgeReceiveStringFromNative = CrComLib.bridgeReceiveStringFromNative;
window.bridgeReceiveObjectFromNative = CrComLib.bridgeReceiveObjectFromNative;

// Basic Example of a single button

// const button = document.querySelector(".demo");
// button.addEventListener("click", function () {
//   console.log("Button Pressed");
//   CrComLib.publishEvent("b", "1", true);
//   setTimeout(() => CrComLib.publishEvent("b", "1", false), 200);
// });

// // Example of a container of buttons
// function handleSourcePress(e) {
//   // Sends value from the button to analog join 1 in simpl
//   // have to first convert the value to int
//   //const value = parseInt(e.target.value);
//   //CrComLib.publishEvent("n", "1", value);

//   // interlock logic
//   // get any source buttons with active css
//   var els = document.getElementsByClassName("source-button-active");
//   // set the elemeent back to inactive
//   Array.from(els).forEach((el) => {
//     el.className = "source-button";
//   });

//   // now set the source button that was just pressed to active
//   e.target.className = "source-button-active";
// }

// // listens to the class called sources and runs whenever pressed.  So basically any button inside the div
// // will trigger this eventListener to run
// document.querySelector(".sources").addEventListener("click", function (event) {
//   if (event.target.tagName === "BUTTON" && event.target.className != "source-button-space") {
//     handleSourcePress(event);
//   }
//   event.stopPropagation();
// });

// CrComLib.subscribeState("s", '1', (value) => {
//   var test = document.getElementById("tester-1");
//   console.log(value);
//   var temp = value;
//   test.innerHTML = temp;
// });
