import { ColliderDetectionHandlerProtocol, ColliderProtocol, BoxColliderProtocol } from "@/protocols";

export class RigidBoxRigidBoxColliderDetectionHandler extends ColliderDetectionHandlerProtocol
{
	constructor(
		next?: ColliderDetectionHandlerProtocol
	)
	{
		super(next);
	}

	public IsColliding(a: ColliderProtocol, b: ColliderProtocol): boolean
	{
		if (a instanceof BoxColliderProtocol && b instanceof BoxColliderProtocol)
		{
			const aX = a.transform.worldPosition.x - a.width / 2;
			const aY = a.transform.worldPosition.y - a.height / 2;
			const aWidth = a.width;
			const aHeight = a.height;

			const bX = b.transform.worldPosition.x - b.width / 2;
			const bY = b.transform.worldPosition.y - b.height / 2;
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
