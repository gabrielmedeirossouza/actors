import { TextureProtocol } from "@/protocols";

export class Texture2D implements TextureProtocol
{
	private _image?: ArrayBuffer;
	private _width: number;
	private _height: number;

	constructor(
		width: number,
		height: number,
	)
	{
		this._width = this._GetVerifiedWidth(width);
		this._height = this._GetVerifiedHeight(height);
	}

	public get width(): number
	{
		return this._width;
	}

	public set width(value: number)
	{
		this._width = this._GetVerifiedWidth(value);
	}

	public get height(): number
	{
		return this._height;
	}

	public set height(value: number)
	{
		this._height = this._GetVerifiedHeight(value);
	}

	public get image(): ArrayBuffer | undefined
	{
		return this._image;
	}

	public SetImage(image: ArrayBuffer): void
	{
		this._image = image;
	}

	private _GetVerifiedWidth(width: number): number
	{
		if (width < 0) throw new Error('Width must be greater than 0');

		return width;
	}

	private _GetVerifiedHeight(height: number): number
	{
		if (height < 0) throw new Error('Height must be greater than 0');

		return height;
	}
}
