import type { CreatedTodo, DeletedTodo, ReadTodos, UpdatedTodo } from "./todo";

export type Actions = CreatedTodo | ReadTodos | UpdatedTodo | DeletedTodo;
