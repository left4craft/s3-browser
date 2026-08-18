import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname !== '/') {
		return new Response(`Not Found`, { status: 404 });
	}

	const response = await resolve(event);
	return response;
};