import { DISPATCH } from "../dispatcher";

import type { Actions } from "../actions/index";
import type { Todo } from "../models/todo";

export class TodoStore {
    private _todos: Map<number, Todo> = new Map();

    constructor() {
        DISPATCH.register((data) => {
            this._handleEvents(data);
        });
    }

    public get(): Todo[] {
        return Array.from(this._todos.values());
    }

    private _handleEvents(data: Actions): void {
        switch (data.type) {
            case "todo.created":
                this._onCreated(data.payload);
                break;

            case "todo.read":
                this._onRead(data.payload);
                break;

            case "todo.updated":
                this._onUpdated(data.payload);
                break;

            default:
                break;
        }
    }
    private _onCreated(payload: Todo): void {}

    private _onRead(payload: Todo[]): void {}

    private _onUpdated(payload: Todo): void {}

    private _publishEvent(): void {}
}

export const TODO_STORE = new TodoStore();
