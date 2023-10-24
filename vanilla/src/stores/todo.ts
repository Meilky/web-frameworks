import { DISPATCH } from "../dispatcher";

import type { Actions } from "../actions/index";
import type { Todo } from "../models/todo";

export class TodoStore {
    private _todos: Todo[] = [];

    constructor() {
        DISPATCH.register((data) => {
            this._handleEvents(data);
        });
    }

    public get(): Todo[] {
        return this._todos;
    }

    private _handleEvents(data: Actions): void {
        switch (data.type) {
            case "todo.read":
                this._todos = data.payload;
                break;

            case "todo.created":
                this._todos.push(data.payload);
                break;

            default:
                break;
        }
    }
}

export const TODO_STORE = new TodoStore();
