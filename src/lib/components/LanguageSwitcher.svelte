<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import { i18n } from '$lib/i18n';
	import { languageTag } from '$lib/paraglide/runtime';

	let dropdownOpen = $state(false);
	let dropdownElement: HTMLDivElement;

	const currentLang = $derived(languageTag());

	const languages: { tag: AvailableLanguageTag; name: string; nativeName: string }[] = [
		{ tag: 'en', name: 'English', nativeName: 'English' },
		{ tag: 'tr', name: 'Turkish', nativeName: 'Türkçe' }
	];

	function switchToLanguage(newLanguage: AvailableLanguageTag, event: MouseEvent) {
		event.stopPropagation();
		event.preventDefault();
		dropdownOpen = false;

		const canonicalPath = i18n.route(page.url.pathname);
		const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
		goto(localisedPath);
	}

	function toggleDropdown(event: MouseEvent) {
		event.stopPropagation();
		dropdownOpen = !dropdownOpen;
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
			dropdownOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="relative" bind:this={dropdownElement}>
	<button
		onclick={(e) => toggleDropdown(e)}
		class="flex items-center gap-2 px-3 py-2 rounded-xs transition-colors hover:bg-base-200/50"
		aria-label="Select language"
		aria-expanded={dropdownOpen}
		aria-haspopup="true"
	>
		<Icon icon="mdi:earth" class="text-xl" />
		<span class="font-medium text-sm uppercase">{currentLang}</span>
	</button>

	{#if dropdownOpen}
		<div
			class="card p-0 absolute right-0 mt-2 min-w-[140px] rounded-xs shadow-lg z-50 overflow-hidden"
			role="menu"
		>
			{#each languages as lang}
				<button
					onclick={(e) => switchToLanguage(lang.tag, e)}
					class="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-black/10 flex items-center justify-between gap-3 z-0 {currentLang ===
					lang.tag
						? 'bg-black/20 font-medium'
						: ''}"
					role="menuitem"
				>
					<span>{lang.nativeName}</span>
					{#if currentLang === lang.tag}
						<Icon icon="mdi:check" class="text-base-content text-lg" />
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
