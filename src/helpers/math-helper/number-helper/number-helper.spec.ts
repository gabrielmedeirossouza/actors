import { describe, it, expect } from 'vitest';
import { NumberHelper } from './number-helper';

describe(NumberHelper.IsCloseTo.name, () =>
{
	it("should return true when the numbers are close", () =>
	{
		expect(NumberHelper.IsCloseTo(1, 1.0001)).toBe(true);
		expect(NumberHelper.IsCloseTo(1, 0.9999)).toBe(true);
		expect(NumberHelper.IsCloseTo(1, 1.999, 1)).toBe(true);
		expect(NumberHelper.IsCloseTo(1, 0.1, 1)).toBe(true);
		expect(NumberHelper.IsCloseTo(-10, -10.0005)).toBe(true);
	});

	it("should return false when the numbers are not close", () =>
	{
		expect(NumberHelper.IsCloseTo(1, 1.1)).toBe(false);
		expect(NumberHelper.IsCloseTo(1, 0.9)).toBe(false);
		expect(NumberHelper.IsCloseTo(1, 1.9, 0.001)).toBe(false);
		expect(NumberHelper.IsCloseTo(1, 0.1, 0.5)).toBe(false);
		expect(NumberHelper.IsCloseTo(-10, -10.1)).toBe(false);
	});
});
