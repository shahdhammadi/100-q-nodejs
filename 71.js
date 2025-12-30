const { Transform } = require('stream');

const uppercaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

// استخدامه
const readable = getReadableStreamSomehow();
const writable = getWritableStreamSomehow();

readable.pipe(uppercaseTransform).pipe(writable);