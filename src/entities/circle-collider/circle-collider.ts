import { ColliderProtocol, IdGeneratorProtocol } from "@/protocols";
import { Transform } from "@/entities";

export class CircleCollider extends ColliderProtocol
{
	private _radius: number;

	constructor(
		idGenerator: IdGeneratorProtocol,
		transform: Transform,
		radius: number
	)
	{
		super(idGenerator, transform);
		this._radius = this._GetVerifiedRadius(radius);
	}

	public get radius(): number
	{
		return this._radius;
	}

	public set radius(value: number)
	{
		this._radius = this._GetVerifiedRadius(value);
	}

	private _GetVerifiedRadius(value: number): number
	{
		if (value <= 0)
		{
			throw new Error("Radius must be greater than 0");
		}

		return value;
	}
}
