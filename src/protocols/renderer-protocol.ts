import { ComponentProtocol } from ".";

export abstract class RendererProtocol extends ComponentProtocol
{
	public NotifyRendererLoop(): void
	{
		this.AfterUpdate?.();
	}

	public AfterUpdate?(): void;
}
