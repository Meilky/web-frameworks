import { DISPATCH } from "../dispatcher";
import type { Action } from "./types";
import type { Todo } from "../models/todo";

export type CreatedTodo = Action<"todo.created", Todo>;
export type ReadTodo = Action<"todo.read", Todo[]>;
export type UpdatedTodo = Action<"todo.updated", Todo>;

type Result = { ok: true } | { ok: false; errors: string[] };

export async function createTodo(text: string): Promise<Result> {
    const newTodo: Todo = {
        id: Date.now(),
        text,
        createdAt: new Date(Date.now()),
    };

    DISPATCH.dispatch({ type: "todo.created", payload: newTodo });

    return { ok: true };
}

export async function readTodo(): Promise<Result> {
    const todos: Todo[] = [
        { id: 0, text: "asdf0", createdAt: new Date(Date.now()) },
        { id: 1, text: "asdf1", createdAt: new Date(Date.now()) },
        { id: 2, text: "asdf2", createdAt: new Date(Date.now()) },
        { id: 3, text: "asdf3", createdAt: new Date(Date.now()) },
    ];

    DISPATCH.dispatch({ type: "todo.read", payload: todos });

    return { ok: true };
}

export async function updateTodo(todo: Todo): Promise<Result> {
    const updatedTodo: Todo = {
        ...todo,
        updatedAt: new Date(Date.now()),
    };

    DISPATCH.dispatch({ type: "todo.updated", payload: updatedTodo });

    return { ok: true };
}
