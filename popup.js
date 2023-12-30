document.addEventListener('DOMContentLoaded', function () {
  const extpay = ExtPay('chatgpt-folders');

  const switchElement = document.getElementById('toggle-switch');
  chrome.storage.local.get('extensionEnabled', function (data) {
    switchElement.checked = data.extensionEnabled;
  });

  switchElement.addEventListener('change', function () {
    const isEnabled = switchElement.checked;
    chrome.storage.local.set({ extensionEnabled: isEnabled });
    chrome.runtime.sendMessage({ extensionEnabled: isEnabled });
  });

  document.getElementById('manage-account').addEventListener('click', function() {
    extpay.openPaymentPage();
  });

  document.getElementById('start-trial').addEventListener('click', function() {
    extpay.getUser().then(user => {
      const now = new Date();
      const sevenDaysInMillis = 1000 * 60 * 60 * 24 * 7;
      const isUserInTrialOrPaid = user.paid || (user.trialStartedAt && (now - new Date(user.trialStartedAt)) < sevenDaysInMillis);
  
      if (isUserInTrialOrPaid) {
        extpay.openTrialPage();
      } else {
        alert('Your trial is over');
      }
    }).catch(error => {
      console.error('Error checking payment status:', error);
    });
  });

  document.getElementById('checkPaymentStatusButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: "checkPaymentStatus" });
    chrome.runtime.getBackgroundPage((backgroundPage) => {
      backgroundPage.checkPaymentStatusAndUpdateFlag();
    });
  
    // Refresh all tabs that match the URL "https://chat.openai.com/*"
    chrome.tabs.query({ url: "https://chat.openai.com/*" }, function(tabs) {
      for (let tab of tabs) {
        chrome.tabs.reload(tab.id);
      }
    });
  });

  document.querySelector('a[href="https://www.teenagetech.xyz/useragreementfolders"]').addEventListener('click', function(e) {
    e.preventDefault();
    chrome.tabs.create({url: e.target.href});
  });

  document.querySelector('a[href="https://www.teenagetech.xyz/chatgptfolders"]').addEventListener('click', function(e) {
    e.preventDefault();
    chrome.tabs.create({url: e.target.href});
  });
});