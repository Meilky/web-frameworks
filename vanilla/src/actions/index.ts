import { CreateTodo } from "./todo/create"
import { UpdateTodo } from "./todo/update"

export interface Action<K extends string, T> {
	type: K,
	data: T
}

export type Actions = CreateTodo | UpdateTodo;
