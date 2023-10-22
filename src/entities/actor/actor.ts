import { Crypto } from '@lib/crypto';
import { ComponentManager, Transform } from '../';

export class Actor
{
	public readonly id = Crypto.UUID();

	constructor(
		public readonly name: string,
		public readonly transform: Transform,
		public readonly componentManager: ComponentManager
	)
	{}
}
