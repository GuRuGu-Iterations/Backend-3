const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/../data/stars.json`);
const dataObj = JSON.parse(data);

const index = fs.readFileSync(`${__dirname}/../pages/index.html`, "utf-8");
const main = fs.readFileSync(`${__dirname}/../pages/main.html`, "utf-8");
const details = fs.readFileSync(`${__dirname}/../pages/details.html`, "utf-8");

module.exports = {
  // @route   GET api/v1/stars
  // @desc    Get all stars
  // @access  Public
  getAllStars: (req, res) => {
    const page = index.replace(/<% PAGE_CONTENT %>/, main);

    res.send(page);
  },
  // @route   GET api/v1/:name
  // @desc    Get an item description
  // @access  Public
  getOneStar: (req, res) => {
    const name = req.params.name;
    const star = dataObj[name];

    let page = index.replace(/<% PAGE_CONTENT %>/, details);
    page = page.replace(/<% TITLE %>/, star.title);
    page = page.replace(/<% CONTENT %>/, star.description);

    res.send(page);
  }
};
