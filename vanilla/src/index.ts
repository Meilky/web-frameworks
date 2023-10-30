import { deleteTodo, readTodos, updateTodo } from "./actions/todo";
import { TodoView } from "./views/todo";

const TODO_LIST = new TodoView();

document.body.append(TODO_LIST.element);

setTimeout(() => {
    readTodos();
}, 2000);

setTimeout(() => {
    updateTodo(3, "awsome");
}, 3000);

setTimeout(() => {
    deleteTodo(2);
}, 4000);
