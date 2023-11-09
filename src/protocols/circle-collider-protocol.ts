import { ColliderProtocol } from "./collider-protocol";
import { IdGeneratorProtocol } from "./id-generator-protocol";
import { TransformProtocol } from "./transform-protocol";

export abstract class CircleColliderProtocol extends ColliderProtocol
{
	constructor(
		idGenerator: IdGeneratorProtocol,
    public readonly transform: TransformProtocol,
    protected _radius: number
	)
	{
		super(idGenerator, transform);
	}

	public abstract get radius(): number;
	public abstract set radius(value: number);
}
