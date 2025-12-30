const EventEmitter = require("events");
const ee = new EventEmitter();
let count=0;
ee.on("ping", () => count++);
ee.emit("ping"); ee.emit("ping");
console.log(count);