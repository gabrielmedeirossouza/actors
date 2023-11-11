export abstract class FrameGeneratorProtocol
{
	private _isRunning = false;
	private _oldTime = 0;

	constructor(
		protected readonly _loop: (callback: (time: number) => void) => void,
		protected readonly _callback: (time: number, deltaTime: number) => void
	)
	{}

	public Start(): void
	{
		if (this._isRunning) return;

		this._isRunning = true;
		this._loop(() => this._InternalUpdate(0, 0));
	}

	public Stop(): void
	{
		this._isRunning = false;
	}

	private _InternalUpdate(time: number, deltaTime: number): void
	{
		if (!this._isRunning) return;

		this._callback(time, deltaTime);
		this._oldTime = time;
		this._loop((time: number) => this._InternalUpdate(time, time - this._oldTime));
	}
}
