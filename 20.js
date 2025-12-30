// 20.js - NPM Scripts Demo
// هذا الملف يشرح مفهوم npm scripts
console.log("=== NPM Scripts Explanation ===\n");

console.log("📁 package.json example:");
console.log(`
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "Example project for npm scripts",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write .",
    "build": "webpack --mode production",
    "prestart": "echo 'About to start the server...'",
    "poststart": "echo 'Server has been started!'"
  }
}
`);

console.log("\n🔧 Available scripts:");
console.log("   npm run start     - Start the server");
console.log("   npm run dev       - Start with hot reload");
console.log("   npm run test      - Run tests");
console.log("   npm run lint      - Check code style");
console.log("   npm run format    - Format code");
console.log("   npm run build     - Build for production");

console.log("\n🎯 Special scripts:");
console.log("   prestart  - Runs BEFORE 'start'");
console.log("   poststart - Runs AFTER 'start'");

console.log("\n💡 Tips:");
console.log("1. Use npm run to execute scripts");
console.log("2. 'start' and 'test' can be run with just: npm start, npm test");
console.log("3. Scripts can call other scripts");
console.log("4. Use && for sequential execution: 'build && start'");

// إنشاء package.json حقيقي للاختبار
const fs = require('fs');
const packageJson = {
  name: "node-challenges-demo",
  version: "1.0.0",
  main: "server.js",
  scripts: {
    start: "node server.js",
    dev: "node --watch server.js",
    test: "echo 'No tests yet'",
    custom: "node 20.js"
  }
};

if (!fs.existsSync('package.json')) {
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log("\n✅ Created package.json for testing");
  console.log("Try: npm run custom");
} else {
  console.log("\n📦 package.json already exists");
}

console.log("\n🚀 To try npm scripts:");
console.log("1. Create a simple server.js file");
console.log("2. Run: npm run start");
console.log("3. Or: npm run dev (for development)");