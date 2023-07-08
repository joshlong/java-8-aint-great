function setup() {
  // document.body.style.backgroundColor = 'red';
  window.alert ( 'mooo' )
}

chrome.scripting.executeScript({
  target : { tabId : tab.id },
  func : changeBackgroundColor,
})
.then(setup)
