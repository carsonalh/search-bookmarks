/**
 * I'm no Chrome Extension expert, but it looks like this script is all about
 * setup
 *
 * It seems like this would be a good place to index the trie of all our
 * bookmarks so it can be put into "chrome storage" (if arbitrary JSON is
 * allowed) for reading when searched.
 */

chrome.runtime.onInstalled.addListener(() => {
  console.info("Extension has been installed!");
});

// let color = "#3aa757";

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log("Default background color set to %cgreen", `color: ${color}`);
// });

// const ONE_SECOND = 1 / 60;

// chrome.alarms.create("checker.main", {
//   periodInMinutes: ONE_SECOND * 2,
// });

// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === "checker.main") {
//     console.debug("The usual alarm is running as it should...");
//   } else {
//     console.warn("A foreign alarm has been called!");
//   }
// });
