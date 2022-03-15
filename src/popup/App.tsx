import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { searchBookmarkTree, SearchResult } from "./search";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] =
    useState<null | chrome.bookmarks.BookmarkTreeNode>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // On mount, fetch the bookmarks with the chrome api
  useEffect(() => {
    // We'll go ahead and make the trie here later

    // For now, we'll just get all the bookmarks
    const getBookmarks = async () => {
      // I wouldn't assume getTree guarantees the _entire_ bookmark tree, but
      // this has been working so far
      const [root] = await chrome.bookmarks.getTree();

      if (!root) {
        throw new Error("The bookmark root was nullish.");
      }

      return root;
    };

    getBookmarks().then(setBookmarks);
  }, []);

  // Focus the input on popup
  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  }, [inputRef.current]);

  // Re-run the search when "serachTerm" changes
  useEffect(() => {
    if (bookmarks === null) {
      return;
    }

    const results = searchBookmarkTree(searchTerm, bookmarks);
    setSearchResults(results);
  }, [searchTerm]);

  const offsetSelection = (offset: number) => {
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

  const openSelectedUrl = () => {
    const bookmark = searchResults[selectedResult];
    if (!bookmark) {
      return;
    }
    const title = searchResults[selectedResult].text;
    console.debug(`Opening bookmark "${title}"`);
    const url = searchResults[selectedResult].url;
    chrome.tabs.create({
      url: url,
    });
  };

  const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.debug(e.key);

    if (e.key === "ArrowUp" || (e.ctrlKey && e.key == "k")) {
      e.preventDefault();
      offsetSelection(-1);
    } else if (e.key === "ArrowDown" || (e.ctrlKey && e.key == "j")) {
      e.preventDefault();
      offsetSelection(1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      openSelectedUrl();
    }
  };

  return (
    <div className="App">
      <input
        ref={inputRef}
        onKeyDown={keyDown}
        type="text"
        placeholder="Search Bookmarks..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <ul>
        {searchResults.map((bookmark, index) => {
          const parts: React.ReactNode[] = [];

          // TODO: Get rid of this mutability, perhaps with a .reduce() of
          // bookmark.matches?
          let endOfLastMatch = 0;

          for (const match of bookmark.matches) {
            const plain = bookmark.text.substring(endOfLastMatch, match.start);
            const strong = (
              <strong>
                {bookmark.text.substring(
                  match.start,
                  match.start + match.length
                )}
              </strong>
            );

            parts.push(plain, strong);

            endOfLastMatch = match.start + match.length;
          }

          parts.push(
            bookmark.text.substring(endOfLastMatch, bookmark.text.length)
          );

          return (
            <li
              className={index === selectedResult ? "selected" : ""}
              key={bookmark.url}
            >
              <a href={bookmark.url}>{parts}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
