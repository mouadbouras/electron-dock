// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//const remote = require('electron'); 
const switchView = require('electron').remote.require('./main').switchView;
const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('appViews', function (event,appViews) {
    console.log("the views are in!");
    console.log(appViews);
});

foreach(appViews)
{
    document.getElementById("demo").innerHTML += appViews.viewName;
}

console.log(tabUrl);

function switchTab(tabId)
{
    switchView(tabId);
    console.log(tabUrl);
}