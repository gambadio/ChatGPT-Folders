// background.js
importScripts('./ExtPay.js'); // Include the ExtPay library

// background.js
const extpay = ExtPay('chatgpt-folders');
extpay.startBackground();

extpay.onPaid.addListener(user => {
    console.log('User has paid');
    // You can add more code here to handle the event when the user pays
});

extpay.getUser().then(user => {
    if (user.paid) {
        // User has paid, handle accordingly
    } else {
        extpay.openPaymentPage();
    }
});

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.hasOwnProperty('extensionEnabled')) {
    // Update the extensionEnabled state in storage
    chrome.storage.local.set({ extensionEnabled: request.extensionEnabled }, () => {
      // Reload the tabs when the extension is enabled or disabled
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
});

// Check the user's payment status and update the premium features flag
function checkPaymentStatusAndUpdateFlag() {
  extpay.getUser().then(user => {
    const now = new Date();
    const sevenDaysInMillis = 1000 * 60 * 60 * 24 * 7;
    const isUserInTrialOrPaid = user.paid || (user.trialStartedAt && (now - new Date(user.trialStartedAt)) < sevenDaysInMillis);
    
    chrome.storage.local.set({ premiumFeaturesEnabled: isUserInTrialOrPaid });
  }).catch(error => {
    console.error('Error checking payment status:', error);
  });
}

// On extension installation, default the extensionEnabled flag to true
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({ extensionEnabled: true });
  checkPaymentStatusAndUpdateFlag(); // Also check payment status on install
});

// Periodically check the payment status
// You might want to define a more appropriate interval for your use case
setInterval(checkPaymentStatusAndUpdateFlag, 60 * 60 * 1000); // Every hour