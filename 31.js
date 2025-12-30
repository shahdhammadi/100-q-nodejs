// 31.js - Callbacks to Promises
const fs = require('fs').promises; // استخدم fs.promises

console.log("=== Converting Callbacks to Promises ===\n");

console.log("🎯 Old way: Callback style");
console.log(`
fs.readFile('a.txt', (err, data) => {
  if (err) throw err;
  console.log(data.length);
});
`);

console.log("\n🎯 New way: Promise style with async/await");
console.log(`
async function readFileAsync() {
  try {
    const data = await fs.promises.readFile('a.txt');
    console.log(data.length);
  } catch (err) {
    console.error('Error:', err.message);
  }
}
`);

// تنفيذ فعلي
async function demonstrate() {
  console.log("\n🔍 Demonstration:\n");
  
  // إنشاء ملف للاختبار إذا لم يكن موجوداً
  try {
    await fs.access('a.txt');
  } catch {
    await fs.writeFile('a.txt', 'This is test content for file a.txt');
    console.log("✅ Created a.txt for testing");
  }
  
  // الطريقة القديمة (Callback)
  console.log("1. Callback style (old way):");
  require('fs').readFile('a.txt', (err, data) => {
    if (err) {
      console.log("   Error:", err.message);
    } else {
      console.log(`   File size: ${data.length} bytes`);
    }
  });
  
  // انتظر قليلاً
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // الطريقة الجديدة (Promise)
  console.log("\n2. Promise style (new way):");
  try {
    const data = await fs.readFile('a.txt');
    console.log(`   File size: ${data.length} bytes`);
  } catch (err) {
    console.log("   Error:", err.message);
  }
  
  // دالة تحويل عامة
  console.log("\n3. Generic callback-to-promise converter:");
  
  function callbackToPromise(fn) {
    return function(...args) {
      return new Promise((resolve, reject) => {
        fn(...args, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };
  }
  
  // مثال: تحويل fs.readFile
  const readFilePromise = callbackToPromise(require('fs').readFile);
  const data = await readFilePromise('a.txt');
  console.log(`   Converted function result: ${data.length} bytes`);
}

demonstrate().catch(console.error);