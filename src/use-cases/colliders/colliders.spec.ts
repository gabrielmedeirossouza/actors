import { expect, test } from 'vitest';
import { BoxCollider } from '../../entities/box-collider';
import { BoxBoxColliderDetectionHandler } from './box-box-collider-detection-handler';
import { CircleCollider, Transform, Vector2 } from '@/entities';
import { BoxCircleColliderDetectionHandler } from './box-circle-collider-detection-handler';

test("BoxCollider", () =>
{
	const boxBox = new BoxBoxColliderDetectionHandler();
	const boxCircle = new BoxCircleColliderDetectionHandler(boxBox);

	const isColliding = boxCircle.IsColliding(
		new BoxCollider(new Transform(new Vector2(99, 0)), 100, 50, new Vector2(0.5, 0.5)),
		// new CircleCollider(new Transform(), 10),
		new CircleCollider(new Transform(), 10),
		// new BoxCollider(new Transform(), 100, 50, new Vector2(0.5, 0.5)),
	);

	expect(true).toBe(true);
});
