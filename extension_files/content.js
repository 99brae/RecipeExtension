```javascript
let recipeContent = '';

function filterContent() {
    let bodyContent = document.body.innerText;
    let lines = bodyContent.split('\n');
    let recipeStart = false;

    for (let line of lines) {
        if (line.toLowerCase().includes('ingredients') || line.toLowerCase().includes('instructions')) {
            recipeStart = true;
        }
        if (recipeStart) {
            recipeContent += line + '\n';
        }
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.messageType === 'ACTIVATE_EXTENSION') {
        filterContent();
        sendResponse({messageType: 'RECIPE_CONTENT', content: recipeContent});
    }
});

function handleMessage(request, sender, sendResponse) {
    if (request.messageType === 'ACTIVATE_EXTENSION') {
        filterContent();
        sendResponse({messageType: 'RECIPE_CONTENT', content: recipeContent});
    }
}

chrome.runtime.onMessage.addListener(handleMessage);
```