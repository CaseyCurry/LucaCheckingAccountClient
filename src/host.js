/*eslint-env node*/
"use strict";

const path = require("path");
const express = require("express");
const helmet = require("helmet");

const staticFileLocation = path.join(__dirname, "app");

const app = express();
app.use(helmet());
app.use(express.static(staticFileLocation));

const port = 8081;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
