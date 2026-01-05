import { error, redirect } from '@sveltejs/kit';
import { getPostBySlug, getPostAlternates, getAllPosts } from '$lib/blog-utils';
import { setLanguageTag } from '$lib/paraglide/runtime';
import { getLanguageFromPath, buildLocalizedPath } from '$lib/i18n-utils';

// Calculate reading time from markdown content
function calculateReadingTime(markdown: string): number {
	// Remove frontmatter (content between --- and ---)
	const withoutFrontmatter = markdown.replace(/^---[\s\S]*?---\n/, '');

	// Remove markdown syntax to get plain text
	const plainText = withoutFrontmatter
		.replace(/```[\s\S]*?```/g, '') // Remove code blocks
		.replace(/`[^`]+`/g, '') // Remove inline code
		.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert links to text
		.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // Remove images
		.replace(/#{1,6}\s+/g, '') // Remove headers
		.replace(/\*\*([^\*]+)\*\*/g, '$1') // Remove bold
		.replace(/\*([^\*]+)\*/g, '$1') // Remove italic
		.replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
		.replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
		.replace(/>\s+/g, '') // Remove blockquotes
		.replace(/\n+/g, ' ') // Replace newlines with spaces
		.trim();

	// Count words (split by whitespace and filter empty strings)
	const words = plainText.split(/\s+/).filter((word) => word.length > 0);

	// Average reading speed: 200 words per minute
	const wordsPerMinute = 200;
	const minutes = Math.ceil(words.length / wordsPerMinute);

	// Return at least 1 minute
	return Math.max(1, minutes);
}

export const load = async ({ params, url }) => {
	const lang = getLanguageFromPath(url.pathname);
	setLanguageTag(lang);

	// Get post by slug and language
	let post = await getPostBySlug(params.slug, lang);
	console.log(params, lang, post);

	// If not found, check if this slug exists in another language and redirect
	if (!post) {
		const { bySlug } = await getAllPosts();
		const postInOtherLang = bySlug.get(params.slug);

		if (postInOtherLang && postInOtherLang.lang !== lang) {
			// Get the correct version for the current language
			const { urls } = await getPostAlternates(postInOtherLang.id, postInOtherLang.lang);
			const redirectUrl = urls[lang];

			if (redirectUrl) {
				redirect(307, redirectUrl);
			}
		}

		error(404, `Could not find post: ${params.slug}`);
	}

	// Try to load the markdown file
	let content;
	let readingTime = 1;
	try {
		const postModule = await import(`../../../content/blog/posts/${params.slug}.md`);
		content = postModule.default;

		// Try to get raw markdown for reading time
		try {
			const rawModule = await import(`../../../content/blog/posts/${params.slug}.md?raw`);
			const rawMarkdown = typeof rawModule.default === 'string' ? rawModule.default : '';
			readingTime = calculateReadingTime(rawMarkdown);
		} catch {
			// If raw import fails, use fallback
			readingTime = 1;
		}
	} catch (e) {
		throw error(404, `Could not load post content: ${params.slug}`);
	}

	// Get alternate language versions for hreflang
	const { urls: alternateUrls } = await getPostAlternates(post.id, lang);

	return {
		content,
		meta: post,
		slug: params.slug,
		readingTime,
		alternateUrls
	};
};
