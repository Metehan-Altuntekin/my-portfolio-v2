import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
import { dev } from '$app/environment';

const handleParaglide: Handle = i18n.handle();

const handlePostHog: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	if (pathname.startsWith('/ph')) {
		const hostname = pathname.startsWith('/ph/static/')
			? 'us-assets.i.posthog.com'
			: 'us.i.posthog.com';

		const url = new URL(event.request.url);
		url.protocol = 'https:';
		url.hostname = hostname;
		url.port = '443';
		url.pathname = pathname.replace(/^\/ph/, '');

		// Log proxy requests in dev mode
		if (dev)
			console.log(`[PostHog Proxy] ${event.request.method} ${pathname} -> ${url.toString()}`);

		const headers = new Headers(event.request.headers);
		headers.set('host', hostname);
		headers.set('accept-encoding', '');

		// Forward client IP for geolocation
		const clientIp = event.request.headers.get('x-forwarded-for') || event.getClientAddress();
		if (clientIp) {
			headers.set('x-forwarded-for', clientIp);
		}

		// Handle OPTIONS preflight requests
		if (event.request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': '*',
					'Access-Control-Max-Age': '86400'
				}
			});
		}

		// Prepare fetch options
		const fetchOptions: RequestInit = {
			method: event.request.method,
			headers,
			body: event.request.body
		};

		// Add duplex option for streaming request bodies (Node.js fetch API requirement)
		if (event.request.body) {
			(fetchOptions as { duplex?: string }).duplex = 'half';
		}

		const response = await fetch(url.toString(), fetchOptions);

		// Log response in dev mode
		if (dev)
			console.log(
				`[PostHog Proxy] Response: ${response.status} ${response.statusText} for ${pathname}`
			);

		// Clone response to add CORS headers if needed
		const responseHeaders = new Headers(response.headers);

		// Add CORS headers for browser requests
		responseHeaders.set('Access-Control-Allow-Origin', '*');
		responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		responseHeaders.set('Access-Control-Allow-Headers', '*');

		// Handle responses that shouldn't have a body (204 No Content, 304 Not Modified)
		if (response.status === 204 || response.status === 304) {
			return new Response(null, {
				status: response.status,
				statusText: response.statusText,
				headers: responseHeaders
			});
		}

		// Get response body for other status codes
		const responseBody = await response.arrayBuffer();

		return new Response(responseBody, {
			status: response.status,
			statusText: response.statusText,
			headers: responseHeaders
		});
	}

	return resolve(event);
};

export const handle: Handle = async (input) => {
	// First apply PostHog proxy, then i18n
	return handlePostHog({
		event: input.event,
		resolve: async (event) => {
			return handleParaglide({ event, resolve: input.resolve });
		}
	});
};
