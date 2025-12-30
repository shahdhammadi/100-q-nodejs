// 23-simple.js - الإصدار المبسط
const os = require('os');

console.log("=== OS Info ===");
console.log(`Platform: ${os.platform()}`);
console.log(`CPU Count: ${os.cpus().length}`);
console.log(`Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(0)} MB`);