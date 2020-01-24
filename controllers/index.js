const fs = require("fs");

const mainPage = fs.readFileSync(`${__dirname}/../pages/main.html`, "utf-8");

module.exports = {
  // @route   GET api/v1/stars
  // @desc    Get all stars
  // @access  Public
  getAllStars: (req, res) => {
    res.send(mainPage);
  }
};
