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
		},
	},
	test: {
		globals: true,
		environment: 'happy-dom',
	}
});
