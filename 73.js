// Base64 إلى UTF-8
const base64String = 'SGVsbG8gV29ybGQ='; // "Hello World" في Base64
const buffer = Buffer.from(base64String, 'base64');
const utf8String = buffer.toString('utf8');
console.log(utf8String); // Hello World

// UTF-8 إلى Base64
const originalText = 'Hello World';
const base64Encoded = Buffer.from(originalText, 'utf8').toString('base64');
console.log(base64Encoded); // SGVsbG8gV29ybGQ=