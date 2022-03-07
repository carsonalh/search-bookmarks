import React from "react";
import ReactDOM from "react-dom";
import App from "./popup/App";

ReactDOM.render(<App />, document.getElementById("root"));

// // OLD NON REACT STUFF
// const searchBox = document.getElementById("search") as HTMLInputElement;
// const outputElement = document.getElementById("output")!;

// searchBox.addEventListener("input", async function (e) {
//   // All that's left to do is to make a trie with all of the search results and display them here
//   // Then that will be the meat of this extension **done**!

//   // console.debug("Input is still happening!");

//   const searchTerm = this.value;
//   outputElement.textContent = searchTerm;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   const [bookmarksTree] = await chrome.bookmarks.getTree();

//   console.info(`Bookmarks Tree: ${JSON.stringify(bookmarksTree)}`);

//   const bookmarksBar = bookmarksTree.children.find((node) =>
//     node.title.toLowerCase().includes("bar")
//   );

//   console.info(`Bookmarks Bar: ${JSON.stringify(bookmarksBar)}`);

//   await chrome.bookmarks.create({
//     parentId: bookmarksBar.id,
//     title: "Your favourite website",
//     url: "https://youtube.com",
//   });

//   console.info("Your bookmark has been created!");
// });
