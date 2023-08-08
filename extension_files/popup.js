```javascript
let recipeContent = '';

document.getElementById('activateButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {messageType: 'ACTIVATE_EXTENSION', tabId: tabs[0].id});
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.messageType === 'RECIPE_CONTENT') {
        recipeContent = request.content;
        displayRecipe();
    }
});

function displayRecipe() {
    document.getElementById('recipeContainer').innerHTML = recipeContent;
}
```