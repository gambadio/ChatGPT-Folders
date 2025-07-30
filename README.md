# ChatGPT Folders 📁

**Organize your ChatGPT conversations with ease**

ChatGPT Folders is a powerful browser extension that transforms the way you manage and organize your ChatGPT conversations. Instead of scrolling through an endless list of chats, create custom folders to categorize your conversations by topic, project, or any system that works for you.

![Extension Preview](icon.png)

## ✨ Features

### Core Functionality
- **Folder Organization**: Create unlimited custom folders to categorize your conversations
- **One-Click Chat Management**: Add any ChatGPT conversation to a folder with a single click
- **Seamless Integration**: Works directly within the ChatGPT interface - no need to switch tabs or windows
- **Instant Access**: View and navigate all your organized chats from a clean, intuitive sidebar

### Advanced Management
- **Folder Operations**: Rename and delete folders as your organizational needs evolve
- **Chat Editing**: Rename individual chats for better identification
- **Duplicate Prevention**: Smart detection prevents adding the same chat to a folder multiple times
- **Collapsible Interface**: Toggle folder visibility to maximize your workspace

### Premium Features
- **7-Day Free Trial**: Experience all features risk-free
- **Full Feature Access**: Unlock the complete ChatGPT Folders experience
- **Secure Payment Processing**: Powered by ExtPay for safe, reliable transactions

## 🚀 Installation

### From Source (Development)
1. **Clone the repository**:
   ```bash
   git clone https://github.com/gambadio/ChatGPT-Folders.git
   cd ChatGPT-Folders
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Load the extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the project directory
   - The ChatGPT Folders extension should now appear in your extensions list

## 📖 How to Use

### Getting Started
1. **Install the extension** and visit [chat.openai.com](https://chat.openai.com)
2. **Start your free trial** by clicking the extension icon and selecting "Start 7 Days Trial"
3. **Create your first folder** using the "Create New Folder" button in the sidebar

### Adding Chats to Folders
1. **Navigate to any ChatGPT conversation**
2. **Click the three-dot menu** (⋯) next to any chat in your sidebar
3. **Select "Add to Folder"** from the dropdown menu
4. **Choose your destination folder** from the modal dialog
5. **Customize the chat name** if desired (defaults to the page title)

### Managing Your Organization
- **Create folders**: Use the "Create New Folder" button in the extension sidebar
- **Rename folders**: Click the ✏️ icon next to any folder name
- **Delete folders**: Click the 🗑️ icon to remove folders (with confirmation)
- **Edit chat names**: Use the ✏️ icon next to individual chats within folders
- **Remove chats**: Click the 🗑️ icon to delete chats from folders

### Interface Controls
- **Toggle folder visibility**: Use the ▼/☰ button to collapse/expand the folder list
- **Navigate between views**: Use the "Back to Folders" button when viewing individual folder contents
- **Enable/disable extension**: Toggle the switch in the extension popup

## 🛠️ Technical Details

### Architecture
- **Manifest Version**: 3 (latest Chrome extension standard)
- **Content Scripts**: Seamlessly integrates with ChatGPT's interface
- **Service Worker**: Efficient background processing
- **Local Storage**: All your folder organization stays private on your device

### File Structure
```
ChatGPT-Folders/
├── manifest.json          # Extension configuration
├── content.js             # Main functionality and UI integration
├── background.js          # Service worker for background tasks
├── popup.html             # Extension popup interface
├── popup.js               # Popup functionality and controls
├── ExtPay.js              # Payment processing integration
├── icon.png               # Extension icon
├── small-picture.png      # Popup interface image
└── package.json           # Node.js dependencies
```

### Permissions
- `storage`: Save your folder organization locally
- `activeTab`: Interact with the current ChatGPT tab
- `scripting`: Inject functionality into the ChatGPT interface

### Browser Compatibility
- **Chrome**: Fully supported (Manifest V3)
- **Edge**: Compatible (Chromium-based)
- **Firefox**: Not currently supported (requires Manifest V2 adaptation)

## 🔒 Privacy & Security

Your privacy is paramount. ChatGPT Folders:
- **Stores all data locally** on your device
- **Never transmits your conversations** to external servers
- **Only processes payment information** through secure ExtPay integration
- **Operates entirely client-side** for maximum privacy

## 💳 Pricing & Trial

- **7-Day Free Trial**: Experience all features completely free
- **Premium Access**: Unlock unlimited folder creation and advanced management
- **Secure Payments**: Processed safely through ExtPay
- **Money-Back Guarantee**: Contact support if you're not satisfied

## 🤝 Contributing

We welcome contributions to make ChatGPT Folders even better! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Guidelines
- Follow existing code style and conventions
- Test your changes across different ChatGPT interface states
- Update documentation for any new features
- Ensure backward compatibility when possible

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea for improvement? We'd love to hear from you!

- **Bug Reports**: Open an issue with detailed reproduction steps
- **Feature Requests**: Describe your use case and desired functionality
- **General Questions**: Reach out through our support channels

## 📄 License

**ChatGPT Folders** is released under a **Custom Non-Commercial License**.

### Terms Summary:
- ✅ **Personal Use**: Free to use for personal, educational, and non-commercial purposes
- ✅ **Modification**: You may modify the code for personal use
- ✅ **Distribution**: You may share and distribute for non-commercial purposes
- ❌ **Commercial Use**: Commercial use requires explicit written permission

### Commercial Licensing
For commercial use, enterprise licenses, or custom integrations, please contact:

**Email**: ricardo.kupper@adalala.com  
**Subject**: ChatGPT Folders Commercial License Inquiry

We offer flexible commercial licensing options for businesses, teams, and organizations.

## 📞 Support & Contact

### Quick Support
- **Extension Issues**: Click the extension icon → "Manage Account"
- **Payment Questions**: Use the "Check Payment Status" button
- **User Agreement**: Available in the extension popup

### Additional Resources
- **Project Website**: [ChatGPT Folders Official Site](https://www.teenagetech.xyz/chatgptfolders)
- **User Agreement**: [Terms of Service](https://www.teenagetech.xyz/useragreementfolders)
- **GitHub Issues**: Report bugs and request features here

## 🌟 Why ChatGPT Folders?

In my experience working with ChatGPT daily, I kept returning to this fundamental problem: how do you organize dozens or hundreds of conversations without losing your mind? The default ChatGPT interface shows everything chronologically, which works fine until you're juggling projects, research topics, creative writing, coding help, and random questions all in one endless list.

ChatGPT Folders solves this elegantly. Instead of mentally categorizing conversations every time you return to ChatGPT, you create the organizational structure once and maintain it effortlessly. It's like the difference between throwing all your documents in one folder versus having a proper filing system - both technically work, but one scales beautifully while the other becomes increasingly painful.

The extension feels natural because it integrates directly into ChatGPT's existing interface rather than forcing you to learn a completely new workflow. You're still using ChatGPT exactly as before, but now with the organizational power that should have been there from the beginning.

## 🚀 What's Next?

Future versions are planned to include:
- **Folder Sharing**: Collaborate with team members on organized chat collections
- **Smart Auto-Organization**: AI-powered suggestions for chat categorization
- **Advanced Search**: Find conversations across all folders instantly
- **Export Functionality**: Backup your organized conversations
- **Cross-Browser Support**: Firefox and Safari compatibility

---

**Made with ❤️ for the ChatGPT community**

*Transform your ChatGPT experience from chaotic to organized. Try ChatGPT Folders today!*
