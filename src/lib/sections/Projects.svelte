<script lang="ts">
	import projects from '$lib/content/projects';
	import Icon from '@iconify/svelte';
</script>

<!-- @component Section for projects of the developer. -->

<section id="projects">
	<!-- Heading -->
	<div class="w-full flex flex-col items-center mb-10 md:mb-12 lg:mb-16">
		<h1 class="text-3xl md:text-4xl lg:text-5xl text-center mb-[0.5em] font-bold">My Projects</h1>
		<p class="text-center">Projects I have worked on with clients or on my own</p>
	</div>

	<!-- TODO probably sliding container for mobile -->
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
						{#each p.tools as t}
							<!-- TODO name tooltip -->
							<Icon icon={t.iconId} class="h-5 w-5 text-trans" />
						{/each}
					</div>
				</div>

				<!-- TODO revise the hover cover -->
				<a
					href={p.visitUrl}
					class="mt-2 relative
					"
					title="Visit {p.name}"
				>
					<img src={p.thumb} class="aspect-video rounded-2xs" alt="Preview of {p.name} project" />
					<div
						class="flex opacity-0 hover:opacity-100 transition-all
									inset-0 bg-white/10 z-10 absolute rounded-2xs content-['']
									items-center justify-center text-2xl font-semibold backdrop-blur-sm"
					>
						<span class="chip bg-black/50 text-xl text-base-content">
							Visit Site
							<Icon icon="material-symbols:arrow-outward-rounded" class="text-3xl ml-2 inline" />
						</span>
					</div>
				</a>
			</div>
		{/each}
	</flex>
</section>
