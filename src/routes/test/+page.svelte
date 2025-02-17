<script lang="ts">
	let message = $state('');
	let host = $state('http://127.0.0.1:11434');
	let route = $state('/api/version');

	async function chat() {
		await fetch(`${host}${route}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				if (response.ok) {
					message = 'Message sent successfully';
				} else {
					message = 'Error sending message';
				}
			})
			.catch((err) => {
				console.log(err);
				message = 'Error sending message';
			});
	}
</script>

<div class="flex h-screen items-center justify-center px-4">
	<div class=" flex flex-col bg-secondary p-4">
		<form action="" onsubmit={chat}>
			{message}
			<div>
				<input type="text" bind:value={host} />
				<input type="text" bind:value={route} />
			</div>
			<button type="submit">send</button>
		</form>
	</div>
</div>
