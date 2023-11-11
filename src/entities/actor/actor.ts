import { ActorProtocol, ComponentProtocol, IdGeneratorProtocol, TransformProtocol } from '@/protocols';

export class Actor extends ActorProtocol
{
	private _components: ComponentProtocol[] = [];

	constructor(
		idGenerator: IdGeneratorProtocol,
		name: string,
		transform: TransformProtocol
	)
	{
		super(idGenerator, name, transform);
	}

	public get components(): ReadonlyArray<ComponentProtocol>
	{
		return this._components;
	}

	public AddComponent(component: ComponentProtocol): void
	{
		if (this._components.includes(component))
		{
			throw new Error(`Component ${component} already exists in actor ${this}`);
		}

		this._components.push(component);
	}

	public RemoveComponent(component: ComponentProtocol): void
	{
		if (!this._components.includes(component))
		{
			throw new Error(`Component ${component} does not exist in actor ${this}`);
		}

		this._components = this._components.filter(c => c !== component);
	}
}
