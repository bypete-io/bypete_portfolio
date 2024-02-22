import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import { remarkReadingTime } from './src/js/remark-reading-time.mjs';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import rehypeAttrs from 'rehype-attr';
import rehypeExternalLinks from 'rehype-external-links';
import sitemap from '@astrojs/sitemap';
import alpine from '@astrojs/alpinejs';
import partytown from '@astrojs/partytown';
const rehypeExternalLinksConfig = [
    rehypeExternalLinks,
    {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
        content: {
            type: 'text',
            value: '🔗',
        },
    },
];

// https://astro.build/config
export default defineConfig({
    site: 'https://bypete.uk',
    trailingSlash: 'always',
    // build: {
    //     format: 'file',
    // },
    integrations: [
        preact(),
        mdx({
            rehypePlugins: [rehypeAttrs, rehypeExternalLinksConfig],
        }),
        icon({
            include: {
                mdi: ['*'],
                lucide: ['*'],
            },
        }),
        sitemap(),
        alpine({
            entrypoint: '/src/entrypoint',
        }),
        partytown({
            config: {
                forward: ['dataLayer.push'],
            },
        }),
    ],
    markdown: {
        rehypePlugins: [rehypeAttrs, rehypeExternalLinksConfig],
        remarkPlugins: [remarkReadingTime],
    },
});
