import { FrameGeneratorProtocol } from "@/protocols";

export class WebFrameGenerator extends FrameGeneratorProtocol
{
	constructor(
		protected readonly _callback: (time: number, deltaTime: number) => void
	)
	{
		super(WebFrameGenerator._GetNormalizedRequestAnimationFrame(), _callback);
	}

	private static _GetNormalizedRequestAnimationFrame(): (callback: (time: number) => void) => void
	{
		const INVERSE_MILLISECONDS_PER_SECOND = 1 / 1000;

		return (callback: (time: number) => void): void =>
		{
			window.requestAnimationFrame((time: number) => callback(time * INVERSE_MILLISECONDS_PER_SECOND));
		};
	}
}