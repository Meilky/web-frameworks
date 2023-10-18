import { dispatch } from "../../dispatcher";
import type { Action } from "../index";
import type { Todo } from "../../models/todo";

export type UpdatedTodo = Action<"todo.updated", Todo>;

type Result = { ok: true } | { ok: false; errors: string[] };

export async function updateTodo(todo: Todo): Promise<Result> {
  const updatedTodo: Todo = {
    ...todo,
    updatedAt: new Date(Date.now()),
  };

  dispatch.dispatch({ type: "todo.updated", payload: updatedTodo });

  return { ok: true };
}
