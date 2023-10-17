type TLoop = (callback: (time: number) => void) => void;

function __loop_test_mode__(): TLoop
{
	let time = 0;
	const TIME_STEP = 1 / 50;

	return (callback: (time: number) => void): void =>
	{
		time += TIME_STEP;
		callback(time);
	};
}

export abstract class FrameGeneratorProtocol
{
	private _isRunning = false;
	private _oldTime = 0;
	protected readonly _loop: TLoop;

	constructor(
		loop: TLoop,
		protected readonly _callback: (time: number, deltaTime: number) => void
	)
	{
		this._loop = process.env.NODE_ENV === "test"
			? __loop_test_mode__()
			: loop;
	}

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
