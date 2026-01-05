import { getAllPosts, getPostsByLanguage } from '$lib/blog-utils';

export async function entries() {
	// Get posts for both languages
	const { posts } = await getAllPosts();

	// Return all slugs for prerendering
	const slugs: { slug: string }[] = [...posts.map((post) => ({ slug: post.slug }))];

	return slugs;
}
