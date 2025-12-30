// 28-simple.js - الإصدار المبسط
const { setTimeout } = require('timers/promises');

async function main() {
  const controller = new AbortController();
  const { signal } = controller;

  // إلغاء بعد ثانية واحدة
  setTimeout(1000).then(() => {
    console.log("Aborting the long timeout...");
    controller.abort();
  });

  try {
    console.log("Starting 5-second timeout...");
    await setTimeout(5000, null, { signal });
    console.log("Timeout completed (should not reach here)");
  } catch (err) {
    console.log(`Timeout was aborted: ${err.message}`);
  }
}

main().catch(console.error);