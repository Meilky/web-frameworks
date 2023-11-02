export type EventEmitterEvents<T> = { [K in Extract<keyof T, string>]: any[] };

type Callback<T extends any[]> = (...args: T) => void;

export class EventEmitterError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
        this.name = "EventEmitterError";
    }
}

export class EventEmitter<T extends EventEmitterEvents<T>> {
    private _events: Map<keyof T, Set<Callback<any>>> = new Map();

    public constructor(topics: (keyof T)[]) {
        for (const topic of topics) {
            this._events.set(topic, new Set());
        }
    }

    public on<K extends keyof T>(event: K, listener: Callback<T[K]>): void {
        const listeners = this._events.get(event);

        if (listeners === undefined) throw new EventEmitterError(`No event named "${String(event)}"!`);

        if (listeners.has(listener)) throw new EventEmitterError(`The listener already listen to "${String(event)}"!`);

        listeners.add(listener);
    }

    public off<K extends keyof T>(event: K, listener: Callback<T[K]>): void {
        const listeners = this._events.get(event);

        if (listeners === undefined) throw new EventEmitterError(`No event named "${String(event)}"!`);

        if (!listeners.has(listener)) throw new EventEmitterError(`The listener doesn't listen to "${String(event)}"!`);

        listeners.delete(listener);
    }

    protected emit<K extends keyof T>(event: K, ...values: T[K]): void {
        const listeners = this._events.get(event);

        if (listeners === undefined) throw new EventEmitterError(`No event named "${String(event)}"!`);

        for (const listener of listeners.keys()) {
            Promise.resolve(listener(...values));
        }
    }
}
