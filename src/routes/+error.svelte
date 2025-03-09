<script lang="ts">
	import { page } from '$app/stores';

	const url5xx =
		'https://media.giphy.com/media/gKHGnB1ml0moQdjhEJ/giphy.gif?cid=ecf05e47m30v48okiauesgljwnez98kkndkthnnkc4tfvu9k&ep=v1_gifs_related&rid=giphy.gif&ct=g';
	const url4xx =
		'https://media.giphy.com/media/qZgHBlenHa1zKqy6Zn/giphy.gif?cid=ecf05e474nnekn3l3o6rvleku6wmlewxnp4315p1pjroys21&ep=v1_gifs_related&rid=giphy.gif&ct=g';

	let url = $derived($page.status >= 500 ? url5xx : url4xx);
</script>

<div class="flex w-full items-center justify-center">
	<div class="bg mt-20 rounded-2xl bg-background p-4 pb-8 text-center">
		<h1 class="mb-2 text-9xl font-semibold">{$page.status}</h1>
		<h2 class="mb-6 text-lg">{$page.error?.message}!</h2>
		<img src={url} alt="" class="h-96 rounded-xl" />
	</div>
</div>
