/*eslint-env node*/
"use strict";

const path = require("path");
const clientInitializer = require("luca-client-initializer");

const staticFileLocation = path.join(__dirname, "app");
clientInitializer.initialize("checking-account-client", staticFileLocation);
