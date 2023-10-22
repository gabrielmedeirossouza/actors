import { describe, it, expect } from 'vitest';
import { Transform } from './transform';
import { Vector2 } from '@lib/math';

describe("single hierarchy: parent -> child", () =>
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

	it("should SetParent", () =>
	{
		const parent = new Transform(new Vector2(5, 5));
		const child = new Transform(new Vector2(10, 10));

		child.SetParent(parent);

		expect(child.parent).toBe(parent);
		expect(parent.children).toContain(child);
		expect(parent.children.length).toBe(1);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(child.localPosition).toEqual({ x: 5, y: 5 });
		expect(child.worldPosition).toEqual({ x: 10, y: 10 });
	});

	it("should UnsetParent", () =>
	{
		const parent = new Transform(new Vector2(5, 5));
		const child = new Transform(new Vector2(10, 10));

		child.SetParent(parent);
		child.UnsetParent();

		expect(child.parent).toBe(undefined);
		expect(parent.children).not.toContain(child);
		expect(parent.children.length).toBe(0);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(child.localPosition).toEqual({ x: 10, y: 10 });
		expect(child.worldPosition).toEqual({ x: 10, y: 10 });
	});

	it("should change parent and child worldPosition", () =>
	{
		const parent = new Transform(new Vector2(5, 5));
		const child = new Transform(new Vector2(10, 10));

		child.SetParent(parent);

		parent.worldPosition = new Vector2(5, 5);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(child.localPosition).toEqual({ x: 5, y: 5 });
		expect(child.worldPosition).toEqual({ x: 10, y: 10 });

		parent.worldPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: 0, y: 0 });
		expect(parent.worldPosition).toEqual({ x: 0, y: 0 });
		expect(child.localPosition).toEqual({ x: 5, y: 5 });
		expect(child.worldPosition).toEqual({ x: 5, y: 5 });

		parent.worldPosition = new Vector2(-10, -8);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(child.localPosition).toEqual({ x: 5, y: 5 });
		expect(child.worldPosition).toEqual({ x: -5, y: -3 });

		child.worldPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(child.localPosition).toEqual({ x: 10, y: 8 });
		expect(child.worldPosition).toEqual({ x: 0, y: 0 });

		child.worldPosition = new Vector2(-10, -8);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(child.localPosition).toEqual({ x: 0, y: 0 });
		expect(child.worldPosition).toEqual({ x: -10, y: -8 });
	});

	it("should change parent and child localPosition", () =>
	{
		const parent = new Transform(new Vector2(5, 5));
		const child = new Transform(new Vector2(10, 10));

		child.SetParent(parent);

		parent.localPosition = new Vector2(5, 5);
		expect(parent.localPosition).toEqual({ x: 5, y: 5 });
		expect(parent.worldPosition).toEqual({ x: 5, y: 5 });
		expect(child.localPosition).toEqual({ x: 5, y: 5 });
		expect(child.worldPosition).toEqual({ x: 10, y: 10 });

		parent.localPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: 0, y: 0 });
		expect(parent.worldPosition).toEqual({ x: 0, y: 0 });
		expect(child.localPosition).toEqual({ x: 5, y: 5 });
		expect(child.worldPosition).toEqual({ x: 5, y: 5 });

		parent.localPosition = new Vector2(-10, -8);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(child.localPosition).toEqual({ x: 5, y: 5 });
		expect(child.worldPosition).toEqual({ x: -5, y: -3 });

		child.localPosition = new Vector2(0, 0);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(child.localPosition).toEqual({ x: 0, y: 0 });
		expect(child.worldPosition).toEqual({ x: -10, y: -8 });

		child.localPosition = new Vector2(-10, -8);
		expect(parent.localPosition).toEqual({ x: -10, y: -8 });
		expect(parent.worldPosition).toEqual({ x: -10, y: -8 });
		expect(child.localPosition).toEqual({ x: -10, y: -8 });
		expect(child.worldPosition).toEqual({ x: -20, y: -16 });
	});

	it("should stay in place after UnsetParent", () =>
	{
		const parent = new Transform(new Vector2(5, 5));
		const child = new Transform(new Vector2(10, 10));

		child.SetParent(parent);
		parent.worldPosition = new Vector2(0, 0);
		child.UnsetParent();
		parent.worldPosition = new Vector2(25, 25);

		expect(parent.localPosition).toEqual({ x: 25, y: 25 });
		expect(parent.worldPosition).toEqual({ x: 25, y: 25 });
		expect(child.localPosition).toEqual({ x: 5, y: 5 });
		expect(child.worldPosition).toEqual({ x: 5, y: 5 });

		child.SetParent(parent);
		child.worldPosition = new Vector2(0, 0);
		child.UnsetParent();
		child.worldPosition = new Vector2(35, 35);

		expect(parent.localPosition).toEqual({ x: 25, y: 25 });
		expect(parent.worldPosition).toEqual({ x: 25, y: 25 });
		expect(child.localPosition).toEqual({ x: 35, y: 35 });
		expect(child.worldPosition).toEqual({ x: 35, y: 35 });

		child.SetParent(parent);
		parent.localPosition = new Vector2(0, 0);
		child.UnsetParent();
		parent.localPosition = new Vector2(25, 25);

		expect(parent.localPosition).toEqual({ x: 25, y: 25 });
		expect(parent.worldPosition).toEqual({ x: 25, y: 25 });
		expect(child.localPosition).toEqual({ x: 10, y: 10 });
		expect(child.worldPosition).toEqual({ x: 10, y: 10 });

		child.SetParent(parent);
		child.localPosition = new Vector2(0, 0);
		child.UnsetParent();
		child.localPosition = new Vector2(35, 35);

		expect(parent.localPosition).toEqual({ x: 25, y: 25 });
		expect(parent.worldPosition).toEqual({ x: 25, y: 25 });
		expect(child.localPosition).toEqual({ x: 35, y: 35 });
		expect(child.worldPosition).toEqual({ x: 35, y: 35 });
	});
});
