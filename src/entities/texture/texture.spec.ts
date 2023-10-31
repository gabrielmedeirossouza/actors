import { it, expect } from 'vitest';
import { Texture } from './texture';
import { ImageProtocol } from '@/protocols';

it("should create an empty texture", () =>
{
	const texture = new Texture(0, 0);
	expect(texture.width).toBe(0);
	expect(texture.height).toBe(0);
	expect(texture.image).toBe(undefined);
});

it("should create a texture with an image", () =>
{
	class FakeImage extends ImageProtocol
	{
		public buffer = new ArrayBuffer(0);
	}

	const texture = new Texture(0, 0);
	const image = new FakeImage();
	texture.image = image;
	expect(texture.image).toBe(image);
});
