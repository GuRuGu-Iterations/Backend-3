const express = require("express");
const morgan = require("morgan");
const config = require("config");

const starsRoutes = require("./controllers");

// Set up server app
const app = express();

// Set up middleware
app.use(morgan("dev"));

// Handle routing
// app.use("/api/v1/stars", (req, res) => {
//   res.json({ message: "Hello!" });
// });
app.route("/api/v1/stars").get(starsRoutes.getAllStars);

// Run server
const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
