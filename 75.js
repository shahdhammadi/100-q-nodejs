const { exec } = require('child_process');

exec('ls -la', (error, stdout, stderr) => {
    if (error) {
        console.error(`خطأ: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    
    console.log(`طول stdout: ${stdout.length}`);
    console.log(`المخرجات:\n${stdout}`);
});