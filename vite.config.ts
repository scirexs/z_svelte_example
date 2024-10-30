import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// assetsInclude: ["lang.json"], // to read ./static/lang.json
});
