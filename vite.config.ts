import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		Icons({
			compiler: 'svelte'
		}),
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],
	build: {
		target: 'esnext'
	}
});
