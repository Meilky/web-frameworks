import { TODO_STORE } from "../stores/todo";

import type { Callback } from "../dispatcher";
import type { Todo } from "../models/todo";

class TodoItem {
    public readonly element: HTMLElement = document.createElement("li");

    private _callback: Callback<Todo>;

    constructor(todo: Todo) {
        this.element.innerHTML = todo.text;

        this._callback = (updatedTodo: Todo): void => {
            if (updatedTodo.id !== todo.id) return;

            this.element.innerHTML = updatedTodo.text;
        };

        TODO_STORE.on("updated", this._callback);
    }

    public dispose(): void {
        TODO_STORE.off("updated", this._callback);

        this.element.remove();
    }
}

export class TodoView {
    public readonly element: HTMLElement = document.createElement("ul");

    private _indexing: Map<number, TodoItem> = new Map();
    private _callbacks: {
        added: Callback<Todo>;
        removed: Callback<Todo>;
    };

    constructor() {
        for (const todo of TODO_STORE.get()) {
            const item = new TodoItem(todo);

            this._indexing.set(todo.id, item);

            this.element.append(item.element);
        }

        this._callbacks = {
            added: (todo: Todo): void => {
                const item = new TodoItem(todo);

                this._indexing.set(todo.id, item);

                this.element.append(item.element);
            },
            removed: (todo: Todo): void => {
                const item = this._indexing.get(todo.id)!;

                item.dispose();
            },
        };

        TODO_STORE.on("added", this._callbacks.added);
        TODO_STORE.on("removed", this._callbacks.removed);
    }

    public dispose(): void {
        TODO_STORE.off("added", this._callbacks.added);
        TODO_STORE.off("removed", this._callbacks.removed);
    }
}
