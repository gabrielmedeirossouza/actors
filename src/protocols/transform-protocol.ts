import { Vector2 } from "@/entities";
import { IdGeneratorProtocol } from "./id-generator-protocol";

export abstract class TransformProtocol
{
	public readonly id: string;
	public abstract readonly parent?: TransformProtocol;
	public abstract readonly children: ReadonlyArray<TransformProtocol>;

	constructor(
  	idGenerator: IdGeneratorProtocol,
	)
	{
  	this.id = idGenerator.Generate();
	}

	public abstract get localPosition(): Readonly<Vector2>;
  public abstract set localPosition(value: Vector2);
	public abstract get worldPosition(): Readonly<Vector2>;
  public abstract set worldPosition(value: Vector2);
  public abstract get localRotation(): Readonly<number>;
  public abstract set localRotation(value: number);
  public abstract get worldRotation(): Readonly<number>;
  public abstract set worldRotation(value: number);
  public abstract get scale(): Readonly<Vector2>;
  public abstract set scale(value: Vector2);
  public abstract SetParent(parent: TransformProtocol): void;
  public abstract UnsetParent(): void;
}
