import { DISPATCH } from "../dispatcher";
import type { Action } from "./types";
import type { Todo } from "../models/todo";

export type CreatedTodo = Action<"todo.created", Todo>;
export type ReadTodos = Action<"todo.read", Todo[]>;
export type UpdatedTodo = Action<"todo.updated", Todo>;
export type DeletedTodo = Action<"todo.deleted", number>;

type Result = { ok: true } | { ok: false; error: any };

export async function createTodo(text: string): Promise<Result> {
    const todo: Todo = {
        id: Date.now(),
        text,
    };

    DISPATCH.dispatch({ type: "todo.created", payload: todo });

    return { ok: true };
}

export async function readTodos(): Promise<Result> {
    try {
        const res = await fetch("/api/todos", {
            headers: {
                Accept: "application/json",
            },
        });

        const todos = await res.json();

        DISPATCH.dispatch({ type: "todo.read", payload: todos });

        return { ok: true };
    } catch (error) {
        return { ok: false, error };
    }
}

export async function updateTodo(id: number, text: string): Promise<Result> {
    DISPATCH.dispatch({ type: "todo.updated", payload: { id, text } });

    return { ok: true };
}

export async function deleteTodo(id: number): Promise<Result> {
    DISPATCH.dispatch({ type: "todo.deleted", payload: id });

    return { ok: true };
}
