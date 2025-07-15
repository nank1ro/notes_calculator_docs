import starlight from '@astrojs/starlight';
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Notes Calculator Documentation',
      social: [{ icon: 'laptop', label: 'Website', href: 'https://notescalculator.com' }],
      head: [{
        tag: 'meta',
        attrs: {
          property: 'og:image',
          content: 'https://notescalculator.com//social-preview-image.png',
        }
      }],
      sidebar: [
        {
          'label': 'Getting started',
          link: '',
        },
        {
          label: 'Features',
          autogenerate: { directory: 'features' }
        },
        {
          label: 'Syntax',
          autogenerate: { directory: 'syntax' }
        },
      ],
    }),
  ],
  site: 'https://docs.notescalculator.com',
  output: "static",
});
