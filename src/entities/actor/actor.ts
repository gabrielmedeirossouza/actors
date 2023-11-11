import { IdGeneratorProtocol, TransformProtocol } from '@/protocols';

export class Actor
{
	public readonly id: string;

	constructor(
		idGenerator: IdGeneratorProtocol,
		public readonly name: string,
		public readonly transform: TransformProtocol
	)
	{
		this.id = idGenerator.Generate();
	}
}
