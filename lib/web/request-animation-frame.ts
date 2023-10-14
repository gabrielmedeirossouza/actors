class TestRequestAnimationFrame
{
	private _testTime = 0;
	private readonly _timeStep = 1 / 50 * 1000;

	public NextTick(callback: (time: number) => void): void
	{
		callback(this._testTime);
		this._testTime += this._timeStep;
	}
}

export class RequestAnimationFrame
{
	private readonly _requestAnimationFrameCallback: (callback: (time: number) => void) => void;

	constructor()
	{
		if (process.env.NODE_ENV === "test")
		{
			const testRequestAnimationFrame = new TestRequestAnimationFrame();
			this._requestAnimationFrameCallback = testRequestAnimationFrame.NextTick.bind(testRequestAnimationFrame);

			return;
		}

		this._requestAnimationFrameCallback = window.requestAnimationFrame.bind(window);
	}

	public NextTick(callback: (time: number) => void): void
	{
		this._requestAnimationFrameCallback(callback);
	}
}
