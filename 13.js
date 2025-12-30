// 13-simple.js - Remove Listener (نسخة مبسطة)
const EventEmitter = require('events');
const ee = new EventEmitter();

// تعريف المستمعين
const listener1 = () => console.log("✅ Listener 1");
const listener2 = () => console.log("❌ Listener 2");

// إضافة المستمعين
ee.on('test', listener1);
ee.on('test', listener2);

console.log("أول إطلاق (كلاهما يعمل):");
ee.emit('test'); // يعمل كل من listener1 و listener2

console.log("\nإزالة listener2...");
ee.removeListener('test', listener2);

console.log("ثاني إطلاق (فقط listener1 يعمل):");
ee.emit('test'); // يعمل فقط listener1