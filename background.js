// background.js

// Set the extensionEnabled flag to true when the extension is installed
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({ extensionEnabled: true });
  });
  
  // Listen for a message from the popup script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (typeof request.extensionEnabled !== 'undefined') {
      chrome.storage.local.set({ extensionEnabled: request.extensionEnabled }, () => {
        chrome.tabs.query({ url: "https://chat.openai.com/*" }, function(tabs) {
          for (let tab of tabs) {
            chrome.tabs.reload(tab.id);
          }
        });
      });
    }
  });
  