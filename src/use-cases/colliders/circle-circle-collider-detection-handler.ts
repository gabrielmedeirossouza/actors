import { CircleCollider } from "@/entities";
import { ColliderDetectionHandlerProtocol, ColliderProtocol } from "@/protocols";

export class CircleCircleColliderDetectionHandler extends ColliderDetectionHandlerProtocol
{
	constructor(
		next?: ColliderDetectionHandlerProtocol
	)
	{
		super(next);
	}

	public IsColliding(a: ColliderProtocol, b: ColliderProtocol): boolean
	{
		if (a instanceof CircleCollider && b instanceof CircleCollider)
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
