import type { Actions } from "./actions";

export type Callback<T> = (data: T) => void | Promise<void>;

export class Dispatcher<T> {
    private _callbacks: Set<Callback<T>> = new Set();

    public register(callback: Callback<T>): void {
        this._callbacks.add(callback);
    }

    public unregister(callback: Callback<T>): void {
        this._callbacks.delete(callback);
    }

    public dispatch(data: T): void {
        for (const callback of this._callbacks) {
            try {
                Promise.resolve(callback(data));
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export const DISPATCH = new Dispatcher<Actions>();
