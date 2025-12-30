// 17-simple.js - الإصدار المبسط
const fs = require('fs');
const zlib = require('zlib');

// أنشئ ملف big.txt إذا لم يكن موجوداً
if (!fs.existsSync('big.txt')) {
  console.log('Creating big.txt with test data...');
  const data = 'x'.repeat(10000); // 10KB من البيانات
  fs.writeFileSync('big.txt', data);
  console.log('big.txt created');
}

console.log('Compressing big.txt to big.txt.gz...');

// استخدم pipe لضغط الملف
fs.createReadStream('big.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('big.txt.gz'))
  .on('finish', () => {
    console.log('✅ Compression complete!');
    
    // عرض أحجام الملفات
    const originalSize = fs.statSync('big.txt').size;
    const compressedSize = fs.statSync('big.txt.gz').size;
    
    console.log(`Original: ${originalSize} bytes`);
    console.log(`Compressed: ${compressedSize} bytes`);
    console.log(`Ratio: ${((originalSize - compressedSize) / originalSize * 100).toFixed(1)}% smaller`);
  })
  .on('error', (err) => {
    console.error('Error:', err.message);
  });