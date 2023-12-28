document.addEventListener('DOMContentLoaded', function () {
    const switchElement = document.getElementById('toggle-switch');

    chrome.storage.sync.get('extensionEnabled', function (data) {
      switchElement.checked = data.extensionEnabled ?? true;
    });

    switchElement.addEventListener('change', function () {
      const isEnabled = switchElement.checked;
      chrome.storage.sync.set({extensionEnabled: isEnabled});

      // Send a message to the background script
      chrome.runtime.sendMessage({extensionEnabled: isEnabled});
    });
});
