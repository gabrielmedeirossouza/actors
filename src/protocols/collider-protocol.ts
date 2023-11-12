import { IdGeneratorProtocol } from "./id-generator-protocol";
import { ComponentProtocol } from "./component-protocol";
import { Vector2 } from "@/entities";

export abstract class ColliderProtocol extends ComponentProtocol
{
	public isTrigger = false;

	constructor(
		idGenerator: IdGeneratorProtocol,
    public readonly position: Readonly<Vector2>,
	)
	{
		super(idGenerator);
	}
}
