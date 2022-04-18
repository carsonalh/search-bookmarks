// Script to configure our manifest.json
const path = require("path");

const projectRoot = "..";
const configFile = path.resolve(projectRoot, "manifest.config.ts");
const packageFile = path.resolve(projectRoot, "package.json");

const chromeConfig = require(configFile);
const nodeConfig = require(packageFile);

console.dir(chromeConfig);
console.dir(nodeConfig);
