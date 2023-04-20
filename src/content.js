// 注入js到页面上去.
function injectScript(url) {
  const s = document.createElement('script')
  s.src = chrome.runtime.getURL(url)

  s.onload = function() {
    // s.remove()
  }

  document.body.appendChild(s);
}

(function(doc) {
  const container_wrap = doc.createElement('div')
  const container = doc.createElement('div')
  container.className = 'demo_container'
  container.id = 'demo_container'
  container.style.width = '150px'
  container.style.height = '300px'
  container.style.zIndex = '1000'
  container.style.position = 'fixed'
  container.style.right = 0;
  container.style.top = '50%'
  container.style.transform = 'translateY(-50%)'

  container_wrap.appendChild(container)
  doc.body.insertAdjacentElement('afterend', container_wrap)
})(document);

// 这里就是注入了.
injectScript('inject.js');
