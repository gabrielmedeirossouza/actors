import { BoxColliderProtocol, CircleColliderProtocol, ColliderDoubleDispatchProtocol, IdGeneratorProtocol } from "@/protocols";
import { Vector2 } from "../vector2";

export class RigidCircleCollider extends ColliderDoubleDispatchProtocol
{
	private _radius: number;

	constructor(
		idGenerator: IdGeneratorProtocol,
		position: Vector2,
		radius: number
	)
	{
		super(idGenerator, position);
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

	public IsCollidingWith(other: ColliderDoubleDispatchProtocol): boolean
	{
		return other.IsCollidingWithCircle(this);
	}

	public IsCollidingWithBox(other: BoxColliderProtocol): boolean
	{
		const circleDistanceX = Math.abs(this.position.x - other.position.x);
		const circleDistanceY = Math.abs(this.position.y - other.position.y);

		if (circleDistanceX > (other.width / 2 + this.radius)) return false;
		if (circleDistanceY > (other.height / 2 + this.radius)) return false;

		if (circleDistanceX <= (other.width / 2)) return true;
		if (circleDistanceY <= (other.height / 2)) return true;

		const cornerDistance_sq = Math.pow(circleDistanceX - other.width / 2, 2) +
			Math.pow(circleDistanceY - other.height / 2, 2);

		return (cornerDistance_sq <= Math.pow(this.radius, 2));
	}

	public IsCollidingWithCircle(other: CircleColliderProtocol): boolean
	{
		const distance = Vector2.Subtract(this.position, other.position).magnitude;

		return distance < this.radius + other.radius;
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
