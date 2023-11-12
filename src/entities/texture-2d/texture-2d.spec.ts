import { it, expect } from 'vitest';
import { Texture2D } from './texture-2d';

it("should create an empty texture", () =>
{
	const texture = new Texture2D(0, 0);
	expect(texture.width).toBe(0);
	expect(texture.height).toBe(0);
	expect(texture.image).toBe(undefined);
});

it("should create a texture with an image", () =>
{
	const texture = new Texture2D(0, 0);
	const image = new ArrayBuffer(0);
	texture.SetImage(image);
	expect(texture.image).toBe(image);
});
