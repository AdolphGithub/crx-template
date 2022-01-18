chrome.devtools.panels.create("CRX Panel", "assets/img/icon_16.png", "devtools/panel.html", function(panel) { 
  console.log('创建成功了')
});

chrome.devtools.panels.elements.createSidebarPane("Crx Sidebar", function(sidebar) {
  sidebar.setPage("devtools/sidebar.html");
  sidebar.setHeight("8ex");
});