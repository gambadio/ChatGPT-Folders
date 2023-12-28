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

  // Added: Event listener for the Check Payment Status button
  document.getElementById('checkPaymentStatusButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: "checkPaymentStatus" });
  });

  // Optional: Additional UI handling based on user payment status
  extpay.getUser().then(user => {
    const now = new Date();
    const sevenDaysInMillis = 1000 * 60 * 60 * 24 * 7;
    if (user.paid || (user.trialStartedAt && (now - new Date(user.trialStartedAt)) < sevenDaysInMillis)) {
      // Handle UI if the user has paid or is in the trial period
    }
  }).catch(err => {
    // Handle errors
  });
});
