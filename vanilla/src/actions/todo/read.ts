import { dispatch } from "../../dispatcher";
import type { Action } from "../index";
import type { Todo } from "../../models/todo";

export type ReadTodo = Action<"todo.read", Todo[]>;

type Result = { ok: true } | { ok: false; errors: string[] };

export async function readTodo(): Promise<Result> {
  const readTodo: Todo[] = [
    { id: 0, text: "asdf0", createdAt: new Date(Date.now()) },
    { id: 1, text: "asdf1", createdAt: new Date(Date.now()) },
    { id: 2, text: "asdf2", createdAt: new Date(Date.now()) },
    { id: 3, text: "asdf3", createdAt: new Date(Date.now()) },
  ];

  dispatch.dispatch({ type: "todo.read", payload: readTodo });

  return { ok: true };
}
