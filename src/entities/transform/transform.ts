import { Vector2 } from "@lib/math";

export class Transform
{
	public localPosition: Vector2;
	public worldPosition: Vector2;
	public localRotation: number;
	public worldRotation: number;
	public scale: Vector2;

	constructor(
		position = Vector2.zero,
		rotation = 0,
		scale = Vector2.one
	)
	{
		this.localPosition = position;
		this.worldPosition = position;
		this.localRotation = rotation;
		this.worldRotation = rotation;
		this.scale = scale;
	}
}
