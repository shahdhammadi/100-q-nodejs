// 27.mjs - Global __dirname in ESM
// يجب أن يكون اسم الملف .mjs أو إضافة "type": "module" في package.json

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

console.log("=== __dirname in ES Modules ===\n");

console.log("🎯 In CommonJS, __dirname is available globally.");
console.log("   In ES Modules, you need to create it from import.meta.url\n");

// الحصول على __filename و __dirname في ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("ES Module equivalents:");
console.log(`  import.meta.url: ${import.meta.url}`);
console.log(`  __filename: ${__filename}`);
console.log(`  __dirname: ${__dirname}\n`);

// أمثلة عملية
console.log("Practical examples:\n");

// 1. قراءة الملف الحالي
console.log("1. Reading current file:");
try {
  const currentFileContent = fs.readFileSync(__filename, 'utf8');
  console.log(`   File size: ${currentFileContent.length} characters`);
  console.log(`   First 50 chars: ${currentFileContent.substring(0, 50)}...\n`);
} catch (err) {
  console.log(`   Error: ${err.message}\n`);
}

// 2. إنشاء مسارات
console.log("2. Creating paths:");
const dataDir = join(__dirname, 'data');
const configFile = join(__dirname, 'config', 'app.json');

console.log(`   data directory: ${dataDir}`);
console.log(`   config file: ${configFile}\n`);

// 3. مقارنة مع CommonJS
console.log("3. Comparison with CommonJS:");
console.log(`
   // CommonJS
   console.log(__dirname);  // Works directly
   console.log(__filename); // Works directly
   
   // ES Modules  
   import { fileURLToPath } from 'url';
   import { dirname } from 'path';
   
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename);
`);

// 4. وظيفة مساعدة
console.log("\n4. Utility function for easier use:");
function getDirname(importMetaUrl) {
  return dirname(fileURLToPath(importMetaUrl));
}

function getFilename(importMetaUrl) {
  return fileURLToPath(importMetaUrl);
}

console.log(`   Using helper: ${getDirname(import.meta.url)}`);

// 5. استخدام في ملفات مختلفة
console.log("\n5. Different usage patterns:");

console.log("Pattern 1 - Direct in each file:");
console.log(`
   import { fileURLToPath } from 'url';
   import { dirname } from 'path';
   
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename);
`);

console.log("\nPattern 2 - Create utility module:");
console.log(`
   // utils.mjs
   import { fileURLToPath } from 'url';
   import { dirname } from 'path';
   
   export function getDirname(url) {
     return dirname(fileURLToPath(url));
   }
   
   // app.mjs  
   import { getDirname } from './utils.mjs';
   const __dirname = getDirname(import.meta.url);
`);

console.log("\nPattern 3 - Wrapper function:");
console.log(`
   function withDirname(callback) {
     const __dirname = dirname(fileURLToPath(import.meta.url));
     return callback(__dirname);
   }
   
   withDirname((__dirname) => {
     // Use __dirname here
   });
`);

// 6. مثال مع مسارات ديناميكية
console.log("\n6. Dynamic path resolution:");
const projectRoot = dirname(dirname(__filename));
const nodeModules = join(projectRoot, 'node_modules');

console.log(`   Project root: ${projectRoot}`);
console.log(`   Node modules: ${nodeModules}`);

// التحقق من وجود ملفات
console.log("\n7. File existence check:");
const filesToCheck = [
  __filename,
  join(__dirname, 'package.json'),
  join(__dirname, 'nonexistent.txt')
];

filesToCheck.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`   ${file}: ${exists ? '✅ Exists' : '❌ Not found'}`);
});

// نصيحة للهجرة
console.log("\n💡 Migration tips:");
console.log("- Change .js to .mjs for ES Modules");
console.log("- Or add 'type': 'module' in package.json");
console.log("- Update require() to import");
console.log("- Add __dirname/__filename emulation");

// إنشاء package.json للتوضيح
console.log("\n📁 Example package.json for ESM:");
const packageExample = {
  type: "module",
  name: "esm-project",
  version: "1.0.0",
  main: "app.mjs"
};

console.log(JSON.stringify(packageExample, null, 2));

console.log("\n🚀 To run this file:");
console.log("   node 27.mjs");
console.log("   or rename to 27.js and add 'type': 'module' to package.json");