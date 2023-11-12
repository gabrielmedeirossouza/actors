import { IdGeneratorProtocol, SpriteProtocol } from "@/protocols";
import { Vector2 } from "../vector2";

export class Sprite extends SpriteProtocol
{
	constructor(
		idGenerator: IdGeneratorProtocol,
		position: Vector2,
	)
	{
		super(idGenerator, position);
	}
}
