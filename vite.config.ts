import { defineConfig } from 'vitest/config';
import path, { resolve } from 'node:path';

export default defineConfig({
	build: { lib: { entry: resolve(__dirname, 'src/main.ts'), formats: ['es'] } },
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@lib/math': path.resolve(__dirname, './lib/math'),
			'@lib/crypto': path.resolve(__dirname, './lib/crypto'),
			'@lib/web': path.resolve(__dirname, './lib/web'),
		},
	},
	test: {
		globals: true,
		environment: 'happy-dom',
	}
});
