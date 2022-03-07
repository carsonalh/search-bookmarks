import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] =
    useState<null | chrome.bookmarks.BookmarkTreeNode>(null);
  const [searchResults, setSearchResults] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  const [selectedResult, setSelectedResult] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // We'll go ahead and make the trie here later

    // We could do this with async/await but something breaks when I try that
    // (idk what?)

    // For now, we'll just get all the bookmarks
    chrome.bookmarks.getTree(([root]) => {
      if (!root || !root.children) {
        console.error("The root or it's children was nullish. I give up.");
      }
      setBookmarks(root);
    });
  }, []);

  // Focus the input on popup
  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  }, [inputRef.current]);

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
        bookmark.url !== undefined &&
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  }, [searchTerm]);

  const selectOffset = (offset: number) => {
    if (searchResults.length === 0) {
      setSelectedResult(0);
    } else {
      const newResult = Math.max(
        0,
        Math.min(selectedResult + offset, searchResults.length - 1)
      );
      setSelectedResult(newResult);
    }
  };

  const selectUp = () => selectOffset(-1);
  const selectDown = () => selectOffset(1);

  const gotoSelected = () => {
    const bookmark = searchResults[selectedResult];
    if (!bookmark) {
      return;
    }
    const title = searchResults[selectedResult].title;
    console.debug(`Opening bookmark "${title}"`);
    const url = searchResults[selectedResult].url;
    chrome.tabs.create({
      url: url,
    });
  };

  const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.debug(e.key);
    const listeningFor = ["ArrowUp", "ArrowDown", "Enter"];
    if (listeningFor.includes(e.key)) {
      e.preventDefault();

      if (e.key === "ArrowUp") {
        selectUp();
      } else if (e.key === "ArrowDown") {
        selectDown();
      } else if (e.key === "Enter") {
        gotoSelected();
      }
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        onKeyDown={keyDown}
        type="text"
        placeholder="Search Bookmarks..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <ul>
        {searchResults.map((bookmark, i) =>
          selectedResult === i ? (
            <li style={{ color: "red" }} key={bookmark.id}>
              {bookmark.title}
            </li>
          ) : (
            <li key={bookmark.id}>{bookmark.title}</li>
          )
        )}
      </ul>
    </>
  );
};

export default App;
