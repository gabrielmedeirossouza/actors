import { it, expect } from 'vitest';
import { RigidBoxCollider } from './rigid-box-collider';
import { FakeIdGenerator } from '@/__test__';
import { Vector2 } from '../vector2';
import { RigidCircleCollider } from '../rigid-circle-collider';

const fakeIdGenerator = new FakeIdGenerator();

it("should create a BoxCollider", () =>
{
	const sut = new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 100, 50);
	expect(sut.width).toBe(100);
	expect(sut.height).toBe(50);
});

it("should change width and height", () =>
{
	const sut = new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 100, 50);
	expect(sut.width).toBe(100);
	expect(sut.height).toBe(50);

	sut.width = 200;
	sut.height = 100;

	expect(sut.width).toBe(200);
	expect(sut.height).toBe(100);
});

it("should throw an error if width is less or equal to 0", () =>
{
	expect(() => new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 0, 50)).toThrow();
	expect(() => new RigidBoxCollider(fakeIdGenerator, Vector2.zero, -1, 50)).toThrow();

	const sut = new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 100, 50);
	expect(() => sut.width = 0).toThrow();
	expect(() => sut.width = -1).toThrow();
});

it("should throw an error if height is less or equal to 0", () =>
{
	expect(() => new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 100, 0)).toThrow();
	expect(() => new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 100, -1)).toThrow();

	const sut = new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 100, 50);
	expect(() => sut.height = 0).toThrow();
	expect(() => sut.height = -1).toThrow();
});

it.each([
	{
		a: new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 100, 50),
		b: new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 50, 50)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(99, 0)), 100, 50),
		b: new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 100, 50)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(-99, 0)), 100, 50),
		b: new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 100, 50)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(-50, 0)), 100, 50),
		b: new RigidBoxCollider(fakeIdGenerator, (new Vector2(24, 0)), 50, 50)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(0, 50)), 100, 50),
		b: new RigidBoxCollider(fakeIdGenerator, (new Vector2(0, 1)), 50, 50)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(0, -24)), 100, 50),
		b: new RigidBoxCollider(fakeIdGenerator, (new Vector2(0, 25)), 50, 50)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(50, 0)), 100, 100),
		b: new RigidBoxCollider(fakeIdGenerator, (new Vector2(-49, 0)), 100, 100)
	},
])("Should collide BOX BOX %#", ({ a, b }) =>
{
	expect(a.IsCollidingWith(b)).toBe(true);
	expect(b.IsCollidingWith(a)).toBe(true);
});

it.each([
	{
		a: new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 100, 50),
		b: new RigidBoxCollider(fakeIdGenerator, (new Vector2(75, 0)), 50, 50)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(100, 0)), 100, 50),
		b: new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 100, 50)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(-100, 0)), 100, 50),
		b: new RigidBoxCollider(fakeIdGenerator, Vector2.zero, 100, 50)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(-50, 0)), 100, 50),
		b: new RigidBoxCollider(fakeIdGenerator, (new Vector2(25, 0)), 50, 50)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(0, 50)), 100, 50),
		b: new RigidBoxCollider(fakeIdGenerator, (new Vector2(0, 0)), 50, 50)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(0, -25)), 100, 50),
		b: new RigidBoxCollider(fakeIdGenerator, (new Vector2(0, 25)), 50, 50)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(50, 0)), 100, 100),
		b: new RigidBoxCollider(fakeIdGenerator, (new Vector2(-50, 0)), 100, 100)
	},
])("Should not collide BOX BOX %#", ({ a, b }) =>
{
	expect(a.IsCollidingWith(b)).toBe(false);
	expect(b.IsCollidingWith(a)).toBe(false);
});

it.each([
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(100, 0)), 100, 50),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(25, 0)), 25)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(140, 0)), 100, 50),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(60, 0)), 30)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(-35, 0)), 40, 50),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(15, 0)), 30)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(100, 0)), 100, 25),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(25, 12.5)), 25)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(100, -30)), 100, 20),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(25, -40)), 25)
	},
])("Should collide BOX CIRCLE %#", ({ a, b }) =>
{
	expect(a.IsCollidingWith(b)).toBe(true);
	expect(b.IsCollidingWith(a)).toBe(true);
});

it.each([
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(100, 0)), 100, 50),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(24, 0)), 25)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(140, 0)), 100, 50),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(60, 0)), 29)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(-35, 0)), 40, 50),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(16, 0)), 30)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(100, 0)), 100, 25),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(25, 13)), 25)
	},
	{
		a: new RigidBoxCollider(fakeIdGenerator, (new Vector2(100, -30)), 100, 20),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(25, -40)), 24)
	},
])("Should not collide BOX CIRCLE %#", ({ a, b }) =>
{
	expect(a.IsCollidingWith(b)).toBe(false);
	expect(b.IsCollidingWith(a)).toBe(false);
});

it.each([
	{
		a: new RigidCircleCollider(fakeIdGenerator, (new Vector2(100, 0)), 51),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(25, 0)), 25)
	},
	{
		a: new RigidCircleCollider(fakeIdGenerator, (new Vector2(140, 0)), 100),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(10, 0)), 31)
	},
	{
		a: new RigidCircleCollider(fakeIdGenerator, (new Vector2(-35, 0)), 40),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(15, 0)), 11)
	},
	{
		a: new RigidCircleCollider(fakeIdGenerator, (new Vector2(100, 200)), 100),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(25, 150)), 25)
	},
	{
		a: new RigidCircleCollider(fakeIdGenerator, (new Vector2(100, -30)), 100),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(25, -40)), 25)
	},
])("Should collide CIRCLE CIRCLE %#", ({ a, b }) =>
{
	expect(a.IsCollidingWith(b)).toBe(true);
	expect(b.IsCollidingWith(a)).toBe(true);
});

it.each([
	{
		a: new RigidCircleCollider(fakeIdGenerator, (new Vector2(100, 0)), 50),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(25, 0)), 25)
	},
	{
		a: new RigidCircleCollider(fakeIdGenerator, (new Vector2(140, 0)), 100),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(10, 0)), 30)
	},
	{
		a: new RigidCircleCollider(fakeIdGenerator, (new Vector2(-35, 0)), 40),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(15, 0)), 10)
	},
	{
		a: new RigidCircleCollider(fakeIdGenerator, (new Vector2(100, 200)), 100),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(25, 25)), 25)
	},
	{
		a: new RigidCircleCollider(fakeIdGenerator, (new Vector2(100, -30)), 100),
		b: new RigidCircleCollider(fakeIdGenerator, (new Vector2(25, -130)), 25)
	},
])("Should not collide CIRCLE CIRCLE %#", ({ a, b }) =>
{
	expect(a.IsCollidingWith(b)).toBe(false);
	expect(b.IsCollidingWith(a)).toBe(false);
});

