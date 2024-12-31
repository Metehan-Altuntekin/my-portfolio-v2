<script lang="ts">
	import projects from '$lib/content/projects';
	import Icon from '@iconify/svelte';
</script>

<!-- @component Section for projects of the developer. -->

<section id="projects">
	<!-- Heading -->
	<div class="w-full flex flex-col items-center mb-10 md:mb-12 lg:mb-16">
		<h1 class="text-3xl md:text-4xl lg:text-5xl text-center mb-[0.5em] font-bold">My Projects</h1>
		<p>Projects I have worked on with clients or on my own</p>
	</div>

	<!-- Projects Container -->
	<flex
		class="grid auto-rows-fr items-center justify-center content-center w-full
					grid-cols-[repeat(auto-fill,minmax(320px,1fr))]
					md:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]
					xl:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]
					gap-4 md:gap-6 xl:gap-8"
	>
		<!-- Projects -->
		{#each projects as p, i (i)}
			<div class="card gap-1 md:gap-3">
				<h2 class="text-2xl xl:text-3xl font-bold">{p.name}</h2>
				<p class="text-subtitle">{p.desc}</p>

				<div class="flex justify-between">
					<div class="flex gap-1">
						{#each p.tags as tag}
							<span class="chip bg-opacity-0">{tag}</span>
						{/each}
					</div>

					<div class="chip rounded-3xs flex gap-2">
						{#each p.skills as s}
							<Icon icon="" class="h-5 w-5 text-trans" />

							<!-- TODO name tooltip -->
							<Icon icon={s.iconId} class="h-5 w-5 text-trans" />
						{/each}
					</div>
				</div>

				<a
					href={p.visitUrl}
					class="mt-2 relative
					after:flex after:opacity-0 hover:after:opacity-100 after:transition-all
					after:inset-0 after:bg-black/50 after:z-10 after:absolute after:rounded-2xs after:content-['Visit']
					after:items-center after:justify-center after:text-2xl after:font-semibold"
					title="Visit {p.name}"
				>
					<img src={p.thumb} class="aspect-video rounded-2xs" alt="Preview of {p.name} project" />
				</a>
			</div>
		{/each}
	</flex>
</section>
