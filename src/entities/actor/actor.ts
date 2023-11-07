import { IdGeneratorProtocol, TransformProtocol } from '@/protocols';
import { ComponentManager } from '../';

export class Actor
{
	public readonly id: string;

	constructor(
		idGenerator: IdGeneratorProtocol,
		public readonly name: string,
		public readonly transform: TransformProtocol,
		public readonly componentManager: ComponentManager
	)
	{
		this.id = idGenerator.Generate();
	}
}
