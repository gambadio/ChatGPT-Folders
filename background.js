importScripts('./ExtPay.js'); // Include the ExtPay library

const extpay = ExtPay('chatgpt-folders');
extpay.startBackground();

extpay.onPaid.addListener(user => {
    console.log('User has paid');
    checkPaymentStatusAndUpdateFlag();

    // Refresh all tabs that match the URL "https://chat.openai.com/*"
    chrome.tabs.query({ url: "https://chat.openai.com/*" }, function(tabs) {
        for (let tab of tabs) {
            chrome.tabs.reload(tab.id);
        }
    });
});

extpay.onTrialStarted.addListener(user => {
    console.log('User started trial');
    checkPaymentStatusAndUpdateFlag();

    // Refresh all tabs that match the URL "https://chat.openai.com/*"
    chrome.tabs.query({ url: "https://chat.openai.com/*" }, function(tabs) {
        for (let tab of tabs) {
            chrome.tabs.reload(tab.id);
        }
    });
});

extpay.getUser().then(user => {
    if (user.paid) {
        console.log('User has paid');
    } else {
        // Open the trial setup page instead of the payment page
        extpay.openTrialPage('7 days');
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.hasOwnProperty('extensionEnabled')) {
    chrome.storage.local.set({ extensionEnabled: request.extensionEnabled }, () => {
      chrome.tabs.query({ url: "https://chat.openai.com/*" }, function(tabs) {
        for (let tab of tabs) {
          chrome.tabs.reload(tab.id);
        }
      });
    });
  }

  if (request.openPaymentPage) {
    extpay.openPaymentPage(); // Open the ExtensionPay payment page
  }

  // Added: Check Payment Status on button click
  if (request.action === "checkPaymentStatus") {
    checkPaymentStatusAndUpdateFlag();
  }
});

let trialEndedMessageSent = false;

function checkPaymentStatusAndUpdateFlag() {
  extpay.getUser().then(user => {
    const now = new Date();
    const sevenDaysInMillis = 1000 * 60 * 60 * 24 * 7;
    const isUserInTrialOrPaid = user.paid || (user.trialStartedAt && (now - new Date(user.trialStartedAt)) < sevenDaysInMillis);

    if (!isUserInTrialOrPaid && !trialEndedMessageSent) {
      alert('Your trial is over');
      trialEndedMessageSent = true;
    }

    chrome.storage.local.set({ premiumFeaturesEnabled: isUserInTrialOrPaid });
  }).catch(error => {
    console.error('Error checking payment status:', error);
  });
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({ extensionEnabled: true });
  checkPaymentStatusAndUpdateFlag();
});

setInterval(checkPaymentStatusAndUpdateFlag, 60 * 60 * 1000); // Every hour