import { deleteTodo, readTodos, updateTodo } from "./actions/todo";
import TodoView from "./views/todo.svelte";

const TODO_VIEW = new TodoView({
  target: document.body,
});

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

export default TODO_VIEW;
