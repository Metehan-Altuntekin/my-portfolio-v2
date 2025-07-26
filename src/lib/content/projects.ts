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
		name: 'AllSet',
		desc: 'allset.chat is a an AI receptionist that works through WhatsApp. I have designed the brand identity and the landing site.',
		tools: [tools.ts, tools.figma, tools.svelte, tools.tailwind, tools.daisyui],
		tags: ['Design', 'Frontend'],
		visitUrl: 'https://allset.chat',
		thumb: allsetThumb
	},
	{
		name: 'BreezBook',
		desc: 'BreezBook is the early version of AllSet that focused on being a website solution.',
		tools: [tools.ts, tools.svelte, tools.daisyui, tools.tailwind],
		tags: ['Design', 'Frontend'],
		visitUrl: 'https://breezbook.com',
		thumb: breezbookThumb
	},
	{
		name: 'BreezBook Booking App',
		desc: "BreezBook mobile booking app design prototype made in Figma. Hasn't been coded but we are proud of it.",
		tools: [tools.figma],
		tags: ['Design'],
		visitUrl:
			'https://www.figma.com/proto/Y3429sNI1L6LkuI8Jy8h4b/Booking-App?page-id=6332%3A16614&node-id=7112-19778&p=f&viewport=385%2C457%2C0.09&t=S0bQVVQMdWIHw9NU-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=7112%3A19778',
		thumb: breezbookBookingThumb
	},
	{
		name: 'Ozkan Musavirlik',
		desc: 'Ozkan Mali Musavirlik is a landing and blog site I designed and coded for my accountant. ',
		tools: [tools.ts, tools.svelte, tools.sass, tools.figma],
		tags: ['Design', 'Frontend'],
		visitUrl: 'https://www.ozkanmusavirlik.com.tr',
		thumb: ozkanMusavirlikThumb
	},
	{
		name: 'ToJson.dev',
		desc: 'ToJson is a tool you can extract data from any kind of files like a PDF, image files etc. and integrate them with your other tools.',
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
