// // Async Functions

// setTimeout Function:
function onDone() {
  console.log("Hi there");
}
setTimeout(onDone, 3000);

setTimeout(function () {
  console.log("Set Time out Function 2");
  setTimeout(function () {
    //Weather the function is inside the setTimeout but, As any async task completed then it will log that value. As well as forming callback hell
    console.log("Inside set Time out function");
  }, 4000);
}, 1000);

// readFile Function :
const fs = require("fs");
fs.readFile(__dirname + "/demo.txt", "utf-8", (err, data) => {
  console.log("Started reading demo.text file:");
  console.log(data);
});

// setInterval Function :
setInterval(function () {
  console.log("Set Interval Example");
}, 1000);

// 4 Major reason to use promises:
// a) Doing a Network call;
// b) Sleep/Wait for some time;
// c) Read a file;
// d) Database Call;
