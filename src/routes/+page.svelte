<script lang="ts">
	import { BASE_URL, SITE_NAME, SITE_DESCRIPTION, TWITTER_HANDLE } from '$lib/constants.js';
	import GridBg from '$lib/components/GridBG.svelte';
	import Contact from '$lib/sections/Contact.svelte';
	import Footer from '$lib/sections/Footer.svelte';
	import Header from '$lib/sections/Header.svelte';
	import Hero from '$lib/sections/Hero.svelte';
	import Projects from '$lib/sections/Projects.svelte';
	import Skills from '$lib/sections/Skills.svelte';
	import Toolbox from '$lib/sections/Toolbox.svelte';

	const pageUrl = BASE_URL;
	const ogImage = `${BASE_URL}/android-chrome-512x512.png`;
</script>

<svelte:head>
	<title>{SITE_NAME} | Think, research, design, build.</title>
	<meta name="description" content={SITE_DESCRIPTION} />
	<link rel="canonical" href={pageUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:title" content={`${SITE_NAME} | Think, research, design, build.`} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={TWITTER_HANDLE} />
	<meta name="twitter:title" content={`${SITE_NAME} | Think, research, design, build.`} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<meta name="twitter:image" content={ogImage} />

	<meta name="theme-color" content="#16547e" />
</svelte:head>

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
