import { tools } from './projects';

const skills: Skill[] = [
	{
		name: 'Product Design',
		areas: [
			'UI/UX Design',
			'Figma to Prototype',
			'Design Systems',
			'High-Fidelity UI',
			'Branding',
			'Mobile First Design'
		],
		tools: [tools.figma, tools.daisyui, tools.affinityDesigner]
	},
	{
		name: 'Development',
		areas: [
			'Svelte / NextJS ',
			'Responsive Websites',
			'SaaS Architecture',
			'Web Components',
			'System Architecture',
			'API Integration'
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

