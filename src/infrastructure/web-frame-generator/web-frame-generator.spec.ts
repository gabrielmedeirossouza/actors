import { it, expect } from 'vitest';
import { WebFrameGenerator } from './web-frame-generator';

it("Should loop through the frames and generate the web frame", () =>
{
	let time = 0;
	const sut = new WebFrameGenerator();

	sut.NextTick(t => time = t);
	expect(time).toBe(0);
	sut.NextTick(t => time = t);
	expect(time).toBe(1 / 50);
	sut.NextTick(t => time = t);
	expect(time).toBe(2 / 50);
	sut.NextTick(t => time = t);
	expect(time).toBe(3 / 50);
	sut.NextTick(t => time = t);
	expect(time).toBe(4 / 50);
	sut.NextTick(t => time = t);
	expect(time).toBe(5 / 50);
	sut.NextTick(t => time = t);
	expect(time).toBe(6 / 50);
	sut.NextTick(t => time = t);
	expect(time).toBe(7 / 50);
	sut.NextTick(t => time = t);
	expect(time).toBe(8 / 50);
	sut.NextTick(t => time = t);
	expect(time).toBe(9 / 50);
	sut.NextTick(t => time = t);
	expect(time).toBe(10 / 50);
});
