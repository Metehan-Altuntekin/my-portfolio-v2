import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { mdsvex, escapeSvelte } from 'mdsvex';
import { bundledLanguages, getSingletonHighlighter } from 'shiki';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';

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
	remarkPlugins: [[remarkToc, { tight: true }]],
	rehypePlugins: [
		rehypeSlug,
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
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			handleMissingId: 'warn',
			handleUnseenRoutes: 'ignore'
		},
		alias: {
			content: 'src/content',
			'$app.css': './src/app.css'
		}
	},

	extensions: ['.svelte', '.md', '.svx']
};

export default config;
