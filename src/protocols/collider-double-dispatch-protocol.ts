import { IdGeneratorProtocol } from "./id-generator-protocol";
import { Vector2 } from "@/entities";
import { BoxColliderProtocol } from "./box-collider-protocol";
import { CircleColliderProtocol } from "./circle-collider-protocol";
import { ColliderProtocol } from "./collider-protocol";

export abstract class ColliderDoubleDispatchProtocol extends ColliderProtocol
{
	public isTrigger = false;

	constructor(
		idGenerator: IdGeneratorProtocol,
    public readonly position: Readonly<Vector2>,
	)
	{
		super(idGenerator, position);
	}

	public abstract IsCollidingWith(other: ColliderDoubleDispatchProtocol): boolean;
	public abstract IsCollidingWithBox(other: BoxColliderProtocol): boolean;
	public abstract IsCollidingWithCircle(other: CircleColliderProtocol): boolean;
}
