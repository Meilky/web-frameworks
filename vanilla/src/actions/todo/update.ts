import type { Action } from "../index"
import type { Todo } from "@models/todo"

export type UpdateTodo = Action<"todo.update", Partial<Omit<Todo, "id" | "createdAt" | "updatedAt" | "deletedAt">> & NonNullable<Pick<Todo, "id" | "updatedAt">>>;
