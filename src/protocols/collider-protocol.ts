import { Transform } from "@/entities";
import { PhysicsProtocol } from "./physics-protocol";
import { IdGeneratorProtocol } from "./id-generator-protocol";

export abstract class ColliderProtocol extends PhysicsProtocol
{
	public isTrigger = false;

	constructor(
		idGenerator: IdGeneratorProtocol,
    public readonly transform: Transform
	)
	{
		super(idGenerator);
	}
}
