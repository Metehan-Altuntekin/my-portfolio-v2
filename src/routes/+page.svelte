<script lang="ts">
	import { BASE_URL, SITE_NAME, TWITTER_HANDLE } from '$lib/constants.js';
	import GridBg from '$lib/components/GridBG.svelte';
	import Contact from '$lib/sections/Contact.svelte';
	import Footer from '$lib/sections/Footer.svelte';
	import Header from '$lib/sections/Header.svelte';
	import Hero from '$lib/sections/Hero.svelte';
	import Projects from '$lib/sections/Projects.svelte';
	import Skills from '$lib/sections/Skills.svelte';
	import Toolbox from '$lib/sections/Toolbox.svelte';
	import * as m from '$lib/paraglide/messages.js';

	const pageUrl = BASE_URL;
	const ogImage = `${BASE_URL}/android-chrome-512x512.png`;
	const siteTitle = m.site_title();
	const siteDescription = m.site_description();
</script>

<svelte:head>
	<title>{siteTitle}</title>
	<meta name="description" content={siteDescription} />
	<link rel="canonical" href={pageUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:title" content={siteTitle} />
	<meta property="og:description" content={siteDescription} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={TWITTER_HANDLE} />
	<meta name="twitter:title" content={siteTitle} />
	<meta name="twitter:description" content={siteDescription} />
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
