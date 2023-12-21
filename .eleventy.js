const moment = require('moment');
moment.locale('es');

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.addFilter('dateIso', date => {
        return moment(date).toISOString();
    });
     
    eleventyConfig.addFilter('dateReadable', date => {
        return moment(date).utc().format('MMM DD YY'); // V.gr. May. 14 23
    });
    
    let markdownIt = require("markdown-it");
    var markdownItAttrs = require('markdown-it-attrs');
    let options = {
    html: true,
    breaks: true,
    linkify: true
    };
    let markdownLib = markdownIt(options).use(markdownItAttrs);
    eleventyConfig.setLibrary("md", markdownLib);

    const MarkdownIt = require("markdown-it");
    const mdRender = new MarkdownIt();
    eleventyConfig.addFilter("renderUsingMarkdown", function(rawString) {
        return mdRender.render(rawString);
    });

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
}