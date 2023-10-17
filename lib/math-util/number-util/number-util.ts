export class NumberUtil
{
	public static IsCloseTo(a: number, b: number, precision = 0.001): boolean
	{
		return Math.abs(a - b) < precision;
	}
}
