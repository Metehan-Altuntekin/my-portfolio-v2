import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Commissioner', 'sans-serif']
		},
		extend: {
			colors: {
				base: {
					100: '#1279EF',
					200: '#1365C2',
					300: '#1057A7',
					content: '#FFFFFF',
					cardBase: 'rgba(0,0,0, 0.2)'
				},
				secondary: '#FF6FB3',
				accent: '#F9F871'
			},
			borderRadius: {
				xs: '24px',
				sm: '28px',
				md: '32px',
				lg: '36px',
				xl: '40px',
				'2xl': '44px'
			}
		}
	},

	plugins: [typography, containerQueries]
} satisfies Config;
