import { ColliderProtocol } from "./collider-protocol";
import { IdGeneratorProtocol } from "./id-generator-protocol";
import { TransformProtocol } from "./transform-protocol";

export abstract class BoxColliderProtocol extends ColliderProtocol
{
	public abstract width: number;
	public abstract height: number;

	constructor(
		idGenerator: IdGeneratorProtocol,
    public readonly transform: TransformProtocol
	)
	{
		super(idGenerator, transform);
	}
}
