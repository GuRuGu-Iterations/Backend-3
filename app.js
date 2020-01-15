const express = require("express");
const morgan = require("morgan");
const config = require("config");

// Set up server app
const app = express();

// Set up middleware
app.use(morgan("dev"));

// Run server
const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
