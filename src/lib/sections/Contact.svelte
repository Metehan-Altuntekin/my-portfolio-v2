<script lang="ts">
	import { socials } from '$lib/content/contact';
	import Icon from '@iconify/svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<section id="contact" class="flex flex-col items-center justify-center my-16 md:my-8">
	<!-- Heading -->
	<div class="w-full flex flex-col items-center mb-10 md:mb-16">
		<h1 class="text-3xl md:text-4xl lg:text-5xl text-center mb-[0.5em] font-bold">
			{m.contact_title()}
		</h1>
		<p class="text-center">{m.contact_subtitle()}</p>
	</div>

	<!-- Email -->
	<div class="flex flex-col items-center justify-center gap-2">
		<a
			href="mailto:dev@metehan.design"
			class="card card-clickable flex-row items-center justify-center
            gap-3 px-8 py-5 rounded-sm"
		>
			<Icon icon="foundation:mail" class="text-2xl md:text-3xl " />
			<span class="text-2xl font-bold">dev@metehan.design</span>
		</a>

		<span class="chip backdrop-blur-xl text-xs">{m.contact_send_email()}</span>
	</div>

	<!-- Social -->
	<div class="flex gap-5 md:gap-7 mt-12 md:mt-16">
		{#each socials as s}
			<a href={s.url} target="_blank" class="cursor-pointer" title={s.name} aria-label={s.name}>
				<Icon icon={s.iconId} class="text-base-content-muted h-10 w-10 md:h-12 md:w-12" />
			</a>
		{/each}
	</div>
</section>
