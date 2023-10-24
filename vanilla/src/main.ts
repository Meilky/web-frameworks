import { TODO_STORE } from "./stores/todo";
import { readTodo } from "./actions/todo";

document.body.innerHTML = `Hello world!`;

readTodo();

console.log(TODO_STORE.get());
