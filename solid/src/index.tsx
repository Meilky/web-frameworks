import TodoView from "./views/todo.tsx";
import { deleteTodo, readTodos, updateTodo } from "./actions/todo";
import { render } from "solid-js/web";

render(() => <TodoView />, document.body);

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
