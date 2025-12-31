<script lang="ts">
	import { tools } from '$lib/content/projects';
	import Icon from '@iconify/svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<section id="toolbox" class="flex flex-col items-center">
	<!-- Heading -->
	<div class="w-full flex flex-col items-center mb-10 md:mb-12 lg:mb-16">
		<h1 class="text-3xl md:text-4xl lg:text-5xl text-center mb-[0.5em] font-bold">
			{m.toolbox_title()}
		</h1>
	</div>

	<!-- Tools -->
	<div class="flex gap-3 flex-wrap justify-center max-w-[1000px]">
		{#each Object.values(tools) as t}
			<!-- TODO name tooltip -->
			<div
				class="rounded-2xs bg-base-card-base backdrop-blur-2xl
							flex flex-col items-center justify-center gap-2 py-3 px-1
							lg:py-4 lg:px-2 lg:gap-3 lg:rounded-xs
							xl:py-5 xl:px-3 xl:gap-4"
			>
				<Icon icon={t.iconId} class="h-10 w-10 xl:h-12 xl:w-12" />
				<span class="text-sm font-medium w-24 text-center">
					{t.name}
				</span>
			</div>
		{/each}
	</div>
</section>
