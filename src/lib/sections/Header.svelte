<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';

	let scrollY = $state(0);
	let scrolled = $derived(scrollY > 200);
	$inspect(scrolled);
</script>

<svelte:window bind:scrollY />

<header
	class="z-50 fixed left-0 right-0 top-0 w-full px-[var(--page-padding)] py-3 md:py-5
				{scrolled && 'bg-base-content/5 backdrop-blur-lg'}	"
>
	<Logo />
</header>
