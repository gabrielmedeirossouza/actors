import { ColliderProtocol } from "@/protocols";
import { Transform, Vector2 } from "@/entities";

export class BoxCollider extends ColliderProtocol
{
	constructor(
		transform: Transform,
    public width: number,
    public height: number,
    public pivot: Vector2
	)
	{
		super(transform);
	}

	public IsColliding(other: BoxCollider): boolean
	{
		const thisX = this._transform.worldPosition.x - this.pivot.x * this.width;
		const thisY = this._transform.worldPosition.y - this.pivot.y * this.height;
		const thisWidth = this.width;
		const thisHeight = this.height;

		const otherX = other._transform.worldPosition.x - other.pivot.x * other.width;
		const otherY = other._transform.worldPosition.y - other.pivot.y * other.height;
		const otherWidth = other.width;
		const otherHeight = other.height;

		return (
			thisX < otherX + otherWidth &&
      thisX + thisWidth > otherX &&
      thisY < otherY + otherHeight &&
      thisY + thisHeight > otherY
		);
	}
}
