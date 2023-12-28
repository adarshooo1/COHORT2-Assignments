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

// Async & Await
// Now how to change this promise chaining to the async and await syntax
async function play() {
  try {
    let resolvedValue1 = await PromisifyTimeout(4000);
    console.log("PromisifyTimeout Resolved Level 1");
    console.log(resolvedValue1);

    let resolvedValue2 = await PromisifyTimeout(3000);
    console.log("PromisifyTimeout Resolved Level 2");
    console.log(resolvedValue2);

    let resolvedValue3 = await PromisifyTimeout(2000);
    console.log("PromisifyTimeout Resolved Level 3");
    console.log(resolvedValue3);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

play();
