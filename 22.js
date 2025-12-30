// 22.js - NPX Demo
const { exec, execSync } = require('child_process');

console.log("=== NPX (Node Package Executor) ===\n");

console.log("🎯 What is npx?");
console.log("npx is a tool for executing npm packages without installing them globally.");
console.log("It downloads, runs, and then removes the package.\n");

const commands = [
  { cmd: 'npx cowsay "Hello from Node.js!"', desc: 'Simple cowsay example' },
  { cmd: 'npx create-react-app my-app', desc: 'Create React app without installing CRA globally' },
  { cmd: 'npx nodemon app.js', desc: 'Run nodemon without global installation' },
  { cmd: 'npx @vue/cli create my-vue-app', desc: 'Create Vue app' },
  { cmd: 'npx http-server', desc: 'Start a simple HTTP server' },
  { cmd: 'npx eslint .', desc: 'Run ESLint on current directory' }
];

console.log("🔧 Common npx commands:\n");
commands.forEach(item => {
  console.log(`${item.desc}:`);
  console.log(`  ${item.cmd}`);
  console.log();
});

console.log("🚀 Advantages of npx:");
console.log("1. No global installation needed");
console.log("2. Always runs the latest version");
console.log("3. Reduces global package clutter");
console.log("4. Can run different versions of the same package");

// محاولة تشغيل cowsay (إذا كان متصلاً بالإنترنت)
console.log("🔍 Trying to run npx cowsay...");

function tryNPXCommand() {
  try {
    // هذه محاولة، ولكن الأفضل تشغيل npx مباشرة في terminal
    console.log("\n📝 To actually run npx, open a terminal and type:");
    console.log('npx cowsay "Node.js is awesome!"');
    
    console.log("\n💡 Or from this script:");
    console.log(`
    const { exec } = require('child_process');
    exec('npx cowsay "Hello"', (error, stdout, stderr) => {
      if (error) {
        console.log("Make sure you have internet connection");
        return;
      }
      console.log(stdout);
    });
    `);
    
    // محاولة تنفيذ (قد يحتاج اتصال إنترنت)
    console.log("\n⏳ Attempting to run npx cowsay (requires internet)...");
    
    exec('npx --no cowsay "Testing NPX"', { timeout: 10000 }, (error, stdout, stderr) => {
      if (error) {
        console.log("Note: npx needs internet connection for first run.");
        console.log("Error:", error.message);
        console.log("\n📋 To test npx manually:");
        console.log("1. Open a new terminal");
        console.log("2. Type: npx cowsay 'Hello World'");
        console.log("3. Press Enter");
        return;
      }
      
      console.log(stdout);
      if (stderr) console.error(stderr);
    });
    
  } catch (err) {
    console.log("Could not run npx from script:", err.message);
  }
}

// خيار للمستخدم
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("\nChoose an option:");
console.log("1. See npx explanation only");
console.log("2. Try to run npx cowsay (requires internet)");

rl.question("\nYour choice (1-2): ", (choice) => {
  if (choice === '2') {
    tryNPXCommand();
  } else {
    console.log("\n✅ NPX explanation complete.");
    console.log("Try npx commands directly in your terminal!");
  }
  
  setTimeout(() => {
    rl.close();
    console.log("\n🎯 Remember: npx is for running packages, npm is for managing them.");
  }, 3000);
});