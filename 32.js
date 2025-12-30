// 32-simple.js - الإصدار المبسط
const fs = require('fs').promises;

async function main() {
  // إنشاء الملفات إذا لم تكن موجودة
  try {
    await fs.writeFile('a.txt', 'Hello from file A');
    await fs.writeFile('b.txt', 'Hello from file B');
    console.log('Created test files');
  } catch {
    // الملفات موجودة بالفعل
  }
  
  // قراءة الملفين بالتزامن
  const [dataA, dataB] = await Promise.all([
    fs.readFile('a.txt'),
    fs.readFile('b.txt')
  ]);
  
  const totalBytes = dataA.length + dataB.length;
  console.log(`Total bytes: ${totalBytes}`);
  
  // تنظيف
  await Promise.all([
    fs.unlink('a.txt').catch(() => {}),
    fs.unlink('b.txt').catch(() => {})
  ]);
}

main().catch(console.error);