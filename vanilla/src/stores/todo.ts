import { Actions } from "../actions/index";
import { Todo } from "../models/todo";
import { dispatch } from "../dispatcher";

export class TodoStore {
  private _todos: Todo[];

  constructor() {
    dispatch.register((data) => {
      this._handleEvents(data);
    });
  }

  public get(): Todo[] {
    return this._todos;
  }

  private _handleEvents(data: Actions): void {
    switch (data.type) {
      case "todo.read":
        this._todos = data.payload;
        break;
      case "todo.created":
        this._todos.push(data.payload);
        break;
      default:
        break;
    }
  }
}

export const todoStore = new TodoStore();
