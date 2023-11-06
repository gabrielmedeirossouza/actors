import { it, expect } from 'vitest';
import { ComponentManager } from './component-manager';
import { PhysicsProtocol, RendererProtocol } from '@/protocols';
import { FakeIdGenerator } from '@/__test__';

const fakeIdGenerator = new FakeIdGenerator();

class RendererMock extends RendererProtocol
{}

class PhysicsMock extends PhysicsProtocol
{}

it("should create a empty component manager", () =>
{
	const componentManager = new ComponentManager();

	expect(componentManager.renderers).toEqual([]);
	expect(componentManager.physics).toEqual([]);
});

it("should add a renderer", () =>
{
	const componentManager = new ComponentManager();
	const renderer = new RendererMock(fakeIdGenerator);

	componentManager.AddRenderer(renderer);

	expect(componentManager.renderers).toEqual([renderer]);
});

it("should remove a renderer", () =>
{
	const componentManager = new ComponentManager();
	const rendererA = new RendererMock(fakeIdGenerator);
	const rendererB = new RendererMock(fakeIdGenerator);

	componentManager.AddRenderer(rendererA);
	componentManager.AddRenderer(rendererB);
	componentManager.RemoveRenderer(rendererA);

	expect(componentManager.renderers).toEqual([rendererB]);
});

it("should add a physics", () =>
{
	const componentManager = new ComponentManager();
	const physics = new PhysicsMock(fakeIdGenerator);

	componentManager.AddPhysics(physics);

	expect(componentManager.physics).toEqual([physics]);
});

it("should remove a physics", () =>
{
	const componentManager = new ComponentManager();
	const physicsA = new PhysicsMock(fakeIdGenerator);
	const physicsB = new PhysicsMock(fakeIdGenerator);

	componentManager.AddPhysics(physicsA);
	componentManager.AddPhysics(physicsB);
	componentManager.RemovePhysics(physicsA);

	expect(componentManager.physics).toEqual([physicsB]);
});
