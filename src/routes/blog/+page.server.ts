// import { getBlogPostsMetadata } from '../../content/blog';
// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = () => {
// 	const posts = getBlogPostsMetadata();

// 	return { posts };
// };

import { json } from '@sveltejs/kit';

async function getPosts() {
	let posts: Post[] = [];

	const paths = import.meta.glob('/src/content/blog/posts/*.md', { eager: true });
	console.log('paths', paths);

	for (const path in paths) {
		console.log('path:', path);
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		console.log(file);

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;

			console.log('metadata, post', { metadata, post });
			if (post.published) {
				posts.push(post);
			}
		}
	}
	console.log('posts', posts);

	// posts = posts.sort(
	// 	(first, second) => new Date(second.pubDate).getTime() - new Date(first.pubDate).getTime()
	// );

	return posts;
}

export async function load() {
	const posts = await getPosts();
	return { posts };
}

export const prerender = true;
