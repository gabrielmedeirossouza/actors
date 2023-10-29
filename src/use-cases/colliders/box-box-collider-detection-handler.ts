import { BoxCollider } from "@/entities";
import { ColliderDetectionHandlerProtocol, ColliderProtocol } from "@/protocols";

export class BoxBoxColliderDetectionHandler extends ColliderDetectionHandlerProtocol
{
	constructor(
		next?: ColliderDetectionHandlerProtocol
	)
	{
		super(next);
	}

	public IsColliding(a: ColliderProtocol, b: ColliderProtocol): boolean
	{
		if (a instanceof BoxCollider && b instanceof BoxCollider)
		{
			const aX = a.transform.worldPosition.x - a.pivot.x * a.width;
			const aY = a.transform.worldPosition.y - a.pivot.y * a.height;
			const aWidth = a.width;
			const aHeight = a.height;

			const bX = b.transform.worldPosition.x - b.pivot.x * b.width;
			const bY = b.transform.worldPosition.y - b.pivot.y * b.height;
			const bWidth = b.width;
			const bHeight = b.height;

			return (
				aX < bX + bWidth &&
        aX + aWidth > bX &&
        aY < bY + bHeight &&
        aY + aHeight > bY
			);
		}

		return this._expectNextOrThrow.IsColliding(a, b);
	}
}
