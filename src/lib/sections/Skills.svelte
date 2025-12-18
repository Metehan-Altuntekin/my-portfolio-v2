<script lang="ts">
	import skills from '$lib/content/skills';
	import Icon from '@iconify/svelte';
</script>

<section id="skills" class="flex flex-col items-center">
	<!-- Heading -->
	<div class="w-full flex flex-col items-center mb-10 md:mb-12 lg:mb-16">
		<h1 class="text-3xl md:text-4xl lg:text-5xl text-center mb-[0.5em] font-bold">
			Services & Expertise
		</h1>
		<p class="text-center">
			Here’s how I bring design and development together for seamless project execution
		</p>
	</div>

	<!-- Skills -->
	<div class="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-6">
		{#each skills as s, i (i)}
			<div
				class="card gap-5 lg:gap-8 w-full max-w-[400px] xl:max-w-[500px] justify-between md:p-7 xl:p-9"
			>
				<div class="">
					<h2 class="font-bold text-2xl lg:text-3xl mb-2 lg:mb-5">{s.name}</h2>
					<ul>
						{#each s.areas as a}
							<li class="text-base-content-muted">&bull; {a}</li>
						{/each}
					</ul>
				</div>

				<div class="flex gap-2 flex-wrap">
					{#each s.tools as t}
						<!-- TODO name tooltip -->
						<!-- <div class="rounded-2xs p-2 lg:p-3 lg:rounded-xs bg-base-card-base">
								<Icon icon={t.iconId} class="h-6 w-6 | md:h-7 md:w-7 | xl:h-9 xl:w-9" />
							</div> -->
					{/each}
				</div>
			</div>

			{#if i !== skills.length - 1}
				<!-- <span class="text-5xl self-center">&#8674;</span> -->
				<Icon
					icon="material-symbols:arrow-cool-down"
					class="text-3xl lg:text-8xl self-center lg:-rotate-90 opacity-70"
				/>
			{/if}
		{/each}
	</div>
</section>
