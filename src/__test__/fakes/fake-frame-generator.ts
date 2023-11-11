import { FrameGeneratorProtocol } from "@/protocols";

export class FakeFrameGenerator extends FrameGeneratorProtocol
{
	constructor(
    protected readonly _callback: (time: number, deltaTime: number) => void
	)
	{
		super(FakeFrameGenerator._GetLoop(), _callback);
	}

	private static _GetLoop(): (callback: (time: number) => void) => void
	{
		let time = 0;
		const TIME_STEP = 1 / 50;

		return (callback: (time: number) => void): void =>
		{
			time += TIME_STEP;
			callback(time);
		};
	}
}
