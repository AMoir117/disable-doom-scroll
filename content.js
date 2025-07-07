// Remove the scrolling buttons on YouTube Shorts
function removeShortsScrollButtons() {
  const scrollButtons = document.evaluate(
    '/html/body/ytd-app/div[1]/ytd-page-manager/ytd-shorts/div[5]',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  if (scrollButtons) {
    scrollButtons.remove();
  }
}

// Disable scroll wheel on Shorts
function disableShortsScrollWheel() {
  // Shorts container
  const shortsContainer = document.querySelector('ytd-shorts');
  if (shortsContainer && !shortsContainer.__doomScrollWheelDisabled) {
    shortsContainer.addEventListener('wheel', function(e) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }, { passive: false });
    shortsContainer.__doomScrollWheelDisabled = true;
  }
}

// Remove the navigation container on YouTube Shorts
function removeShortsNavigationContainer() {
  const navContainer = document.querySelector('.navigation-container.style-scope.ytd-shorts');
  if (navContainer) {
    navContainer.remove();
  }
}

function applyAll() {
  removeShortsScrollButtons();
  disableShortsScrollWheel();
  removeShortsNavigationContainer();
}

// Run on load
applyAll();

// Observe for dynamic navigation (YouTube is SPA)
const observer = new MutationObserver(() => {
  applyAll();
});
observer.observe(document.body, { childList: true, subtree: true });

// Detect URL changes (SPA navigation) and re-apply logic
let lastUrl = location.href;
setInterval(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    // Only run on Shorts pages
    if (location.pathname.startsWith('/shorts')) {
      applyAll();
    }
  }
}, 500); 