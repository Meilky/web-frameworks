import { deleteTodo, readTodos, updateTodo } from "./actions/todo";
import { TodoView } from "./views/todo";

const TODO_LIST = new TodoView();

document.body.append(TODO_LIST.element);

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
