import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

// Fallback GIF URLs in case Giphy API fails or no API key is provided
const FALLBACK_GIFS = [
	'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
	'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
	'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
	'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif',
	'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif'
];

/**
 * Fetch a truly random GIF from Giphy API
 */
async function fetchRandomGif(): Promise<string> {
	// If no API key, use fallback
	if (!env.GIPHY_API_KEY) {
		console.warn('No GIPHY_API_KEY found, using fallback GIFs');
		return FALLBACK_GIFS[Math.floor(Math.random() * FALLBACK_GIFS.length)];
	}

	try {
		// Giphy Random endpoint - truly random every time!
		const response = await fetch(
			`https://api.giphy.com/v1/gifs/random?api_key=${env.GIPHY_API_KEY}&rating=g`,
			{
				headers: {
					'Accept': 'application/json'
				}
			}
		);

		if (!response.ok) {
			throw new Error(`Giphy API error: ${response.status}`);
		}

		const data = await response.json();

		// Return the original GIF URL (best quality)
		return data.data.images.original.url;
	} catch (error) {
		console.error('Error fetching from Giphy:', error);
		// Fallback to local array if API fails
		return FALLBACK_GIFS[Math.floor(Math.random() * FALLBACK_GIFS.length)];
	}
}

export const load: PageServerLoad = async ({ request }) => {
	const userAgent = request.headers.get('user-agent') || '';

	// Detect if the request is from a social media bot/crawler
	const isSocialBot =
		userAgent.toLowerCase().includes('discordbot') ||
		userAgent.toLowerCase().includes('whatsapp') ||
		userAgent.toLowerCase().includes('facebookexternalhit') ||
		userAgent.toLowerCase().includes('twitterbot') ||
		userAgent.toLowerCase().includes('slackbot') ||
		userAgent.toLowerCase().includes('telegrambot');

	// Fetch a truly random GIF from Giphy
	const randomGif = await fetchRandomGif();

	return {
		randomGif,
		isSocialBot,
		userAgent
	};
};
