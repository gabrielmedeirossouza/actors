import { describe, it, expect } from 'vitest';
import { Transform } from './transform';
import { Vector2 } from '@lib/math';

describe("multiple hierarchy: parent -> child -> child", () =>
{
	it('should create empty transform', () =>
	{
		const transform = new Transform();

		expect(transform.parent).toBe(undefined);
		expect(transform.children).toEqual([]);
		expect(transform.localPosition).toEqual({ x: 0, y: 0 });
		expect(transform.worldPosition).toEqual({ x: 0, y: 0 });
		expect(transform.localRotation).toBe(0);
		expect(transform.worldRotation).toBe(0);
		expect(transform.scale).toEqual({ x: 1, y: 1 });
	});

	it("should attach parent", () =>
	{
		const parent = new Transform(new Vector2(5, 5));
		const childA = new Transform(new Vector2(10, 10));
		const childB = new Transform(new Vector2(15, 15));

		childA.SetParent(parent);
		childB.SetParent(childA);

		expect(childA.parent).toBe(parent);
		expect(childB.parent).toBe(childA);
		expect(parent.children).toContain(childA);
		expect(parent.children.length).toBe(1);
		expect(childA.children).toContain(childB);
		expect(childA.children.length).toBe(1);
		expect(childB.children.length).toBe(0);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 15, y: 15 });
	});

	it("should detach parent", () =>
	{
		const parent = new Transform(new Vector2(5, 5));
		const childA = new Transform(new Vector2(10, 10));
		const childB = new Transform(new Vector2(15, 15));

		childA.SetParent(parent);
		childB.SetParent(childA);

		childB.UnsetParent();
		expect(childB.parent).toBe(undefined);
		expect(childA.children).not.toContain(childB);
		expect(childA.children.length).toBe(0);
		expect(parent.children).toContain(childA);
		expect(parent.children.length).toBe(1);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });

		childA.UnsetParent();
		expect(childA.parent).toBe(undefined);
		expect(parent.children).not.toContain(childA);
		expect(parent.children.length).toBe(0);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childA.localPosition).toEqual({ x: 10, y: 10 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });

		childA.SetParent(parent);
		childB.SetParent(childA);

		childA.UnsetParent();
		expect(parent.children).toEqual([]);
		expect(childA.children).toContain(childB);
		expect(childA.children.length).toBe(1);
		expect(childB.parent).toBe(childA);
		expect(childB.children.length).toBe(0);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childA.localPosition).toEqual({ x: 10, y: 10 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 15, y: 15 });
	});

	it("should attach child", () =>
	{
		const parent = new Transform(new Vector2(5, 5));
		const childA = new Transform(new Vector2(10, 10));
		const childB = new Transform(new Vector2(15, 15));

		childA.AttachChild(childB);
		parent.AttachChild(childA);

		expect(childA.parent).toBe(parent);
		expect(childB.parent).toBe(childA);
		expect(parent.children).toEqual([childA]);
		expect(childA.children).toEqual([childB]);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 15, y: 15 });
	});

	it("should detach child", () =>
	{
		const parent = new Transform(new Vector2(5, 5));
		const childA = new Transform(new Vector2(10, 10));
		const childB = new Transform(new Vector2(15, 15));

		parent.AttachChild(childA);
		childA.AttachChild(childB);
		parent.DetachChild(childA);

		expect(childA.parent).toBe(undefined);
		expect(childB.parent).toBe(childA);
		expect(parent.children).toEqual([]);
		expect(childA.children).toEqual([childB]);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childA.localPosition).toEqual({ x: 10, y: 10 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 15, y: 15 });
	});

	it("should change parent and child worldPosition", () =>
	{
		const parent = new Transform(new Vector2(5, 5));
		const childA = new Transform(new Vector2(10, 10));
		const childB = new Transform(new Vector2(15, 15));

		parent.AttachChild(childA);
		childA.AttachChild(childB);

		parent.worldPosition = new Vector2(5, 5);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 15, y: 15 });

		parent.worldPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: 0, y: 0 });
		expect(parent.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 10, y: 10 });

		parent.worldPosition = new Vector2(-10, -8);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: -5, y: -3 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 0, y: 2 });

		childA.worldPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: 10, y: 8 });
		expect(childA.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 5, y: 5 });

		childA.worldPosition = new Vector2(-10, -8);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: 0, y: 0 });
		expect(childA.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: -5, y: -3 });

		childB.worldPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: 0, y: 0 });
		expect(childA.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childB.localPosition).toEqual({ x: 10, y: 8 });
		expect(childB.worldPosition).toEqual({ x: 0, y: 0 });

		childB.worldPosition = new Vector2(25, 40);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: 0, y: 0 });
		expect(childA.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childB.localPosition).toEqual({ x: 35, y: 48 });
		expect(childB.worldPosition).toEqual({ x: 25, y: 40 });
	});

	it("should change parent and child localPosition", () =>
	{
		const parent = new Transform(new Vector2(5, 5));
		const childA = new Transform(new Vector2(10, 10));
		const childB = new Transform(new Vector2(15, 15));

		parent.AttachChild(childA);
		childA.AttachChild(childB);

		parent.localPosition = new Vector2(5, 5);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 15, y: 15 });

		parent.localPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: 0, y: 0 });
		expect(parent.worldPosition).toEqual({ x: 0, y: 0 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 10, y: 10 });

		parent.localPosition = new Vector2(-10, -8);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: -5, y: -3 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 0, y: 2 });

		childA.localPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: 0, y: 0 });
		expect(childA.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: -5, y: -3 });

		childA.localPosition = new Vector2(-10, -8);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: -10, y: -8 });
		expect(childA.worldPosition).toEqual({ x: -20, y: -16 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: -15, y: -11 });

		childB.localPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: -10, y: -8 });
		expect(childA.worldPosition).toEqual({ x: -20, y: -16 });
		expect(childB.localPosition).toEqual({ x: 0, y: 0 });
		expect(childB.worldPosition).toEqual({ x: -20, y: -16 });

		childB.localPosition = new Vector2(25, 40);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(childA.localPosition).toEqual({ x: -10, y: -8 });
		expect(childA.worldPosition).toEqual({ x: -20, y: -16 });
		expect(childB.localPosition).toEqual({ x: 25, y: 40 });
		expect(childB.worldPosition).toEqual({ x: 5, y: 24 });
	});

	it("should stay in place after parent or child detach", () =>
	{
		const parent = new Transform(new Vector2(5, 5));
		const childA = new Transform(new Vector2(10, 10));
		const childB = new Transform(new Vector2(15, 15));

		parent.AttachChild(childA);
		childA.AttachChild(childB);
		parent.worldPosition = new Vector2(0, 0);
		parent.DetachChild(childA);
		parent.worldPosition = new Vector2(25, 25);

		expect(parent.localPosition).toEqual({ x: 25, y: 25 });
		expect(parent.worldPosition).toEqual({ x: 25, y: 25 });
		expect(childA.localPosition).toEqual({ x: 5, y: 5 });
		expect(childA.worldPosition).toEqual({ x: 5, y: 5 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 10, y: 10 });
		childA.UnsetParent();
		childB.UnsetParent();

		childA.SetParent(parent);
		childB.SetParent(childA);
		childA.worldPosition = new Vector2(0, 0);
		childA.UnsetParent();
		childA.worldPosition = new Vector2(35, 35);

		expect(parent.localPosition).toEqual({ x: 25, y: 25 });
		expect(parent.worldPosition).toEqual({ x: 25, y: 25 });
		expect(childA.localPosition).toEqual({ x: 35, y: 35 });
		expect(childA.worldPosition).toEqual({ x: 35, y: 35 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 40, y: 40 });
		childA.UnsetParent();
		childB.UnsetParent();

		parent.AttachChild(childA);
		childA.AttachChild(childB);
		parent.localPosition = new Vector2(0, 0);
		parent.DetachChild(childA);
		parent.localPosition = new Vector2(25, 25);

		expect(parent.localPosition).toEqual({ x: 25, y: 25 });
		expect(parent.worldPosition).toEqual({ x: 25, y: 25 });
		expect(childA.localPosition).toEqual({ x: 10, y: 10 });
		expect(childA.worldPosition).toEqual({ x: 10, y: 10 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 15, y: 15 });
		childA.UnsetParent();
		childB.UnsetParent();

		childA.SetParent(parent);
		childB.SetParent(childA);
		childA.localPosition = new Vector2(0, 0);
		childA.UnsetParent();
		childA.localPosition = new Vector2(35, 35);

		expect(parent.localPosition).toEqual({ x: 25, y: 25 });
		expect(parent.worldPosition).toEqual({ x: 25, y: 25 });
		expect(childA.localPosition).toEqual({ x: 35, y: 35 });
		expect(childA.worldPosition).toEqual({ x: 35, y: 35 });
		expect(childB.localPosition).toEqual({ x: 5, y: 5 });
		expect(childB.worldPosition).toEqual({ x: 40, y: 40 });
		childA.UnsetParent();
		childB.UnsetParent();

		childA.SetParent(parent);
		childB.SetParent(childA);
		console.log(parent.localPosition, parent.worldPosition);
		console.log(childA.localPosition, childA.worldPosition);

		childB.localPosition = new Vector2(0, 0);
		childB.UnsetParent();
		childB.localPosition = new Vector2(35, 35);

		expect(parent.localPosition).toEqual({ x: 25, y: 25 });
		expect(parent.worldPosition).toEqual({ x: 25, y: 25 });
		expect(childA.localPosition).toEqual({ x: 10, y: 10 });
		expect(childA.worldPosition).toEqual({ x: 35, y: 35 });
		expect(childB.localPosition).toEqual({ x: 35, y: 35 });
		expect(childB.worldPosition).toEqual({ x: 35, y: 35 });
	});
});
