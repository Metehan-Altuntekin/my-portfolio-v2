<script lang="ts">
	import heroPic from '$lib/assets/hero-pic.webp';
	import heroPic1200 from '$lib/assets/hero-pic-1200px.webp';
	import heroPic800 from '$lib/assets/hero-pic-800px.webp';
	import heroPic400 from '$lib/assets/hero-pic-400px.webp';

	import Icon from '@iconify/svelte';
	import * as m from '$lib/paraglide/messages.js';

	type Cta = {
		title: string;
		description: string;
		url: string;
	};

	const ctas: Cta[] = [
		{
			title: m.hero_cta_projects_title(),
			description: m.hero_cta_projects_desc(),
			url: '#projects'
		},
		{
			title: m.hero_cta_about_title(),
			description: m.hero_cta_about_desc(),
			url: '#skills'
		}
	];
</script>

<section
	id="hero-section"
	class="z-10 h-screen pt-16 sm:portrait:h-min
				grid grid-cols-12 grid-rows-12 gap-4 sm:gap-6 md:gap-x-10 lg:gap-10 xl:gap-x-20
				items-center justify-center
				"
>
	<!-- Image  -->
	<div
		class="image-card aspect-[1.175] max-h-full
					col-start-1 col-end-13 row-start-1 row-end-6 | place-self-start justify-self-end
					sm:col-start-8 sm:col-end-13 sm:row-end-10 | sm:aspect-3/4 sm:object-center | sm:portrait:place-self-center sm:justify-self-end
 					lg:row-end-11 xl:row-end-10 |
					"
	>
		<img
			class="h-full w-full object-[0%_15%] lg:object-center"
			src={heroPic}
			srcset={`${heroPic400} 289w, ${heroPic800} 740w, ${heroPic1200} 1080w, ${heroPic} 1699w`}
			sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 35vw"
			width="1699"
			height="2357"
			alt="Mete on a pedestrian bridge over a highway in a sunny day. Car traffic, green trees and mountains on the background."
			fetchpriority="high"
		/>
	</div>

	<!-- Heading, Paragraph -->
	<div
		class="col-start-1 col-end-12 row-start-6 row-end-10
					sm:col-end-8 sm:row-start-1 sm:row-end-10
					lg:row-end-10 lg:max-w-[40vw]"
	>
		<h1 class="mb-[0.725em] text-[clamp(40px,5vw,88px)] font-bold leading-[1.14em]">
			{m.hero_title()}
		</h1>

		<p class="text-base/5 font-normal sm:text-xl/6 lg:text-2xl/7">
			{@html m.hero_description()}
		</p>
	</div>

	<!--  CTAs -->
	<div
		class="flex gap-5 | col-start-1 col-end-13 row-start-10 row-end-13
					sm:self-end"
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
		<a href="#contact" class="chip backdrop-blur-xl">{m.hero_reach_out()}</a>

		<a
			href="mailto:dev@metehan.design"
			class="card card-clickable flex-row items-center justify-center gap-3 px-5 py-3 xl:gap-6 xl:px-9 xl:py-5"
		>
			<Icon icon="foundation:mail" class="text-2xl lg:text-3xl xl:text-4xl" />
			<span class="text-xl/7 lg:text-xl xl:text-2xl font-bold">dev@metehan.design</span>
		</a>
	</div>
</section>
