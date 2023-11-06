import { IdGeneratorProtocol } from "./id-generator-protocol";

export abstract class ComponentProtocol
{
	public readonly id: string;
	public enabled = true;

	constructor(
		idGenerator: IdGeneratorProtocol
	)
	{
		this.id = idGenerator.Generate();
	}
}
