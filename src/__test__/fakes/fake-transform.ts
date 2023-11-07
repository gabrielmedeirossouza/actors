import { Vector2 } from "@/entities";
import { IdGeneratorProtocol, TransformProtocol } from "@/protocols";

export class FakeTransform extends TransformProtocol
{
	private _parent?: FakeTransform;
	private _children: FakeTransform[] = [];
	private _localPosition: Vector2;
	private _worldPosition: Vector2;
	private _localRotation: number;
	private _worldRotation: number;
	private _scale: Vector2;

	constructor(
		idGenerator: IdGeneratorProtocol,
		position = Vector2.zero,
		rotation = 0,
		scale = Vector2.one
	)
	{
		super(idGenerator);

		this._localPosition = position;
		this._worldPosition = position;
		this._localRotation = rotation;
		this._worldRotation = rotation;
		this._scale = scale;
	}

	public get parent(): FakeTransform | undefined
	{
		return this._parent;
	}

	public get children(): ReadonlyArray<FakeTransform>
	{
		return this._children;
	}

	public get localPosition(): Readonly<Vector2>
	{
		return this._localPosition;
	}

	public set localPosition(value: Vector2)
	{
		this._localPosition = value;
	}

	public get worldPosition(): Readonly<Vector2>
	{
		return this._worldPosition;
	}

	public set worldPosition(value: Vector2)
	{
		this._worldPosition = value;
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

	public SetParent(parent: FakeTransform): void
	{
		this._parent = parent;
	}

	public UnsetParent(): void
	{
		this._parent = undefined;
	}
}
