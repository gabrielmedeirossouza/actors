import { FrameGeneratorProtocol } from "@/protocols";

type TCallback = (time: number, deltaTime: number) => void;

export class Loop
{
	private _lastTime = 0;
	private _deltaTime = 0;
	private _callback: TCallback;

	constructor(
    private _frameGenerator: FrameGeneratorProtocol,
	)
	{}

	public Start(callback: TCallback): void
	{
		this._callback = callback;
		this._lastTime = performance.now();
		this._frameGenerator.NextTick(this._NextFrame.bind(this));
	}

	private _NextFrame(time: number): void
	{
		this._deltaTime = time - this._lastTime;
		this._lastTime = time;
		this._callback(time, this._deltaTime);
		this._frameGenerator.NextTick(this._NextFrame.bind(this));
	}
}
