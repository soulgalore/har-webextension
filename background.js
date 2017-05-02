// make it work in all browsers
window.browser = window.msBrowser || window.browser || window.chrome;

const connections = {};

function setupListener(connection) {

  const listener = function(message, who, sendResponse) {

      const tabId = connection.name === 'devtools' ? message.tabId : who.sender.tab.id;
      const c = connections[tabId] = (connections[tabId] || {});
      c[connection.name] = connection;
      listener.close = function() {
          delete c[connection.name];
      }
      // we got a HAR from devtools, pass it on to the content page
      if (connection.name === 'devtools' && c.content && message.har) {
          c.content.postMessage(message);
      }
      // we got a getHAR message from content, tell
      // devtools to collect it
      else if (c.devtools && message.getHAR) {
        if (connection.name === 'content' && c.devtools && message.getHAR) {
            c.devtools.postMessage(message);
        }
      }
      // we don't care about this message
    }

    // add the listener
    connection.onMessage.addListener(listener);

    // closedown
    connection.onDisconnect.addListener(function() {
        if (listener.close) {
            listener.close();
        }
        connection.onMessage.removeListener(listener);
    });

}

browser.runtime.onConnect.addListener(function(connection) {
    setupListener(connection);
});
