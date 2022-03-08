// Looks for the "dist" directory and packages its contents into a zip

const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

const projectRoot = path.resolve(__dirname, "..");
// Get a file from the project root
const p = (projectPath) => path.resolve(projectRoot, projectPath);

const package = require(p("package.json"));

const outfile = p(
  `search-bookmarks-${package.version || "VERSION_UNKNOWN"}.zip`
);
console.debug(`Writing package to file ${outfile}`);

if (!package.version) {
  console.error("Could not read project version; abort");
  process.exit(1);
}

const output = fs.createWriteStream(
  p(`search-bookmarks-${package.version}.zip`)
);

const zip = archiver("zip", { zlib: { level: 9 } });

zip.pipe(output);

zip.glob("**/*.*", {
  cwd: p("dist"),
});

zip.finalize().then(() => console.log("Finished writing package"));
