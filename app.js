const express = require("express");
const morgan = require("morgan");
const config = require("config");

const starsRoutes = require("./controllers");

// Set up server app
const app = express();

// Set up middleware
app.use(morgan("dev"));

// Handle routing
app.route("/api/v1/stars").get(starsRoutes.getAllStars);

// 404 errors
app.use((req, res) => {
  res.status(404).send("Page not found!");
});

// Any other errors
app.use((err, req, res) => {
  res.status(500).send("Server error");
});

// Run server
const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
