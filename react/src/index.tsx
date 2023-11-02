import React from "react";
import ReactDOM from "react-dom/client";
import TodoView from "./views/todo.tsx";
import { deleteTodo, readTodos, updateTodo } from "./actions/todo";

ReactDOM.createRoot(document.body).render(
  <React.StrictMode>
    <TodoView />
  </React.StrictMode>,
);

setTimeout(() => {
  readTodos();
}, 2000);

setTimeout(() => {
  for (let i = 0; i < 500; i = i + 3) {
    updateTodo(i, "updated");
  }
}, 3000);

setTimeout(() => {
  for (let i = 0; i < 500; i = i + 5) {
    deleteTodo(i);
  }
}, 4000);
