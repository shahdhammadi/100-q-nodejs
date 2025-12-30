const { spawn } = require('child_process');

const child = spawn('node', ['-v']);

child.stdout.on('data', (data) => {
    console.log(`إصدار Node.js: ${data}`);
});

child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

child.on('close', (code) => {
    console.log(`العملية الفرعية انتهت بالكود: ${code}`);
});