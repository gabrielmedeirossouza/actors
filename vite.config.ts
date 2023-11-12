import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			'@': path.resolve(path.dirname('.'), './src'),
		},
	},
	test: {
		globals: true,
		environment: 'happy-dom',
	}
});
