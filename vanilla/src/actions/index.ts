import { CreatedTodo } from "./todo/create";
import { ReadTodo } from "./todo/read";
import { UpdatedTodo } from "./todo/update";

export interface Action<K extends string, T> {
  type: K;
  payload: T;
}

export type Actions = CreatedTodo | ReadTodo | UpdatedTodo;
