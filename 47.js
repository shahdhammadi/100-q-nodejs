// 47-alternative.js - Simulate MongoDB connection بدون mongoose
console.log("=== MongoDB Connection Simulation ===");

// محاكاة اتصال MongoDB بدون mongoose
function connectToMongoDB() {
  return new Promise((resolve) => {
    console.log("Connecting to MongoDB...");
    setTimeout(() => {
      console.log("✅ Connected to MongoDB");
      resolve({ connected: true, url: 'mongodb://localhost:27017/app' });
    }, 1000);
  });
}

async function main() {
  const connection = await connectToMongoDB();
  console.log("Connection details:", connection);
}

main();