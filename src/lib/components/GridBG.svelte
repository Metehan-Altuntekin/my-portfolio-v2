<script lang="ts">
	const xLineCount = 50;
	const yLineCount = 50;

	const xArray = Array.from(Array(xLineCount).keys());
	const yArray = Array.from(Array(yLineCount).keys());

	let scrollY = $state(0);
	let translateY = $derived(scrollY * -0.06);

	$inspect(translateY);
</script>

<!-- @component This component renders a background grid decoration that looks like the lines on a blueprint. -->

<svelte:window bind:scrollY />

<div
	class="bg-grid fixed left-0 top-0 z-0 h-[150vh] w-screen overflow-hidden border"
	style="transform: translateY({translateY}px);"
>
	<div class="absolute inset-0 flex gap-[31px] before:border-none after:border-none">
		{#each xArray as x, i (i)}
			<div class="horizontal-line-solid"></div>
			<div class="horizontal-line-dashed"></div>
		{/each}
	</div>

	<div class="absolute inset-0 flex flex-col gap-[31px] before:border-none after:border-none">
		{#each yArray as y, i (i)}
			<div class="vertical-line-solid"></div>
			<div class="vertical-line-dashed"></div>
		{/each}
	</div>
</div>

<style>
	.bg-grid {
		--line-thickness: 1.2px;
		--solid-line-opacity: 5%;
		--dashed-line-opacity: 3%;
		--line-shadow: 0px 0px 4px rgba(255, 255, 255, 0.45);

		/* background: radial-gradient(#fff, rgba(255, 255, 255, 0.7) 40%, transparent 70%); */
		mask-image: radial-gradient(
			#fff,
			rgba(255, 255, 255, 0.7) 40%,
			transparent 70%,
			transparent 101%
		);
		mask-size: 100% 100%;

		/* For parallax better performance */
		will-change: transform;
		backface-visibility: hidden;
	}

	.horizontal-line-solid {
		flex-shrink: 0;

		height: 100%;
		width: var(--line-thickness);
		background-color: white;
		opacity: var(--solid-line-opacity);
		box-shadow: var(--line-shadow);
	}

	.horizontal-line-dashed {
		flex-shrink: 0;

		height: 100%;
		width: var(--line-thickness);
		background: repeating-linear-gradient(
			to bottom,
			transparent 0px,
			transparent 4px,
			#fff 4px,
			#fff 12px,
			transparent 12px,
			transparent 16px
		);
		box-shadow: var(--line-shadow);
		opacity: var(--dashed-line-opacity);
	}

	.vertical-line-solid {
		flex-shrink: 0;

		height: var(--line-thickness);
		width: 100%;
		background-color: white;
		opacity: var(--solid-line-opacity);
		box-shadow: var(--line-shadow);
	}

	.vertical-line-dashed {
		flex-shrink: 0;

		height: var(--line-thickness);
		width: 100%;
		background: repeating-linear-gradient(
			to right,
			transparent 0px,
			transparent 4px,
			#fff 4px,
			#fff 12px,
			transparent 12px,
			transparent 16px
		);
		opacity: var(--dashed-line-opacity);
		box-shadow: var(--line-shadow);
	}
</style>
