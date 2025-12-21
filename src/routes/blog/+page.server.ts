async function getPosts() {
	const posts: Post[] = [];
	const paths = import.meta.glob('/src/content/blog/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;

			if (post.published) {
				posts.push(post);
			}
		}
	}

	// Sort by creation date (newest first)
	posts.sort(
		(first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
	);

	return posts;
}

export async function load() {
	const posts = await getPosts();
	return { posts };
}

export const prerender = true;
