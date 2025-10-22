# Random GIF Preview

A SvelteKit project that shows a **random GIF** every time you share the link on social media platforms like Discord, WhatsApp, Twitter, etc.

## How It Works

When you share a link on social platforms, they send a bot to crawl your page and fetch Open Graph meta tags to generate a preview. This project:

1. **Detects social media bots** (Discord, WhatsApp, Twitter, etc.)
2. **Randomly selects a GIF** from a predefined list
3. **Serves dynamic Open Graph tags** with the random GIF URL
4. **Shows a beautiful landing page** for regular visitors

## Features

- Server-side rendering for reliable bot detection
- Dynamic Open Graph meta tags
- Support for Discord, WhatsApp, Twitter, Facebook, Telegram, and Slack
- Debug mode to see what GIF is currently selected
- Beautiful gradient UI with responsive design

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

## Customization

### Adding Your Own GIFs

Edit `src/routes/+page.server.ts` and modify the `GIF_URLS` array:

```typescript
const GIF_URLS = [
	'https://your-gif-url-1.gif',
	'https://your-gif-url-2.gif',
	'https://your-gif-url-3.gif',
	// Add as many as you want!
];
```

### Where to Get GIFs

- **Giphy**: Right-click any GIF → "Copy link" → Use the direct `.gif` URL
- **Tenor**: Similar process
- **Host your own**: Upload GIFs to your static folder or CDN

### Updating Meta Tags

Edit the meta tags in `src/routes/+page.svelte`:

```svelte
<meta property="og:title" content="Your Custom Title" />
<meta property="og:description" content="Your custom description" />
<meta property="og:url" content="https://your-domain.com/" />
```

## Testing

### Test Locally

1. Run `npm run dev`
2. Visit `http://localhost:5173`
3. Check the "Debug Info" section to see the current random GIF

### Test with Social Platforms

To test the actual preview functionality:

#### Discord
1. Deploy your site (see Deployment section)
2. Paste the URL in any Discord channel
3. Wait for the preview to appear
4. Delete the message and paste again - you might see a different GIF!

#### WhatsApp
1. Deploy your site
2. Send the link to yourself or a friend
3. The preview should show a random GIF

**Note**: Social platforms cache previews for performance. Discord caches for ~30 minutes, WhatsApp longer. To force a refresh:
- Wait some time between shares
- Share in different channels/chats
- Use Discord's preview refresh (delete and re-paste)

## Deployment

This project can be deployed to:

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload the .svelte-kit/output directory
```

### Other Platforms

This is a standard SvelteKit app with SSR. Follow the [SvelteKit deployment guide](https://kit.svelte.dev/docs/adapters) for your platform.

**Important**: Make sure to update the `og:url` and `twitter:url` meta tags in `+page.svelte` with your actual domain after deployment!

## How Social Media Bots Work

When you paste a link:

1. **Bot sends request**: Discord/WhatsApp/etc. sends a bot with a specific User-Agent
2. **Server detects bot**: Our server checks the User-Agent header
3. **Random GIF selected**: A random GIF is chosen from the array
4. **Meta tags rendered**: The HTML is rendered with the selected GIF in `og:image`
5. **Bot caches preview**: The platform caches this preview for some time

## Troubleshooting

### Preview not updating?
- Social platforms cache previews. Wait 30+ minutes or share in a different chat
- Make sure you deployed the latest code
- Check that your GIF URLs are publicly accessible

### Preview not showing at all?
- Verify your GIF URLs are valid and accessible
- Make sure your site is deployed and publicly accessible
- Check that meta tags are properly formatted

### GIF not loading in preview?
- Some GIFs might be too large for social platforms
- Use GIFs under 5MB for best compatibility
- Ensure CORS headers allow embedding

## License

MIT

## Contributing

Feel free to open issues or submit PRs!
