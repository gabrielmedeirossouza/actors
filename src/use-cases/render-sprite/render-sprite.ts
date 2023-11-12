import { RenderSpriteProtocol, SpriteRendererProtocol, SpriteProtocol } from "@/protocols";

export class RenderSprite implements RenderSpriteProtocol
{
	constructor(
    private readonly _sprite: SpriteProtocol,
    private readonly _renderer: SpriteRendererProtocol,
	)
	{}

	public Render(): void
	{
		if (!this._sprite.enabled) return;
		this._renderer.Render(this._sprite);
	}
}
