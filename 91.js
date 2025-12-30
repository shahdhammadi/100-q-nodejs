// sum.js
function sum(a, b) {
    return a + b;
}
module.exports = sum;

// sum.test.js
const sum = require('./sum');

test('جمع 2 و 3 يجب أن يعطي 5', () => {
    expect(sum(2, 3)).toBe(5);
});

test('جمع أعداد سالبة', () => {
    expect(sum(-1, -2)).toBe(-3);
});