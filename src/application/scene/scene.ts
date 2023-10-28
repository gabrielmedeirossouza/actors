import { Actor } from "@/entities";

export class Scene
{
	private _actors: Actor[] = [];

	public get Actors(): ReadonlyArray<Actor>
	{
		return this._actors;
	}

	public AddActor(actor: Actor): void
	{
		this._actors.push(actor);
	}

	public RemoveActor(actor: Actor): void
	{
		const index = this._actors.findIndex(a => a.id === actor.id);
		if (index === -1) return;

		this._actors.splice(index, 1);
	}
}
