import { Vector2 } from "@/entities";
import { ColliderProtocol } from "./collider-protocol";
import { IdGeneratorProtocol } from "./id-generator-protocol";

export abstract class BoxColliderProtocol extends ColliderProtocol
{
	public abstract width: number;
	public abstract height: number;

	constructor(
		idGenerator: IdGeneratorProtocol,
    public readonly position: Readonly<Vector2>,
	)
	{
		super(idGenerator, position);
	}
}
