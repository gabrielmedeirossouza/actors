import { ImageProtocol } from "./image-protocol";

export interface TextureProtocol {
  image?: ImageProtocol
  width: number
  height: number
}
