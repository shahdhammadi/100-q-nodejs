// 30.js - Small CLI Application
console.log("=== Small CLI Application ===\n");

const args = process.argv.slice(2);

// استخدام minimist لتحليل الوسائط
let parsedArgs;
try {
  // محاولة استخدام minimist إذا كان مثبتاً
  parsedArgs = require('minimist')(args);
} catch (err) {
  // fallback إلى تحليل بسيط
  parsedArgs = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      parsedArgs[key] = args[i + 1] || true;
      i++;
    }
  }
}

console.log("🎯 CLI Tool with --upper flag\n");

// معالجة الأمر --upper
if (parsedArgs.upper) {
  if (parsedArgs.upper === true) {
    console.log("Error: --upper requires a value");
    console.log("Usage: node 30.js --upper \"text to uppercase\"");
  } else {
    console.log(parsedArgs.upper.toUpperCase());
  }
} 
// الأمر --help
else if (parsedArgs.help || args.length === 0) {
  showHelp();
}
// الأمر --version
else if (parsedArgs.version) {
  console.log(`CLI Tool v1.0.0`);
  console.log(`Node.js ${process.version}`);
}
// أمر غير معروف
else {
  console.log("Unknown command or flag");
  showHelp();
}

function showHelp() {
  console.log("📋 CLI Tool - Help");
  console.log("\nUsage:");
  console.log("  node 30.js --upper \"text\"     # Convert text to uppercase");
  console.log("  node 30.js --help            # Show this help");
  console.log("  node 30.js --version         # Show version");
  
  console.log("\nExamples:");
  console.log("  node 30.js --upper \"hello world\"");
  console.log("  Output: HELLO WORLD");
  
  console.log("\nFlags:");
  console.log("  --upper TEXT    Convert TEXT to uppercase");
  console.log("  --help          Show help");
  console.log("  --version       Show version");
  
  console.log("\n💡 Try: node 30.js --upper \"node.js cli\"");
}

// نسخة متقدمة مع المزيد من الميزات
console.log("\n=== Advanced Version ===\n");

class CLITool {
  constructor() {
    this.commands = {
      'upper': this.upperCommand.bind(this),
      'lower': this.lowerCommand.bind(this),
      'reverse': this.reverseCommand.bind(this),
      'length': this.lengthCommand.bind(this)
    };
  }

  upperCommand(text) {
    return text.toUpperCase();
  }

  lowerCommand(text) {
    return text.toLowerCase();
  }

  reverseCommand(text) {
    return text.split('').reverse().join('');
  }

  lengthCommand(text) {
    return `Length: ${text.length} characters`;
  }

  parseInput(input) {
    const parts = input.trim().split(' ');
    const command = parts[0];
    const text = parts.slice(1).join(' ');

    if (this.commands[command]) {
      return this.commands[command](text);
    } else {
      return `Unknown command: ${command}. Available: ${Object.keys(this.commands).join(', ')}`;
    }
  }

  interactiveMode() {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'cli> '
    });

    console.log("🚀 Interactive CLI Mode");
    console.log("Available commands: upper, lower, reverse, length");
    console.log("Example: upper hello world");
    console.log("Type 'exit' to quit\n");

    rl.prompt();

    rl.on('line', (input) => {
      if (input.toLowerCase() === 'exit') {
        rl.close();
        return;
      }

      const result = this.parseInput(input);
      console.log(result);
      console.log();
      rl.prompt();
    });

    rl.on('close', () => {
      console.log('\n👋 Goodbye!');
      process.exit(0);
    });
  }
}

// اختبار الوضع التفاعلي إذا طلب المستخدم
if (parsedArgs.interactive) {
  const cli = new CLITool();
  cli.interactiveMode();
} else if (parsedArgs.demo) {
  console.log("📊 Demo of all commands:\n");
  
  const cli = new CLITool();
  const testText = "Node.js CLI Tool";
  
  console.log(`Original: "${testText}"\n`);
  
  Object.keys(cli.commands).forEach(cmd => {
    console.log(`${cmd}: ${cli.commands[cmd](testText)}`);
  });
  
  console.log("\n💡 Try interactive mode: node 30.js --interactive");
}

// إنشاء package.json لـ CLI tool
console.log("\n📁 To make it a global CLI tool, add to package.json:");

const packageExample = {
  name: "my-cli-tool",
  version: "1.0.0",
  bin: {
    "mycli": "30.js"
  }
};

console.log(JSON.stringify(packageExample, null, 2));

console.log("\n🔧 Then run:");
console.log("  npm link");
console.log("  mycli --upper \"hello\"");