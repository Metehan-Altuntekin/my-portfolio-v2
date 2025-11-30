<script lang="ts">
	let scrollY = $state(0);
	let top = $derived(Math.round(scrollY * -0.06));

	$inspect(top);
</script>

<!-- @component This component renders a background grid decoration that looks like the lines on a blueprint. -->

<svelte:window bind:scrollY />

<div
	class="bg-square-grid fixed left-0 h-[200vh] w-screen overflow-hidden"
	style="top: {top}px;"
></div>

<style>
	.bg-square-grid {
		--bg-size: calc(100vw / 4);
		background: url('/grid-tile-hand-optimized.svg');
		background-repeat: repeat;
		background-size: var(--bg-size) var(--bg-size);
	}

	/* Dividing screen width to integers so we won't have half cut patterns until larger screens */
	@media screen and (min-width: 480px) {
		.bg-square-grid {
			--bg-size: calc(100vw / 6);
		}
	}

	@media screen and (min-width: 720px) {
		.bg-square-grid {
			--bg-size: calc(100vw / 10);
		}
	}

	@media screen and (min-width: 1080px) {
		.bg-square-grid {
			--bg-size: calc(100vw / 12);
		}
	}

	@media screen and (min-width: 1280px) {
		.bg-square-grid {
			--bg-size: calc(100vw / 16);
		}
	}

	@media screen and (min-width: 1720px) {
		.bg-square-grid {
			--bg-size: 95px;
		}
	}
</style>
