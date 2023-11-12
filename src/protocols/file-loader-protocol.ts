export interface FileLoaderProtocol {
  Load(path: string): Promise<ArrayBuffer>;
}
