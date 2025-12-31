import { tools } from './projects';

const skills: Skill[] = [
	{
		name: 'Ürün Tasarımı',
		areas: [
			'UI/UX Tasarımı',
			"Figma'dan Prototipe",
			'Tasarım Sistemleri',
			'Yüksek Doğrulukta UI',
			'Marka Kimliği',
			'Mobil Öncelikli Tasarım'
		],
		tools: [tools.figma, tools.daisyui, tools.affinityDesigner]
	},
	{
		name: 'Geliştirme',
		areas: [
			'Svelte / NextJS',
			'Duyarlı Web Siteleri',
			'SaaS Mimarisi',
			'Web Bileşenleri',
			'Sistem Mimarisi',
			'API Entegrasyonu'
		],
		tools: [
			tools.ts,
			tools.svelte,
			tools.tailwind,
			tools.daisyui,
			tools.react,
			tools.sass,
			tools.mui,
			tools.nodejs
		]
	}
];

export default skills;

