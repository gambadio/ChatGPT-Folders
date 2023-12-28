// popup.js
document.addEventListener('DOMContentLoaded', function () {
  const extpay = ExtPay('chatgpt-folders'); // Initialize with your ExtensionPay ID
  const switchElement = document.getElementById('toggle-switch');

  // Initialize the toggle switch position based on the stored value
  chrome.storage.local.get('extensionEnabled', function (data) {
    switchElement.checked = data.extensionEnabled;
  });

  // Update the extensionEnabled state when the toggle switch is changed
  switchElement.addEventListener('change', function () {
    const isEnabled = switchElement.checked;
    chrome.storage.local.set({ extensionEnabled: isEnabled });

    // Send a message to the background script to enable/disable functionality
    chrome.runtime.sendMessage({ extensionEnabled: isEnabled });
  });

  // Set up the manage account/payment button
  document.getElementById('manage-account').addEventListener('click', function() {
    extpay.openPaymentPage(); // Open the ExtensionPay payment page
  });

  // Check if the user has paid or is in the trial period and update UI accordingly
  extpay.getUser().then(user => {
    const now = new Date();
    const sevenDaysInMillis = 1000 * 60 * 60 * 24 * 7;
    if (user.paid || (user.trialStartedAt && (now - new Date(user.trialStartedAt)) < sevenDaysInMillis)) {
      // User has paid or is in trial period, update UI or hide payment button if necessary
    }
  }).catch(err => {
    // Handle errors, such as by displaying an error message to the user
  });
});
