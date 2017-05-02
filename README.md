# Experimental HAR WebExtension
First step to try to automate HAR extraction from devtools using a WebExtension

## Background
Firefox 57 will drop support for old Firefox extensions and only support the new WebExtension standard. That means that [HAR Export Trigger](https://github.com/firebug/har-export-trigger/) will stop working and we need a way of getting the HAR.


## Current version
This version is only a way to test communicating between content/bakground and devtools.

1. Open the browser
2. Open devtools
3. Navigate to your URL
4. Check the console log, when the page load event is fired, the HAR is logged in the console.
