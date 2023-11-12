import { Vector2 } from "@/entities";
import { ColliderProtocol } from "./collider-protocol";
import { IdGeneratorProtocol } from "./id-generator-protocol";

export abstract class CircleColliderProtocol extends ColliderProtocol
{
	public abstract radius: number;

	constructor(
		idGenerator: IdGeneratorProtocol,
    public readonly position: Readonly<Vector2>,
	)
	{
		super(idGenerator, position);
	}
}
