import { getPostsByLanguage } from '$lib/blog-utils';
import { setLanguageTag } from '$lib/paraglide/runtime';
import { getLanguageFromPath } from '$lib/i18n-utils';

export async function load({ url }) {
	const lang = getLanguageFromPath(url.pathname);
	setLanguageTag(lang);

	const posts = await getPostsByLanguage(lang);

	// Sort by creation date (newest first)
	posts.sort(
		(first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
	);

	return { posts };
}

export const prerender = true;
