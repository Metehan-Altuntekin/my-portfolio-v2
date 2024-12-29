<script lang="ts">
	import heroPic from '$lib/assets/hero-pic.webp';

	import Icon from '@iconify/svelte';

	type Cta = {
		title: string;
		description: string;
		url: string;
	};

	const ctas: Cta[] = [
		{
			title: 'Projects',
			description: 'The websites and apps I designed and built.',
			url: '#projects'
		},
		{
			title: 'Skills',
			description: 'Details about my design and coding skills.',
			url: '#skills'
		}
	];
</script>

<section
	id="hero-section"
	class="z-10 h-screen pt-16 md:pt-[var(--page-padding)] sm:portrait:h-min
				grid grid-cols-12 grid-rows-12 gap-4 sm:gap-6 md:gap-x-10 lg:gap-10 xl:gap-x-20
				items-center justify-center
				"
>
	<!-- Image  -->
	<div
		class="image-card aspect-[1.175] max-h-full
					col-start-1 col-end-13 row-start-1 row-end-6 | place-self-start justify-self-end
					sm:col-start-8 sm:col-end-13 sm:row-end-10 | sm:aspect-[3/4] sm:object-center | sm:portrait:place-self-center sm:justify-self-end
 					lg:row-end-11 xl:row-end-10 |
					"
	>
		<img
			class="h-full w-full object-[0%_15%] lg:object-center"
			src={heroPic}
			alt="Mete on a pedestrian bridge over a highway in a sunny day. Car traffic, green trees and mountains on the background."
		/>
	</div>

	<!-- Heading, Paragraph -->
	<div
		class="col-start-1 col-end-12 row-start-6 row-end-10
					sm:col-end-8 sm:row-start-1 sm:row-end-10
					lg:row-end-12 lg:max-w-[40vw]"
	>
		<h1 class="mb-[0.725em] text-[clamp(40px,5vw,88px)] font-bold leading-[1.14em]">
			Think, research, design, build.
		</h1>

		<p class="text-base/5 font-normal sm:text-xl/6 lg:text-2xl/7">
			Crafting user interfaces blends technical discipline with art. As a
			<b> full-stack designer </b>, I build apps that are both intuitive and visually compelling.
		</p>
	</div>

	<!--  CTAs -->
	<div
		class="flex gap-5 | col-start-1 col-end-13 row-start-10 row-end-13
					"
	>
		{#each ctas as c (c.title)}
			<a class="card card-clickable w-64 gap-1 p-3 lg:gap-3 lg:p-6" href={c.url}>
				<h2 class="text-xl/7 lg:text-2xl font-bold">{c.title}</h2>
				<p class="text-subtitle">{c.description}</p>
			</a>
		{/each}
	</div>

	<!-- Email -->
	<div
		class="hidden flex-col items-center justify-center gap-2 lg:flex
		lg:col-start-8 lg:col-end-13 lg:row-start-10 lg:row-end-13 lg:justify-self-end lg:self-end
	"
	>
		<span class="chip">Interested in working with me?</span>

		<div
			class="card card-clickable flex-row items-center justify-center gap-3 px-5 py-3 xl:gap-6 xl:px-9 xl:py-5"
		>
			<Icon icon="foundation:mail" class="text-2xl lg:text-3xl xl:text-5xl" />
			<span class="text-xl/7 lg:text-2xl xl:text-3xl font-bold">dev@metehan.design</span>
		</div>
	</div>
</section>
