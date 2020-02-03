const fs = require("fs");
const slugify = require("slugify");

const data = fs.readFileSync(`${__dirname}/../data/stars.json`);
const dataObj = JSON.parse(data);
const dataObjWithSlugs = dataObj.map(star => ({
  ...star,
  slug: slugify(star.name, { lower: true })
}));

const index = fs.readFileSync(`${__dirname}/../pages/index.html`, "utf-8");
const main = fs.readFileSync(`${__dirname}/../pages/main.html`, "utf-8");
const details = fs.readFileSync(`${__dirname}/../pages/details.html`, "utf-8");
const list_item = fs.readFileSync(
  `${__dirname}/../pages/list_item.html`,
  "utf-8"
);

module.exports = {
  // @route   GET api/v1/stars
  // @desc    Get all stars
  // @access  Public
  getAllStars: (req, res) => {
    const list = dataObjWithSlugs
      .map(star =>
        list_item.replace(/(<% STAR_SLUG %>|<% STAR_NAME %>)/g, match => {
          if (match === "<% STAR_SLUG %>") {
            return star.slug;
          } else if (match === "<% STAR_NAME %>") {
            return star.name;
          }
        })
      )
      .join("");
    let page = index.replace(/<% PAGE_CONTENT %>/, main);
    page = page.replace(/<% STAR_LIST %>/, list);

    res.send(page);
  },
  // @route   GET api/v1/:name
  // @desc    Get an item description
  // @access  Public
  getOneStar: (req, res) => {
    const name = req.params.name;
    const star = dataObjWithSlugs.find(star => star.slug === name);

    let page = index.replace(/<% PAGE_CONTENT %>/, details);
    page = page.replace(/<% TITLE %>/, star.title);
    page = page.replace(/<% CONTENT %>/, star.description);

    res.send(page);
  }
};
