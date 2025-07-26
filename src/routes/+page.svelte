<script lang="ts">
	import GridBg from '$lib/components/GridBG.svelte';
	import Contact from '$lib/sections/Contact.svelte';
	import Footer from '$lib/sections/Footer.svelte';
	import Header from '$lib/sections/Header.svelte';
	import Hero from '$lib/sections/Hero.svelte';
	import Projects from '$lib/sections/Projects.svelte';
	import Skills from '$lib/sections/Skills.svelte';
	import Toolbox from '$lib/sections/Toolbox.svelte';
</script>

<GridBg />

<div class="w-full z-10 relative">
	<Header />

	<Hero />
	<Projects />
	<Skills />
	<Toolbox />

	<Contact />

	<Footer />
</div>
