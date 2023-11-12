export interface TextureProtocol {
  readonly image?: ArrayBuffer
  width: number
  height: number
  SetImage(image: ArrayBuffer): void
}
