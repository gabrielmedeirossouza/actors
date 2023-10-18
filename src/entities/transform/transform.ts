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

	public get children(): ReadonlyArray<Transform>
	{
		return this._children;
	}

	public get localPosition(): Readonly<Vector2>
	{
		return this._localPosition;
	}

	public set localPosition(value: Vector2)
	{
		const deltaWorldPosition = Vector2.Subtract(value, this.worldPosition);
		this._localPosition = value;

		this._worldPosition = Vector2.Add(this._localPosition, this._parent?.worldPosition || Vector2.zero);

		this._children.forEach(child =>
		{
			child.worldPosition = Vector2.Add(child.worldPosition, deltaWorldPosition);
		});
	}

	public get worldPosition(): Readonly<Vector2>
	{
		return this._worldPosition;
	}

	public set worldPosition(value: Vector2)
	{
		const deltaWorldPosition = Vector2.Subtract(value, this.worldPosition);
		this._worldPosition = value;

		this._localPosition = Vector2.Subtract(this._worldPosition, this._parent?.worldPosition || Vector2.zero);

		this._children.forEach(child =>
		{
			child.worldPosition = Vector2.Add(child.worldPosition, deltaWorldPosition);
		});
	}

	public get localRotation(): Readonly<number>
	{
		return this._localRotation;
	}

	public set localRotation(value: number)
	{
		this._localRotation = value;
	}

	public get worldRotation(): Readonly<number>
	{
		return this._worldRotation;
	}

	public set worldRotation(value: number)
	{
		this._worldRotation = value;
	}

	public get scale(): Readonly<Vector2>
	{
		return this._scale;
	}

	public set scale(value: Vector2)
	{
		this._scale = value;
	}

	public SetParent(parent: Transform): void
	{
		this._parent = parent;
		parent._children.push(this);

		this._localPosition = Vector2.Subtract(this._worldPosition, parent.worldPosition);
	}

	public UnsetParent(): void
	{
		if (!this._parent) return;
		this._parent.DetachChild(this);
		this._parent = undefined;

		this._localPosition = this._worldPosition;
	}

	public AttachChild(child: Transform): Transform
	{
		this._children.push(child);
		child._parent = this;
		child._localPosition = Vector2.Subtract(child._worldPosition, this.worldPosition);

		return child;
	}

	public DetachChild(child: Transform): void
	{
		const index = this._children.findIndex(c => c.id === child.id);

		if (index === -1) return;

		this._children.splice(index, 1);
		child.UnsetParent();
	}
}
