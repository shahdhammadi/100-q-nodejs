// 24.js - Console Timing
const fs = require('fs');

console.log("=== Console Timing API ===\n");

console.log("🎯 console.time() and console.timeEnd() are used to measure");
console.log("   how long a piece of code takes to execute.\n");

// مثال 1: قياس وقت تنفيذ دالة
console.log("Example 1: Measuring function execution time");
console.time('function-timer');

function calculateSum(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

const result = calculateSum(1000000);
console.timeEnd('function-timer');
console.log(`Result: ${result}\n`);

// مثال 2: قياس وقت قراءة ملف
console.log("Example 2: Measuring file read time");
console.time('readFile-timer');

fs.readFile(__filename, 'utf8', (err, data) => {
  console.timeEnd('readFile-timer');
  console.log(`File size: ${data.length} characters\n`);
  
  // مثال 3: قياس متعدد
  console.log("Example 3: Multiple timers");
  console.time('nested-timer');
  
  setTimeout(() => {
    console.time('inner-timer');
    
    // محاكاة عمل
    let arr = [];
    for (let i = 0; i < 100000; i++) {
      arr.push(Math.random());
    }
    
    console.timeEnd('inner-timer');
    console.timeEnd('nested-timer');
    
    // مثال 4: timeLog
    console.log("\nExample 4: Using console.timeLog()");
    console.time('multiphase-timer');
    
    setTimeout(() => {
      console.timeLog('multiphase-timer', 'Phase 1 complete');
      
      setTimeout(() => {
        console.timeLog('multiphase-timer', 'Phase 2 complete');
        
        setTimeout(() => {
          console.timeEnd('multiphase-timer');
          
          // دالة مساعدة
          showUsageExamples();
        }, 500);
      }, 300);
    }, 200);
  }, 100);
});

function showUsageExamples() {
  console.log("\n📚 Usage Examples:\n");
  
  console.log("1. Basic timing:");
  console.log(`
  console.time('myTimer');
  // ... some code ...
  console.timeEnd('myTimer');
  `);
  
  console.log("\n2. Multiple timers:");
  console.log(`
  console.time('timer1');
  console.time('timer2');
  
  // Code for timer1
  console.timeEnd('timer1');
  
  // Code for timer2  
  console.timeEnd('timer2');
  `);
  
  console.log("\n3. Intermediate logging:");
  console.log(`
  console.time('process');
  // Phase 1
  console.timeLog('process', 'Phase 1 done');
  
  // Phase 2
  console.timeLog('process', 'Phase 2 done');
  
  console.timeEnd('process');
  `);
  
  console.log("\n💡 Tips:");
  console.log("- Use descriptive labels for timers");
  console.log("- Avoid nested timers with the same label");
  console.log("- timeLog() is useful for long-running processes");
  console.log("- Timers are not suitable for micro-optimizations");
  
  // إنشاء ملف كبير للاختبار
  console.log("\n🎯 Real-world example: Large file processing");
  
  if (!fs.existsSync('large.bin')) {
    console.log("Creating test file 'large.bin' (1MB)...");
    const buffer = Buffer.alloc(1024 * 1024, 'x');
    fs.writeFileSync('large.bin', buffer);
  }
  
  console.time('large-file-read');
  fs.readFile('large.bin', (err, data) => {
    console.timeEnd('large-file-read');
    console.log(`Large file size: ${(data.length / 1024 / 1024).toFixed(2)} MB`);
    
    // تنظيف
    fs.unlinkSync('large.bin');
    console.log("Test file cleaned up");
  });
}

console.log("\n⏳ Running examples...");