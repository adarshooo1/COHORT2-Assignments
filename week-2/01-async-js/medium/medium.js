// 1.file-cleaned.md
const fs = require("fs");

fs.readFile(__dirname + "/unorderedFile.txt", "utf-8", (err, data) => {
  if (err) {
    throw new Error(err);
  } else {
    //Replace white space with single space.
    const cleanContent = data.replace(/\s+/g, " ");
    fs.writeFile(__dirname + "/orderedFile.txt", cleanContent, (err, data) => {
      if (err) {
        throw new Error(err);
      } else {
        console.log("Data Cleaned");
      }
    });
  }
});
//-------------------------------------------------------------------------------
// 2.clock.md
function clock() {
  let counter = 0;

  function printer() {
    const currentDate = new Date();
    const HH = currentDate.getHours();
    const MM = currentDate.getMinutes();
    const SS = currentDate.getSeconds();

    console.log(
      `Date :- ${
        currentDate.getDate() +
        "-" +
        (currentDate.getMonth() + 1) +
        "-" +
        currentDate.getFullYear()
      } || Time:- ${HH} : ${MM} : ${SS}`
    );
    counter++;
  }

  setInterval(printer, 1000);
}

clock();
