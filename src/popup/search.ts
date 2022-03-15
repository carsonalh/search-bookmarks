export type SearchResult = Readonly<{
  /** There can be more than one match on a search result, e.g. with search term
   * "s" and result "Software as a Service", there would be three matches.
   *
   * When called by `searchBookmarkTree`, this list is guaranteed to be sorted
   * by each match's `start`.
   */
  matches: Readonly<{
    start: number;
    length: number;
  }>[];
  /** The text which was matched */
  text: string;
  /** The url pertaining to the match */
  url: string;
}>;

export function searchBookmarkTree(
  term: string,
  node: chrome.bookmarks.BookmarkTreeNode
): SearchResult[] {
  if (!node.children && node.url) {
    type Match = SearchResult["matches"][number];

    // Get all substring occurrences of "term" in "node.title"
    const matches = node.title
      .split("")
      .map((c) => c.toLowerCase())
      .map((c, i, arr) => {
        const substring = arr.slice(i, i + term.length).join("");
        if (substring === term.toLowerCase()) {
          return {
            start: i,
            length: term.length,
          } as Match;
        } else {
          return null;
        }
      })
      .filter((match): match is Match => match !== null)
      .reduce((nonOverlappingMatches, match) => {
        if (!nonOverlappingMatches.length) {
          return [match];
        }

        const lastMatch =
          nonOverlappingMatches[nonOverlappingMatches.length - 1];

        if (lastMatch.start + lastMatch.length > match!.start) {
          return nonOverlappingMatches;
        }

        return nonOverlappingMatches.concat({ ...match! });
      }, [] as Match[]);

    return matches.length
      ? [
          {
            matches,
            text: node.title,
            url: node.url,
          },
        ]
      : [];
  }

  if (node.children && !node.url) {
    const individualChildResults = node.children.map((child) =>
      searchBookmarkTree(term, child)
    );
    const allChildResults = ([] as SearchResult[]).concat(
      ...individualChildResults
    );
    return allChildResults;
  }

  // !Single && !Parent -- Panic!
  throw new Error("Found anomylous bookmark in bookmark tree");
}

export {};
