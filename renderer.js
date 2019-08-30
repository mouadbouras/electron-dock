// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//const remote = require('electron'); 

var switchView = require('electron').remote.require('./main').switchView;
console.log(tabUrl);

function switchTab(tabId)
{
    switchView(tabId);
    console.log(tabUrl);
}