/**
 * Cloudflare Function for PostHog proxy
 * This handles proxying PostHog requests for static sites on Cloudflare Pages
 * Based on: https://posthog.com/docs/advanced/proxy/sveltekit
 */

export async function onRequest(context: {
	request: Request;
	params: { path?: string[] };
	env: any;
}): Promise<Response> {
	const { request, params } = context;
	// Join path segments if they exist, otherwise use empty string
	const path = params.path ? params.path.join('/') : '';

	// Determine the correct PostHog hostname
	const hostname = path.startsWith('static/') ? 'us-assets.i.posthog.com' : 'us.i.posthog.com';

	// Build the target URL
	const url = new URL(request.url);
	url.protocol = 'https:';
	url.hostname = hostname;
	url.port = '443';
	url.pathname = path ? `/${path}` : '/';

	// Prepare headers
	const headers = new Headers(request.headers);
	headers.set('host', hostname);
	headers.set('accept-encoding', '');

	// Forward client IP for geolocation
	const clientIp =
		request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || '';
	if (clientIp) {
		headers.set('x-forwarded-for', clientIp);
	}

	// Get request body if it exists
	let body: BodyInit | undefined;
	if (request.method !== 'GET' && request.method !== 'HEAD') {
		const bodyBuffer = await request.arrayBuffer();
		if (bodyBuffer.byteLength > 0) {
			body = bodyBuffer;
		}
	}

	// Handle OPTIONS preflight requests
	if (request.method === 'OPTIONS') {
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

	// Fetch from PostHog
	const response = await fetch(url.toString(), {
		method: request.method,
		headers,
		body
	});

	// Clone response to add CORS headers
	const responseHeaders = new Headers(response.headers);
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
