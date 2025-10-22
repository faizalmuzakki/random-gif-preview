<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Random GIF Preview</title>
	<meta name="description" content="Share this link to see a random GIF preview!" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://yoursite.com/" />
	<meta property="og:title" content="Random GIF Preview!" />
	<meta property="og:description" content="Every time you share this, a different GIF appears! 🎲" />
	<meta property="og:image" content={data.randomGif} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://yoursite.com/" />
	<meta property="twitter:title" content="Random GIF Preview!" />
	<meta
		property="twitter:description"
		content="Every time you share this, a different GIF appears! 🎲"
	/>
	<meta property="twitter:image" content={data.randomGif} />
</svelte:head>

<main>
	<div class="container">
		<h1>🎲 Random GIF Preview</h1>

		<div class="card">
			<h2>How it works</h2>
			<p>
				Share this link on <strong>Discord</strong>, <strong>WhatsApp</strong>,
				<strong>Twitter</strong>, or any social platform!
			</p>
			<p>Each time the link is shared, a random GIF will appear in the preview.</p>
		</div>

		<div class="card">
			<h3>Currently showing:</h3>
			<img src={data.randomGif} alt="Random GIF" />
			<p class="gif-url">{data.randomGif}</p>
		</div>

		<div class="debug">
			<details>
				<summary>Debug Info</summary>
				<p><strong>Is Social Bot:</strong> {data.isSocialBot ? 'Yes' : 'No'}</p>
				<p><strong>User Agent:</strong> {data.userAgent}</p>
			</details>
		</div>

		<div class="instructions">
			<h3>Try it yourself:</h3>
			<ol>
				<li>Copy this page URL</li>
				<li>Paste it in Discord or WhatsApp</li>
				<li>Wait for the preview to load</li>
				<li>Delete and paste again to see a different GIF!</li>
			</ol>
			<p class="note">
				<strong>Note:</strong> Social platforms cache previews, so you might need to wait a few minutes
				or use a different chat to see a new GIF.
			</p>
		</div>
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
	}

	main {
		padding: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}

	.container {
		max-width: 800px;
		width: 100%;
	}

	h1 {
		color: white;
		text-align: center;
		font-size: 3rem;
		margin-bottom: 2rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}

	.card {
		background: white;
		border-radius: 12px;
		padding: 2rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	h2,
	h3 {
		margin-top: 0;
		color: #667eea;
	}

	img {
		width: 100%;
		max-width: 500px;
		border-radius: 8px;
		margin: 1rem 0;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	.gif-url {
		font-size: 0.9rem;
		color: #666;
		word-break: break-all;
		text-align: center;
	}

	.debug {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 8px;
		padding: 1rem;
		margin-bottom: 1.5rem;
	}

	details {
		cursor: pointer;
	}

	summary {
		font-weight: bold;
		color: #667eea;
	}

	.debug p {
		margin: 0.5rem 0;
		font-size: 0.9rem;
	}

	.instructions {
		background: white;
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	ol {
		line-height: 1.8;
	}

	.note {
		background: #fff3cd;
		border-left: 4px solid #ffc107;
		padding: 1rem;
		margin-top: 1rem;
		border-radius: 4px;
		font-size: 0.9rem;
	}

	@media (max-width: 600px) {
		h1 {
			font-size: 2rem;
		}

		.card,
		.instructions {
			padding: 1rem;
		}

		main {
			padding: 1rem;
		}
	}
</style>
