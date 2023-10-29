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
}
