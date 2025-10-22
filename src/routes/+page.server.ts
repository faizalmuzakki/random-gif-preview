import type { PageServerLoad } from './$types';

// Add your GIF URLs here - these can be from Giphy, Tenor, or your own hosted GIFs
const GIF_URLS = [
	'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif', // dancing cat
	'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif', // typing cat
	'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif', // excited minion
	'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif', // mind blown
	'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif', // surprised pikachu
	'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif', // dancing penguin
	'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif', // party parrot
	'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif', // wave
];

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

	// Select a random GIF
	const randomGif = GIF_URLS[Math.floor(Math.random() * GIF_URLS.length)];

	return {
		randomGif,
		isSocialBot,
		userAgent
	};
};
