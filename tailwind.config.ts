import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Commissioner', 'Helvetica', 'sans-serif']
		},

		extend: {
			colors: {
				base: {
					100: '#1986B9',
					200: '#16547E',
					300: '#0F3C5A',
					content: '#FFFFFF',
					'content-muted': '#D7E2F1',
					cardBase: 'rgba(0,0,0, 0.2)'
				},
				secondary: '#FF6FB3',
				accent: '#F9F871'
			},

			borderRadius: {
				'3xs': '12px',
				'2xs': '16px',
				xs: '20px',
				sm: '28px',
				md: '32px',
				lg: '36px',
				xl: '42px',
				'2xl': '48px'
			},

			fontSize: {},

			screens: {
				'3xl': '1710px',
				'4xl': '1920px'
			}
		}
	},

	plugins: [typography, containerQueries]
} satisfies Config;
