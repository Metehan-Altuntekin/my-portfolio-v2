import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { mdsvex, escapeSvelte } from 'mdsvex';
import { bundledLanguages, getSingletonHighlighter } from 'shiki';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import Slugger from 'github-slugger';

/**
 * Custom plugin to extract TOC data to frontmatter
 */
function remarkGetToc() {
	return (tree, file) => {
		const slugger = new Slugger();
		const toc = [];

		visit(tree, 'heading', (node) => {
			const text = toString(node);
			// Generate id to match what rehype-slug will do later
			const id = slugger.slug(text);

			toc.push({
				level: node.depth,
				title: text,
				id
			});
		});

		// Merge into existing frontmatter
		file.data.fm = {
			...file.data.fm,
			toc
		};
	};
}

/**
 * Parses Obsidian-style image syntax: ![Caption|400](image.jpg)
 * - Sets 'width' attribute to 400
 * - Sets 'alt' attribute to "Caption"
 */
function rehypeImageResize() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			// Check for <img /> tags with an alt attribute
			if (node.tagName === 'img' && node.properties.alt) {
				const rawAlt = node.properties.alt;

				// Regex to match: "Anything|Number" or "Anything|NumberxNumber"
				// Example: "My Caption|300" or "My Caption|300x200"
				const match = rawAlt.match(/^(.*)\|(\d+)(?:x(\d+))?$/);

				if (match) {
					const [_, caption, width, height] = match;

					// 1. Update the attributes
					node.properties.alt = caption;
					node.properties.width = width;
					if (height) node.properties.height = height;

					// 2. Optional: Set title to match caption (shows on hover)
					node.properties.title = caption;
				}
			}
		});
	};
}

function rehypeImgFigure() {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName === 'img' && node.properties.alt) {
				const rawAlt = node.properties.alt;
				const match = rawAlt.match(/^(.*)\|(\d+)(?:x(\d+))?$/);

				if (match) {
					const [_, caption, width, height] = match;

					// Update image properties
					node.properties.alt = caption;
					node.properties.width = width;
					if (height) node.properties.height = height;

					// Create a <figure> wrapper
					const figure = {
						type: 'element',
						tagName: 'figure',
						properties: { className: ['image-container'] },
						children: [
							node, // The image itself
							{
								type: 'element',
								tagName: 'figcaption',
								properties: {},
								children: [{ type: 'text', value: caption }]
							}
						]
					};

					// Replace the original <img> with the new <figure>
					parent.children[index] = figure;
				}
			}
		});
	};
}

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			// Replace tabs with 2 spaces before highlighting
			const normalizedCode = code.replace(/\t/g, '  ');

			const highlighter = await getSingletonHighlighter({
				themes: ['one-dark-pro', 'catppuccin-frappe', 'nord'],
				langs: Object.keys(bundledLanguages)
			});
			// return html;
			const html = escapeSvelte(
				highlighter.codeToHtml(code, { lang, theme: 'catppuccin-frappe', tabSize: 2 })
			);
			return `{@html \`${html}\`}`;
		}
	},
	remarkPlugins: [remarkGetToc],
	rehypePlugins: [
		rehypeSlug,
		rehypeImgFigure,
		rehypeUnwrapImages
		// TODO: rehype-autolink-headings disabled due to build error:
		// "Cannot use 'in' operator to search for 'children' in undefined"
		// This appears to be a compatibility issue with mdsvex@0.12.6 during build.
		// Works in dev mode but fails during build. Need to investigate version compatibility
		// or find alternative solution for auto-linking headings.
		// rehypeAutoLinkHeadings({ behavior: 'wrap', properties: { className: ['link-hover'] })
	]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [mdsvex(mdsvexOptions), vitePreprocess()],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		inlineStyleThreshold: 60000, // Inline CSS files smaller than ~60KiB
		prerender: {
			handleMissingId: 'warn',
			handleUnseenRoutes: 'ignore',
			entries: [
				'*', // Crawl from root
				'/tr', // Turkish home page
				'/tr/blog' // Turkish blog listing
			]
		},
		alias: {
			$content: 'src/content',
			'$app.css': './src/app.css'
		}
	},

	extensions: ['.svelte', '.md', '.svx']
};

export default config;
