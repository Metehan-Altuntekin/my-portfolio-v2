import allsetThumb from '$lib/content/thumbs/allset-thumb.webp';

const skills = {
	ts: {
		name: 'TypeScript',
		iconId: 'skill-icons:typescript'
	},
	figma: {
		name: 'Figma',
		iconId: 'logos:figma'
	},
	svelte: {
		name: 'Svelte',
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
	shadcn: {
		name: 'ShadCN',
		iconId: 'simple-icons:shadcnui'
	},
	mui: {
		name: 'Material UI',
		iconId: 'simple-icons:mui'
	},
	nodejs: {
		name: 'Node JS',
		iconId: 'logos:nodejs-icon'
	}
} as const;

const projects: Project[] = [
	{
		name: 'Allset.chat',
		desc: 'Allset.chat is a project I made the design and the frontend development of the landing site of.',
		skills: [skills.ts, skills.figma, skills.svelte, skills.tailwind, skills.daisyui],
		tags: ['Design', 'Frontend'],
		visitUrl: 'https://allset.chat',
		thumb: allsetThumb
	},
	{
		name: 'Allset.chat',
		desc: 'Allset.chat is a project I made the design and the frontend development of the landing site of.',
		skills: [skills.ts],
		tags: ['Design', 'Frontend'],
		visitUrl: 'https://allset.chat',
		thumb: allsetThumb
	},
	{
		name: 'Allset.chat',
		desc: 'Allset.chat is a project I made the design and the frontend development of the landing site of.',
		skills: [skills.ts],
		tags: ['Design', 'Frontend'],
		visitUrl: 'https://allset.chat',
		thumb: allsetThumb
	},
	{
		name: 'Allset.chat',
		desc: 'Allset.chat is a project I made the design and the frontend development of the landing site of.',
		skills: [skills.ts],
		tags: ['Design', 'Frontend'],
		visitUrl: 'https://allset.chat',
		thumb: allsetThumb
	},
	{
		name: 'Allset.chat',
		desc: 'Allset.chat is a project I made the design and the frontend development of the landing site of.',
		skills: [skills.ts],
		tags: ['Design', 'Frontend'],
		visitUrl: 'https://allset.chat',
		thumb: allsetThumb
	},
	{
		name: 'Allset.chat',
		desc: 'Allset.chat is a project I made the design and the frontend development of the landing site of.',
		skills: [skills.ts],
		tags: ['Design', 'Frontend'],
		visitUrl: 'https://allset.chat',
		thumb: allsetThumb
	}
];

export default projects;
