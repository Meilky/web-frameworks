import { deleteTodo, readTodos, updateTodo } from "./actions/todo";
import "./views/todo";

document.body.append(document.createElement("todo-list"));

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
