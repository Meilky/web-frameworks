import { useEffect, useState } from "react";
import { TODO_STORE } from "../stores/todo";
import { Todo } from "../models/todo";

function TodoView() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(Array.from(TODO_STORE.get()));

    function callback(): void {
      setTodos(Array.from(TODO_STORE.get()));
    }

    TODO_STORE.on("added", callback);
    TODO_STORE.on("updated", callback);
    TODO_STORE.on("removed", callback);

    return function cleanup() {
      TODO_STORE.off("added", callback);
      TODO_STORE.off("updated", callback);
      TODO_STORE.off("removed", callback);
    };
  }, [setTodos]);

  return (
    <ul>
      {todos.map((v) => (
        <li>{v.text}</li>
      ))}
    </ul>
  );
}

export default TodoView;
