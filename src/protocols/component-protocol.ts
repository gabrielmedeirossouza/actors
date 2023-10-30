import { Crypto } from "@/helpers/crypto-helper";

export abstract class ComponentProtocol
{
	public readonly id = Crypto.UUID();
}
