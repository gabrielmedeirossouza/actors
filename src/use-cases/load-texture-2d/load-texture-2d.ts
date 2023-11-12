import { FileLoaderProtocol, LoadTextureProtocol, TextureProtocol } from "@/protocols";

export class LoadTexture2D implements LoadTextureProtocol
{
	public async LoadTexture(texture: TextureProtocol, fileLoader: FileLoaderProtocol, path: string): Promise<void>
	{
		return fileLoader.Load(path).then((buffer: ArrayBuffer) =>
		{
			texture.SetImage(buffer);
		});
	}
}
