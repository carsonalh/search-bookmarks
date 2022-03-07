const path = require("path");

const distDir = "/"; // Get this from the build config or something

const manifest = {
  name: "Search Bookmarks",
  description: "Tool to rapidly search through all one's chrome bookmarks",
  version: "0.0.1",
  manifest_version: 3,
  background: {
    service_worker: path.join(distDir, "background.js"),
  },
  permissions: ["storage", "scripting", "bookmarks"],
  action: {
    default_popup: path.join(distDir, "popup.html"),
    default_icon: {
      16: "images/get_started16.png",
      32: "images/get_started32.png",
      48: "images/get_started48.png",
      128: "images/get_started128.png",
    },
  },
  icons: {
    16: "images/get_started16.png",
    32: "images/get_started32.png",
    48: "images/get_started48.png",
    128: "images/get_started128.png",
  },
  options_page: path.join(distDir, "options.html"),
};

const manifestJson = JSON.stringify(manifest);
