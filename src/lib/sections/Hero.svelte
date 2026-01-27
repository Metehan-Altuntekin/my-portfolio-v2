<script lang="ts">
	// Mobile versions (aspect ratio 1.175)
	import heroPicMobile400 from '$lib/assets/optimized/hero-pic-400px-mobile.avif';
	import heroPicMobile600 from '$lib/assets/optimized/hero-pic-600px-desktop.avif';
	import heroPicMobile800 from '$lib/assets/optimized/hero-pic-800px-mobile.avif';

	// Desktop versions (aspect ratio 3/4)
	import heroPicDesktop1400 from '$lib/assets/optimized/hero-pic-1400px-desktop.avif';
	import heroPicDesktop1000 from '$lib/assets/optimized/hero-pic-1000px-desktop.avif';
	import heroPicDesktop800 from '$lib/assets/optimized/hero-pic-800px-desktop.avif';
	import heroPicDesktop600 from '$lib/assets/optimized/hero-pic-600px-desktop.avif';

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

<svelte:head>
	<link
		rel="preload"
		as="image"
		media="(max-width: 639px)"
		imagesrcset="{heroPicMobile400} 400w, {heroPicMobile600} 600w, {heroPicMobile800} 800w"
		imagesizes="60vw"
		fetchpriority="high"
	/>

	<link
		rel="preload"
		as="image"
		media="(min-width: 640px)"
		imagesrcset="{heroPicDesktop600} 600w, {heroPicDesktop800} 800w, {heroPicDesktop1000} 1000w, {heroPicDesktop1400} 1400w"
		imagesizes="32vw"
		fetchpriority="high"
	/>
</svelte:head>

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
		<picture>
			<!-- Desktop versions (min-width: 640px) - aspect ratio 3/4 -->
			<source
				media="(min-width: 640px)"
				srcset={`${heroPicDesktop600} 600w, ${heroPicDesktop800} 800w, ${heroPicDesktop1000} 1000w, ${heroPicDesktop1400} 1400w`}
				sizes="32vw"
			/>
			<!-- Mobile versions (max-width: 639px) - aspect ratio 1.175 -->
			<source
				media="(max-width: 639px)"
				srcset={`${heroPicMobile400} 400w, ${heroPicMobile600} 600w, ${heroPicMobile800} 800w`}
				sizes="60vw"
			/>
			<!-- Fallback img -->
			<img
				class="h-full w-full object-center"
				src={heroPicDesktop1000}
				width="1000"
				height="1333"
				alt="Mete on a pedestrian bridge over a highway in a sunny day. Car traffic, green trees and mountains on the background."
				fetchpriority="high"
			/>
		</picture>
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
