const fs = require("fs");

function cleaner(text) {
  const modifiedContent = text.replace(/\s+/g, " ").replace(/\n\s*\n/g, "\n");
  return modifiedContent;
}

function read() {
  return new Promise((resolve) => {
    fs.readFile("a.txt", "utf-8", (err, data) => {
      resolve(data);
    });
  });
}

function write(text) {
  return new Promise((resolve) => {
    fs.writeFile("a.txt", text, (err) => {
      if (err) throw err;
      else {
        console.log("the spaces were removed successfully");
        resolve(text);
      }
    });
  });
}

function print(text) {
  console.log(text);
}

read().then(cleaner).then(write).then(print);