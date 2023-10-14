import { PhysicsProtocol, RendererProtocol } from "@/protocols";

export class ComponentManager
{
	private readonly _renderers: RendererProtocol[] = [];
	private readonly _physics: PhysicsProtocol[] = [];

	public get renderers(): RendererProtocol[]
	{
		return this._renderers;
	}

	public get physics(): PhysicsProtocol[]
	{
		return this._physics;
	}

	public AddRenderer(renderer: RendererProtocol): void
	{
		this._renderers.push(renderer);
	}

	public RemoveRenderer(renderer: RendererProtocol): void
	{
		const index = this._renderers.findIndex((r) => r.id === renderer.id);
		if (index === -1) return;

		this._renderers.splice(index, 1);
	}

	public AddPhysics(physics: PhysicsProtocol): void
	{
		this._physics.push(physics);
	}

	public RemovePhysics(physics: PhysicsProtocol): void
	{
		const index = this._physics.findIndex((p) => p.id === physics.id);
		if (index === -1) return;

		this._physics.splice(index, 1);
	}
}
