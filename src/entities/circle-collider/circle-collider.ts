import { ColliderProtocol } from "@/protocols";
import { Transform } from "@/entities";

export class CircleCollider extends ColliderProtocol
{
	constructor(
		transform: Transform,
		public radius: number
	)
	{
		super(transform);
	}
}
