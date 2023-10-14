import { ComponentProtocol } from ".";

export abstract class PhysicsProtocol extends ComponentProtocol
{
	public NotifyPhysicsLoop(): void
	{
		this.BeforeUpdatePhysics?.();
		this.UpdatePhysics?.();
		this.AfterUpdatePhysics?.();
	}

	public BeforeUpdatePhysics?(): void;
	public UpdatePhysics?(): void;
	public AfterUpdatePhysics?(): void;
}
