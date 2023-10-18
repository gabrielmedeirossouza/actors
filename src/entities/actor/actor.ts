import { Crypto } from '@lib/crypto';
import { ComponentManager, Transform } from '../';

export class Actor
{
	public readonly id = Crypto.UUID();

	constructor(
		private _name: string,
		public readonly transform: Transform,
		public readonly componentManager: ComponentManager
	)
	{}

	public get name(): string
	{
		return this._name;
	}

	public set name(value: string)
	{
		this._name = value;
	}
}
