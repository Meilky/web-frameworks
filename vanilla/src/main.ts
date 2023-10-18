import { todoStore } from "./stores/todo";
import { readTodo } from "./actions/todo/read";

document.body.innerHTML = `Hello world!`;

readTodo();

console.log(todoStore.get());
