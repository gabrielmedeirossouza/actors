import { BoxColliderProtocol, CircleColliderProtocol, ColliderDoubleDispatchProtocol, IdGeneratorProtocol } from "@/protocols";
import { Vector2 } from "../vector2";

export class RigidBoxCollider extends ColliderDoubleDispatchProtocol
{
	private _width: number;
	private _height: number;

	constructor(
		idGenerator: IdGeneratorProtocol,
		position: Vector2,
		width: number,
		height: number
	)
	{
		super(idGenerator, position);
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

	public IsCollidingWith(other: ColliderDoubleDispatchProtocol): boolean
	{
		return other.IsCollidingWithBox(this);
	}

	public IsCollidingWithBox(other: BoxColliderProtocol): boolean
	{
		const aX = this.position.x - this.width / 2;
		const aY = this.position.y - this.height / 2;
		const aWidth = this.width;
		const aHeight = this.height;

		const bX = other.position.x - other.width / 2;
		const bY = other.position.y - other.height / 2;
		const bWidth = other.width;
		const bHeight = other.height;

		return (
			aX < bX + bWidth &&
			aX + aWidth > bX &&
			aY < bY + bHeight &&
			aY + aHeight > bY
		);
	}

	public IsCollidingWithCircle(other: CircleColliderProtocol): boolean
	{
		const circleDistanceX = Math.abs(other.position.x - this.position.x);
		const circleDistanceY = Math.abs(other.position.y - this.position.y);

		if (circleDistanceX > (this.width / 2 + other.radius)) return false;
		if (circleDistanceY > (this.height / 2 + other.radius)) return false;

		if (circleDistanceX <= (this.width / 2)) return true;
		if (circleDistanceY <= (this.height / 2)) return true;

		const cornerDistance_sq = Math.pow(circleDistanceX - this.width / 2, 2) +
			Math.pow(circleDistanceY - this.height / 2, 2);

		return (cornerDistance_sq <= Math.pow(other.radius, 2));
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
