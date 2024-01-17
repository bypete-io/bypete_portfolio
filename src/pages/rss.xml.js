import siteInfo from '~/data/site';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const allPosts = await getCollection('posts');
    const allWorks = await getCollection('work');
    const collection = [...allWorks, ...allPosts];
    return rss({
        title: siteInfo.name,
        description: siteInfo.feed.subtitle,
        site: context.site,
        items: collection.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/${post.collection}/${post.slug}/`,
        })),
        customData: `<language>en-gb</language>`,
    });
}
