import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
    // ...svelte-preprocess options
  }),
	kit: {
		adapter: adapter()
	},
	onwarn: (warning, handler) => {
    // TODO: Fix this without silencing the error
    if (warning.code === 'a11y-click-events-have-key-events') return
    handler(warning)
  },
};

export default config;
