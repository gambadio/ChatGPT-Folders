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
    extpay.openTrialPage();
  });

  document.getElementById('checkPaymentStatusButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: "checkPaymentStatus" });
  });
});