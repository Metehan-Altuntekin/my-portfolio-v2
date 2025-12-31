import type { AvailableLanguageTag } from '$lib/paraglide/runtime';

/**
 * Detect language from URL pathname
 */
export function getLanguageFromPath(pathname: string): 'en' | 'tr' {
	return pathname.startsWith('/tr') ? 'tr' : 'en';
}

/**
 * Build localized path with language prefix
 */
export function buildLocalizedPath(path: string, lang: AvailableLanguageTag): string {
	return lang === 'en' ? path : `/tr${path}`;
}

/**
 * Check if current path is a blog post page
 */
export function isBlogPostPath(pathname: string): boolean {
	return /\/blog\/[^\/]+$/.test(pathname);
}

