import { Sprite, Texture2D, Vector2 } from "@/entities";
import { HttpFileLoader, WebGLSpriteRenderer, WebIdGenerator } from "@/infrastructure";
import { LoadTexture2D, RenderSprite } from "@/use-cases";

// infra
const idGenerator = new WebIdGenerator();
const webglRenderer = new WebGLSpriteRenderer(document.body);
const fileLoader = new HttpFileLoader();

// entities
const sprite = new Sprite(idGenerator, new Vector2(600, 600));
const texture = new Texture2D(100, 100);

// use-cases
const textureLoader = new LoadTexture2D();
const renderSprite = new RenderSprite(sprite, webglRenderer);

textureLoader.LoadTexture(texture, fileLoader, "http://localhost:3000/me.jpg").then(() =>
{
	sprite.texture = texture;
	renderSprite.Render();
});

