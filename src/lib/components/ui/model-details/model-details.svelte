<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils';
</script>

<Popover.Root>
	<Popover.Trigger class={cn(buttonVariants({ variant: 'accent' }), 'rounded-2xl px-4 ')}>
		deepseek-r1:1.5b
	</Popover.Trigger>
	<Popover.Content class="w-80 text-sm">
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. At quisquam suscipit tempora id eos
		assumenda vel sapiente, illum ratione eius totam in iusto ab expedita natus rerum eveniet harum
		atque!
	</Popover.Content>
</Popover.Root>
