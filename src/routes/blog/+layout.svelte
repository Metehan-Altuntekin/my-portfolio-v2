<script lang="ts">
	import Footer from '$lib/sections/Footer.svelte';
	import Header from '$lib/sections/Header.svelte';

	let { children } = $props();
</script>

<div class="w-full z-10 relative min-h-screen flex flex-col bg-blog-base-100">
	<Header />

	<div class="mt-16 grow">
		{@render children()}
	</div>

	<Footer />
</div>
