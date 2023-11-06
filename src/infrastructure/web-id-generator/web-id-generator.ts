import { IdGeneratorProtocol } from "@/protocols";

export class WebIdGenerator implements IdGeneratorProtocol
{
	public Generate(): string
	{
		return crypto.randomUUID();
	}
}
