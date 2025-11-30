<script lang="ts">
	import { BASE_URL } from '$lib/constants.js';
	import { onMount } from 'svelte';

	const { data } = $props();

	onMount(() => {
		console.log(data);
	});

	type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

	function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
		// Safari is mad about dashes in the date
		const dateToFormat = new Date(date.replaceAll('-', '/'));
		const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
		return dateFormatter.format(dateToFormat);
	}
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>

	<link rel="canonical" href={`${BASE_URL}/${data.meta.slug}`} />
	<meta name="description" content={data.meta.description} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${BASE_URL}/${data.meta.slug}`} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:site_name" content={data.meta.title} />
	<meta property="og:image" content={data.meta.image} />

	<meta name="twitter:site" content="@YouTwitterHandle" />
	<meta name="twitter:creator" content="@YouTwitterHandle" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content={data.meta.image} />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#121211" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#121211" media="(prefers-color-scheme: dark)" />
</svelte:head>

<section class="pt-0">
	<article id="post" class="prose prose-custom prose-invert prose-lg max-w-4xl mb-16 mx-auto">
		<!-- Title -->
		<hgroup class="flex flex-col items-center">
			{#if data.meta.image}
				<img
					src={data.meta.image}
					alt="blog banner"
					class="rounded-md w-full aspect-5/2 sm:aspect-7/2"
				/>
			{/if}

			<h1 class="text-5xl">{data.meta.title}</h1>

			<div class="list-none w-full flex">
				<p class="text-sm">
					{formatDate(data.meta.pubDate)}
				</p>
			</div>
		</hgroup>

		<!-- Tags -->
		<div class="flex flex-wrap gap-4 mb-6">
			{#each data.meta.tags as category}
				<a href={`/blog?category=${category}`} class="chip variant-filled-secondary no-underline"
					>&num;{category}</a
				>
			{/each}
		</div>

		{@render data.content()}
	</article>
</section>

<section id="comments"></section>
