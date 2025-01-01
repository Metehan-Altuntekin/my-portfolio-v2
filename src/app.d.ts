// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type Tool = {
		name: string;
		iconId: string;
	};

	type Project = {
		name: string;
		desc: string;
		tags: string[];
		tools: Tool[];

		thumb: string;
		visitUrl: string;
	};
}

export {};
