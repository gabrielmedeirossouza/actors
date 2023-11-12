import { FrameGeneratorProtocol } from "@/protocols";

export class WebFrameGenerator extends FrameGeneratorProtocol
{
	constructor(
		callback: (time: number, deltaTime: number) => void
	)
	{
		if (typeof window === 'undefined') throw new Error('WebFrameGenerator requires window');
		if (window.requestAnimationFrame === undefined) throw new Error('Missing: requestAnimationFrame not found');

		super(WebFrameGenerator._GetNormalizedRequestAnimationFrame(), callback);
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
