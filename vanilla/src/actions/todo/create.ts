import { dispatch } from "../../dispatcher";
import type { Action } from "../index";
import type { Todo } from "../../models/todo";

export type CreatedTodo = Action<"todo.created", Todo>;

type Result = { ok: true } | { ok: false; errors: string[] };

export async function createTodo(text: string): Promise<Result> {
  const newTodo: Todo = {
    id: Date.now(),
    text,
    createdAt: new Date(Date.now()),
  };

  dispatch.dispatch({ type: "todo.created", payload: newTodo });

  return { ok: true };
}
