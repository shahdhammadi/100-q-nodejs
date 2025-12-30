// 25.js - Buffer Basics
console.log("=== Buffer Basics ===\n");

console.log("🎯 Buffers are used to handle binary data in Node.js.");
console.log("   They represent fixed-length sequences of bytes.\n");

// إنشاء Buffers بطرق مختلفة
console.log("1. Creating Buffers:\n");

// من نص
const buf1 = Buffer.from('Hello World', 'utf8');
console.log("From string 'Hello World':");
console.log(`  Buffer: ${buf1}`);
console.log(`  Length: ${buf1.length} bytes`);
console.log(`  Hex: ${buf1.toString('hex')}`);
console.log(`  Base64: ${buf1.toString('base64')}\n`);

// من مصفوفة بايتات
const buf2 = Buffer.from([72, 101, 108, 108, 111]); // ASCII for "Hello"
console.log("From array [72, 101, 108, 108, 111]:");
console.log(`  String: ${buf2.toString('utf8')}\n`);

// من buffer موجود
const buf3 = Buffer.from(buf1);
console.log("From existing buffer:");
console.log(`  Equals original: ${buf1.equals(buf3)}\n`);

// buffer فارغ
const buf4 = Buffer.alloc(10);
console.log("Allocated buffer (10 bytes):");
console.log(`  Buffer: ${buf4}`);
console.log(`  Filled with: ${buf4.toString('hex')}\n`);

// buffer مع قيمة ابتدائية
const buf5 = Buffer.alloc(10, 'x');
console.log("Allocated buffer filled with 'x':");
console.log(`  String: ${buf5.toString('utf8')}\n`);

// مثال: التحويل بين الترميزات
console.log("2. Encoding conversions:\n");
const text = "Node.js Buffer";
const utf8Buffer = Buffer.from(text, 'utf8');
const base64Buffer = Buffer.from(text, 'base64'); // مختلف

console.log(`Text: "${text}"`);
console.log(`UTF-8 Buffer: ${utf8Buffer.toString('hex')}`);
console.log(`UTF-8 to Base64: ${utf8Buffer.toString('base64')}`);
console.log(`Base64 Buffer: ${base64Buffer.toString('hex')}`);
console.log(`Base64 to String: ${base64Buffer.toString('utf8')}\n`);

// مثال: العمل مع Buffer
console.log("3. Buffer operations:\n");

const buffer = Buffer.from('Node.js is awesome!');
console.log(`Original: ${buffer.toString('utf8')}`);
console.log(`Length: ${buffer.length}`);
console.log(`First byte: ${buffer[0]} (${String.fromCharCode(buffer[0])})`);
console.log(`Slice(0, 7): ${buffer.slice(0, 7).toString()}`);
console.log(`Includes "js": ${buffer.includes(Buffer.from('js'))}`);

// تعديل buffer
buffer[0] = 78; // 'N' ASCII
console.log(`After modification: ${buffer.toString()}\n`);

// مثال: قراءة وكتابة
console.log("4. Reading and writing:\n");

const writeBuffer = Buffer.alloc(50);
const written = writeBuffer.write('Hello from Buffer', 'utf8');
console.log(`Written ${written} bytes`);
console.log(`Content: ${writeBuffer.toString('utf8', 0, written)}`);

// كتابة في موضع معين
writeBuffer.write('Node.js', 6);
console.log(`After writing at position 6: ${writeBuffer.toString('utf8', 0, 50)}\n`);

// مثال: مقارنة buffers
console.log("5. Comparing buffers:\n");

const bufA = Buffer.from('ABC');
const bufB = Buffer.from('ABC');
const bufC = Buffer.from('XYZ');

console.log(`bufA == bufB: ${bufA.equals(bufB)}`);
console.log(`bufA == bufC: ${bufA.equals(bufC)}`);
console.log(`Comparison (ABC vs XYZ): ${bufA.compare(bufC)}`);
// -1: bufA comes before bufC
// 0: equal
// 1: bufA comes after bufC

// مثال: تفريغ buffer كـ hex
console.log("\n6. Hex representation:\n");

const sample = Buffer.from('UTF-8 string');
console.log(`String: "${sample.toString()}"`);
console.log(`Hex: ${sample.toString('hex')}`);

// عرض جدول بايتات
console.log("\nByte breakdown:");
console.log("Index | Decimal | Hex | Char");
console.log("------|---------|-----|-----");
for (let i = 0; i < Math.min(sample.length, 10); i++) {
  const byte = sample[i];
  const hex = byte.toString(16).padStart(2, '0');
  const char = byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.';
  console.log(`${i.toString().padEnd(5)} | ${byte.toString().padEnd(7)} | ${hex}  | ${char}`);
}

// تطبيق عملي
console.log("\n🎯 Practical example: Creating a simple PNG header");
const pngHeader = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
console.log(`PNG Header: ${pngHeader.toString('hex')}`);
console.log(`As string: ${pngHeader.toString()}`); // سيظهر رموز غريبة

console.log("\n💡 Remember:");
console.log("- Buffers are not resizable");
console.log("- Use Buffer.from() instead of new Buffer()");
console.log("- Buffers handle binary data efficiently");