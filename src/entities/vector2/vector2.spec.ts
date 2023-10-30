import { test, expect } from 'vitest';
import { Vector2 } from './vector2';

test("Vector2", () =>
{
	const sut = new Vector2(1, 2);
	expect(sut.x).toBe(1);
	expect(sut.y).toBe(2);
});

test("zero", () =>
{
	const sut = Vector2.zero;
	expect(sut.x).toBe(0);
	expect(sut.y).toBe(0);
});

test("one", () =>
{
	const sut = Vector2.one;
	expect(sut.x).toBe(1);
	expect(sut.y).toBe(1);
});

test("up", () =>
{
	const sut = Vector2.up;
	expect(sut.x).toBe(0);
	expect(sut.y).toBe(1);
});

test("down", () =>
{
	const sut = Vector2.down;
	expect(sut.x).toBe(0);
	expect(sut.y).toBe(-1);
});

test("left", () =>
{
	const sut = Vector2.left;
	expect(sut.x).toBe(-1);
	expect(sut.y).toBe(0);
});

test("right", () =>
{
	const sut = Vector2.right;
	expect(sut.x).toBe(1);
	expect(sut.y).toBe(0);
});

test("Add", () =>
{
	const a = new Vector2(1, 2);
	const b = new Vector2(3, 4);
	const sut = Vector2.Add(a, b);
	expect(sut.x).toBe(4);
	expect(sut.y).toBe(6);
});

test("Subtract", () =>
{
	const a = new Vector2(1, 2);
	const b = new Vector2(3, 4);
	const sut = Vector2.Subtract(a, b);
	expect(sut.x).toBe(-2);
	expect(sut.y).toBe(-2);
});

test("Multiply", () =>
{
	const a = new Vector2(1, 2);
	const b = new Vector2(3, 4);
	const sut = Vector2.Multiply(a, b);
	expect(sut.x).toBe(3);
	expect(sut.y).toBe(8);
});

test("MultiplyScalar", () =>
{
	const a = new Vector2(1, 2);
	const b = 3;
	const sut = Vector2.MultiplyScalar(a, b);
	expect(sut.x).toBe(3);
	expect(sut.y).toBe(6);
});

test("Divide", () =>
{
	const a = new Vector2(1, 2);
	const b = new Vector2(3, 4);
	const sut = Vector2.Divide(a, b);
	expect(sut.x).toBe(1 / 3);
	expect(sut.y).toBe(2 / 4);
});

test("DivideScalar", () =>
{
	const a = new Vector2(1, 2);
	const b = 3;
	const sut = Vector2.DivideScalar(a, b);
	expect(sut.x).toBe(1 / 3);
	expect(sut.y).toBe(2 / 3);
});

test("Dot", () =>
{
	const a = new Vector2(1, 2);
	const b = new Vector2(3, 4);
	const sut = Vector2.Dot(a, b);
	expect(sut).toBe(11);
});

test("PerpendicularClockwise", () =>
{
	const a = new Vector2(1, 2);
	const sut = Vector2.PerpendicularClockwise(a);
	expect(sut.x).toBe(2);
	expect(sut.y).toBe(-1);
});

test("PerpendicularCounterClockwise", () =>
{
	const a = new Vector2(1, 2);
	const sut = Vector2.PerpendicularCounterClockwise(a);
	expect(sut.x).toBe(-2);
	expect(sut.y).toBe(1);
});

test("Rotate", () =>
{
	const a = new Vector2(1, 2);
	const angle = Math.PI / 2;
	const sut = Vector2.Rotate(a, angle);
	expect(sut.x).toBeCloseTo(-2);
	expect(sut.y).toBeCloseTo(1);
});

test("Negate", () =>
{
	const a = new Vector2(1, 2);
	const sut = Vector2.Negate(a);
	expect(sut.x).toBe(-1);
	expect(sut.y).toBe(-2);
});

test("magnitude", () =>
{
	const a = new Vector2(3, 4);
	const sut = a.magnitude;
	expect(sut).toBe(5);
});

test("magnitudeSquared", () =>
{
	const a = new Vector2(3, 4);
	const sut = a.magnitudeSquared;
	expect(sut).toBe(25);
});

test.each([
	{ sut: new Vector2(3, 4), expected: new Vector2(3 / 5, 4 / 5) },
	{ sut: new Vector2(0, 0), expected: new Vector2(0, 0) },
	{ sut: new Vector2(1, 0), expected: new Vector2(1, 0) },
	{ sut: new Vector2(0, 1), expected: new Vector2(0, 1) },
	{ sut: new Vector2(-1, 0), expected: new Vector2(-1, 0) },
	{ sut: new Vector2(0, -1), expected: new Vector2(0, -1) },
	{ sut: new Vector2(-1, -1), expected: new Vector2(-1 / Math.sqrt(2), -1 / Math.sqrt(2)) },
	{ sut: new Vector2(1, 1), expected: new Vector2(1 / Math.sqrt(2), 1 / Math.sqrt(2)) },
])("normalized %#", ({ sut, expected }) =>
{
	expect(sut.normalized.x).toBe(expected.x);
	expect(sut.normalized.y).toBe(expected.y);
});

test("Clone", () =>
{
	const a = new Vector2(1, 2);
	const sut = a.Clone();
	expect(sut.x).toBe(1);
	expect(sut.y).toBe(2);
});

test("ToString", () =>
{
	const a = new Vector2(1, 2);
	const sutA = a.ToString();
	expect(sutA).toBe("(1.00, 2.00)");

	const b = new Vector2(1.234, 2.345);
	const sutB = b.ToString();
	expect(sutB).toBe("(1.23, 2.35)");
});
