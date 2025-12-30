// 16-simple.js - الإصدار المبسط
const fs = require('fs');

// تأكد من وجود الملف
if (!fs.existsSync("input.txt")) {
  console.log("Creating input.txt for testing...");
  fs.writeFileSync("input.txt", "Line 1\nLine 2\nLine 3\nLine 4\nLine 5");
}

// إنشاء stream للقراءة
const stream = fs.createReadStream("input.txt");
let lines = 0;

// عد الأسطر
stream.on('data', chunk => {
  lines += (chunk.toString().match(/\n/g) || []).length;
});

// عند الانتهاء
stream.on('end', () => {
  console.log(`Number of lines: ${lines}`);
});

// معالجة الأخطاء
stream.on('error', err => {
  console.error("Error:", err.message);
});