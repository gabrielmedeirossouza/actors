import { ColliderProtocol } from './collider-protocol';

export abstract class ColliderDetectionHandlerProtocol
{
	constructor(
		private _next?: ColliderDetectionHandlerProtocol
	)
	{}

	public abstract IsColliding(a: ColliderProtocol, b: ColliderProtocol): boolean

	protected get _expectNextOrThrow(): ColliderDetectionHandlerProtocol
	{
		if (!this._next) throw new Error("Collider detection handler implementation missing.");

		return this._next;
	}
}
