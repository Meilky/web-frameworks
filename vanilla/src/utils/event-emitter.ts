export type EventEmitterEvents<T> = { [K in Extract<keyof T, string>]: any[] };

export interface Subscription {
    unsubscribe(): void;
}

interface PartialObserver {
    error?: (error: unknown) => void;
    complete?: () => void;
}

export interface EventListener<T extends any[]> extends PartialObserver {
    callback: (...args: T) => void;
}

export class EventEmitterError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
        this.name = "EventEmitterError";
    }
}

class EventEmitterSubscription<T extends EventEmitterEvents<T>, K extends keyof T> implements Subscription {
    private _isConnected = true;

    private _parent: EventEmitter<T>;
    private _topic: K;
    private _listener: EventListener<T[K]>;

    constructor(parent: EventEmitter<T>, topic: K, listener: EventListener<T[K]>) {
        this._parent = parent;

        this._parent = parent;
        this._topic = topic;
        this._listener = listener;
    }

    public unsubscribe(): void {
        if (!this._isConnected) return;

        // Make sure to not call the parent if it's already complete
        // Happen when the parent is completing it self
        this._parent.unsubscribe(this._topic, this._listener);

        this.disconnect();
    }

    public disconnect(): void {
        if (!this._isConnected) return;

        this._isConnected = false;

        // Drop reference to parent observable
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._parent = undefined as any;

        // Drop reference to topic
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._topic = undefined as any;

        // Drop reference to callback
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._listener = undefined as any;
    }
}

export class EventEmitter<T extends EventEmitterEvents<T>> {
    private _isCompleted: boolean = false;
    private _events: Map<keyof T, Map<EventListener<any>, EventEmitterSubscription<any, any>>> = new Map();

    public constructor(topics: (keyof T)[]) {
        for (const topic of topics) {
            this._events.set(topic, new Map());
        }
    }

    /**
     * Register the listener to the event
     * @param {string} event The event to listen
     * @param {EventListener<unknown>} listener The listen to register
     * @returns {Subscription} The subscription
     */
    public subscribe<K extends keyof T>(event: K, listener: EventListener<T[K]>): Subscription {
        if (this.isCompleted()) throw new Error("The event emitter is completed!");

        const listeners = this._events.get(event);

        if (listeners === undefined) throw new EventEmitterError(`No event named "${String(event)}"!`);

        if (listeners.has(listener)) throw new EventEmitterError(`The listener already listen to "${String(event)}"!`);

        const subscription = new EventEmitterSubscription<T, K>(this, event, listener);

        listeners.set(listener, subscription);

        return subscription;
    }

    public unsubscribe<K extends keyof T>(event: K, listener: EventListener<T[K]>): void {
        if (this.isCompleted()) throw new Error("The event emitter is completed!");

        const listeners = this._events.get(event);

        if (listeners === undefined) throw new EventEmitterError(`No event named "${String(event)}"!`);

        if (!listeners.has(listener)) throw new EventEmitterError(`The listener doesn't listen to "${String(event)}"!`);

        const subscription = listeners.get(listener)!;

        subscription.disconnect();

        listeners.delete(listener);
    }

    public emit<K extends keyof T>(event: K, ...values: T[K]): void {
        if (this.isCompleted()) throw new Error("The event emitter is completed!");

        const listeners = this._events.get(event);

        if (listeners === undefined) throw new EventEmitterError(`No event named "${String(event)}"!`);

        for (const listener of listeners.keys()) {
            try {
                listener.callback(...values);
            } catch (error) {
                if (listener.error) {
                    listener.error(error);
                }
            }
        }
    }

    public complete(): void {
        if (this.isCompleted()) throw new Error("The event emitter is completed!");

        this._isCompleted = true;

        for (const listeners of this._events.values()) {
            for (const [listener, subscription] of listeners) {
                subscription.disconnect();

                if (!listener.complete) continue;

                listener.complete();
            }

            listeners.clear();
        }

        this._events.clear();
    }

    public isCompleted(): boolean {
        return this._isCompleted;
    }
}


export class ProtectedEventEmitter<T extends EventEmitterEvents<T>> {
    private _isCompleted: boolean = false;
    private _events: Map<keyof T, Map<EventListener<any>, EventEmitterSubscription<any, any>>> = new Map();

    public constructor(topics: (keyof T)[]) {
        for (const topic of topics) {
            this._events.set(topic, new Map());
        }
    }

    /**
     * Register the listener to the event
     * @param {string} event The event to listen
     * @param {EventListener<unknown>} listener The listen to register
     * @returns {Subscription} The subscription
     */
    public subscribe<K extends keyof T>(event: K, listener: EventListener<T[K]>): Subscription {
        if (this.isCompleted()) throw new Error("The event emitter is completed!");

        const listeners = this._events.get(event);

        if (listeners === undefined) throw new EventEmitterError(`No event named "${String(event)}"!`);

        if (listeners.has(listener)) throw new EventEmitterError(`The listener already listen to "${String(event)}"!`);

        const subscription = new EventEmitterSubscription<T, K>(this as any, event, listener);

        listeners.set(listener, subscription);

        return subscription;
    }

    public unsubscribe<K extends keyof T>(event: K, listener: EventListener<T[K]>): void {
        if (this.isCompleted()) throw new Error("The event emitter is completed!");

        const listeners = this._events.get(event);

        if (listeners === undefined) throw new EventEmitterError(`No event named "${String(event)}"!`);

        if (!listeners.has(listener)) throw new EventEmitterError(`The listener doesn't listen to "${String(event)}"!`);

        const subscription = listeners.get(listener)!;

        subscription.disconnect();

        listeners.delete(listener);
    }

    public emit<K extends keyof T>(event: K, ...values: T[K]): void {
        if (this.isCompleted()) throw new Error("The event emitter is completed!");

        const listeners = this._events.get(event);

        if (listeners === undefined) throw new EventEmitterError(`No event named "${String(event)}"!`);

        for (const listener of listeners.keys()) {
            try {
                listener.callback(...values);
            } catch (error) {
                if (listener.error) {
                    listener.error(error);
                }
            }
        }
    }

    public complete(): void {
        if (this.isCompleted()) throw new Error("The event emitter is completed!");

        this._isCompleted = true;

        for (const listeners of this._events.values()) {
            for (const [listener, subscription] of listeners) {
                subscription.disconnect();

                if (!listener.complete) continue;

                listener.complete();
            }

            listeners.clear();
        }

        this._events.clear();
    }

    public isCompleted(): boolean {
        return this._isCompleted;
    }
}
