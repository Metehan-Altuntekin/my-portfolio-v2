<script lang="ts">
	import '../app.css';

	// import { onMount } from 'svelte';
	// import { browser, dev } from '$app/environment';

	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { page } from '$app/state';

	import { i18n } from '$lib/i18n';
	import { isBlogPostPath } from '$lib/i18n-utils';

	let { children } = $props();

	const canonicalPath = $derived(i18n.route(page.url.pathname));
	const isBlogPost = $derived(isBlogPostPath(page.url.pathname));

	// onMount(async () => {
	// 	if (!browser || dev) return;

	// 	// 1. Check for the "Automation" flag (Catches 99% of bots/tests)
	// 	const isAutomation = navigator.webdriver === true;
	// 	if (isAutomation) return;

	// 	// 2. Check the User Agent for specific tool signatures
	// 	const isBotUA = /Lighthouse|PageSpeed|GTmetrix|HeadlessChrome/i.test(navigator.userAgent);
	// 	if (isBotUA) return;

	// 	// 2. Set up the LCP Observer
	// 	try {
	// 		const lcpObserver = new PerformanceObserver((entryList) => {
	// 			const initPostHog = async () => {
	// 				// Dynamically load the library only when needed
	// 				const { default: posthog } = await import('posthog-js');

	// 				posthog.init('phc_1NmSk28YUeBJb4LI88avENb41KYFlAZM48bSR30kPsp', {
	// 					api_host: '/ph',
	// 					ui_host: 'https://us.posthog.com',
	// 					persistence: 'localStorage',
	// 					capture_pageview: true,
	// 					capture_pageleave: true,
	// 					disable_session_recording: false,
	// 					session_recording: {
	// 						recordCrossOriginIframes: false
	// 					}
	// 				});
	// 			};

	// 			const entries = entryList.getEntries();
	// 			if (entries.length > 0) {
	// 				// LCP detected! Disconnect and init PostHog.
	// 				lcpObserver.disconnect();

	// 				if ('requestIdleCallback' in window) {
	// 					window.requestIdleCallback(initPostHog, { timeout: 2000 });
	// 				} else {
	// 					initPostHog();
	// 				}
	// 			}
	// 		});

	// 		// 'buffered: true' is key—it finds the LCP even if it already happened
	// 		lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// });
</script>

<svelte:head>
	{#if !isBlogPost}
		<!-- Only add hreflang tags for non-blog-post pages (blog posts have their own) -->
		<link
			rel="alternate"
			hreflang="en"
			href="https://metehan.design{i18n.resolveRoute(canonicalPath, 'en')}"
		/>
		<link
			rel="alternate"
			hreflang="tr"
			href="https://metehan.design{i18n.resolveRoute(canonicalPath, 'tr')}"
		/>
		<link
			rel="alternate"
			hreflang="x-default"
			href="https://metehan.design{i18n.resolveRoute(canonicalPath, 'en')}"
		/>
	{/if}
</svelte:head>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>
