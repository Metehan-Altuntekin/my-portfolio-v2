import { error } from '@sveltejs/kit';

async function getPostSlugs(): Promise<string[]> {
	const paths = import.meta.glob('/src/content/blog/posts/*.md', { eager: true });
	const slugs: string[] = [];

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as { published?: boolean };
			if (metadata.published !== false) {
				slugs.push(slug);
			}
		}
	}

	return slugs;
}

export async function entries() {
	const slugs = await getPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

export const load = async ({ params }) => {
	try {
		const post = await import(`../../../content/blog/posts/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
};
