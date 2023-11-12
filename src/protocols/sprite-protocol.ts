import { Vector2 } from "@/entities";
import { ComponentProtocol } from "./component-protocol";
import { IdGeneratorProtocol } from "./id-generator-protocol";
import { TextureProtocol } from "./texture-protocol";

export abstract class SpriteProtocol extends ComponentProtocol
{
	public texture?: TextureProtocol;

	constructor(
		idGenerator: IdGeneratorProtocol,
		public position: Vector2,
	)
	{
		super(idGenerator);
	}
}
