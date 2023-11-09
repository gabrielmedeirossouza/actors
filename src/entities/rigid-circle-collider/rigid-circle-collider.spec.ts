import { it, expect } from 'vitest';
import { RigidCircleCollider } from './rigid-circle-collider';
import { FakeIdGenerator, FakeTransform } from '@/__test__';

const fakeIdGenerator = new FakeIdGenerator();
const fakeTransform = new FakeTransform(fakeIdGenerator);

it("should create a CircleCollider", () =>
{
	const sut = new RigidCircleCollider(fakeIdGenerator, fakeTransform, 100);
	expect(sut.radius).toBe(100);
});

it("should change radius", () =>
{
	const sut = new RigidCircleCollider(fakeIdGenerator, fakeTransform, 100);
	expect(sut.radius).toBe(100);

	sut.radius = 200;

	expect(sut.radius).toBe(200);
});

it("should throw an error if radius is less or equal to 0", () =>
{
	expect(() => new RigidCircleCollider(fakeIdGenerator, fakeTransform, 0)).toThrow();
	expect(() => new RigidCircleCollider(fakeIdGenerator, fakeTransform, -1)).toThrow();

	const sut = new RigidCircleCollider(fakeIdGenerator, fakeTransform, 100);
	expect(() => sut.radius = 0).toThrow();
	expect(() => sut.radius = -1).toThrow();
});
