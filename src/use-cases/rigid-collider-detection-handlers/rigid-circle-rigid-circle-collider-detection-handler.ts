import { ColliderDetectionHandlerProtocol, ColliderProtocol, CircleColliderProtocol } from "@/protocols";

export class RigidCircleRigidCircleColliderDetectionHandler extends ColliderDetectionHandlerProtocol
{
	constructor(
		next?: ColliderDetectionHandlerProtocol
	)
	{
		super(next);
	}

	public IsColliding(a: ColliderProtocol, b: ColliderProtocol): boolean
	{
		if (a instanceof CircleColliderProtocol && b instanceof CircleColliderProtocol)
		{
			const distance = Math.sqrt(
				Math.pow(a.transform.worldPosition.x - b.transform.worldPosition.x, 2) +
        Math.pow(a.transform.worldPosition.y - b.transform.worldPosition.y, 2)
			);

			return distance < a.radius + b.radius;
		}

		return this._expectNextOrThrow.IsColliding(a, b);
	}
}
