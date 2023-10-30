import { TODO_STORE } from "../stores/todo";

import type { Callback } from "../dispatcher";
import type { Todo } from "../models/todo";

import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("todo-list")
export class TodoView extends LitElement {
  private _callbacks: {
    added: Callback<Todo>;
    removed: Callback<Todo>;
  };

  constructor() {
    super();

    this._callbacks = {
      added: (): void => {
        this.render();
      },
      removed: (): void => {
        this.render();
      },
    };
  }

  connectedCallback(): void {
    TODO_STORE.on("added", this._callbacks.added);
    TODO_STORE.on("removed", this._callbacks.removed);
  }

  render() {
    const todos = [];

    for (const todo of TODO_STORE.get()) {
      todos.push(html`<li>${todo.text}</li>`);
    }

    return html`<ul>
      ${todos}
    </ul>`;
  }

  disconnectedCallback(): void {
    TODO_STORE.off("added", this._callbacks.added);
    TODO_STORE.off("removed", this._callbacks.removed);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-list": TodoView;
  }
}
