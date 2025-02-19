<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	let { message } = $props<string>();
</script>

<div class="flex items-center justify-center">
	{message}
	<LoaderCircle class="ml-2 size-5 animate-spin" />
</div>
