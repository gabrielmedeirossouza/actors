import { ComponentProtocol } from "./component-protocol";
import { IdGeneratorProtocol } from "./id-generator-protocol";
import { TransformProtocol } from "./transform-protocol";

export abstract class ActorProtocol
{
	public readonly id: string;
	public abstract components: ReadonlyArray<ComponentProtocol>;

	constructor(
		idGenerator: IdGeneratorProtocol,
    public name: string,
    public transform: TransformProtocol
	)
	{
		this.id = idGenerator.Generate();
	}
}
