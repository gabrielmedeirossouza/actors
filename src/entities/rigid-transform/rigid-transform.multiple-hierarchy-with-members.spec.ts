import { describe, it, expect } from 'vitest';
import { RigidTransform } from './rigid-transform';
import { Vector2 } from '..';
import { FakeIdGenerator } from '@/__test__';

/**
 * parent
 * 	- childA
 * 		- childC
 * 	- childB
 * 		- childD
 */

const fakeIdGenerator = new FakeIdGenerator();

describe("multiple hierarchy with members: parent -> childA + childB -> childC + childD", () =>
{
	it("should SetParent", () =>
	{
		const parent = new RigidTransform(fakeIdGenerator, new Vector2(5, 5));
		const childA = new RigidTransform(fakeIdGenerator, new Vector2(10, 10));
		const childB = new RigidTransform(fakeIdGenerator, new Vector2(15, 2));
		const childC = new RigidTransform(fakeIdGenerator, new Vector2(17, 6));
		const childD = new RigidTransform(fakeIdGenerator, new Vector2(20, 25));

		childA.SetParent(parent);
		childB.SetParent(parent);
		childC.SetParent(childA);
		childD.SetParent(childB);

		expect(parent.parent).toBe(undefined);
		expect(childA.parent).toBe(parent);
		expect(childB.parent).toBe(parent);
		expect(childC.parent).toBe(childA);
		expect(childD.parent).toBe(childB);
		expect(parent.children).toEqual([childA, childB]);
		expect(childA.children).toEqual([childC]);
		expect(childB.children).toEqual([childD]);
		expect(childC.children).toEqual([]);
		expect(childD.children).toEqual([]);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });
		expect(childB.localPosition).toEqual({ x: 10, y: -3 });
		expect(childB.worldPosition).toEqual({ x: 15, y: 2 });
		expect(childC.localPosition).toEqual({ x: 7, y: -4 });
		expect(childC.worldPosition).toEqual({ x: 17, y: 6 });
		expect(childD.localPosition).toEqual({ x: 5, y: 23 });
		expect(childD.worldPosition).toEqual({ x: 20, y: 25 });
	});

	it("should DetachParent", () =>
	{
		const parent = new RigidTransform(fakeIdGenerator, new Vector2(5, 5));
		const childA = new RigidTransform(fakeIdGenerator, new Vector2(10, 10));
		const childB = new RigidTransform(fakeIdGenerator, new Vector2(15, 2));
		const childC = new RigidTransform(fakeIdGenerator, new Vector2(17, 6));
		const childD = new RigidTransform(fakeIdGenerator, new Vector2(20, 25));

		childA.SetParent(parent);
		childB.SetParent(parent);
		childC.SetParent(childA);
		childD.SetParent(childB);

		childA.UnsetParent();
		function expectChildAUnsetParent(): void
		{
			expect(parent.parent).toBe(undefined);
			expect(parent.children).toEqual([childB]);
			expect(childA.parent).toBe(undefined);
			expect(childA.children).toEqual([childC]);
			expect(childB.parent).toBe(parent);
			expect(childB.children).toEqual([childD]);
			expect(childC.parent).toBe(childA);
			expect(childC.children).toEqual([]);
			expect(childD.parent).toBe(childB);
			expect(childD.children).toEqual([]);
			expect(parent.localPosition).toEqual({ x: 5, y: 5 });
			expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
			expect(childA.localPosition).toEqual({ x: 10, y: 10 });
			expect(childA.worldPosition).toEqual({ x: 10, y: 10 });
			expect(childB.localPosition).toEqual({ x: 10, y: -3 });
			expect(childB.worldPosition).toEqual({ x: 15, y: 2 });
			expect(childC.localPosition).toEqual({ x: 7, y: -4 });
			expect(childC.worldPosition).toEqual({ x: 17, y: 6 });
			expect(childD.localPosition).toEqual({ x: 5, y: 23 });
			expect(childD.worldPosition).toEqual({ x: 20, y: 25 });
		}
		expectChildAUnsetParent();
		childA.UnsetParent();
		expectChildAUnsetParent();

		childB.UnsetParent();
		expect(parent.parent).toBe(undefined);
		expect(parent.children).toEqual([]);
		expect(childA.parent).toBe(undefined);
		expect(childA.children).toEqual([childC]);
		expect(childB.parent).toBe(undefined);
		expect(childB.children).toEqual([childD]);
		expect(childC.parent).toBe(childA);
		expect(childC.children).toEqual([]);
		expect(childD.parent).toBe(childB);
		expect(childD.children).toEqual([]);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childA.localPosition).toEqual({ x: 10, y: 10 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });
		expect(childB.localPosition).toEqual({ x: 15, y: 2 });
		expect(childB.worldPosition).toEqual({ x: 15, y: 2 });
		expect(childC.localPosition).toEqual({ x: 7, y: -4 });
		expect(childC.worldPosition).toEqual({ x: 17, y: 6 });
		expect(childD.localPosition).toEqual({ x: 5, y: 23 });
		expect(childD.worldPosition).toEqual({ x: 20, y: 25 });

		childC.UnsetParent();
		expect(parent.parent).toBe(undefined);
		expect(parent.children).toEqual([]);
		expect(childA.parent).toBe(undefined);
		expect(childA.children).toEqual([]);
		expect(childB.parent).toBe(undefined);
		expect(childB.children).toEqual([childD]);
		expect(childC.parent).toBe(undefined);
		expect(childC.children).toEqual([]);
		expect(childD.parent).toBe(childB);
		expect(childD.children).toEqual([]);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childA.localPosition).toEqual({ x: 10, y: 10 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });
		expect(childB.localPosition).toEqual({ x: 15, y: 2 });
		expect(childB.worldPosition).toEqual({ x: 15, y: 2 });
		expect(childC.localPosition).toEqual({ x: 17, y: 6 });
		expect(childC.worldPosition).toEqual({ x: 17, y: 6 });
		expect(childD.localPosition).toEqual({ x: 5, y: 23 });
		expect(childD.worldPosition).toEqual({ x: 20, y: 25 });

		childD.UnsetParent();
		expect(parent.parent).toBe(undefined);
		expect(parent.children).toEqual([]);
		expect(childA.parent).toBe(undefined);
		expect(childA.children).toEqual([]);
		expect(childB.parent).toBe(undefined);
		expect(childB.children).toEqual([]);
		expect(childC.parent).toBe(undefined);
		expect(childC.children).toEqual([]);
		expect(childD.parent).toBe(undefined);
		expect(childD.children).toEqual([]);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childA.localPosition).toEqual({ x: 10, y: 10 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });
		expect(childB.localPosition).toEqual({ x: 15, y: 2 });
		expect(childB.worldPosition).toEqual({ x: 15, y: 2 });
		expect(childC.localPosition).toEqual({ x: 17, y: 6 });
		expect(childC.worldPosition).toEqual({ x: 17, y: 6 });
		expect(childD.localPosition).toEqual({ x: 20, y: 25 });
		expect(childD.worldPosition).toEqual({ x: 20, y: 25 });
	});

	it("should have unique transform relationship", () =>
	{
		const parent = new RigidTransform(fakeIdGenerator, new Vector2(5, 5));
		const childA = new RigidTransform(fakeIdGenerator, new Vector2(10, 10));
		const childB = new RigidTransform(fakeIdGenerator, new Vector2(15, 2));
		const childC = new RigidTransform(fakeIdGenerator, new Vector2(17, 6));
		const childD = new RigidTransform(fakeIdGenerator, new Vector2(20, 25));

		childA.SetParent(parent);
		childB.SetParent(parent);
		childC.SetParent(childA);
		childD.SetParent(childB);

		childC.SetParent(parent);
		expect(parent.parent).toBe(undefined);
		expect(childA.parent).toBe(parent);
		expect(childB.parent).toBe(parent);
		expect(childC.parent).toBe(parent);
		expect(childD.parent).toBe(childB);
		expect(parent.children).toEqual([childA, childB, childC]);
		expect(childA.children).toEqual([]);
		expect(childB.children).toEqual([childD]);
		expect(childC.children).toEqual([]);
		expect(childD.children).toEqual([]);

		expect(() => parent.SetParent(childB)).toThrow();
		expect(() => parent.SetParent(childD)).toThrow();
	});

	it("should change parent and child worldPosition", () =>
	{
		const parent = new RigidTransform(fakeIdGenerator, new Vector2(5, 5));
		const childA = new RigidTransform(fakeIdGenerator, new Vector2(10, 10));
		const childB = new RigidTransform(fakeIdGenerator, new Vector2(15, 2));
		const childC = new RigidTransform(fakeIdGenerator, new Vector2(17, 6));
		const childD = new RigidTransform(fakeIdGenerator, new Vector2(20, 25));

		childA.SetParent(parent);
		childB.SetParent(parent);
		childC.SetParent(childA);
		childD.SetParent(childB);

		parent.worldPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: 0, y: 0 });
		expect(parent.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childB.localPosition).toEqual({ x: 10, y: -3 });
		expect(childB.worldPosition).toEqual({ x: 10, y: -3 });
		expect(childC.localPosition).toEqual({ x: 7, y: -4 });
		expect(childC.worldPosition).toEqual({ x: 12, y: 1 });
		expect(childD.localPosition).toEqual({ x: 5, y: 23 });
		expect(childD.worldPosition).toEqual({ x: 15, y: 20 });

		parent.worldPosition = new Vector2(-10, -8);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: -5, y: -3 });
		expect(childB.localPosition).toEqual({ x: 10, y: -3 });
		expect(childB.worldPosition).toEqual({ x: 0, y: -11 });
		expect(childC.localPosition).toEqual({ x: 7, y: -4 });
		expect(childC.worldPosition).toEqual({ x: 2, y: -7 });
		expect(childD.localPosition).toEqual({ x: 5, y: 23 });
		expect(childD.worldPosition).toEqual({ x: 5, y: 12 });

		childA.worldPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: 10, y: 8 });
		expect(childA.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childB.localPosition).toEqual({ x: 10, y: -3 });
		expect(childB.worldPosition).toEqual({ x: 0, y: -11 });
		expect(childC.localPosition).toEqual({ x: 7, y: -4 });
		expect(childC.worldPosition).toEqual({ x: 7, y: -4 });
		expect(childD.localPosition).toEqual({ x: 5, y: 23 });
		expect(childD.worldPosition).toEqual({ x: 5, y: 12 });

		childB.worldPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: 10, y: 8 });
		expect(childA.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childB.localPosition).toEqual({ x: 10, y: 8 });
		expect(childB.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childC.localPosition).toEqual({ x: 7, y: -4 });
		expect(childC.worldPosition).toEqual({ x: 7, y: -4 });
		expect(childD.localPosition).toEqual({ x: 5, y: 23 });
		expect(childD.worldPosition).toEqual({ x: 5, y: 23 });

		childC.worldPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: 10, y: 8 });
		expect(childA.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childB.localPosition).toEqual({ x: 10, y: 8 });
		expect(childB.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childC.localPosition).toEqual({ x: 0, y: 0 });
		expect(childC.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childD.localPosition).toEqual({ x: 5, y: 23 });
		expect(childD.worldPosition).toEqual({ x: 5, y: 23 });

		childD.worldPosition = new Vector2(25, 40);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: 10, y: 8 });
		expect(childA.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childB.localPosition).toEqual({ x: 10, y: 8 });
		expect(childB.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childC.localPosition).toEqual({ x: 0, y: 0 });
		expect(childC.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childD.localPosition).toEqual({ x: 25, y: 40 });
		expect(childD.worldPosition).toEqual({ x: 25, y: 40 });
	});

	it("should change parent and child localPosition", () =>
	{
		const parent = new RigidTransform(fakeIdGenerator, new Vector2(5, 5));
		const childA = new RigidTransform(fakeIdGenerator, new Vector2(10, 10));
		const childB = new RigidTransform(fakeIdGenerator, new Vector2(15, 2));
		const childC = new RigidTransform(fakeIdGenerator, new Vector2(17, 6));
		const childD = new RigidTransform(fakeIdGenerator, new Vector2(20, 25));

		childA.SetParent(parent);
		childB.SetParent(parent);
		childC.SetParent(childA);
		childD.SetParent(childB);

		parent.localPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: 0, y: 0 });
		expect(parent.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childB.localPosition).toEqual({ x: 10, y: -3 });
		expect(childB.worldPosition).toEqual({ x: 10, y: -3 });
		expect(childC.localPosition).toEqual({ x: 7, y: -4 });
		expect(childC.worldPosition).toEqual({ x: 12, y: 1 });
		expect(childD.localPosition).toEqual({ x: 5, y: 23 });
		expect(childD.worldPosition).toEqual({ x: 15, y: 20 });

		childA.localPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: 0, y: 0 });
		expect(parent.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childA.localPosition).toEqual({ x: 0, y: 0 });
		expect(childA.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childB.localPosition).toEqual({ x: 10, y: -3 });
		expect(childB.worldPosition).toEqual({ x: 10, y: -3 });
		expect(childC.localPosition).toEqual({ x: 7, y: -4 });
		expect(childC.worldPosition).toEqual({ x: 7, y: -4 });
		expect(childD.localPosition).toEqual({ x: 5, y: 23 });
		expect(childD.worldPosition).toEqual({ x: 15, y: 20 });

		childB.localPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: 0, y: 0 });
		expect(parent.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childA.localPosition).toEqual({ x: 0, y: 0 });
		expect(childA.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childB.localPosition).toEqual({ x: 0, y: 0 });
		expect(childB.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childC.localPosition).toEqual({ x: 7, y: -4 });
		expect(childC.worldPosition).toEqual({ x: 7, y: -4 });
		expect(childD.localPosition).toEqual({ x: 5, y: 23 });
		expect(childD.worldPosition).toEqual({ x: 5, y: 23 });

		childC.localPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: 0, y: 0 });
		expect(parent.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childA.localPosition).toEqual({ x: 0, y: 0 });
		expect(childA.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childB.localPosition).toEqual({ x: 0, y: 0 });
		expect(childB.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childC.localPosition).toEqual({ x: 0, y: 0 });
		expect(childC.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childD.localPosition).toEqual({ x: 5, y: 23 });
		expect(childD.worldPosition).toEqual({ x: 5, y: 23 });

		childD.localPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: 0, y: 0 });
		expect(parent.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childA.localPosition).toEqual({ x: 0, y: 0 });
		expect(childA.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childB.localPosition).toEqual({ x: 0, y: 0 });
		expect(childB.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childC.localPosition).toEqual({ x: 0, y: 0 });
		expect(childC.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childD.localPosition).toEqual({ x: 0, y: 0 });
		expect(childD.worldPosition).toEqual({ x: 0, y: 0 });
	});

	it("should stay in place after UnsetParent", () =>
	{
		const parent = new RigidTransform(fakeIdGenerator, new Vector2(5, 5));
		const childA = new RigidTransform(fakeIdGenerator, new Vector2(10, 10));
		const childB = new RigidTransform(fakeIdGenerator, new Vector2(15, 2));
		const childC = new RigidTransform(fakeIdGenerator, new Vector2(17, 6));
		const childD = new RigidTransform(fakeIdGenerator, new Vector2(20, 25));

		childA.SetParent(parent);
		childB.SetParent(parent);
		childC.SetParent(childA);
		childD.SetParent(childB);
		childA.UnsetParent();
		childB.UnsetParent();
		childC.UnsetParent();
		childD.UnsetParent();

		expect(parent.parent).toBe(undefined);
		expect(childA.parent).toBe(undefined);
		expect(childB.parent).toBe(undefined);
		expect(childC.parent).toBe(undefined);
		expect(childD.parent).toBe(undefined);
		expect(parent.children).toEqual([]);
		expect(childA.children).toEqual([]);
		expect(childB.children).toEqual([]);
		expect(childC.children).toEqual([]);
		expect(childD.children).toEqual([]);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childA.localPosition).toEqual({ x: 10, y: 10 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });
		expect(childB.localPosition).toEqual({ x: 15, y: 2 });
		expect(childB.worldPosition).toEqual({ x: 15, y: 2 });
		expect(childC.localPosition).toEqual({ x: 17, y: 6 });
		expect(childC.worldPosition).toEqual({ x: 17, y: 6 });
		expect(childD.localPosition).toEqual({ x: 20, y: 25 });
		expect(childD.worldPosition).toEqual({ x: 20, y: 25 });
	});
});
