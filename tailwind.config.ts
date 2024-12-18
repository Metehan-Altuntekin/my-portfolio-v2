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
				sm: '20px',
				md: '24px',
				lg: '28px',
				xl: '32px',
				'2xl': '40px'
			}
		}
	},

	plugins: [typography, containerQueries]
} satisfies Config;
