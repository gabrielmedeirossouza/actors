import { it, expect } from 'vitest';
import { Actor } from '.';
import { ComponentManager } from '..';
import { FakeIdGenerator, FakeTransform } from '@/__test__';

const fakeIdGenerator = new FakeIdGenerator();
const fakeTransform = new FakeTransform(fakeIdGenerator);

it('should create an actor', () =>
{
	const componentManager = new ComponentManager();
	const actor = new Actor(fakeIdGenerator, "player-1", fakeTransform, componentManager);

	expect(actor.name).toBe("player-1");
	expect(actor.transform).toBeInstanceOf(FakeTransform);
	expect(actor.componentManager).toBeInstanceOf(ComponentManager);
});
