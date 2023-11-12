import { SpriteProtocol, SpriteRendererProtocol } from "@/protocols";

/**
 * TODO: Implement WebGLSpriteRenderer using webgl 2
 */
export class WebGLSpriteRenderer implements SpriteRendererProtocol
{
	constructor(
		private readonly _parent: HTMLElement,
	)
	{ }

	public Render(sprite: SpriteProtocol): void
	{
		if (!sprite.texture) return;

		const { position, texture, id } = sprite;
		const { width, height, image } = texture;
		const imageElement = this._LoadTextImageSource(image);
		imageElement.dataset.id = id;
		imageElement.style.position = 'absolute';
		imageElement.style.left = `${position.x}px`;
		imageElement.style.top = `${position.y}px`;
		imageElement.style.width = `${width}px`;
		imageElement.style.height = `${height}px`;

		this._parent.querySelector(`[data-id="${id}"]`)?.remove();
		this._parent.append(imageElement);
	}

	private _LoadTextImageSource(arrayBuffer?: ArrayBuffer): HTMLImageElement
	{
		const blob = new Blob([arrayBuffer || new ArrayBuffer(0)], { type: 'image/png' });

		const imageUrl = URL.createObjectURL(blob);

		const image = new Image();
		image.addEventListener('load', () =>
		{
			URL.revokeObjectURL(imageUrl);
		});
		image.src = imageUrl;

		return image;
	}
}
