import { BASE_URL } from '$lib/constants';
import { languageTag } from '$lib/paraglide/runtime';

// Calculate reading time from markdown content
export function calculateReadingTime(markdown: string): number {
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

type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(date: string | Date, dateStyle: DateStyle = 'medium', locales?: string) {
	const dateToFormat = typeof date === 'string' ? new Date(date.replaceAll('-', '/')) : date;
	const currentLang = locales || languageTag();
	const dateFormatter = new Intl.DateTimeFormat(currentLang === 'tr' ? 'tr-TR' : 'en-US', {
		dateStyle
	});
	return dateFormatter.format(dateToFormat);
}

// Convert relative image URL to absolute URL
export function getAbsoluteImageUrl(image: string | undefined): string | undefined {
	if (!image) return undefined;
	if (image.startsWith('http://') || image.startsWith('https://')) {
		return image;
	}
	const cleanPath = image.startsWith('/') ? image.slice(1) : image;
	return `${BASE_URL}/${cleanPath}`;
}

// Build multi-ratio image array for JSON-LD from explicitly defined images
export function buildImageArray(postMetadata: Post) {
	const images = [];

	// Add images in order of priority for Google (16:9, 4:3, 1:1)
	if (postMetadata.image16x9) {
		images.push({
			'@type': 'ImageObject',
			url: getAbsoluteImageUrl(postMetadata.image16x9),
			width: 1200,
			height: 675
		});
	}

	if (postMetadata.image4x3) {
		images.push({
			'@type': 'ImageObject',
			url: getAbsoluteImageUrl(postMetadata.image4x3),
			width: 1200,
			height: 900
		});
	}

	if (postMetadata.image1x1) {
		images.push({
			'@type': 'ImageObject',
			url: getAbsoluteImageUrl(postMetadata.image1x1),
			width: 1200,
			height: 1200
		});
	}

	// If no specific ratios defined but base image exists, use that
	if (images.length === 0 && postMetadata.image) {
		return {
			'@type': 'ImageObject',
			url: getAbsoluteImageUrl(postMetadata.image),
			caption: postMetadata.title
		};
	}

	// Return array if we have multiple images, single object if just one
	return images.length > 0 ? (images.length === 1 ? images[0] : images) : undefined;
}

// Format date for ISO 8601
export function formatISODate(date: string | Date): string {
	const dateObj = typeof date === 'string' ? new Date(date.replaceAll('-', '/')) : date;
	return dateObj.toISOString();
}
