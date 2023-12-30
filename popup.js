document.addEventListener('DOMContentLoaded', function () {
  const extpay = ExtPay('chatgptfolders');

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
      const threeDaysInMillis = 1000*60*60*24*3;
      const isUserInTrialOrPaid = user.paid || (user.trialStartedAt && (now - new Date(user.trialStartedAt)) < sevenDaysInMillis);
  
      if (isUserInTrialOrPaid) {
        extpay.openTrialPage('3-day');
      } else if ((now - new Date(user.trialStartedAt)) > sevenDaysInMillis){
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon.png', // replace with the path to your icon
          title: 'Trial Ended',
          message: 'Your trial is over'
        });      }
        else {extpay.openTrialPage('3-day');}
    }).catch(error => {
      console.error('Error checking payment status:', error);
    });
  });

  document.getElementById('checkPaymentStatusButton').addEventListener('click', function() {
  
      // Refresh all tabs that match the URL "https://chat.openai.com/*"
      chrome.tabs.query({ url: "https://chat.openai.com/*" }, function(tabs) {
        for (let tab of tabs) {
          chrome.tabs.reload(tab.id);
        }
      });
      chrome.runtime.sendMessage({ action: 'checkPaymentStatus' });
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