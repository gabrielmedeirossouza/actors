import { FileLoaderProtocol } from "@/protocols";

export class HttpFileLoader implements FileLoaderProtocol
{
	public async Load(url: string): Promise<ArrayBuffer>
	{
		const isValidUrl = url.startsWith('http://') || url.startsWith('https://');
		if (!isValidUrl) throw new Error(`Invalid url: ${url}`);

		return fetch(url).then((response: Response) =>
		{
			return response.arrayBuffer();
		});
	}
}
