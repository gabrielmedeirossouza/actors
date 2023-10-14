type TEvent = `on-${string}`;
type TObserver = (...args: any[]) => void;
type TObservable = {
    [key: TEvent]: TObserver;
}
export class Observable<T extends TObservable>
{
	private _observers: [event: keyof T, callback: T[keyof T]][] = [];

	public get observers(): ReadonlyArray<[event: keyof T, callback: T[keyof T]]>
	{
		return this._observers;
	}

	public Subscribe<A extends keyof T, B extends T[A]>(eventName: A, eventCallback: B): B
	{
		const isAlreadyRegistered = this._observers.some(([event, callback]) => event === eventName && callback === eventCallback);

		if (isAlreadyRegistered)
		{
			console.warn(`Observable: Trying to subscribe an already existing observer`);

			return eventCallback;
		}

		this._observers.push([eventName, eventCallback]);

		return eventCallback;
	}

	public Unsubscribe<A extends keyof T, B extends T[A]>(eventName: A, eventCallback: B): void
	{
		const index = this._observers.findIndex(([event, callback]) => event === eventName && callback === eventCallback);

		if (index === -1)
		{
			console.warn(`Observable: Trying to unsubscribe an unexisting observer`);

			return;
		}

		this._observers.splice(index, 1);
	}

	public Notify<A extends keyof T, B extends Parameters<T[A] extends TObserver ? T[A] : never>>(eventName: A, ...args: B): void
	{
		this._observers.forEach(([event, callback]) =>
		{
			if (event !== eventName) return;

			(callback as TObserver)(...args);
		});
	}
}
