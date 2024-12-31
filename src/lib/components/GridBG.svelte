<script lang="ts">
	const xLineCount = 12;
	const yLineCount = 7;

	const xArray = Array.from(Array(xLineCount).keys());
	const yArray = Array.from(Array(yLineCount).keys());
</script>

<!-- @component This component renders a background grid decoration that looks like the lines on a blueprint. -->

<!-- TODO make it either fixed or align properly for sections. Experiment. -->

<div class="bg-grid absolute left-0 top-0 z-0 h-full w-screen overflow-hidden border">
	<div class="absolute inset-0 flex gap-[94px] before:border-none after:border-none">
		{#each xArray as x, i (i)}
			<div class="horizontal-line-solid"></div>
			<div class="horizontal-line-dashed"></div>
		{/each}
	</div>

	<div class="absolute inset-0 flex flex-col gap-[94px] before:border-none after:border-none">
		{#each yArray as y, i (i)}
			<div class="vertical-line-solid"></div>
			<div class="vertical-line-dashed"></div>
		{/each}
	</div>
</div>

<style>
	.bg-grid {
		--line-thickness: 2px;
		/* background: radial-gradient(#fff, rgba(255, 255, 255, 0.7) 40%, transparent 70%); */
		mask-image: radial-gradient(
			#fff,
			rgba(255, 255, 255, 0.7) 40%,
			transparent 70%,
			transparent 101%
		);
		mask-size: 100% 100%;
	}

	.horizontal-line-solid {
		flex-shrink: 0;

		height: 100%;
		width: var(--line-thickness);
		background-color: white;
		opacity: 17.5%;
		box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.25);
	}

	.horizontal-line-dashed {
		flex-shrink: 0;

		height: 100%;
		width: var(--line-thickness);
		background: repeating-linear-gradient(
			to bottom,
			#fff,
			#fff 16px,
			transparent 16px,
			transparent 32px
		);
		opacity: 15%;
	}

	.vertical-line-solid {
		flex-shrink: 0;

		height: var(--line-thickness);
		width: 100%;
		background-color: white;
		opacity: 17.5%;
		box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.25);
	}

	.vertical-line-dashed {
		flex-shrink: 0;

		height: var(--line-thickness);
		width: 100%;
		background: repeating-linear-gradient(
			to right,
			#fff,
			#fff 16px,
			transparent 16px,
			transparent 32px
		);
		opacity: 15%;
	}
</style>
