import { it, expect } from 'vitest';
import { Transform } from '../transform';
import { CircleCollider } from './circle-collider';

it("should create a CircleCollider", () =>
{
	const sut = new CircleCollider(new Transform(), 100);
	expect(sut.radius).toBe(100);
});

it("should change radius", () =>
{
	const sut = new CircleCollider(new Transform(), 100);
	expect(sut.radius).toBe(100);

	sut.radius = 200;

	expect(sut.radius).toBe(200);
});

it("should throw an error if radius is less or equal to 0", () =>
{
	expect(() => new CircleCollider(new Transform(), 0)).toThrow();
	expect(() => new CircleCollider(new Transform(), -1)).toThrow();

	const sut = new CircleCollider(new Transform(), 100);
	expect(() => sut.radius = 0).toThrow();
	expect(() => sut.radius = -1).toThrow();
});
