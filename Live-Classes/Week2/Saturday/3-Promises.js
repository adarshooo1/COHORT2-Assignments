// What is Promises?
// Answer : Just a syntactical sugar over callback.

function myOwnSetTimeout(duration) {
  let p1 = new Promise(function (resolve, reject) {
    //Taking Default argument in promise is important.
    setTimeout(function () {
      resolve("Inside the promise");
    }, duration);
  });
  return p1; //Returning Promise is important
}

myOwnSetTimeout(2000).then(function (resoledValue) {
  console.log("Promises");
  console.log(resoledValue);
});

// readFile Promisify function:
const fs = require("fs").promises;

function readFileWithPromises(filePath) {
  return fs.readFile(filePath, "utf-8");
}

readFileWithPromises(__dirname + "/demo.txt")
  .then(function (value) {
    console.log("Read File Results: ", value);
  })
  .catch(function (error) {
    console.log("Error Occurred : ", error);
  });

//=====================================================
// Promise Chaining
function PromisifyTimeout(duration) {
  const p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("I am resolved");
    }, duration);
  });
  return p;
}
// Promise Chaining
PromisifyTimeout(4000)
  .then(function (resoledValue) {
    console.log("Promise Resolved Level 1");
    console.log(resoledValue);
    return PromisifyTimeout(3000);
  })
  .then(function (resoledValue) {
    console.log("Promise Resolved Level 2");
    console.log(resoledValue);
    return PromisifyTimeout(2000);
  })
  .then(function (resoledValue) {
    console.log("Promise Resolved Level 3");
    console.log(resoledValue);
    return PromisifyTimeout(1000);
  })
  .then(function (resoledValue) {
    console.log("Promise Resolved Level 4");
    console.log(resoledValue);
  });
