import { it, expect } from 'vitest';
import { RigidTransform } from '../transform';
import { BoxCollider } from './box-collider';
import { FakeIdGenerator } from '@/__test__';

const fakeIdGenerator = new FakeIdGenerator();

it("should create a BoxCollider", () =>
{
	const sut = new BoxCollider(fakeIdGenerator, new RigidTransform(fakeIdGenerator), 100, 50);
	expect(sut.width).toBe(100);
	expect(sut.height).toBe(50);
});

it("should change width and height", () =>
{
	const sut = new BoxCollider(fakeIdGenerator, new RigidTransform(fakeIdGenerator), 100, 50);
	expect(sut.width).toBe(100);
	expect(sut.height).toBe(50);

	sut.width = 200;
	sut.height = 100;

	expect(sut.width).toBe(200);
	expect(sut.height).toBe(100);
});

it("should throw an error if width is less or equal to 0", () =>
{
	expect(() => new BoxCollider(fakeIdGenerator, new RigidTransform(fakeIdGenerator), 0, 50)).toThrow();
	expect(() => new BoxCollider(fakeIdGenerator, new RigidTransform(fakeIdGenerator), -1, 50)).toThrow();

	const sut = new BoxCollider(fakeIdGenerator, new RigidTransform(fakeIdGenerator), 100, 50);
	expect(() => sut.width = 0).toThrow();
	expect(() => sut.width = -1).toThrow();
});

it("should throw an error if height is less or equal to 0", () =>
{
	expect(() => new BoxCollider(fakeIdGenerator, new RigidTransform(fakeIdGenerator), 100, 0)).toThrow();
	expect(() => new BoxCollider(fakeIdGenerator, new RigidTransform(fakeIdGenerator), 100, -1)).toThrow();

	const sut = new BoxCollider(fakeIdGenerator, new RigidTransform(fakeIdGenerator), 100, 50);
	expect(() => sut.height = 0).toThrow();
	expect(() => sut.height = -1).toThrow();
});
