import type { Action } from "../index"
import type { Todo } from "@models/todo"

export type CreateTodo = Action<"todo.create", Omit<Todo, "id" | "updatedAt" | "deletedAt">>;


type Result = { ok: true } | { ok: false, errors: string[] }

export async function createTodo(text: string): Promise<Result> {
	const todo: Todo = {
		id: Date.now(),
		text,
		createdAt: new Date(Date.now())
	}

	return { ok: true }
}
