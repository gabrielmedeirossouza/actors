import { it, expect } from 'vitest';
import { Actor } from '.';
import { Transform, ComponentManager } from '..';

it('should be true', () =>
{
	const componentManager = new ComponentManager();
	const actor = new Actor("player-1", new Transform(), componentManager);

	expect(true).toBe(true);
});
