import allsetThumb from '$lib/content/thumbs/allset.webp';
import allsetThumb400 from '$lib/content/thumbs/allset-400px.webp';
import allsetThumb800 from '$lib/content/thumbs/allset-800px.webp';
import breezbookThumb from '$lib/content/thumbs/breezbook.webp';
import breezbookThumb400 from '$lib/content/thumbs/breezbook-400px.webp';
import breezbookThumb800 from '$lib/content/thumbs/breezbook-800px.webp';
import kurdanciogluThumb from '$lib/content/thumbs/kurdancioglu.webp';
import kurdanciogluThumb400 from '$lib/content/thumbs/kurdancioglu-400px.webp';
import kurdanciogluThumb800 from '$lib/content/thumbs/kurdancioglu-800px.webp';
import ozkanMusavirlikThumb from '$lib/content/thumbs/ozkan-musavirlik.webp';
import ozkanMusavirlikThumb400 from '$lib/content/thumbs/ozkan-musavirlik-400px.webp';
import ozkanMusavirlikThumb800 from '$lib/content/thumbs/ozkan-musavirlik-800px.webp';
import tojsonThumb from '$lib/content/thumbs/tojson.webp';
import tojsonThumb400 from '$lib/content/thumbs/tojson-400px.webp';
import tojsonThumb800 from '$lib/content/thumbs/tojson-800px.webp';
import breezbookBookingThumb from '$lib/content/thumbs/breezbook-booking.webp';
import breezbookBookingThumb400 from '$lib/content/thumbs/breezbook-booking-400px.webp';
import breezbookBookingThumb800 from '$lib/content/thumbs/breezbook-booking-800px.webp';
import { tools } from './projects';

const projects: Project[] = [
	{
		name: 'Ozkan Musavirlik',
		desc: 'Mali müşavirlik firması için headless CMS ve yüksek performanslı pazarlama platformu. 100/100 SEO skorları ve 0 hosting maliyeti için SvelteKit & Sanity ile geliştirildi.',
		tools: [tools.ts, tools.svelte, tools.sass, tools.figma],
		tags: ['Tasarım', 'Frontend'],
		visitUrl: 'https://www.ozkanmusavirlik.com.tr',
		thumb: ozkanMusavirlikThumb,
		thumbSrcset: `${ozkanMusavirlikThumb400} 400w, ${ozkanMusavirlikThumb800} 800w, ${ozkanMusavirlikThumb} 1200w`,
		thumbWidth: 1200,
		thumbHeight: 683
	},
	{
		name: 'AllSet',
		desc: 'WhatsApp ile entegre edilmiş AI destekli resepsiyonist. Marka kimliğini tasarladım ve landing sayfasını geliştirdim.',
		tools: [tools.ts, tools.figma, tools.svelte, tools.tailwind, tools.daisyui],
		tags: ['Tasarım', 'Frontend'],
		thumb: allsetThumb,
		thumbSrcset: `${allsetThumb400} 400w, ${allsetThumb800} 800w, ${allsetThumb} 1200w`,
		thumbWidth: 1200,
		thumbHeight: 683
	},
	{
		name: 'BreezBook',
		desc: "AllSet'e evrilen orijinal rezervasyon uygulaması. Yüksek hacimli hizmet planlaması için kullanıcı sürtünmesini azaltmaya odaklandı.",
		tools: [tools.ts, tools.svelte, tools.daisyui, tools.tailwind],
		tags: ['Tasarım', 'Frontend'],
		visitUrl: 'https://breezbook.com',
		thumb: breezbookThumb,
		thumbSrcset: `${breezbookThumb400} 400w, ${breezbookThumb800} 800w, ${breezbookThumb} 1200w`,
		thumbWidth: 1200,
		thumbHeight: 683
	},
	{
		name: 'BreezBook Booking App',
		desc: "Figma'da tasarlanmış mobil-öncelikli rezervasyon uygulaması. Hizmet işletmeleri için kullanıcı sürtünmesini azaltmaya ve dönüşüm oranlarını artırmaya odaklandı.",
		tools: [tools.figma],
		tags: ['Tasarım'],
		visitUrl:
			'https://www.figma.com/proto/Y3429sNI1L6LkuI8Jy8h4b/Booking-App?page-id=6332%3A16614&node-id=7112-19778&p=f&viewport=385%2C457%2C0.09&t=S0bQVVQMdWIHw9NU-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=7112%3A19778',
		thumb: breezbookBookingThumb,
		thumbSrcset: `${breezbookBookingThumb400} 400w, ${breezbookBookingThumb800} 800w, ${breezbookBookingThumb} 700w`,
		thumbWidth: 700,
		thumbHeight: 456
	},
	{
		name: 'ToJson.dev',
		desc: "Yapılandırılmamış dosyalardan (PDF'ler, Görüntüler) yapılandırılmış JSON verisi çıkarmak için bir geliştirici yardımcı programı. Otomasyon iş akışlarını kolaylaştırmak için tasarlandı.",
		tools: [tools.ts, tools.daisyui, tools.tailwind],
		tags: ['Tasarım', 'Frontend'],
		visitUrl: 'https://allset.chat',
		thumb: tojsonThumb,
		thumbSrcset: `${tojsonThumb400} 400w, ${tojsonThumb800} 800w, ${tojsonThumb} 1200w`,
		thumbWidth: 1200,
		thumbHeight: 686
	}
];

export default projects;
