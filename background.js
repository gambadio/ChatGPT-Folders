importScripts('./ExtPay.js');

var extpay = ExtPay('chatgpt-folders');
extpay.startBackground();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (typeof request.extensionEnabled !== 'undefined') {
      extpay.getUser().then(user => {
          const now = new Date();
          const sevenDays = 1000 * 60 * 60 * 24 * 7; // in milliseconds
          const isUserInTrialOrPaid = user.paid || (user.trialStartedAt && (now - user.trialStartedAt) < sevenDays);
          chrome.storage.sync.set({ extensionEnabled: isUserInTrialOrPaid }, () => {
              chrome.tabs.query({ url: "https://chat.openai.com/*" }, function(tabs) {
                  for (let tab of tabs) {
                      chrome.tabs.reload(tab.id);
                  }
              });
          });
      });
  }
});
