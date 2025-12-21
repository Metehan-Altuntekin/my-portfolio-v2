import { error } from '@sveltejs/kit';

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
	const words = plainText.split(/\s+/).filter(word => word.length > 0);

	// Average reading speed: 200 words per minute
	const wordsPerMinute = 200;
	const minutes = Math.ceil(words.length / wordsPerMinute);

	// Return at least 1 minute
	return Math.max(1, minutes);
}

export const load = async ({ params }) => {
	try {
		const post = await import(`../../../content/blog/posts/${params.slug}.md`);

		// Try to get raw markdown for reading time
		let readingTime = 1;
		try {
			const rawModule = await import(`../../../content/blog/posts/${params.slug}.md?raw`);
			const rawMarkdown = typeof rawModule.default === 'string' ? rawModule.default : '';
			readingTime = calculateReadingTime(rawMarkdown);
		} catch {
			// If raw import fails, use fallback
			readingTime = 1;
		}

		return {
			content: post.default,
			meta: post.metadata,
			slug: params.slug,
			readingTime
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
};

