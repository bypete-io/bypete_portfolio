export function truncate(str, limit) {
    return str.split(' ').splice(0, limit).join(' ');
}

export function formatBlogPosts(
    posts,
    {
        filterOutDrafts = true,
        filterOutFuturePosts = true,
        sortByDate = true,
        limit = undefined,
    } = {},
) {
    const filteredPosts = posts.reduce((acc, post) => {
        const { date, draft } = post.data;
        // filterOutDrafts if true
        if (filterOutDrafts && draft) return acc;

        // filterOutFuturePosts if true
        if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

        // add post to acc
        acc.push(post);

        return acc;
    }, []);

    if (sortByDate) {
        filteredPosts.sort(
            (a, b) => Date.parse(b.data.date) - Date.parse(a.data.date),
        );
    } else {
        filteredPosts.sort(() => Math.random() - 0.5);
    }

    // Limit if number is passed
    if (typeof limit === 'number') {
        return filteredPosts.slice(0, limit);
    }
    return filteredPosts;
}

export function buildToc(headings) {
    const toc = [];
    const parentHeadings = new Map();
    headings.forEach((h) => {
        const heading = { ...h, subheadings: [] };
        parentHeadings.set(heading.depth, heading);
        // Change 2 to 1 if your markdown includes your <h1>
        if (heading.depth === 2) {
            toc.push(heading);
        } else {
            parentHeadings.get(heading.depth - 1).subheadings.push(heading);
        }
    });
    return toc;
}
