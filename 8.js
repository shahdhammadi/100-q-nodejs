const fs = require('fs');
fs.writeFileSync("out.txt", "Hello");
fs.appendFileSync("out.txt", "World");