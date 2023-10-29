import { Transform } from "@/entities";
import { PhysicsProtocol } from "./physics-protocol";

export abstract class ColliderProtocol extends PhysicsProtocol
{
	public isTrigger = false;

	constructor(
    public readonly transform: Transform
	)
	{
		super();
	}
}
