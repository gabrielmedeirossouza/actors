import { ColliderDetectionHandlerProtocol, ColliderProtocol, BoxColliderProtocol, CircleColliderProtocol } from "@/protocols";

export class RigidBoxRigidCircleColliderDetectionHandler extends ColliderDetectionHandlerProtocol
{
	constructor(
		next?: ColliderDetectionHandlerProtocol
	)
	{
		super(next);
	}

	public IsColliding(a: ColliderProtocol, b: ColliderProtocol): boolean
	{
		const isBoxCircle = a instanceof BoxColliderProtocol && b instanceof CircleColliderProtocol;
		const isCircleBox = a instanceof CircleColliderProtocol && b instanceof BoxColliderProtocol;

		if (isBoxCircle) return this._IsCollidingBoxCircle(a, b);
		else if (isCircleBox) return this._IsCollidingBoxCircle(b, a);

		return this._expectNextOrThrow.IsColliding(a, b);
	}

	private _IsCollidingBoxCircle(a: BoxColliderProtocol, b: CircleColliderProtocol): boolean
	{
		const box = a;
		const circle = b;

		const circleDistanceX = Math.abs(circle.transform.worldPosition.x - box.transform.worldPosition.x);
		const circleDistanceY = Math.abs(circle.transform.worldPosition.y - box.transform.worldPosition.y);

		if (circleDistanceX > (box.width / 2 + circle.radius)) return false;
		if (circleDistanceY > (box.height / 2 + circle.radius)) return false;

		if (circleDistanceX <= (box.width / 2)) return true;
		if (circleDistanceY <= (box.height / 2)) return true;

		const cornerDistance_sq = Math.pow(circleDistanceX - box.width / 2, 2) +
      Math.pow(circleDistanceY - box.height / 2, 2);

		return (cornerDistance_sq <= Math.pow(circle.radius, 2));
	}
}
