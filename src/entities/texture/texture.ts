import { ImageProtocol } from "@/protocols";

export class Texture
{
	public image?: ImageProtocol;

	constructor(
    public width: number,
    public height: number,
	)
	{}
}
