// 21.js - Semantic Versioning
console.log("=== Semantic Versioning (SemVer) ===\n");

const versions = {
  "1.2.3": {
    meaning: "Exact version 1.2.3",
    example: "package.json: \"express\": \"1.2.3\"",
    explanation: "Will install exactly version 1.2.3, no updates"
  },
  "^1.2.3": {
    meaning: "Compatible with 1.2.3 (patch and minor updates)",
    example: "package.json: \"express\": \"^1.2.3\"",
    explanation: "Can install 1.2.4, 1.3.0, but NOT 2.0.0"
  },
  "~1.2.3": {
    meaning: "Approximately equivalent to 1.2.3 (patch updates only)",
    example: "package.json: \"express\": \"~1.2.3\"",
    explanation: "Can install 1.2.4, 1.2.5, but NOT 1.3.0"
  },
  "1.x": {
    meaning: "Any version in major version 1",
    example: "package.json: \"express\": \"1.x\"",
    explanation: "Can install any 1.x.x version"
  },
  "*": {
    meaning: "Any version (latest)",
    example: "package.json: \"express\": \"*\"",
    explanation: "Will install the latest version available"
  }
};

console.log("📊 Version Format: MAJOR.MINOR.PATCH");
console.log("   MAJOR - Breaking changes");
console.log("   MINOR - New features (backward compatible)");
console.log("   PATCH - Bug fixes (backward compatible)\n");

console.log("🔍 Examples:\n");
Object.entries(versions).forEach(([version, info]) => {
  console.log(`Version: ${version}`);
  console.log(`Meaning: ${info.meaning}`);
  console.log(`Example: ${info.example}`);
  console.log(`Explanation: ${info.explanation}`);
  console.log("---\n");
});

console.log("\n🎯 Difference between 1.2.3 and ^1.2.3:");
console.log("\"1.2.3\":");
console.log("  - Will install EXACTLY version 1.2.3");
console.log("  - Won't update even if 1.2.4 (bug fix) is available");
console.log("  - Good for production stability");

console.log("\n\"^1.2.3\":");
console.log("  - Will install 1.2.3 or higher");
console.log("  - Can update to 1.2.4, 1.3.0, 1.9.9");
console.log("  - Won't update to 2.0.0 (breaking change)");
console.log("  - Good for development (get bug fixes)");

console.log("\n💡 Best Practices:");
console.log("1. Use exact versions (1.2.3) in production");
console.log("2. Use ^ (caret) in development");
console.log("3. Use ~ (tilde) when you only want bug fixes");
console.log("4. Update dependencies regularly");

// إنشاء package.json للتوضيح
const fs = require('fs');

const examplePackage = {
  name: "semver-example",
  version: "1.0.0",
  dependencies: {
    "exact-dep": "1.2.3",      // Exact version
    "caret-dep": "^1.2.3",     // Compatible with 1.2.3
    "tilde-dep": "~1.2.3",     // Approximately 1.2.3
    "any-dep": "*"             // Any version
  }
};

console.log("\n📁 Example package.json:");
console.log(JSON.stringify(examplePackage, null, 2));