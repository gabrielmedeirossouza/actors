import { it, expect } from 'vitest';
import { Actor } from '.';
import { Transform, ComponentManager } from '..';
import { FakeIdGenerator } from '@/__test__';

const fakeIdGenerator = new FakeIdGenerator();

it('should create an actor', () =>
{
	const componentManager = new ComponentManager();
	const actor = new Actor(fakeIdGenerator, "player-1", new Transform(fakeIdGenerator), componentManager);

	expect(actor.name).toBe("player-1");
	expect(actor.transform).toBeInstanceOf(Transform);
	expect(actor.componentManager).toBeInstanceOf(ComponentManager);
});
