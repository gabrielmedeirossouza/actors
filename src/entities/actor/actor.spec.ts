import { it, expect } from 'vitest';
import { Actor } from '.';
import { RigidTransform, ComponentManager } from '..';
import { FakeIdGenerator } from '@/__test__';

const fakeIdGenerator = new FakeIdGenerator();

it('should create an actor', () =>
{
	const componentManager = new ComponentManager();
	const actor = new Actor(fakeIdGenerator, "player-1", new RigidTransform(fakeIdGenerator), componentManager);

	expect(actor.name).toBe("player-1");
	expect(actor.transform).toBeInstanceOf(RigidTransform);
	expect(actor.componentManager).toBeInstanceOf(ComponentManager);
});
