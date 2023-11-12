import { ColliderProtocol } from "./collider-protocol";
import { IdGeneratorProtocol } from "./id-generator-protocol";
import { TransformProtocol } from "./transform-protocol";

export abstract class CircleColliderProtocol extends ColliderProtocol
{
	public abstract radius: number;

	constructor(
		idGenerator: IdGeneratorProtocol,
    public readonly transform: TransformProtocol,
	)
	{
		super(idGenerator, transform);
	}
}
