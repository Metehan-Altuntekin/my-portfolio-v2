import * as runtime from '$lib/paraglide/runtime';
import { createI18n } from '@inlang/paraglide-sveltekit';

export const i18n = createI18n(runtime, {
	defaultLanguageTag: 'en',
	prefixDefaultLanguage: 'never',
	seo: {
		noAlternateLinks: true // Disable automatic hreflang generation
	},
	pathnames: {
		'/blog': {
			en: '/blog',
			tr: '/blog'
		}
	}
});
