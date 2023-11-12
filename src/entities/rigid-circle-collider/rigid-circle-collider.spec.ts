import { it, expect } from 'vitest';
import { RigidCircleCollider } from './rigid-circle-collider';
import { FakeIdGenerator } from '@/__test__';
import { Vector2 } from '../vector2';

const fakeIdGenerator = new FakeIdGenerator();

it("should create a CircleCollider", () =>
{
	const sut = new RigidCircleCollider(fakeIdGenerator, Vector2.zero, 100);
	expect(sut.radius).toBe(100);
});

it("should change radius", () =>
{
	const sut = new RigidCircleCollider(fakeIdGenerator, Vector2.zero, 100);
	expect(sut.radius).toBe(100);

	sut.radius = 200;

	expect(sut.radius).toBe(200);
});

it("should throw an error if radius is less or equal to 0", () =>
{
	expect(() => new RigidCircleCollider(fakeIdGenerator, Vector2.zero, 0)).toThrow();
	expect(() => new RigidCircleCollider(fakeIdGenerator, Vector2.zero, -1)).toThrow();

	const sut = new RigidCircleCollider(fakeIdGenerator, Vector2.zero, 100);
	expect(() => sut.radius = 0).toThrow();
	expect(() => sut.radius = -1).toThrow();
});
