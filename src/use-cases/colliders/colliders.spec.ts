import { it, expect } from 'vitest';
import { BoxCollider, CircleCollider, Transform, Vector2 } from '@/entities';
import { BoxBoxColliderDetectionHandler } from './box-box-collider-detection-handler';
import { BoxCircleColliderDetectionHandler } from './box-circle-collider-detection-handler';

it.each([
	{
		a: new BoxCollider(new Transform(), 100, 50),
		b: new BoxCollider(new Transform(), 50, 50)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(99, 0)), 100, 50),
		b: new BoxCollider(new Transform(), 100, 50)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(-99, 0)), 100, 50),
		b: new BoxCollider(new Transform(), 100, 50)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(-50, 0)), 100, 50),
		b: new BoxCollider(new Transform(new Vector2(24, 0)), 50, 50)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(0, 50)), 100, 50),
		b: new BoxCollider(new Transform(new Vector2(0, 1)), 50, 50)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(0, -24)), 100, 50),
		b: new BoxCollider(new Transform(new Vector2(0, 25)), 50, 50)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(50, 0)), 100, 100),
		b: new BoxCollider(new Transform(new Vector2(-49, 0)), 100, 100)
	},
])("Should collide BOX BOX %#", ({ a, b }) =>
{
	const handler = new BoxBoxColliderDetectionHandler();

	expect(handler.IsColliding(a, b)).toBe(true);
	expect(handler.IsColliding(b, a)).toBe(true);
});

it.each([
	{
		a: new BoxCollider(new Transform(), 100, 50),
		b: new BoxCollider(new Transform(new Vector2(75, 0)), 50, 50)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(100, 0)), 100, 50),
		b: new BoxCollider(new Transform(), 100, 50)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(-100, 0)), 100, 50),
		b: new BoxCollider(new Transform(), 100, 50)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(-50, 0)), 100, 50),
		b: new BoxCollider(new Transform(new Vector2(25, 0)), 50, 50)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(0, 50)), 100, 50),
		b: new BoxCollider(new Transform(new Vector2(0, 0)), 50, 50)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(0, -25)), 100, 50),
		b: new BoxCollider(new Transform(new Vector2(0, 25)), 50, 50)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(50, 0)), 100, 100),
		b: new BoxCollider(new Transform(new Vector2(-50, 0)), 100, 100)
	},
])("Should not collide BOX BOX %#", ({ a, b }) =>
{
	const handler = new BoxBoxColliderDetectionHandler();

	expect(handler.IsColliding(a, b)).toBe(false);
	expect(handler.IsColliding(b, a)).toBe(false);
});

it.each([
	{
		a: new BoxCollider(new Transform(new Vector2(100, 0)), 100, 50),
		b: new CircleCollider(new Transform(new Vector2(25, 0)), 25)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(140, 0)), 100, 50),
		b: new CircleCollider(new Transform(new Vector2(60, 0)), 30)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(-35, 0)), 40, 50),
		b: new CircleCollider(new Transform(new Vector2(15, 0)), 30)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(100, 0)), 100, 25),
		b: new CircleCollider(new Transform(new Vector2(25, 12.5)), 25)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(100, -30)), 100, 20),
		b: new CircleCollider(new Transform(new Vector2(25, -40)), 25)
	},
])("Should collide BOX CIRCLE %#", ({ a, b }) =>
{
	const boxCircle = new BoxBoxColliderDetectionHandler();
	const handler = new BoxCircleColliderDetectionHandler(boxCircle);

	expect(handler.IsColliding(a, b)).toBe(true);
	expect(handler.IsColliding(b, a)).toBe(true);
});

it.each([
	{
		a: new BoxCollider(new Transform(new Vector2(100, 0)), 100, 50),
		b: new CircleCollider(new Transform(new Vector2(24, 0)), 25)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(140, 0)), 100, 50),
		b: new CircleCollider(new Transform(new Vector2(60, 0)), 29)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(-35, 0)), 40, 50),
		b: new CircleCollider(new Transform(new Vector2(16, 0)), 30)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(100, 0)), 100, 25),
		b: new CircleCollider(new Transform(new Vector2(25, 13)), 25)
	},
	{
		a: new BoxCollider(new Transform(new Vector2(100, -30)), 100, 20),
		b: new CircleCollider(new Transform(new Vector2(25, -40)), 24)
	},
])("Should not collide BOX CIRCLE %#", ({ a, b }) =>
{
	const boxCircle = new BoxBoxColliderDetectionHandler();
	const handler = new BoxCircleColliderDetectionHandler(boxCircle);

	expect(handler.IsColliding(a, b)).toBe(false);
	expect(handler.IsColliding(b, a)).toBe(false);
});
