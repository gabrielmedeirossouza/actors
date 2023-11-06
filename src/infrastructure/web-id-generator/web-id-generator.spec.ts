import { test, expect } from 'vitest';
import { WebIdGenerator } from './web-id-generator';

test("WebIdGenerator -> generate uuid", () =>
{
	const sut = new WebIdGenerator();
	const id = sut.Generate();

	expect(id.length).toBe(36);
	expect(id[8]).toBe('-');
	expect(id[13]).toBe('-');
	expect(id[18]).toBe('-');
	expect(id[23]).toBe('-');
	expect(id[14]).toBe('4');
	expect(id[19]).toMatch(/[89ab]/);

	const HEXADECIMAL_REGEX = /[\da-f]/;
	const HEXADECIMAL_INDEXES = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10,
		11, 12, 15, 16, 17, 20, 21];

	for (const index of HEXADECIMAL_INDEXES)
	{
		expect(id[index]).toMatch(HEXADECIMAL_REGEX);
	}
}, { repeats: 100 });
