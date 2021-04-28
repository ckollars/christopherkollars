const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const isProduction = process.env.NODE_ENV === 'production'

module.exports = config => {

    config.addPlugin(eleventyNavigationPlugin);

    // https://www.11ty.dev/docs/data-deep-merge/
    config.setDataDeepMerge(true);

    // Date formatting (human readable)
    config.addFilter("readableDate", dateObj => {
      return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
    });

    // Date formatting (machine readable)
    config.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });

    config.addFilter("filterTagList", tags => {
      // should match the list in tags.njk
      return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
    });

    // Create an array of all tags
    config.addCollection("tagList", function(collection) {
      let tagSet = new Set();
      collection.getAll().forEach(item => {
        (item.data.tags || []).forEach(tag => tagSet.add(tag));
      });

      return [...tagSet];
    });

    // Layout Aliases
    config.addLayoutAlias('base', 'templates/base.njk');
    config.addLayoutAlias('page', 'templates/page.njk');
    config.addLayoutAlias('post', 'templates/article.njk');
    config.addLayoutAlias('note', 'templates/note.njk');
    config.addLayoutAlias('home', 'templates/home.njk');

    // Collections: Navigation
    // config.addCollection('nav', function(collection) {
    //     return collection.getFilteredByTag('nav').sort(function(a, b) {
    //         return a.data.navorder - b.data.navorder
    //     })
    // })

    // Collections: Posts
    // config.addCollection('posts', function(collection) {
    //     const pathsRegex = /\/posts\/|\/drafts\//
    //     return collection
    //         .getAllSorted()
    //         .filter(item => item.inputPath.match(pathsRegex) !== null)
    //         .filter(item => item.data.permalink !== false)
    //         .filter(item => !(item.data.draft && isProduction))
    // })

    // Collections: Notes
    // config.addCollection('notes', function(collection) {
    //     return collection
    //         .getAllSorted()
    //         .filter(item => item.inputPath.match(/\/notes\//) !== null)
    //         .reverse()
    // })

    // Minify HTML Output
    // config`.addTransform('htmlmin', function(content, outputPath) {
    //     if (outputPath.endsWith('.html') && isProduction) {
    //         return htmlmin.minify(content, {
    //             useShortDoctype: true,
    //             removeComments: true,
    //             collapseWhitespace: true
    //         })
    //     }
    //     return content
    // })

    return {
        templateFormats: [
            "md",
            "njk",
            "html"
        ],

        // If your site lives in a different subdirectory, change this.
        // Leading or trailing slashes are all normalized away, so don’t worry about it.
        // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
        // This is only used for URLs (it does not affect your file structure)
        pathPrefix: "/",
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        passthroughFileCopy: true,
        dir: {
            input: "_src",
            output: "_site"
        }
    }
}