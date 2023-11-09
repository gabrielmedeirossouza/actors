import { ColliderProtocol } from "./collider-protocol";
import { IdGeneratorProtocol } from "./id-generator-protocol";
import { TransformProtocol } from "./transform-protocol";

export abstract class BoxColliderProtocol extends ColliderProtocol
{
	constructor(
		idGenerator: IdGeneratorProtocol,
    public readonly transform: TransformProtocol,
    public readonly width: number,
    public readonly height: number
	)
	{
		super(idGenerator, transform);
	}
}
