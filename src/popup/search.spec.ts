import { searchBookmarkTree, SearchResult } from "./search";

it("Gives no result for empty bookmark tree", () => {
  const emptyTree: chrome.bookmarks.BookmarkTreeNode = {
    id: "0",
    title: "root",
    children: [],
  };

  expect(searchBookmarkTree("apple", emptyTree)).toEqual([]);
});

it("Gives correct matches for single layer tree", () => {
  const singleLayerTree: chrome.bookmarks.BookmarkTreeNode = {
    id: "0",
    title: "root",
    children: [
      {
        id: "1",
        title: "Apple Inc.",
        url: "apple.com",
      },
      {
        id: "2",
        title: "Apple Wikipedia",
        url: "en.wikipedia.org/wiki/Apple",
      },
      {
        id: "3",
        title: "Orange Wikipedia",
        url: "en.wikipedia.org/wiki/Orange_(fruit)",
      },
    ],
  };

  const expectedResults: SearchResult[] = [
    {
      matches: [{ start: 0, length: 5 }],
      text: "Apple Inc.",
      url: "apple.com",
    },
    {
      matches: [{ start: 0, length: 5 }],
      text: "Apple Wikipedia",
      url: "en.wikipedia.org/wiki/Apple",
    },
  ];

  const results = searchBookmarkTree("apple", singleLayerTree);

  // The order of the results doesn't matter
  expect(results).toHaveLength(expectedResults.length);
  for (const e of expectedResults) {
    expect(results).toContainEqual(e);
  }
});

it("Gives correct matches for multi layer tree", () => {
  const multiLayerTree: chrome.bookmarks.BookmarkTreeNode = {
    id: "0",
    title: "root",
    children: [
      {
        id: "1",
        title: "Companies",
        children: [
          {
            id: "3",
            title: "Apple Inc.",
            url: "apple.com",
          },
          {
            id: "8",
            title: "Apple Music - Apple",
            url: "apple.com/apple-music",
          },
          {
            id: "4",
            title: "Google Inc.",
            url: "google.com",
          },
        ],
      },
      {
        id: "2",
        title: "Fruits",
        children: [
          {
            id: "5",
            title: "Wikipedia Apple",
            url: "en.wikipedia.org/wiki/Apple",
          },
          {
            id: "6",
            title: "Wikipedia Orange (Fruit)",
            url: "en.wikipedia.org/wiki/Orange_(fruit)",
          },
          {
            id: "7",
            title: "Wikipedia Banana",
            url: "en.wikipedia.org/wiki/Banana",
          },
        ],
      },
    ],
  };

  const expectedResults: SearchResult[] = [
    {
      matches: [{ start: 0, length: 5 }],
      text: "Apple Inc.",
      url: "apple.com",
    },
    {
      matches: [
        { start: 0, length: 5 },
        { start: 14, length: 5 },
      ],
      text: "Apple Music - Apple",
      url: "apple.com/apple-music",
    },

    {
      matches: [{ start: 10, length: 5 }],
      text: "Wikipedia Apple",
      url: "en.wikipedia.org/wiki/Apple",
    },
  ];

  const results = searchBookmarkTree("apple", multiLayerTree);

  // The order of the results doesn't matter
  expect(results).toHaveLength(expectedResults.length);
  for (const e of expectedResults) {
    expect(results).toContainEqual(e);
  }
});
