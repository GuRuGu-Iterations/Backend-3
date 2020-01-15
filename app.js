const express = require("express");
const morgan = require("morgan");

// Set up server app
const app = express();

// Set up middleware
app.use(morgan("dev"));

// Run server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
