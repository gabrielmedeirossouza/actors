import { it, expect } from 'vitest';
import { Actor } from '.';
import { Transform, ComponentManager } from '..';

it('should create an actor', () =>
{
	const componentManager = new ComponentManager();
	const actor = new Actor("player-1", new Transform(), componentManager);

	expect(actor.name).toBe("player-1");
	expect(actor.transform).toBeInstanceOf(Transform);
	expect(actor.componentManager).toBeInstanceOf(ComponentManager);
});
