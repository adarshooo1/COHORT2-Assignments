// 1.Counter.md:
function counter() {
  let count = 0;

  function incrementAndLog() {
    console.log(count);
    count++;

    //Go endless if not stop
    if (count > 99) {
      clearInterval(IntervalId);
    }
  }

  const IntervalId = setInterval(incrementAndLog, 200);
}
counter();

// -----------------------------------------------------------------------------------------------------
// 2.Counter.md:
function counter2() {
  for (let i = 0; i < 100; i++) {
    (function (j) {
      setTimeout(() => {
        console.log(j);
      }, j * 1000);
    })(i);
  }
}
counter2();
counter2();

// -----------------------------------------------------------------------------------------------------
// 3.read-from-file.md:

const fs = require("fs");

// Task 1
console.log("Hello, I am 1"); //Sync Task

// Task 2
function sum(a) {
  console.log(`The sum of ${a} + ${a} is: ${a + a}`); //Async Task
}
sum(1); //Sync Task

// Task 3
for (let i = 0; i < 100; i++) {
  console.log(i); //Sync Task
}

// Task 4
for (let i = 0; i < 100; i++) {
  setTimeout(() => {
    console.log(`I am waiting ${i} sec`);
  }, i * 100);
}

// Task 5
fs.readFile(__dirname + "/demo.txt", "utf-8", (err, data) => {
  // Sub-task 5.1
  // Introducing an asynchronous operation inside the callback
  setTimeout(() => {
    console.log("Async operation completed after 5000 milliseconds");
  }, 10000);

  if (err) {
    throw new Error();
  } else {
    console.log(data);
  }
}); //Async Task

// Task 6
// Introducing a promise-based asynchronous operation
const promiseFunction = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Promise resolved after 3000 milliseconds");
      resolve();
    }, 100);
  });
};

promiseFunction().then(() => {
  // More synchronous and asynchronous operations here
  console.log("Promise chain completed, This is final task");
});

// Task 7
for (let i = 0; i < 100; i++) {
  console.log("I am sync loop running for 100 count");
}

//-------------------------------------------------------------------------------
// 4.Write-to-file.md

fs.readFile(__dirname + "/demo.txt", "utf8", (err, data) => {
  if (err) {
    throw new Error();
  } else {
    fs.writeFile(__dirname + "/output.txt", data.toUpperCase(), (err, data) => {
      if (err) {
        throw new Error();
      } else {
        console.log("Data successfully written to output.txt");
      }
    });
  }
});
