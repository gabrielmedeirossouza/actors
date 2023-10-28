import { ComponentProtocol } from ".";

export abstract class PhysicsProtocol extends ComponentProtocol
{
	public NotifyPhysicsLoop(time: number, deltaTime: number): void
	{
		this.BeforeUpdatePhysics?.(time, deltaTime);
		this.UpdatePhysics?.(time, deltaTime);
		this.AfterUpdatePhysics?.(time, deltaTime);
	}

	public BeforeUpdatePhysics?(time: number, deltaTime: number): void;
	public UpdatePhysics?(time: number, deltaTime: number): void;
	public AfterUpdatePhysics?(time: number, deltaTime: number): void;
}
