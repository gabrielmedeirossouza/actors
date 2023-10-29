import { BoxCollider, CircleCollider } from "@/entities";
import { ColliderDetectionHandlerProtocol, ColliderProtocol } from "@/protocols";

export class BoxCircleColliderDetectionHandler extends ColliderDetectionHandlerProtocol
{
	constructor(
		next?: ColliderDetectionHandlerProtocol
	)
	{
		super(next);
	}

	public IsColliding(a: ColliderProtocol, b: ColliderProtocol): boolean
	{
		const isBoxCircle = a instanceof BoxCollider && b instanceof CircleCollider;
		const isCircleBox = a instanceof CircleCollider && b instanceof BoxCollider;

		if (isBoxCircle) return this._IsCollidingBoxCircle(a, b);
		else if (isCircleBox) return this._IsCollidingBoxCircle(b, a);

		return this._expectNextOrThrow.IsColliding(a, b);
	}

	private _IsCollidingBoxCircle(a: BoxCollider, b: CircleCollider): boolean
	{
		// TODO
		return false;
	}
}
