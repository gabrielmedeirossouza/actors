import { ColliderProtocol, IdGeneratorProtocol } from "@/protocols";
import { Transform } from "@/entities";

export class BoxCollider extends ColliderProtocol
{
	private _width: number;
	private _height: number;

	constructor(
		idGenerator: IdGeneratorProtocol,
		transform: Transform,
		width: number,
		height: number
	)
	{
		super(idGenerator, transform);
		this._width = this._GetVerifiedWidth(width);
		this._height = this._GetVerifiedHeight(height);
	}

	public get width(): number
	{
		return this._width;
	}

	public set width(value: number)
	{
		this._width = this._GetVerifiedWidth(value);
	}

	public get height(): number
	{
		return this._height;
	}

	public set height(value: number)
	{
		this._height = this._GetVerifiedHeight(value);
	}

	private _GetVerifiedWidth(value: number): number
	{
		if (value <= 0)
		{
			throw new Error("Width must be greater than 0");
		}

		return value;
	}

	private _GetVerifiedHeight(value: number): number
	{
		if (value <= 0)
		{
			throw new Error("Height must be greater than 0");
		}

		return value;
	}
}
