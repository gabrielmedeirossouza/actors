import { it, expect } from 'vitest';
import { WebFrameGenerator } from './web-frame-generator';

it("Should loop through the frames and generate the web frame", () =>
{
	const sut = new WebFrameGenerator(loop);

	let hasCalled = false;
	let calls = 0;
	function loop(time: number, deltaTime: number): void
	{
		if (time >= 10) sut.Stop();
		calls++;

		if (!calls) expect(deltaTime).toBeCloseTo(0.02);
		if (calls === 50) expect(time).toBeCloseTo(1);
		if (calls === 100) expect(time).toBeCloseTo(2);

		hasCalled = true;
	}

	sut.Start();

	expect(hasCalled).toBe(true);
});
