(function() {
  // make it work in all browsers
  window.browser = window.msBrowser || window.browser || window.chrome;

  // let background now that we exist
  const background = browser.runtime.connect({
    name: 'content'
  });

  background.onMessage.addListener(function(message) {
    if (message.har) {
      console.log('We got the HAR from devtools: ' +  JSON.stringify(message.har, undefined, 2));
      // We wanna make the HAR availible for users
    }
  });

  // IRL we want to wait some more time here to see that the page is "really"
  // finished
  window.onload = function() {
    // tell the background page that we want the HAR
    background.postMessage({
      'getHAR': true
    });
  }
}());
