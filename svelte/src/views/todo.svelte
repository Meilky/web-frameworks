<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { TODO_STORE } from "../stores/todo";

	import type { Todo } from "../models/todo";

	let todos: Todo[] = [];

	function callback(): void {
		todos = Array.from(TODO_STORE.get());
	}

	onMount(() => {
		todos = Array.from(TODO_STORE.get());

		TODO_STORE.on("added", callback);
		TODO_STORE.on("updated", callback);
		TODO_STORE.on("removed", callback);
	});

	onDestroy(() => {
		TODO_STORE.off("added", callback);
		TODO_STORE.off("updated", callback);
		TODO_STORE.off("removed", callback);
	});
</script>

<ul>
	{#each todos as todo}
		<li>
			{todo.text}
		</li>
	{/each}
</ul>
