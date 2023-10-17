import { test, expect } from 'vitest';
import { Crypto } from './crypto';

test("UUID", () =>
{
	const sut = Crypto.UUID();

	expect(sut.length).toBe(36);
	expect(sut[8]).toBe('-');
	expect(sut[13]).toBe('-');
	expect(sut[18]).toBe('-');
	expect(sut[23]).toBe('-');
	expect(sut[14]).toBe('4');
	expect(sut[19]).toMatch(/[89ab]/);

	const HEXADECIMAL_REGEX = /[\da-f]/;
	const HEXADECIMAL_INDEXES = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10,
		11, 12, 15, 16, 17, 20, 21];

	for (const index of HEXADECIMAL_INDEXES)
	{
		expect(sut[index]).toMatch(HEXADECIMAL_REGEX);
	}
}, { repeats: 100 });
