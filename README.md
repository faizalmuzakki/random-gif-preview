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

## Setup: Giphy API Key

This project uses the **Giphy API** to generate truly random GIFs every time!

### Get Your Free API Key

1. Go to [Giphy Developers](https://developers.giphy.com/dashboard/)
2. Create an account or log in
3. Click "Create an App"
4. Choose "API" (not SDK)
5. Fill in the app name and description
6. Copy your API key

### Add API Key to Your Project

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your API key:
   ```env
   GIPHY_API_KEY=your_actual_api_key_here
   ```

3. **For Cloudflare Pages**: Add the environment variable in your dashboard:
   - Go to Settings → Environment Variables
   - Add `GIPHY_API_KEY` with your API key value
   - Save and redeploy

### Without API Key

Don't worry! If you don't add an API key, the app will use a fallback array of pre-selected GIFs. It will still work, just with a smaller selection.

## Customization

### Changing the Fallback GIFs

If you want to customize the fallback GIFs (used when no API key is present), edit `src/routes/+page.server.ts`:

```typescript
const FALLBACK_GIFS = [
	'https://your-gif-url-1.gif',
	'https://your-gif-url-2.gif',
	// Add more!
];
```

### Filtering by Tags/Categories (Optional)

You can customize the Giphy API call to fetch GIFs with specific tags. Edit `src/routes/+page.server.ts`:

```typescript
// Current: completely random
`https://api.giphy.com/v1/gifs/random?api_key=${env.GIPHY_API_KEY}&rating=g`

// With tag (e.g., only cat GIFs)
`https://api.giphy.com/v1/gifs/random?api_key=${env.GIPHY_API_KEY}&tag=cats&rating=g`

// With multiple tags
`https://api.giphy.com/v1/gifs/random?api_key=${env.GIPHY_API_KEY}&tag=funny,animals&rating=g`
```

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

This project is configured for **Cloudflare Pages** deployment.

### Cloudflare Pages (Recommended)

#### Option 1: Using Wrangler CLI

```bash
# Install wrangler globally if you haven't
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy .svelte-kit/cloudflare

# After first deployment, add the environment variable via dashboard:
# 1. Go to Cloudflare Dashboard → Pages → Your Project
# 2. Settings → Environment variables
# 3. Add GIPHY_API_KEY with your API key
# 4. Redeploy with: wrangler pages deploy .svelte-kit/cloudflare
```

#### Option 2: Using Cloudflare Dashboard

1. Push your code to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.svelte-kit/cloudflare`
   - **Framework preset**: SvelteKit
6. **IMPORTANT: Add Environment Variable**
   - Scroll down to "Environment variables" section
   - Click "Add variable"
   - Name: `GIPHY_API_KEY`
   - Value: Your Giphy API key from [developers.giphy.com](https://developers.giphy.com/dashboard/)
   - Apply to: Both "Production" and "Preview"
7. Click "Save and Deploy"

#### Option 3: Direct Upload

```bash
# Build the project
npm run build

# The build output will be in .svelte-kit/cloudflare
# You can upload this directly via Cloudflare Dashboard → Pages → Upload assets
```

### Adding Environment Variable to Existing Cloudflare Pages Project

If you've already deployed and need to add the API key:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
2. Select your project
3. Go to **Settings** → **Environment variables**
4. Click **Add variable**:
   - Variable name: `GIPHY_API_KEY`
   - Value: Your Giphy API key
   - Environment: Select both "Production" and "Preview"
5. Click **Save**
6. Go to **Deployments** tab → Click "Retry deployment" or push a new commit to trigger a redeploy

**Important**: After deployment, update the `og:url` and `twitter:url` meta tags in `+page.svelte` with your actual Cloudflare Pages domain (e.g., `https://random-gif-preview.pages.dev`)!

### Other Platforms

While optimized for Cloudflare, you can deploy to other platforms by changing the adapter in `svelte.config.js`. See [SvelteKit adapters](https://kit.svelte.dev/docs/adapters).

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
