export abstract class FrameGeneratorProtocol
{
	public NextTick?(callback: (time: number) => void): void;
}
