import { IdGeneratorProtocol } from "./id-generator-protocol";
import { ComponentProtocol } from "./component-protocol";
import { TransformProtocol } from "./transform-protocol";

export abstract class ColliderProtocol extends ComponentProtocol
{
	public isTrigger = false;

	constructor(
		idGenerator: IdGeneratorProtocol,
    public readonly transform: TransformProtocol
	)
	{
		super(idGenerator);
	}
}
