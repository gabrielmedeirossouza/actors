import { ComponentProtocol } from ".";

export abstract class RendererProtocol extends ComponentProtocol
{
	public NotifyRendererLoop(time: number, deltaTime: number): void
	{
		this.AfterUpdate?.(time, deltaTime);
	}

	public AfterUpdate?(time: number, deltaTime: number): void;
}
