// make it work in all browsers
window.browser = window.msBrowser || window.browser || window.chrome;

const backgroundConnection = browser.runtime.connect({
  name: 'devtools'
});

backgroundConnection.onMessage.addListener(function(message) {
  if (message.getHAR) {
    browser.devtools.network.getHAR(function(har) {
      backgroundConnection.postMessage({
        tabId: browser.devtools.inspectedWindow.tabId,
        har: har
      });
    })
  }
});

// tell background that we exist
backgroundConnection.postMessage({
  tabId: browser.devtools.inspectedWindow.tabId
});
