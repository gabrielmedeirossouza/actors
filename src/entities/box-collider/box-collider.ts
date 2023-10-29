import { ColliderProtocol } from "@/protocols";
import { Transform } from "@/entities";

export class BoxCollider extends ColliderProtocol
{
	constructor(
		transform: Transform,
    public width: number,
    public height: number
	)
	{
		super(transform);
	}
}
