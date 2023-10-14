import { FrameGeneratorProtocol } from "@/protocols";
import { RequestAnimationFrame } from "@lib/web";

export class WebFrameGenerator extends FrameGeneratorProtocol
{
	private _inverseMillisecondsPerSecond = 1 / 1000;
	private _requestAnimationFrame = new RequestAnimationFrame();

	public NextTick(callback: (time: number) => void): void
	{
		this._requestAnimationFrame.NextTick(time => callback(time * this._inverseMillisecondsPerSecond));
	}
}
