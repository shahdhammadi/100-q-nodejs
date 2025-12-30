// 7-simple.js
const fs = require('fs');

// أنشئ ملف للاختبار
if (!fs.existsSync("data.txt")) {
  fs.writeFileSync("data.txt", "Hello World!");
}

// قراءة متزامنة
const sync = fs.readFileSync("data.txt").length;
console.log(`Sync read: ${sync} bytes`);

// قراءة غير متزامنة
fs.readFile("data.txt", (e, d) => {
  console.log(`Async read: ${d.length} bytes`);
  
  // تنظيف
  fs.unlinkSync("data.txt");
});