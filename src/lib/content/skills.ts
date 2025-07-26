import { tools } from './projects';

const skills: Skill[] = [
	{
		name: 'UI/UX Design',
		areas: [
			'User Journey',
			'UX Map',
			'Branding and style',
			'Prototyping',
			'Design Reviews',
			'Redesigns',
			'Concept exploration'
		],
		tools: [tools.figma, tools.daisyui, tools.affinityDesigner]
	},
	{
		name: 'Development',
		areas: [
			'Design implementation ',
			'Responsive & Mobile Compatible Websites',
			'SaaS applications',
			'Web Components',
			'Libraries, Solutions',
			'Design during coding'
		],
		tools: [
			tools.ts,
			tools.svelte,
			tools.tailwind,
			tools.daisyui,
			tools.react,
			tools.sass,
			tools.mui,
			// tools.shadcn,
			tools.nodejs
		]
	}
];

export default skills;
