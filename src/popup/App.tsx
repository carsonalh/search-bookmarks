import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] =
    useState<null | chrome.bookmarks.BookmarkTreeNode>(null);
  const [searchResults, setSearchResults] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  useEffect(() => {
    // We'll go ahead and make the trie here later

    // For now, we'll just get all the bookmarks
    // const getRootBookmark = async () => {
    //   const [root] = await chrome.bookmarks.getTree();
    //   if (!root || !root.children) {
    //     console.error("The root or it's children was nullish. I give up.");
    //   }
    //   return root;
    // };

    // getRootBookmark().then(setBookmarks);
    // For now, we'll just get all the bookmarks
    chrome.bookmarks.getTree(([root]) => {
      if (!root || !root.children) {
        console.error("The root or it's children was nullish. I give up.");
      }
      setBookmarks(root);
    });
  }, []);

  useEffect(() => {
    if (bookmarks === null) {
      return;
    }

    function getBookmarksAsList(
      node: chrome.bookmarks.BookmarkTreeNode
    ): chrome.bookmarks.BookmarkTreeNode[] {
      if (node.children) {
        const bookmarks = [] as chrome.bookmarks.BookmarkTreeNode[];
        for (const c of node.children) {
          bookmarks.push(...getBookmarksAsList(c));
        }
        bookmarks.push(node);
        return bookmarks;
      } else {
        return [node];
      }
    }

    const array = getBookmarksAsList(bookmarks);

    const results = array.filter(
      (bookmark) =>
        searchTerm !== "" &&
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  }, [searchTerm]);

  return (
    <>
      <input
        type="text"
        placeholder="Search Bookmarks..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <p>Your search term: {searchTerm}</p>
      <p>Results:</p>
      <ul>
        {searchResults.map((bookmark) => (
          <li key={bookmark.id}>{bookmark.title}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
