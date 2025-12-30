const fs = require('fs');
fs.readFile("file.txt", (err, data) => {
  console.log(data);
  setImmediate(() => console.log("after-read"));
});