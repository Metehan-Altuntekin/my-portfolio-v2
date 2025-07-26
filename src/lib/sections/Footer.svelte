<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
</script>

<footer
	class="w-full flex flex-col justify-center items-center
	 			px-[var(--page-padding)] pb-4 gap-4
				md:py-10 md:gap-10"
>
	<svg width="100%" height="1" viewBox="0 0 100% 1" fill="none" xmlns="http://www.w3.org/2000/svg">
		<line y1="0.5" x2="100%" y2="0.5" stroke="white" stroke-opacity="0.5" stroke-dasharray="8 8" />
	</svg>

	<Logo />
</footer>
