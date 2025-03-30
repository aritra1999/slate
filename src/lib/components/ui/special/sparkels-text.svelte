<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount, onDestroy } from 'svelte';
	import Sparkles from './sparkels.svelte';

	interface Sparkle {
		id: string;
		x: string;
		y: string;
		color: string;
		delay: number;
		scale: number;
		lifespan: number;
	}

	interface Colors {
		first: string;
		second: string;
	}

	interface Props {
		text?: string;
		colors?: Colors;
		sparklesCount?: number;
		class?: string;
		[key: string]: unknown;
	}

	let {
		text = 'Hello World',
		colors = {
			first: '#9E7AFF',
			second: '#FE8BBB'
		},
		sparklesCount = 10,
		class: className = '',
		...rest
	}: Props = $props();

	let sparkles: Sparkle[] = $state([]);

	let generateStar = () => {
		let starX = `${Math.random() * 100}%`;
		let starY = `${Math.random() * 100}%`;
		let color = Math.random() > 0.5 ? colors.first : colors.second;
		let delay = Math.random() * 2;
		let scale = Math.random() * 1 + 0.3;
		let lifespan = Math.random() * 10 + 5;
		let id = `${starX}-${starY}-${Date.now()}`;
		return { id, x: starX, y: starY, color, delay, scale, lifespan };
	};

	let initializeStars = async () => {
		let newSparkles = Array.from({ length: sparklesCount }, generateStar);
		sparkles = newSparkles;
	};

	const updateStars = () => {
		let temp = sparkles.map((star) => {
			if (star.lifespan <= 0) {
				return generateStar();
			} else {
				return { ...star, lifespan: star.lifespan - 0.1 };
			}
		});
		sparkles = temp;
	};

	let interval: ReturnType<typeof setInterval>;
	onMount(async () => {
		initializeStars();
		interval = setInterval(updateStars, 100);
	});
	onDestroy(() => clearInterval(interval));
</script>

<div
	style:--sparkles-first-color="{colors.first};"
	style:--sparkles-second-color="{colors.second};"
	class={cn('text-3xl font-bold sm:text-4xl', className)}
	{...rest}
>
	<span class="relative inline-block">
		{#each sparkles as item}
			<Sparkles
				id={item.id}
				x={parseFloat(item.x)}
				y={parseFloat(item.y)}
				color={item.color}
				delay={item.delay}
				scale={item.scale}
			/>
		{/each}
		<strong>{text}</strong>
	</span>
</div>
