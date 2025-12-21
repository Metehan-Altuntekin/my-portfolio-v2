import { BASE_URL } from '$lib/constants.js';

export const prerender = true;

async function getBlogPosts(): Promise<Array<{ slug: string; updatedAt?: string | Date }>> {
	const paths = import.meta.glob('/src/content/blog/posts/*.md', { eager: true });
	const posts: Array<{ slug: string; updatedAt?: string | Date }> = [];

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as { published?: boolean; updatedAt?: string | Date };
			if (metadata.published !== false) {
				posts.push({
					slug,
					updatedAt: metadata.updatedAt
				});
			}
		}
	}

	return posts;
}

function formatDate(date: string | Date | undefined): string {
	if (!date) return new Date().toISOString();
	const dateObj = typeof date === 'string' ? new Date(date.replaceAll('-', '/')) : date;
	return dateObj.toISOString();
}

export async function GET() {
	const posts = await getBlogPosts();
	const now = new Date().toISOString();

	const urls = [
		// Main pages
		{ loc: BASE_URL, lastmod: now, changefreq: 'weekly', priority: '1.0' },
		{ loc: `${BASE_URL}/blog`, lastmod: now, changefreq: 'weekly', priority: '0.9' },
		// Blog posts
		...posts.map((post) => ({
			loc: `${BASE_URL}/blog/${post.slug}`,
			lastmod: formatDate(post.updatedAt),
			changefreq: 'monthly' as const,
			priority: '0.8' as const
		}))
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `	<url>
		<loc>${url.loc}</loc>
		<lastmod>${url.lastmod}</lastmod>
		<changefreq>${url.changefreq}</changefreq>
		<priority>${url.priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
}

