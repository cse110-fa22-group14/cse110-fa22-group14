/**
 * This script is used to complete Unit tests to functions
 * Use global [function name] to declare functions and suppress ESLint warnings
 * Use const sum = require('../code-to-unit-test/sum.js'); to link to file
 */

/* global test, expect */

// Dummy test to suppress warning
test('adds 1 + 2 to equal 3', () => {
    const operand1 = 1;
    const operand2 = 2;
    const expected = 3;
    expect(operand1 + operand2).toBe(expected);
});

// TODO: add directive to the sorting function script