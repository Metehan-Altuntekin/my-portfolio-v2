<script lang="ts">
	import { BASE_URL, SITE_NAME, TWITTER_HANDLE, AUTHOR_NAME } from '$lib/constants';

	const { data } = $props();

	type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

	function formatDate(date: string | Date, dateStyle: DateStyle = 'medium', locales = 'en') {
		const dateToFormat = typeof date === 'string' ? new Date(date.replaceAll('-', '/')) : date;
		const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
		return dateFormatter.format(dateToFormat);
	}

	// Convert relative image URL to absolute URL
	function getAbsoluteImageUrl(image: string | undefined): string | undefined {
		if (!image) return undefined;
		if (image.startsWith('http://') || image.startsWith('https://')) {
			return image;
		}
		const cleanPath = image.startsWith('/') ? image.slice(1) : image;
		return `${BASE_URL}/${cleanPath}`;
	}

	// Format date for ISO 8601
	function formatISODate(date: string | Date): string {
		const dateObj = typeof date === 'string' ? new Date(date.replaceAll('-', '/')) : date;
		return dateObj.toISOString();
	}

	// Generate URLs and dates
	const pageUrl = `${BASE_URL}/blog/${data.slug}`;
	const ogImage = getAbsoluteImageUrl(data.meta.image);
	const publishedTime = formatISODate(data.meta.pubDate);
	const modifiedTime = data.meta.lastMod ? formatISODate(data.meta.lastMod) : publishedTime;

	// JSON-LD structured data (simplified - removed deprecated keywords and duplicate publisher)
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.meta.title,
		description: data.meta.description,
		datePublished: publishedTime,
		dateModified: modifiedTime,
		author: {
			'@type': 'Person',
			name: AUTHOR_NAME
		},
		...(ogImage && { image: ogImage }),
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': pageUrl
		}
	};
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title} | {SITE_NAME}</title>

	<!-- Essential SEO -->
	<meta name="description" content={data.meta.description} />
	<link rel="canonical" href={pageUrl} />

	<!-- Open Graph (Facebook, LinkedIn, etc.) -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:site_name" content={SITE_NAME} />
	{#if ogImage}
		<meta property="og:image" content={ogImage} />
		<meta property="og:image:alt" content={data.meta.title} />
	{/if}

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={TWITTER_HANDLE} />
	<meta name="twitter:creator" content={TWITTER_HANDLE} />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	{#if ogImage}
		<meta name="twitter:image" content={ogImage} />
	{/if}

	<!-- Article meta tags (for better SEO) -->
	<meta property="article:published_time" content={publishedTime} />
	<meta property="article:modified_time" content={modifiedTime} />
	{#if data.meta.tags && data.meta.tags.length > 0}
		{#each data.meta.tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<section class="pt-0">
	<article id="post" class="prose prose-custom prose-invert prose-lg max-w-4xl mb-16 mx-auto">
		<hgroup class="flex flex-col items-center">
			<!-- Image -->
			{#if data.meta.image}
				<img
					src={data.meta.image}
					alt={data.meta.title}
					class="rounded-md w-full aspect-5/2 sm:aspect-7/2"
				/>
			{/if}

			<!-- Title -->
			<h1 class="text-5xl self-start">{data.meta.title}</h1>

			<!-- Date -->
			<div class="list-none w-full flex">
				<p class="text-sm">
					{formatDate(data.meta.pubDate)}
				</p>
			</div>

			<!-- Tags -->
			<div class="flex flex-wrap self-start gap-4 mb-6">
				{#each data.meta.tags as category}
					<a
						href={`/blog?category=${category}`}
						class="chip variant-filled-secondary no-underline text-blog-base-content-muted hover:underline"
						>{category}</a
					>
				{/each}
			</div>
		</hgroup>

		{@render data.content()}
	</article>
</section>

<section id="comments"></section>
