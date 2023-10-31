import { deleteTodo, readTodos, updateTodo } from "./actions/todo";
import "./views/todo";

setTimeout(() => {
    readTodos();
}, 2000);

setTimeout(() => {
    updateTodo(3, "awsome");
}, 3000);

setTimeout(() => {
    deleteTodo(2);
}, 4000);

document.body.append(document.createElement("todo-list"))
