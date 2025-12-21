<script lang="ts">
	import SquareGridBG from '$lib/components/SquareGridBG.svelte';
	import Footer from '$lib/sections/Footer.svelte';
	import Header from '$lib/sections/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="theme-color" content="#121211" />
	<style>
		body,
		html {
			background-color: var(--color-blog-base-100);
			background-image: none;
		}
	</style>
</svelte:head>

<SquareGridBG />

<div class="w-full relative min-h-screen flex flex-col">
	<Header />

	<div class="mt-16 grow">
		{@render children()}
	</div>

	<Footer />
</div>
