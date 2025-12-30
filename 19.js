// 19.js - Timers with Promise
console.log("=== Promise-based Delay Function ===\n");

// دالة delay الأساسية
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// أمثلة على الاستخدام
async function examples() {
  console.log("Example 1: Simple delay");
  console.log("Start:", new Date().toLocaleTimeString());
  
  await delay(2000);
  console.log("After 2 seconds:", new Date().toLocaleTimeString());
  
  console.log("\n---\n");
  
  console.log("Example 2: Multiple delays");
  for (let i = 1; i <= 3; i++) {
    console.log(`Step ${i}: ${new Date().toLocaleTimeString()}`);
    await delay(1000);
  }
  
  console.log("\n---\n");
  
  console.log("Example 3: Delay with return value");
  const delayedValue = await delay(1000).then(() => "Hello after 1 second!");
  console.log(delayedValue);
  
  console.log("\n---\n");
  
  console.log("Example 4: Parallel delays");
  const start = Date.now();
  
  await Promise.all([
    delay(1000).then(() => console.log("Task 1 done")),
    delay(2000).then(() => console.log("Task 2 done")),
    delay(1500).then(() => console.log("Task 3 done"))
  ]);
  
  const end = Date.now();
  console.log(`All done in ${end - start}ms (approximately 2000ms)`);
  
  console.log("\n---\n");
  
  console.log("Example 5: Delay with cancellation");
  const controller = new AbortController();
  
  // إلغاء بعد 500ms
  setTimeout(() => {
    controller.abort();
    console.log("Delay cancelled!");
  }, 500);
  
  try {
    await delay(2000, controller.signal);
    console.log("Delay completed (should not reach here)");
  } catch (err) {
    console.log("Caught error:", err.message);
  }
}

// إضافة اختياري لدعم الـ AbortController
function delayWithSignal(ms, signal) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, ms);
    
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeout);
        reject(new Error('Delay cancelled'));
      });
    }
  });
}

// تشغيل الأمثلة
examples().catch(console.error);

console.log("\n📋 Function definition:");
console.log(`
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Usage:
async function example() {
  console.log("Start");
  await delay(1000); // انتظر ثانية
  console.log("End");
}
`);