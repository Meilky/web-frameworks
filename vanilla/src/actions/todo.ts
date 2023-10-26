import { DISPATCH } from "../dispatcher";
import type { Action } from "./types";
import type { Todo } from "../models/todo";

export type CreatedTodo = Action<"todo.created", Todo>;
export type ReadTodos = Action<"todo.read", Todo[]>;
export type UpdatedTodo = Action<"todo.updated", Todo>;
export type DeletedTodo = Action<"todo.deleted", number>;

type Result = { ok: true } | { ok: false; errors: string[] };

export async function createTodo(text: string): Promise<Result> {
    const todo: Todo = {
        id: Date.now(),
        text,
    };

    DISPATCH.dispatch({ type: "todo.created", payload: todo });

    return { ok: true };
}

export async function readTodos(): Promise<Result> {
    const todos: Todo[] = [
        { id: 0, text: "asdf0" },
        { id: 1, text: "asdf1" },
        { id: 2, text: "asdf2" },
        { id: 3, text: "asdf3" },
    ];

    DISPATCH.dispatch({ type: "todo.read", payload: todos });

    return { ok: true };
}

export async function updateTodo(id: number, text: string): Promise<Result> {
    DISPATCH.dispatch({ type: "todo.updated", payload: { id, text } });

    return { ok: true };
}

export async function deleteTodo(id: number): Promise<Result> {
    DISPATCH.dispatch({ type: "todo.deleted", payload: id });

    return { ok: true };
}
