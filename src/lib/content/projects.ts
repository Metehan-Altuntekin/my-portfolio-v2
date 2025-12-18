import allsetThumb from '$lib/content/thumbs/allset.webp';
import breezbookThumb from '$lib/content/thumbs/breezbook.webp';
import kurdanciogluThumb from '$lib/content/thumbs/kurdancioglu.webp';
import ozkanMusavirlikThumb from '$lib/content/thumbs/ozkan-musavirlik.webp';
import tojsonThumb from '$lib/content/thumbs/tojson.webp';
import breezbookBookingThumb from '$lib/content/thumbs/breezbook-booking.webp';

export const tools = {
	ts: {
		name: 'TypeScript',
		iconId: 'skill-icons:typescript'
	},
	figma: {
		name: 'Figma',
		iconId: 'logos:figma'
	},
	svelte: {
		name: 'Svelte/Kit',
		iconId: 'logos:svelte-icon'
	},
	tailwind: {
		name: 'Tailwind CSS',
		iconId: 'devicon:tailwindcss'
	},
	daisyui: {
		name: 'Daisy UI',
		iconId: 'logos:daisyui-icon'
	},
	sass: {
		name: 'SASS',
		iconId: 'logos:sass'
	},
	react: {
		name: 'React',
		iconId: 'logos:react'
	},
	supabase: {
		name: 'Supabase',
		iconId: 'devicon:supabase'
	},
	nextJs: {
		name: 'NextJS',
		iconId: 'devicon:nextjs'
	},
	// shadcn: {
	// 	name: 'ShadCN',
	// 	iconId: 'simple-icons:shadcnui'
	// },
	mui: {
		name: 'Material UI',
		iconId: 'simple-icons:mui'
	},
	nodejs: {
		name: 'Node JS',
		iconId: 'logos:nodejs-icon'
	},
	affinityDesigner: {
		name: 'AD 2',
		iconId: 'simple-icons:affinitydesigner'
	}
} as const;

const projects: Project[] = [
	{
		name: 'Ozkan Musavirlik',
		desc: 'A headless CMS and high-performance marketing platform for a financial consultancy firm. Built with SvelteKit & Sanity for 100/100 SEO scores. ',
		tools: [tools.ts, tools.svelte, tools.sass, tools.figma],
		tags: ['Design', 'Frontend'],
		visitUrl: 'https://www.ozkanmusavirlik.com.tr',
		thumb: ozkanMusavirlikThumb
	},
	{
		name: 'AllSet',
		desc: 'An AI-powered receptionist integrated with WhatsApp. Designed the brand identity and engineered the landing infrastructure.',
		tools: [tools.ts, tools.figma, tools.svelte, tools.tailwind, tools.daisyui],
		tags: ['Design', 'Frontend'],
		thumb: allsetThumb
	},
	{
		name: 'BreezBook',
		desc: 'The original booking engine architecture that evolved into AllSet. Focused on reducing friction for high-volume service scheduling.',
		tools: [tools.ts, tools.svelte, tools.daisyui, tools.tailwind],
		tags: ['Design', 'Frontend'],
		visitUrl: 'https://breezbook.com',
		thumb: breezbookThumb
	},
	{
		name: 'BreezBook Booking App',
		desc: 'A mobile-first booking architecture designed in Figma. Focused on reducing user friction and increasing conversion rates for service businesses.',
		tools: [tools.figma],
		tags: ['Design'],
		visitUrl:
			'https://www.figma.com/proto/Y3429sNI1L6LkuI8Jy8h4b/Booking-App?page-id=6332%3A16614&node-id=7112-19778&p=f&viewport=385%2C457%2C0.09&t=S0bQVVQMdWIHw9NU-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=7112%3A19778',
		thumb: breezbookBookingThumb
	},

	{
		name: 'ToJson.dev',
		desc: 'A developer utility for extracting structured JSON data from unstructured files (PDFs, Images). Designed to streamline automation workflows.',
		tools: [tools.ts, tools.daisyui, tools.tailwind],
		tags: ['Design', 'Frontend'],
		visitUrl: 'https://allset.chat',
		thumb: tojsonThumb
	}
	// {
	// 	name: 'Kurdancioglu Ltd.',
	// 	desc: 'Kurdancioglu Ltd. is a company I made up for fun and practicing. One of the earliest designs I made. ("Tree Flesh" wording is just for fun :D)',
	// 	tools: [tools.sass],
	// 	tags: ['Design', 'Frontend'],
	// 	visitUrl: 'https://metehan-altuntekin.github.io/Kurdancioglu-Ltd',
	// 	thumb: kurdanciogluThumb
	// }
];

export default projects;
