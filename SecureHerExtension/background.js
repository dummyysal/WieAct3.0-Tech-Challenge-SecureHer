// Listen for selection on any active tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getSelectedText") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: getSelectedText,
        }, (results) => {
          const selectedText = results[0].result;
          sendResponse({ selectedText });
        });
      });
      return true; // keep the message channel open for async response
    }
  });
  
  // Function to get selected text from the active tab
  function getSelectedText() {
    return window.getSelection().toString();
  }
  
