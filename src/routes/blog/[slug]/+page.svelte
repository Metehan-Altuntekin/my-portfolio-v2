<script lang="ts">
	import { BASE_URL, SITE_NAME, TWITTER_HANDLE, AUTHOR_NAME } from '$lib/constants.js';
	import { languageTag } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages.js';

	const { data } = $props();

	type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

	function formatDate(date: string | Date, dateStyle: DateStyle = 'medium', locales?: string) {
		const dateToFormat = typeof date === 'string' ? new Date(date.replaceAll('-', '/')) : date;
		const currentLang = locales || languageTag();
		const dateFormatter = new Intl.DateTimeFormat(currentLang === 'tr' ? 'tr-TR' : 'en-US', {
			dateStyle
		});
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
	const createdAt = formatISODate(data.meta.createdAt);
	const updatedAt = data.meta.updatedAt ? formatISODate(data.meta.updatedAt) : createdAt;

	// JSON-LD structured data (simplified - removed deprecated keywords and duplicate publisher)
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.meta.title,
		description: data.meta.description,
		datePublished: createdAt,
		dateModified: updatedAt,
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
	<meta property="article:published_time" content={createdAt} />
	<meta property="article:modified_time" content={updatedAt} />
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
		<hgroup class="flex flex-col items-center sm:mb-10">
			<!-- Image -->
			{#if data.meta.image}
				<img
					src={data.meta.image}
					alt={data.meta.title}
					class="rounded-xs w-full aspect-5/2 sm:aspect-7/2"
				/>
			{/if}

			<!-- Title -->
			<h1 class="text-3xl sm:text-4xl lg:text-5xl self-start sm:mt-6">
				{data.meta.title}
			</h1>

			<!-- Date and Reading Time -->
			<div class="w-full flex items-center gap-x-3 gap-y-2 flex-wrap mb-6">
				<p class="text-sm text-blog-base-content-muted font-medium opacity-80 my-0!">
					{formatDate(data.meta.createdAt)}
					{#if data.meta.updatedAt}
						{@const created =
							typeof data.meta.createdAt === 'string'
								? new Date(data.meta.createdAt.replaceAll('-', '/'))
								: new Date(data.meta.createdAt)}
						{@const updated =
							typeof data.meta.updatedAt === 'string'
								? new Date(data.meta.updatedAt.replaceAll('-', '/'))
								: new Date(data.meta.updatedAt)}
						{#if updated.getTime() !== created.getTime()}
							<span class="opacity-60">
								({m.blog_updated()} {formatDate(data.meta.updatedAt)})</span
							>
						{/if}
					{/if}
				</p>

				{#if data.readingTime}
					<div class="flex items-center gap-1">
						<span class="text-blog-base-content-muted opacity-50 my-0!">·</span>
						<p class="text-sm text-blog-base-content-muted font-medium opacity-80 my-0!">
							{data.readingTime === 1
								? m.blog_min_read({ count: data.readingTime })
								: m.blog_mins_read({ count: data.readingTime })}
						</p>
					</div>
				{/if}

				{#if data.meta.joke}
					<div class="flex items-center gap-1">
						<span class="text-blog-base-content-muted opacity-50 my-0!">·</span>
						<p class="text-sm text-blog-base-content-muted opacity-50 font-medium my-0!">
							{data.meta.joke}
						</p>
					</div>
				{/if}
			</div>

			<!-- Tags -->
			<div class="flex flex-wrap self-start gap-4 mb-6">
				{#each data.meta.tags as category}
					<a
						href={`/blog?category=${category}`}
						class="chip variant-filled-secondary no-underline border border-blog-base-content-muted/20 px-4! py-2! text-blog-base-content-muted hover:underline backdrop-blur-sm"
						>{category}</a
					>
				{/each}
			</div>
		</hgroup>

		{@render data.content()}
	</article>
</section>

<section id="comments"></section>
