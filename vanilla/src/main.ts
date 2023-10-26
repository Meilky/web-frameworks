import { TODO_STORE } from "./stores/todo";
import { deleteTodo, readTodos, updateTodo } from "./actions/todo";

document.body.innerHTML = `Hello world!`;

TODO_STORE.on("added", (todo) => {
    console.log("Added todo", todo);
});

TODO_STORE.on("updated", (todo) => {
    console.log("Updated todo", todo);
});

TODO_STORE.on("removed", (todo) => {
    console.log("Removed todo", todo);
});

readTodos();

setTimeout(() => {
    updateTodo(3, "awsome");
}, 2000);

setTimeout(() => {
    deleteTodo(2);
}, 4000);
