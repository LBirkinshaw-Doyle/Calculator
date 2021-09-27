const { TestWatcher } = require('@jest/core');
const { expect, test } = require('@jest/globals');
const { describe } = require('yargs');
const calculator = require('./calculation');

describe('add', () => {
	test('evaluate single numbers', () => {
		expect(calculator.evaluate("838")).toBe(838);
	});
	test('adds 2 and 2', () => {
		expect(calculator.evaluate("2 + 2")).toBe(4);
	});
	test('adds multiple numbers', () => {
		expect(calculator.evaluate("2 + 3 + 5")).toBe(10);
	});
});

describe('subtract', () => {
	test('subtracts numbers', () => {
		expect(calculator.evaluate("2 - 1")).toBe(1);
	});
	test('subtracts to negatives', () => {
		expect(calculator.evaluate("3 - 14").toBe(-11));
	});
	test('negative number', () => {
		expect(calculator.evaluate(" - 3").toBe(-3));
	});
	test('negative number first', () => {
		expect(calculator.evaluate(" - 3 + 1").toBe(-2));
	});
});

describe('multiply', () => {
	test('basic multiplication', () => {
		expect(calculator.evaluate("5 * 8").toBe(40));
	});
	test('negative mult', () => {
		expect(calculator.evaluate(" - 3 * 10").toBe(-30));
	});
	test('mult with post add', () => {
		expect(calculator.evaluate("3 * 10 + 4").toBe(34));
	});
	test('mult with pre add', () => {
		expect(calculator.evaluate("2 + 3 * 5").toBe(17));
	});
	test('mult with negative numbers', () => {
		expect(calculator.evaluate(" - 2 - 3 * 5").toBe(-17));
	});
	test('multiple multiplication', () => {
		expect(calculator.evaluate("2 *  - 2 * 3 + 2").toBe(-10));
	});
	test("sum of two multiplications", () => {
		expect(calculator.evaluate("32 * 10 - 16 * 5").toBe(240));
	});
});

describe('divide', () => {
	test('basic division', () => {
		expect(calculator.evaluate("8 / 4").toBe(2));
	});
	test("division to decimal", () => {
		expect(calculator.evaluate("4 / 8").toBe(0.5));
	});
	test("negative division", () => {
		expect(calculator.evaluate(" - 4 / 2").toBe(-2));
	});
	test("nagtive division 2", () => {
		expect(calculator.evaluate("4 /  - 2").toBe(-2));
	});
	test("double negative", () => {
		expect(calculator.evaluate(" - 10 /  - 3").toBe(3.333));
	});
	test("with post-addition", () => {
		expect(calculator.evaluate("16 / 4 + 3").toBe(7));
	});
	test("with pre-addition", () => {
		expect(calculator.evaluate("7 + 3 / 10").toBe(7.3));
	});
	test("with multiplication", () => {
		expect(calculator.evaluate("2 * 3 / 3").toBe(2));
	});
	test("with negative multiplication", () => {
		expect(calculator.evaluate("2 *  - 3 / 3").toBe(-2));
	});
	test("with subtraction", () => {
		expect(calculator.evaluate("5 - 4 / 2").toBe(3));
	});
});
