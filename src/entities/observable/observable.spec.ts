import { it, expect } from 'vitest';
import { Observable }from'./observable';

it("should create a empty observable", () =>
{
	const observable = new Observable();

	expect(observable.observers).toEqual([]);
});

it("should subscribe an observer", () =>
{
  type TObservers = {
    'on-test': (a: number, b: string) => void;
  }

  const observable = new Observable<TObservers>();

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function fnTest(): void
  {}

  observable.Subscribe("on-test", fnTest);

  expect(observable.observers).toEqual([["on-test", fnTest]]);
});

it("should unsubscribe an observer", () =>
{
  type TObservers = {
    'on-test': (a: number, b: string) => void;
  }

  const observable = new Observable<TObservers>();

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function fnTest(): void
  {}

  observable.Subscribe("on-test", fnTest);

  expect(observable.observers).toEqual([["on-test", fnTest]]);

  observable.Unsubscribe("on-test", fnTest);

  expect(observable.observers).toEqual([]);
});

it("should notify an observer", () =>
{
  type TObservers = {
    'on-test': (a: number, b: string) => void;
  }

  const observable = new Observable<TObservers>();

  let testNumber = 0;
  let testString = "";

  function fnTest(a: number, b: string): void
  {
  	testNumber = a;
  	testString = b;
  }

  observable.Subscribe("on-test", fnTest);

  expect(observable.observers).toEqual([["on-test", fnTest]]);
  expect(testNumber).toEqual(0);
  expect(testString).toEqual("");

  observable.Notify("on-test", 1, "test");

  expect(testNumber).toEqual(1);
  expect(testString).toEqual("test");
});

