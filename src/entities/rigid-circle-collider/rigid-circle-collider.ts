import { CircleColliderProtocol, IdGeneratorProtocol, TransformProtocol } from "@/protocols";

export class RigidCircleCollider extends CircleColliderProtocol
{
	protected _radius: number;

	constructor(
		idGenerator: IdGeneratorProtocol,
		transform: TransformProtocol,
		radius: number
	)
	{
		super(idGenerator, transform, radius);
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
