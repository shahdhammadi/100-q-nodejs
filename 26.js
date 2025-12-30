// 26.js - Buffer Concat
console.log("=== Buffer.concat() ===\n");

console.log("🎯 Buffer.concat() merges multiple buffers into one.\n");

// مثال 1: دمج bufferين بسيطين
console.log("Example 1: Basic concatenation\n");

const buf1 = Buffer.from('Hello');
const buf2 = Buffer.from(' ');
const buf3 = Buffer.from('World');
const buf4 = Buffer.from('!');

console.log("Individual buffers:");
console.log(`  buf1: "${buf1.toString()}" (${buf1.length} bytes)`);
console.log(`  buf2: "${buf2.toString()}" (${buf2.length} bytes)`);
console.log(`  buf3: "${buf3.toString()}" (${buf3.length} bytes)`);
console.log(`  buf4: "${buf4.toString()}" (${buf4.length} bytes)`);

const combined = Buffer.concat([buf1, buf2, buf3, buf4]);
console.log(`\nCombined: "${combined.toString()}" (${combined.length} bytes)`);
console.log(`Hex: ${combined.toString('hex')}\n`);

// مثال 2: دمج مع حجم محدد
console.log("Example 2: Concatenation with total length\n");

const buffers = [
  Buffer.from('Part1'),
  Buffer.from('Part2'),
  Buffer.from('Part3'),
  Buffer.from('ExtraData')
];

console.log("All buffers:");
buffers.forEach((buf, i) => {
  console.log(`  Buffer ${i + 1}: "${buf.toString()}" (${buf.length} bytes)`);
});

// دمج أول 15 بايت فقط
const limited = Buffer.concat(buffers, 15);
console.log(`\nLimited to 15 bytes: "${limited.toString()}"`);
console.log(`Length: ${limited.length} bytes\n`);

// مثال 3: دمج بيانات ثنائية
console.log("Example 3: Binary data concatenation\n");

const binary1 = Buffer.from([0x48, 0x65, 0x6C, 0x6C, 0x6F]); // Hello
const binary2 = Buffer.from([0x20]); // Space
const binary3 = Buffer.from([0x57, 0x6F, 0x72, 0x6C, 0x64]); // World

const binaryCombined = Buffer.concat([binary1, binary2, binary3]);
console.log("Binary buffers combined:");
console.log(`  Decimal: [${Array.from(binaryCombined).join(', ')}]`);
console.log(`  Hex: ${binaryCombined.toString('hex')}`);
console.log(`  String: "${binaryCombined.toString()}"\n`);

// مثال 4: تطبيق عملي - بناء رسالة شبكة
console.log("Example 4: Building a network message\n");

function buildNetworkMessage(type, data) {
  const header = Buffer.from([type]);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const body = Buffer.from(data);
  
  return Buffer.concat([header, length, body], 1 + 4 + data.length);
}

const message = buildNetworkMessage(1, 'Hello Server');
console.log("Network message structure:");
console.log(`  Type byte: ${message[0]}`);
console.log(`  Length: ${message.readUInt32BE(1)} bytes`);
console.log(`  Body: "${message.slice(5).toString()}"`);
console.log(`  Full message (hex): ${message.toString('hex')}\n`);

// مثال 5: دمج ملفات
console.log("Example 5: Concatenating file chunks\n");

const fs = require('fs');

// إنشاء ملفات اختبار
const chunks = [
  Buffer.from('This is chunk 1\n'),
  Buffer.from('This is chunk 2\n'),
  Buffer.from('This is chunk 3\n'),
  Buffer.from('End of file\n')
];

// حفظ كل chunk كملف
chunks.forEach((chunk, i) => {
  fs.writeFileSync(`chunk${i + 1}.txt`, chunk);
});

console.log("Created 4 chunk files");
console.log("Simulating reading and concatenating...");

// محاكاة قراءة وتجميع
const fileBuffers = chunks;
const finalFile = Buffer.concat(fileBuffers);

console.log(`\nFinal concatenated content:`);
console.log(finalFile.toString());

console.log(`\nStatistics:`);
console.log(`  Total chunks: ${fileBuffers.length}`);
console.log(`  Total size: ${finalFile.length} bytes`);
console.log(`  Average chunk size: ${(finalFile.length / fileBuffers.length).toFixed(1)} bytes`);

// تنظيف الملفات
chunks.forEach((_, i) => {
  fs.unlinkSync(`chunk${i + 1}.txt`);
});

// تطبيقات متقدمة
console.log("\n🎯 Advanced applications:");

// 1. دمج أجزاء الصور
console.log("\n1. Image chunk concatenation:");
const imageChunks = [
  Buffer.from([0xFF, 0xD8, 0xFF]), // JPEG start
  Buffer.from([0xE0, 0x00, 0x10]), // APP0 marker
  Buffer.from([0x4A, 0x46, 0x49, 0x46, 0x00]) // "JFIF"
];

const imageHeader = Buffer.concat(imageChunks);
console.log(`  JPEG header: ${imageHeader.toString('hex')}`);

// 2. بناء JSON كبير
console.log("\n2. Building large JSON from chunks:");
const jsonParts = [
  Buffer.from('{"users":['),
  Buffer.from('{"id":1,"name":"Alice"},'),
  Buffer.from('{"id":2,"name":"Bob"},'),
  Buffer.from('{"id":3,"name":"Charlie"}'),
  Buffer.from(']}')
];

const fullJson = Buffer.concat(jsonParts);
console.log(`  JSON: ${fullJson.toString()}`);

console.log("\n💡 Best practices:");
console.log("- Specify totalLength for better performance");
console.log("- Avoid concatenating many small buffers frequently");
console.log("- Consider streams for very large data");
console.log("- Buffer.concat() creates a new buffer (doesn't modify originals)");