import starlight from '@astrojs/starlight';
// @ts-check
import { defineConfig } from 'astro/config';
import { remarkCalculationExamples } from './src/plugins/calculation-examples.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Notes Calculator Documentation',
      customCss: ['./src/styles/calculation-examples.css'],
      logo: {
        src: './src/assets/logo.png',
        alt: 'Notes Calculator logo',
      },
      social: [{ icon: 'laptop', label: 'Website', href: 'https://notescalculator.com' }],
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://notescalculator.com//social-preview-image.png',
          }
        },
        {
          tag: 'script',
          attrs: { src: '/calculation-examples.js', defer: true },
        },
      ],
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
  markdown: {
    remarkPlugins: [remarkCalculationExamples],
  },
  site: 'https://docs.notescalculator.com',
  output: "static",
});
