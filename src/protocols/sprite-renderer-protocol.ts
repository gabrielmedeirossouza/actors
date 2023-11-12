import { SpriteProtocol } from "./sprite-protocol";

export interface SpriteRendererProtocol {
  Render(texture: SpriteProtocol): void;
}
