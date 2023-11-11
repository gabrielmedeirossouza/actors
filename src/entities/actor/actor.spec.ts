import { it, expect } from 'vitest';
import { Actor } from '.';
import { FakeIdGenerator, FakeTransform } from '@/__test__';

const fakeIdGenerator = new FakeIdGenerator();
const fakeTransform = new FakeTransform(fakeIdGenerator);

it('should create an actor', () =>
{
	const actor = new Actor(fakeIdGenerator, "player-1", fakeTransform);

	expect(actor.name).toBe("player-1");
	expect(actor.transform).toBeInstanceOf(FakeTransform);
});
