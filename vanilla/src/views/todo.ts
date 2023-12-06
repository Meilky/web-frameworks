import { TODO_STORE } from "../stores/todo";

import type { Todo } from "../models/todo";

export class TodoView {
    public readonly element: HTMLElement = document.createElement("ul");

    private _indexing: Map<number, HTMLElement> = new Map();
    private _callbacks = {
        added: (todo: Todo): void => {
            this._onAdded(todo);
        },
        updated: (todo: Todo): void => {
            this._onUpdated(todo);
        },
        removed: (todo: Todo): void => {
            this._onRemoved(todo);
        },
    };

    constructor() {
        for (const todo of TODO_STORE.get()) {
            this._onAdded(todo);
        }

        TODO_STORE.on("added", this._callbacks.added);
        TODO_STORE.on("updated", this._callbacks.updated);
        TODO_STORE.on("removed", this._callbacks.removed);
    }

    public dispose(): void {
        TODO_STORE.off("added", this._callbacks.added);
        TODO_STORE.off("updated", this._callbacks.updated);
        TODO_STORE.off("removed", this._callbacks.removed);

        for (const el of this._indexing.values()) {
            el.remove();
        }

        this.element.remove();

        this._indexing.clear();
    }

    private _onAdded(todo: Todo): void {
        const el = document.createElement("li");

        el.innerHTML = todo.text;

        this._indexing.set(todo.id, el);

        this.element.append(el);
    }

    private _onUpdated(todo: Todo): void {
        const el = this._indexing.get(todo.id);

        if (!el) return;

        el.innerHTML = todo.text;
    }

    private _onRemoved(todo: Todo): void {
        const el = this._indexing.get(todo.id);

        if (!el) return;

        el.remove();

        this._indexing.delete(todo.id);
    }
}
