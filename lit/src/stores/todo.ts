import { DISPATCH } from "../dispatcher";
import { EventEmitter } from "../utils/event-emitter";

import type { Actions } from "../actions/index";
import type { Todo } from "../models/todo";

interface Events {
    added: [Todo];
    updated: [Todo];
    removed: [Todo];
}

const EVENTS: (keyof Events)[] = ["added", "updated", "removed"];

export class TodoStore extends EventEmitter<Events> {
    private _todos: Map<number, Todo> = new Map();

    constructor() {
        super(EVENTS);

        DISPATCH.register((data) => {
            this._handleEvents(data);
        });
    }

    public get(): IterableIterator<Todo> {
        return this._todos.values();
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

            case "todo.deleted":
                this._onDeleted(data.payload);
                break;

            default:
                break;
        }
    }

    private _onCreated(todo: Todo): void {
        if (this._todos.has(todo.id)) {
            this._onUpdated(todo);

            return;
        }

        this._todos.set(todo.id, todo);
        this.emit("added", todo);
    }

    private _onRead(todos: Todo[]): void {
        for (const todo of todos) {
            if (this._todos.has(todo.id)) {
                this._onUpdated(todo);
                continue;
            }

            this._todos.set(todo.id, todo);
            this.emit("added", todo);
        }
    }

    private _onUpdated(todo: Todo): void {
        const existingTodo = this._todos.get(todo.id);

        if (existingTodo === undefined) {
            throw new Error("Unable to update a none existant todo!!!");
        }

        if (existingTodo.text === todo.text) return;

        existingTodo.text = todo.text;

        this.emit("updated", existingTodo);
    }

    private _onDeleted(id: number): void {
        const existingTodo = this._todos.get(id);

        if (existingTodo === undefined) return;

        this._todos.delete(id);

        this.emit("removed", existingTodo);
    }
}

export const TODO_STORE = new TodoStore();
