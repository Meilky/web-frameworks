import { TODO_STORE } from "../stores/todo";

import type { Callback } from "../dispatcher";
import type { Todo } from "../models/todo";

import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("todo-list")
export class TodoView extends LitElement {
  private _callback: Callback<Todo>;

  @state()
  private _todos: Todo[] = [];

  constructor() {
    super();

    this._callback = (): void => {
      this._todos = Array.from(TODO_STORE.get());
    };
  }

  connectedCallback(): void {
    super.connectedCallback();

    TODO_STORE.on("added", this._callback);
    TODO_STORE.on("updated", this._callback);
    TODO_STORE.on("removed", this._callback);
  }

  render() {
    const todos = [];

    for (const todo of this._todos) {
      todos.push(html`<li>${todo.text}</li>`);
    }

    return html`<ul>
      ${todos}
    </ul>`;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    TODO_STORE.off("added", this._callback);
    TODO_STORE.off("updated", this._callback);
    TODO_STORE.off("removed", this._callback);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-list": TodoView;
  }
}
