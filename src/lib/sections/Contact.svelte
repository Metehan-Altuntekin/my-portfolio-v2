<script lang="ts">
	import { socials } from '$lib/content/contact';
	import Icon from '@iconify/svelte';
</script>

<section id="contact" class="flex flex-col items-center justify-center">
	<!-- Heading -->
	<div class="w-full flex flex-col items-center mb-10 md:mb-16">
		<h1 class="text-3xl md:text-4xl lg:text-5xl text-center mb-[0.5em] font-bold">
			Let's Work Together
		</h1>
		<p class="text-center">
			Have an exciting project or need help? Send me an email and we can arrange a meeting.
		</p>
	</div>

	<!-- Email -->
	<div class="flex flex-col items-center justify-center gap-2">
		<a
			href="mailto:dev@metehan.design"
			class="card card-clickable flex-row items-center justify-center
            gap-3 px-8 py-5 rounded-sm"
		>
			<Icon icon="foundation:mail" class="text-3xl " />
			<span class="text-2xl font-bold">dev@metehan.design</span>
		</a>

		<span class="chip backdrop-blur-xl text-xs">Call me Mete</span>
	</div>

	<!-- Social -->
	<div class="flex gap-5 md:gap-7 mt-12 md:mt-16">
		{#each socials as s}
			<a href={s.url} target="_blank" class="cursor-pointer">
				<Icon icon={s.iconId} class="text-base-content-muted h-10 w-10 md:h-12 md:w-12" />
			</a>
		{/each}
	</div>
</section>
