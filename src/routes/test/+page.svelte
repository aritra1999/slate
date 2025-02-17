<script lang="ts">
	let message = $state('');

	async function chat() {
		await fetch('http://localhost:11434')
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
			<p>{message}</p>
			<div>
				<textarea name="" id=""></textarea>
			</div>
			<button type="submit">send</button>
		</form>
	</div>
</div>
