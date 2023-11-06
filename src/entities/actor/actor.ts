import { IdGeneratorProtocol } from '@/protocols';
import { ComponentManager, Transform } from '../';

export class Actor
{
	public readonly id: string;

	constructor(
		idGenerator: IdGeneratorProtocol,
		public readonly name: string,
		public readonly transform: Transform,
		public readonly componentManager: ComponentManager
	)
	{
		this.id = idGenerator.Generate();
	}
}
