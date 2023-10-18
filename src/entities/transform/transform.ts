import { ComponentProtocol } from "@/protocols";
import { Vector2 } from "@lib/math";

export class Transform extends ComponentProtocol
{
	private _parent?: Transform;
	private _children: Transform[] = [];
	private _localPosition: Vector2;
	private _worldPosition: Vector2;
	private _localRotation: number;
	private _worldRotation: number;
	private _scale: Vector2;

	constructor(
		position = Vector2.zero,
		rotation = 0,
		scale = Vector2.one
	)
	{
		super();

		this._localPosition = position;
		this._worldPosition = position;
		this._localRotation = rotation;
		this._worldRotation = rotation;
		this._scale = scale;
	}

	public get parent(): Transform | undefined
	{
		return this._parent;
	}

	public get worldPosition(): Readonly<Vector2>
	{
		return this._worldPosition;
	}

	public set worldPosition(value: Vector2)
	{
		const deltaWorldPosition = Vector2.Subtract(value, this.worldPosition);
		this._worldPosition = value;

		/**
		 * pl¹ = pw¹ - pw²
		 */
		this._localPosition = Vector2.Subtract(this._worldPosition, this._parent?.worldPosition || Vector2.zero);

		this._children.forEach(child =>
		{
			child.worldPosition = Vector2.Add(child.worldPosition, deltaWorldPosition);
		});
	}

	public get localPosition(): Readonly<Vector2>
	{
		return this._localPosition;
	}

	public set localPosition(value: Vector2)
	{
		const deltaWorldPosition = Vector2.Subtract(value, this.worldPosition);
		this._localPosition = value;

		/**
		 * pw¹ = pl¹ + pw²
		 */
		this._worldPosition = Vector2.Add(this._localPosition, this._parent?.worldPosition || Vector2.zero);

		this._children.forEach(child =>
		{
			child.worldPosition = Vector2.Add(child.worldPosition, deltaWorldPosition);
		});
	}

	public SetParent(parent: Transform): void
	{
		this._parent = parent;

		/**
		 * pl¹ = pw¹ - pw²
		 */
		this._localPosition = Vector2.Subtract(this._worldPosition, parent.worldPosition);
	}

	public UnsetParent(): void
	{
		this._parent = undefined;

		this._localPosition = this._worldPosition;
	}

	public AttachChild(child: Transform): Transform
	{
		this._children.push(child);

		return child;
	}

	public DetachChild(child: Transform): void
	{
		const index = this._children.findIndex(c => c.id === child.id);

		if (index === -1) return;

		this._children.splice(index, 1);
	}
}
