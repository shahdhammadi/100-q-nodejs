const { Transform } = require('stream');
const { parse } = require('csv-parse');

const csvParser = parse({ columns: true });

const jsonTransform = new Transform({
    transform(chunk, encoding, callback) {
        const json = JSON.stringify(chunk);
        this.push(json + '\n');
        callback();
    }
});

readableStream
    .pipe(csvParser)
    .pipe(jsonTransform)
    .pipe(writableStream);