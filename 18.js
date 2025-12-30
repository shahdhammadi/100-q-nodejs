// 18.js - Backpressure (التحكم في تدفق البيانات)
const fs = require('fs');
const { Readable, Writable } = require('stream');

console.log("=== Backpressure Demo ===\n");

// إنشاء readable stream مخصص
class SlowReadable extends Readable {
  constructor(options) {
    super(options);
    this.count = 0;
    this.max = 20;
  }

  _read(size) {
    this.count++;
    if (this.count > this.max) {
      this.push(null); // نهاية البيانات
      return;
    }
    
    const data = `Chunk ${this.count} - ${'x'.repeat(1000)}\n`;
    console.log(`📤 Producing chunk ${this.count} (${data.length} bytes)`);
    this.push(data);
  }
}

// إنشاء writable stream بطيء
class SlowWritable extends Writable {
  constructor(options) {
    super(options);
    this.chunkCount = 0;
  }

  _write(chunk, encoding, callback) {
    this.chunkCount++;
    console.log(`📥 Writing chunk ${this.chunkCount} (${chunk.length} bytes)`);
    
    // محاكاة كتابة بطيئة
    setTimeout(() => {
      console.log(`   ✓ Chunk ${this.chunkCount} written`);
      callback(); // استدعاء callback للإشارة بالاستعداد للمزيد
    }, 500);
  }
}

// === الطريقة اليدوية للتعامل مع Backpressure ===
function manualBackpressureDemo() {
  console.log("\n=== Manual Backpressure Handling ===\n");
  
  const readable = new SlowReadable();
  const writable = new SlowWritable();

  readable.on('data', (chunk) => {
    console.log(`📦 Data available: ${chunk.length} bytes`);
    
    // إذا كان الـ writable مشغولاً، أوقف القراءة
    if (!writable.write(chunk)) {
      console.log('⏸️  Pausing readable (writable is busy)');
      readable.pause();
    }
  });

  // عندما يكون الـ writable جاهزاً، استأنف القراءة
  writable.on('drain', () => {
    console.log('▶️  Resuming readable (writable is ready)');
    readable.resume();
  });

  readable.on('end', () => {
    console.log('✅ All data read');
    writable.end();
  });

  writable.on('finish', () => {
    console.log('✅ All data written');
    console.log('\n🎯 Backpressure handled successfully!');
  });
}

// === استخدام Pipe التلقائي ===
function autoPipeDemo() {
  console.log("\n=== Automatic Pipe (Handles Backpressure) ===\n");
  
  const readable = new SlowReadable();
  const writable = new SlowWritable();
  
  // pipe يتحكم تلقائياً في الـ backpressure
  readable.pipe(writable);
  
  writable.on('finish', () => {
    console.log('✅ Pipe completed successfully');
  });
}

// القائمة الرئيسية
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Choose backpressure demo:");
console.log("1. Manual backpressure handling");
console.log("2. Automatic pipe handling");
console.log("3. Both (compare)");

rl.question("\nYour choice (1-3): ", (choice) => {
  switch(choice) {
    case '1':
      manualBackpressureDemo();
      break;
    case '2':
      autoPipeDemo();
      break;
    case '3':
      console.log("\n=== Manual vs Automatic Comparison ===\n");
      setTimeout(() => {
        console.log("\n--- Manual Method ---");
        manualBackpressureDemo();
        
        setTimeout(() => {
          console.log("\n\n--- Automatic Pipe Method ---");
          autoPipeDemo();
          
          setTimeout(() => {
            console.log("\n\n🎯 Comparison complete!");
            rl.close();
          }, 15000);
        }, 8000);
      }, 1000);
      return;
    default:
      console.log("Using automatic pipe");
      autoPipeDemo();
  }
  
  setTimeout(() => {
    console.log("\n\n✅ Demo completed");
    rl.close();
  }, 15000);
});