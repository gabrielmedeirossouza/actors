import { IdGeneratorProtocol } from "@/protocols";

export class FakeIdGenerator implements IdGeneratorProtocol
{
	public Generate(): string
	{
		return Math.random().toString(36).slice(2, 11);
	}
}
