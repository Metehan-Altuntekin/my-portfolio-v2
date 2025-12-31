<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import posthog from 'posthog-js';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';

	import { i18n } from '$lib/i18n';

	let { children } = $props();

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

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>
