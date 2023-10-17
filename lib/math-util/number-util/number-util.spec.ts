import { describe, it, expect } from 'vitest';
import { NumberUtil } from './number-util';

describe(NumberUtil.IsCloseTo.name, () =>
{
	it("should return true when the numbers are close", () =>
	{
		expect(NumberUtil.IsCloseTo(1, 1.0001)).toBe(true);
		expect(NumberUtil.IsCloseTo(1, 0.9999)).toBe(true);
		expect(NumberUtil.IsCloseTo(1, 1.999, 1)).toBe(true);
		expect(NumberUtil.IsCloseTo(1, 0.1, 1)).toBe(true);
		expect(NumberUtil.IsCloseTo(-10, -10.0005)).toBe(true);
	});
});
