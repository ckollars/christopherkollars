const { DateTime } = require("luxon");

module.exports = eleventyConfig => {

    // Date formatting (human readable)
    eleventyConfig.addFilter("readableDate", dateObj => {
      return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
    });

    // Date formatting (machine readable)
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });

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
            includes: "_templates",
            data: "_data",
            output: "_site"
        }
    }
}