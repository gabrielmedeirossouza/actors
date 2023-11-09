import { ColliderProtocol } from "./collider-protocol";
import { IdGeneratorProtocol } from "./id-generator-protocol";
import { TransformProtocol } from "./transform-protocol";

export abstract class BoxColliderProtocol extends ColliderProtocol
{
	constructor(
		idGenerator: IdGeneratorProtocol,
    public readonly transform: TransformProtocol,
    protected _width: number,
    protected _height: number
	)
	{
		super(idGenerator, transform);
	}

	public abstract get width(): number;
	public abstract set width(value: number);
	public abstract get height(): number;
	public abstract set height(value: number);
}
