import { it, expect } from 'vitest';
import { RigidBoxCollider } from './rigid-box-collider';
import { FakeIdGenerator, FakeTransform } from '@/__test__';

const fakeIdGenerator = new FakeIdGenerator();
const fakeTransform = new FakeTransform(fakeIdGenerator);

it("should create a BoxCollider", () =>
{
	const sut = new RigidBoxCollider(fakeIdGenerator, fakeTransform, 100, 50);
	expect(sut.width).toBe(100);
	expect(sut.height).toBe(50);
});

it("should change width and height", () =>
{
	const sut = new RigidBoxCollider(fakeIdGenerator, fakeTransform, 100, 50);
	expect(sut.width).toBe(100);
	expect(sut.height).toBe(50);

	sut.width = 200;
	sut.height = 100;

	expect(sut.width).toBe(200);
	expect(sut.height).toBe(100);
});

it("should throw an error if width is less or equal to 0", () =>
{
	expect(() => new RigidBoxCollider(fakeIdGenerator, fakeTransform, 0, 50)).toThrow();
	expect(() => new RigidBoxCollider(fakeIdGenerator, fakeTransform, -1, 50)).toThrow();

	const sut = new RigidBoxCollider(fakeIdGenerator, fakeTransform, 100, 50);
	expect(() => sut.width = 0).toThrow();
	expect(() => sut.width = -1).toThrow();
});

it("should throw an error if height is less or equal to 0", () =>
{
	expect(() => new RigidBoxCollider(fakeIdGenerator, fakeTransform, 100, 0)).toThrow();
	expect(() => new RigidBoxCollider(fakeIdGenerator, fakeTransform, 100, -1)).toThrow();

	const sut = new RigidBoxCollider(fakeIdGenerator, fakeTransform, 100, 50);
	expect(() => sut.height = 0).toThrow();
	expect(() => sut.height = -1).toThrow();
});
