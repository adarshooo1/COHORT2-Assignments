function square(n) {
  return n * n;
}

function cube(n) {
  return n * n * n;
}

function quad(n) {
  return n * n * n * n;
}

function doSomethingWithSquare(a, b) {
  let val1 = square(a);
  let val2 = square(b);
  return val1 + val2;
}

function doSomethingWithCube(a, b) {
  let val1 = cube(a);
  let val2 = cube(b);
  return val1 + val2;
}

function doSomethingWithQuad(a, b) {
  let val1 = quad(a);
  let val2 = quad(b);
  return val1 + val2;
}

let ans = doSomethingWithSquare(2, 2);
console.log(ans);

let ans2 = doSomethingWithCube(2, 2);
console.log(ans2);

let ans3 = doSomethingWithQuad(2, 2);
console.log(ans3);
// As we can see there is violation of DRY Principal
// ===========================================================

// So as we have function already of Square , Cube and Quad, Now we have to do something that we just pass the function and internally it automatically implement that function;

// Generic function, which can able to call any function
function doSomethingWithFunction(a, b, fn) {
  return fn(a) + fn(b);
}

let ans4 = doSomethingWithFunction(2, 2, square);
console.log(ans4);

let ans5 = doSomethingWithFunction(2, 2, cube);
console.log(ans5);

let ans6 = doSomethingWithFunction(2, 2, quad);
console.log(ans6);
// Now we can se we do not have to repeat the logic separately, we are just passing the logic in the argument now and it works same.

// ==================================================================
// Callback Function,

// Example 1:
// Question: We have to read a file and then log a copyright message when the file read successful. And this should be asynchronously other wise it can be mistakenly print some other result, So using callback we can do that, ans have have to wrap in the async function and when the async function completed then call the callback function
const fs = require("fs");
function putCopyRight(cb) {
  setTimeout(function () {
    fs.readFile(__dirname + "/demo.txt", "utf-8", (err, data) => {
      console.log(data);
      cb();
    });
  }, 4000);
}

putCopyRight(function () {
  console.log("Adarsh @ 24-03-2002"); //This will add the text when the read file will will done
});

// Example 2:
function putCopyRight(cb) {
  setTimeout(function () {
    console.log("I am people");
    cb();
  }, 3000);
}

putCopyRight(function () {
  console.log("Adarsh @ 24-03-2002"); //This will add the text when the read file will will done
});

// ======================================================

// Callback Hell:
// Create a function thats logs something after 1s and then waits for 2 seconds to log another sign.
function ownSetTimeoutFunction(fn, duration) {
  setTimeout(fn, duration);
}

ownSetTimeoutFunction(function () {
  console.log("Hello I am first");
  ownSetTimeoutFunction(function () {
    console.log("Hello I am Second");
    ownSetTimeoutFunction(function () {
      console.log("Hello I am Third");
      ownSetTimeoutFunction(function () {
        console.log("Hello I am Fourth");
        ownSetTimeoutFunction(function () {
          console.log("Hello I am Fifth");
          ownSetTimeoutFunction(function () {
            console.log("Hello I am Sixth");
            ownSetTimeoutFunction(function () {
              console.log("Hello I am Seventh"); // This is known as pyramid of Doom and Known as Callback Hell, Which basically represents that, One callback is dependent upon other callback to result
              // So to escape callback hell matrix Promises introduced.
            }, 4000);
          }, 4000);
        }, 4000);
      }, 4000);
    }, 4000);
  }, 4000);
}, 3000);
