import { getPostsByLanguage } from '$lib/blog-utils';

export async function entries() {
	// Get posts for both languages
	const postsEn = await getPostsByLanguage('en');
	const postsTr = await getPostsByLanguage('tr');

	// Return all slugs for prerendering
	const slugs: { slug: string }[] = [
		...postsEn.map((post) => ({ slug: post.slug })),
		...postsTr.map((post) => ({ slug: post.slug }))
	];

	return slugs;
}
