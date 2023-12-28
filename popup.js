

const extpay = ExtPay('chatgpt-folders');
console.log(extpay);
extpay.startBackground();

function checkPaymentStatusAndEnableExtension() {
  extpay.getUser().then(user => {
    const now = new Date();
    const sevenDays = 1000*60*60*24*7; // in milliseconds
    const isUserInTrialOrPaid = user.paid || (user.trialStartedAt && (now - user.trialStartedAt) < sevenDays);
    
    chrome.storage.local.set({ 'premiumFeaturesEnabled': isUserInTrialOrPaid });
  }).catch(error => {
    console.error('Error checking payment status:', error);
  });
}

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

document.getElementById("manage-account").addEventListener("click", function() {
    extpay.showPopup();
});
checkPaymentStatusAndEnableExtension();
