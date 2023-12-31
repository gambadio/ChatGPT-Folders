chrome.storage.local.get(['extensionEnabled', 'premiumFeaturesEnabled'], function(data) {
  if ((data.hasOwnProperty('extensionEnabled') ? data.extensionEnabled : true) && data.premiumFeaturesEnabled) {
    const extpay = ExtPay('chatgptfolders');  
    extpay.getUser().then(user => {
      const now = new Date();
      const threeDays = 1000*60*60*24*3; // in milliseconds
      if (user.paid || (user.trialStartedAt && (now - new Date(user.trialStartedAt)) < threeDays)) {
        console.log('User has paid or is in trial period');

chrome.storage.local.get('extensionEnabled', function(data) {
  if (data.extensionEnabled) {
// content.js
// This function checks if the button is already added
function isAddToFolderButtonAdded() {
  return !!document.querySelector('.add-to-folder-button');
}
// This function creates a dropdown for folder selection
function createFolderDropdown(folderNames) {
  const folderName = window.prompt("Which folder would you like to add this to?\n\n" + folderNames.join("\n"));
  return folderName;
}
// Create an observer instance to watch for changes in the DOM
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      // Check if the added node is the box and if it does not already contain the button
      if (node.nodeType === 1 && node.matches('[data-radix-popper-content-wrapper]') && !isAddToFolderButtonAdded()) {
        // Find the menu within the box
        const menu = node.querySelector('[data-radix-menu-content]');
        if (menu) {
          addAddToFolderButton(menu);
        }
      }
    });
  });
});
// Start observing the body for added nodes
observer.observe(document.body, { childList: true, subtree: true });
// Function to find the chat entry URL from the options menu
function findChatEntryUrl(optionsMenu) {
  // Traverse up the DOM to find the chat entry
  let chatEntry = optionsMenu.closest('div[data-projection-id]');
  if (!chatEntry) {
    console.error('Chat entry not found.');
    return;
  }
  // Extract the date from the chat entry as the identifier
  let chatDateElement = chatEntry.querySelector('h3');
  if (!chatDateElement) {
    console.error('Chat date element not found.');
    return;
  }
  let chatDate = chatDateElement.textContent.trim();
  // Construct the URL using the chat date as an identifier
  let chatUrl = `https://chat.openai.com/chat/${chatDate}`;
  return chatUrl;
}
// Helper function to get the current chat link
function getCurrentChatLink() {
  // This will get the current URL of the open chat
  return window.location.href;
}
// Helper function to get the current chat name
function getCurrentChatName() {
  // This will get the title of the webpage
  return document.title;
}
// This function adds folder management buttons for rename and delete
function addFolderManagementButtons(folderDiv, folderName) {
  const renameButton = document.createElement('button');
  renameButton.textContent = '✏️';
  renameButton.onclick = function(event) {
    event.stopPropagation();
    const newFolderName = prompt('New name for the folder:', folderName);
    if (newFolderName) {
      renameFolder(folderName, newFolderName);
    }
  };
  folderDiv.appendChild(renameButton);
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '🗑️';
  deleteButton.onclick = function(event) {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete the folder '${folderName}'?`)) {
      deleteFolder(folderName);
    }
  };
  folderDiv.appendChild(deleteButton);
}
// This function displays the chats for a specific folder
function displayChatsForFolder(folderName) {
  chrome.storage.local.get({folders: {}}, function (data) {
    const folders = data.folders;
    const chats = folders[folderName];
    const folderInterface = document.getElementById('folder-interface');
    folderInterface.innerHTML = '';
    folderInterface.style.display = 'flex';
    folderInterface.style.flexDirection = 'column';

    const chatContainer = document.createElement('div');
    chatContainer.style.overflowY = 'auto';
    chatContainer.style.maxHeight = '150px';

    const folderTitle = document.createElement('p');
    folderTitle.textContent = folderName;
    folderTitle.style.fontWeight = 'bold';
    folderTitle.style.fontSize = '1.3em'; // Change '1.5em' to the size you want
    chatContainer.appendChild(folderTitle); // Append to chatContainer instead of folderInterface

    chats.forEach((chat, index) => {
      const chatDiv = document.createElement('div');
      chatDiv.className = 'chat';
      chatDiv.style.fontSize = '0.8em';
      chatDiv.style.margin = '6px 0';
      const chatLink = document.createElement('a');
      chatLink.href = chat.url;
      chatLink.textContent = chat.title;
      chatLink.target = '_blank';
      chatDiv.appendChild(chatLink);

      const editButton = document.createElement('button');
      editButton.textContent = '✏️';
      editButton.style.marginLeft = '10px';
      editButton.onclick = function() {
        const newChatName = prompt('New name for the chat:', chat.title);
        if (newChatName) {
          chat.title = newChatName;
          chrome.storage.local.set({folders});
          displayChatsForFolder(folderName);
        }
      };
      chatDiv.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = '🗑️';
      deleteButton.onclick = function() {
        if (confirm(`Are you sure you want to delete the chat '${chat.title}'?`)) {
          chats.splice(index, 1);
          chrome.storage.local.set({folders});
          displayChatsForFolder(folderName);
        }
      };
      chatDiv.appendChild(deleteButton);
      chatContainer.appendChild(chatDiv);
    });

    folderInterface.appendChild(chatContainer);

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Folders';
    backButton.style.fontWeight = 'bold';
    backButton.style.marginTop = 'auto';
    backButton.style.alignSelf = 'flex-start'; // Add this line
    backButton.onclick = loadFolders;
    folderInterface.appendChild(backButton);
  });
}
// This function handles the creation of a new folder
function createNewFolder(folderName) {
  chrome.storage.local.get({folders: {}}, function (data) {
    const folders = data.folders;
    if (!folders[folderName]) {
      folders[folderName] = [];
      chrome.storage.local.set({folders}, function() {
        loadFolders();
      });
    } else {
      alert('Folder already exists.');
    }
  });
}
// This function handles the renaming of a folder
function renameFolder(oldName, newName) {
  chrome.storage.local.get({folders: {}}, function (data) {
    const folders = data.folders;
    if (folders[newName]) {
      alert('A folder with this name already exists.');
    } else {
      folders[newName] = folders[oldName];
      delete folders[oldName];
      chrome.storage.local.set({folders}, function() {
        loadFolders();
      });
    }
  });
}
// This function handles the deletion of a folder
function deleteFolder(folderName) {
  chrome.storage.local.get({folders: {}}, function (data) {
    const folders = data.folders;
    delete folders[folderName];
    chrome.storage.local.set({folders}, function() {
      loadFolders();
    });
  });
}
// When the script loads, try to create the folder interface
createFolderInterface();
// This function creates a new button and appends it to the menu
function addAddToFolderButton(menu) {
  // Check if the button is already added to prevent duplicates
  if (isAddToFolderButtonAdded()) {
    return;
  }
  // Create a new button element
  const addToFolderButton = document.createElement('div');
  addToFolderButton.classList.add('add-to-folder-button', 'flex', 'gap-2', 'm-1.5', 'rounded', 'p-2.5', 'text-sm', 'cursor-pointer', 'focus:ring-0', 'hover:bg-black/5', 'dark:hover:bg-white/5', 'radix-disabled:pointer-events-none', 'radix-disabled:opacity-50', 'group');
  addToFolderButton.textContent = 'Add to Folder';
  addToFolderButton.onclick = function() {
    // Get the current chat link
    const chatUrl = getCurrentChatLink();
    // Use the title of the page as the default chat name
    let defaultChatName = document.title;
    
    // Get the folder names and create dropdown
    chrome.storage.local.get({folders: {}}, function (data) {
      const folders = data.folders;
      const folderNames = Object.keys(folders);
      // Create and show the dropdown here
      createAndShowFolderDropdown(folderNames, (selectedFolderName) => {
        if (selectedFolderName) {
          // Prompt for a chat name, with the page title as the default
          const newName = prompt('Enter a name for this chat:', defaultChatName) || defaultChatName;
          
          // Save the chat entry to the selected folder
          addToFolder(selectedFolderName, chatUrl, newName);
        }
      });
    });
  };
  // Append the new button to the menu
  menu.appendChild(addToFolderButton);
  
}
function createAndShowFolderDropdown(folderNames, callback) {
  // Create the modal
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.backgroundColor = '#202123'; // Slightly darker background
  modal.style.color = '#FFF';
  modal.style.padding = '20px';
  modal.style.borderRadius = '10px';
  modal.style.border = '1px solid #FFF'; // Light border
  modal.style.zIndex = '10000';
  // Create the question
  const question = document.createElement('p');
  question.textContent = 'Which folder would you like to add this to?';
  modal.appendChild(question);
  // Create the select element
  const select = document.createElement('select');
  select.classList.add('folder-dropdown');
  select.style.borderRadius = '5px'; // Rounded edges
  select.style.color = '#000'; // Black text color
  select.style.marginTop = '10px'; // Add margin to the top
  // Populate the dropdown with folder names
  folderNames.forEach(folderName => {
    const option = document.createElement('option');
    option.value = folderName;
    option.textContent = folderName;
    select.appendChild(option);
  });
  modal.appendChild(select);
  // Create a container for the buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.justifyContent = 'center'; // Center the buttons horizontally
  buttonContainer.style.gap = '30px'; // Add space between the buttons
  buttonContainer.style.marginTop = '10px';

  // Create the OK button
  const okButton = document.createElement('button');
  okButton.textContent = 'OK';
  okButton.onclick = function() {
    // Call the callback function with the selected folder name
    callback(select.value);
    // Remove the modal after selection
    modal.remove();
  };
  buttonContainer.appendChild(okButton);
  // Create the Cancel button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.onclick = function() {
    // Remove the modal when the Cancel button is clicked
    modal.remove();
  };
  buttonContainer.appendChild(cancelButton);
  // Append the button container to the modal
  modal.appendChild(buttonContainer);
  // Append the modal to the DOM
  document.body.appendChild(modal);
}
function createFolderDropdown(folderNames) {
  const folderName = window.prompt("Which folder would you like to add this to?\n\n" + folderNames.join("\n"));
  return folderName;
}
// Helper function to find the chat entry URL from the options menu
function findChatEntryUrl(optionsMenu) {
  // Traverse up the DOM to find the chat entry
  let chatEntry = optionsMenu.closest('div[data-projection-id]');
  if (!chatEntry) {
    console.error('Chat entry not found.');
    return;
  }
  // Extract the date from the chat entry as the identifier
  let chatDateElement = chatEntry.querySelector('h3');
  if (!chatDateElement) {
    console.error('Chat date element not found.');
    return;
  }
  let chatDate = chatDateElement.textContent.trim();
  // Construct the URL using the chat date as an identifier
  // (This will need to be adjusted based on how the actual URL can be retrieved)
  let chatUrl = `https://chat.openai.com/chat/${chatDate}`;
  return chatUrl;
}
// This function handles adding a chat entry to a folder
function addToFolder(folderName, chatUrl, chatName) {
  // Removed the prompt for the folder name
  chrome.storage.local.get({folders: {}}, function (data) {
    const folders = data.folders;
    if (!folders[folderName]) {
      folders[folderName] = [];
    }
    // Prevent adding duplicate chats based on URL
    const isExisting = folders[folderName].some(chat => chat.url === chatUrl);
    if (isExisting) {
      alert('This chat is already added to the folder.');
      return;
    }
    const chatData = {
      title: chatName, // Use the chat name passed from the calling function
      url: chatUrl
    };
    folders[folderName].push(chatData);
    chrome.storage.local.set({folders}, function() {
      console.log(`Chat '${chatName}' added to folder '${folderName}'`);
      // Refresh the folder display
      displayChatsForFolder(folderName);
    });
  });
}
// This function creates the folder interface in the DOM
function createFolderInterface() {
  const folderInterface = document.createElement('div');
  folderInterface.id = 'folder-interface';
  folderInterface.style.display = 'block';
  folderInterface.style.position = 'relative';
  folderInterface.style.width = '240px';
  folderInterface.style.backgroundColor = '#3e2f4f';
  folderInterface.style.color = '#FFF';
  folderInterface.style.zIndex = '1000';
  folderInterface.style.overflowY = 'auto';
  folderInterface.style.borderRadius = '5px';
  folderInterface.style.padding = '5px';
  folderInterface.style.maxHeight = '200px';
 
  // Insert the folder interface into the DOM
  const upperPart = document.querySelector('.flex-col.flex-1.transition-opacity.duration-500.-mr-2.pr-2.overflow-y-auto');
  if (upperPart) {
    upperPart.parentNode.insertBefore(folderInterface, upperPart.nextSibling);
  } else {
    console.error('Sidebar part not found.');
  }
  loadFolders(); // Populate the interface with folders
}
// Toggle function for the folder list
function toggleFolders() {
  const folders = document.querySelectorAll('#folder-interface .folder');
  const toggleButton = document.getElementById('folder-toggle');
  const isExpanded = toggleButton.textContent === '▼';
  folders.forEach(folder => {
    folder.style.display = isExpanded ? 'none' : 'block';
  });
  toggleButton.textContent = isExpanded ? '☰' : '▼';
}

// Function to create the toggle button
// Toggle function for the folder list
function toggleFolders() {
  const folders = document.querySelectorAll('#folder-interface .folder');
  const toggleButton = document.getElementById('folder-toggle');
  const isExpanded = toggleButton.textContent === '▼';
  folders.forEach(folder => {
    folder.style.display = isExpanded ? 'none' : 'block';
  });
  toggleButton.textContent = isExpanded ? '☰' : '▼';
}

// Function to create the toggle button
function createToggle() {
  const toggleButton = document.createElement('button');
  toggleButton.id = 'folder-toggle';
  toggleButton.textContent = '▼';
  toggleButton.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  `;
  toggleButton.onclick = function() {
    toggleFolders();
  };
  return toggleButton;
}
// Function to load and display folders, with buttons for folder management
function loadFolders() {
  chrome.storage.local.get({folders: {}}, function (data) {
    const folders = data.folders;
    const folderInterface = document.getElementById('folder-interface');
    folderInterface.innerHTML = '';

    // Create a new div for the folder list
    const folderListDiv = document.createElement('div');
    folderListDiv.style.overflow = 'auto';
    folderListDiv.style.maxHeight = '150px'; // Adjust this value as needed

    Object.keys(folders).forEach(folderName => {
      const folderDiv = document.createElement('div');
      folderDiv.textContent = folderName;
      folderDiv.className = 'folder';
      folderDiv.style.margin = '6px 0'; // Add margin to the top and bottom
      folderDiv.onclick = function() {
        displayChatsForFolder(folderName);
      };
      folderListDiv.appendChild(folderDiv);
      // Add management buttons (rename and delete)
      addFolderManagementButtons(folderDiv, folderName);
    });

    // Append the folder list div to the folder interface
    folderInterface.appendChild(folderListDiv);

    // Create a div for the new folder button and the toggle button
    const buttonDiv = document.createElement('div');
    buttonDiv.style.display = 'flex';
    buttonDiv.style.justifyContent = 'space-between';

    // Button to create a new folder
    const newFolderButton = document.createElement('button');
    newFolderButton.textContent = 'Create New Folder';
    newFolderButton.style.fontWeight = 'bold'; // Make the text bold
    newFolderButton.onclick = function() {
      const folderName = prompt('Name for the new folder:');
      if (folderName) {
        createNewFolder(folderName);
      }
    };
    buttonDiv.appendChild(newFolderButton);

    // Create the toggle button
    const toggleButton = createToggle();
    buttonDiv.appendChild(toggleButton);

    // Append the button div to the folder interface
    folderInterface.appendChild(buttonDiv);
  });
}

// This function adds folder management buttons for rename and delete
function addFolderManagementButtons(folderDiv, folderName) {
  const renameButton = document.createElement('button');
  renameButton.textContent = '✏️';
  renameButton.style.marginLeft = '10px'; // Add left margin
  renameButton.onclick = function(event) {
    event.stopPropagation();
    const newFolderName = prompt('New name for the folder:', folderName);
    if (newFolderName) {
      renameFolder(folderName, newFolderName);
    }
  };
  folderDiv.appendChild(renameButton);
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '🗑️';
  deleteButton.onclick = function(event) {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete the folder '${folderName}'?`)) {
      deleteFolder(folderName);
    }
  };
  folderDiv.appendChild(deleteButton);
}
// This function handles the creation of a new folder
function createNewFolder(folderName) {
  chrome.storage.local.get({folders: {}}, function (data) {
    const folders = data.folders;
    if (!folders[folderName]) {
      folders[folderName] = [];
      chrome.storage.local.set({folders}, function() {
        loadFolders();
      });
    } else {
      alert('Folder already exists.');
    }
  });
}
// This function handles the renaming of a folder
function renameFolder(oldName, newName) {
  chrome.storage.local.get({folders: {}}, function (data) {
    const folders = data.folders;
    if (folders[newName]) {
      alert('A folder with this name already exists.');
    } else {
      folders[newName] = folders[oldName];
      delete folders[oldName];
      chrome.storage.local.set({folders}, function() {
        loadFolders();
      });
    }
  });
}
// This function handles the deletion of a folder
function deleteFolder(folderName) {
  chrome.storage.local.get({folders: {}}, function (data) {
    const folders = data.folders;
    delete folders[folderName];
    chrome.storage.local.set({folders}, function() {
      loadFolders();
    });
  });
}  }
});

} else {
  console.log('User has not paid and is not in trial period');
}
}).catch(error => {
console.error('Error getting user data:', error);
});
} else {
console.log('Extension is not enabled or user has not paid for premium features');
}
});