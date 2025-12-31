<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';
	import { browser, dev } from '$app/environment';
	import posthog from 'posthog-js';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { page } from '$app/state';

	import { i18n } from '$lib/i18n';
	import { isBlogPostPath } from '$lib/i18n-utils';

	let { children } = $props();

	const canonicalPath = $derived(i18n.route(page.url.pathname));
	const isBlogPost = $derived(isBlogPostPath(page.url.pathname));

	onMount(() => {
		if (!browser || dev) return;

		posthog.init('phc_1NmSk28YUeBJb4LI88avENb41KYFlAZM48bSR30kPsp', {
			api_host: '/ph',
			ui_host: 'https://us.posthog.com',
			persistence: 'localStorage',
			capture_pageview: true,
			capture_pageleave: true,
			disable_session_recording: false,
			session_recording: {
				recordCrossOriginIframes: false
			}
		});
	});
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
