import { Transform } from "@/entities";
import { PhysicsProtocol } from "./physics-protocol";

export abstract class ColliderProtocol extends PhysicsProtocol
{
	constructor(
    protected _transform: Transform
	)
	{
		super();
	}

  public abstract IsColliding(other: ColliderProtocol): boolean
}
