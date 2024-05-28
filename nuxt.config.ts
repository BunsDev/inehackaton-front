// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	devtools: { enabled: false },
	css: [
		'~/assets/styles/main.scss',
	],
	app: {
		head: {
			title: 'INE - Hackaton 2024',
			link: [
				// favicon.ico
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				// Roboto Slab
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap' },
				// Roboto
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' },
			],
		},
	},
	modules: [
		'nuxt-icon',
		'nuxt-swiper',
		'nuxt-svgo',
		'@pinia/nuxt'
	],
	imports: {
		dirs: [
			'stores',
		],
	},
	runtimeConfig: {
		public: {
			baseURL: process.env.BASE_URL || 'http://localhost:1337',
			appURL: process.env.APP_URL || 'http://localhost:3000',
		},
	},
	vite: {
		css: {
			preprocessorOptions: {
				sass: {
					additionalData: '@import "~/assets/styles/variables.sass"\nbody\n\tmargin: 0',
				},
			},
		},
	},
})
