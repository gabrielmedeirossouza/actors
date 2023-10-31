import { ImageProtocol } from "@/protocols";

export class WebImageLoader extends ImageProtocol
{
	private _buffer?: ArrayBuffer;

	public get buffer(): ArrayBuffer | undefined
	{
		return this._buffer;
	}

	public async LoadImage(url: string): Promise<void>
	{
		const response = await fetch(url);
		const blob = await response.blob();

		const arrayBuffer = await new Promise<ArrayBuffer>((resolve) =>
		{
			const reader = new FileReader();
			reader.onloadend = (): void => resolve(reader.result as ArrayBuffer);
			reader.readAsArrayBuffer(blob);
		});

		this._buffer = arrayBuffer;
	}
}
