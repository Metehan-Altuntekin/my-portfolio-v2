import posthog from 'posthog-js';
import { browser } from '$app/environment';

export const prerender = true;

export const load = async () => {
	if (browser) {
		posthog.init('phc_1NmSk28YUeBJb4LI88avENb41KYFlAZM48bSR30kPsp', {
			api_host: 'https://us.i.posthog.com',
			defaults: '2025-11-30',
			person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
		});
	}

	return;
};
