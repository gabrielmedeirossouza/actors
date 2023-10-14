import { Crypto } from "@lib/crypto";

export abstract class ComponentProtocol
{
	public readonly id = Crypto.UUID();
}
