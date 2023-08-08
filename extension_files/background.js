```javascript
let activeTabId = null;

chrome.browserAction.onClicked.addListener((tab) => {
  activeTabId = tab.id;
  sendMessageToTab(activeTabId, { messageType: 'ACTIVATE_EXTENSION' });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  handleMessage(request, sender, sendResponse);
});

function sendMessageToTab(tabId, message) {
  chrome.tabs.sendMessage(tabId, message);
}

function handleMessage(request, sender, sendResponse) {
  if (request.messageType === 'RECIPE_CONTENT') {
    sendResponse({ content: request.content });
  }
}
```