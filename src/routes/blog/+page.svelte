<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	onMount(() => {
		console.log(data);
	});
</script>

<section id="posts">
	<h1 class="text-4xl font-bold mx-auto text-center mb-[2em]">Blog Posts</h1>
	<article class="flex flex-wrap gap-5 justify-center">
		{#each data.posts as post (post.slug)}
			<a
				class="card card-clickable overflow-hidden flex-1 min-w-xs max-w-sm p-0"
				href="/blog/{post.slug}"
			>
				<figure>
					<img
						class="card-content w-full aspect-video object-cover rounded-b-none"
						src={post.image}
						alt={post.title}
					/>
				</figure>

				<div class="card-body p-5">
					<time
						datetime={post.pubDate}
						class="text-blog-base-content-muted font-medium text-xs block mb-1"
					>
						{post.pubDate}
					</time>
					<h2 class="card-title text-lg font-semibold text-ellipsis overflow-hidden line-clamp-2">
						{post.title}
					</h2>
				</div>
			</a>
		{/each}
	</article>
</section>
