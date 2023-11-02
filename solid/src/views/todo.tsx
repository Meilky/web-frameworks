import { For, createSignal, onCleanup, onMount } from "solid-js";
import { TODO_STORE } from "../stores/todo";
import { Todo } from "../models/todo";

function TodoView() {
  const [todos, setTodos] = createSignal<Todo[]>([]);

  function callback(): void {
    setTodos(Array.from(TODO_STORE.get()));
  }

  onMount(() => {
    setTodos(Array.from(TODO_STORE.get()));

    TODO_STORE.on("added", callback);
    TODO_STORE.on("updated", callback);
    TODO_STORE.on("removed", callback);
  });

  onCleanup(() => {
    TODO_STORE.off("added", callback);
    TODO_STORE.off("updated", callback);
    TODO_STORE.off("removed", callback);
  });

  return (
    <ul>
      <For each={todos()}>{(v) => <li>{v.text}</li>}</For>
    </ul>
  );
}

export default TodoView;
