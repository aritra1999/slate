<script lang="ts">
	import { SquarePen } from 'lucide-svelte';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { cn } from '$lib/utils';
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger
			class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full')}
			aria-label="Start new chat"
		>
			<SquarePen />
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Start new chat</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
