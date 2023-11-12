import { FileLoaderProtocol } from "./file-loader-protocol";
import { TextureProtocol } from "./texture-protocol";

export interface LoadTextureProtocol {
  LoadTexture(texture: TextureProtocol, fileLoader: FileLoaderProtocol, path: string): Promise<void>;
}
