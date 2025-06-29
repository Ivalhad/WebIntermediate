// src/scripts/index.js
import { getRoute } from './routes/url-parser.js';
const path = getRoute();
import routes from './routes/routes.js';

const renderPage = async () => {
  const path = UrlParser.parseActiveUrlWithCombiner(); // contoh: '/stories', '/add-story'
  const page = routes[path] || routes['/404'];

  // Transisi halaman mulus
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      document.getElementById('app').innerHTML = page.render();
    }).finished.then(() => page.afterRender());
  } else {
    document.getElementById('app').innerHTML = page.render();
    await page.afterRender();
  }
};

window.addEventListener('hashchange', renderPage);
window.addEventListener('load', renderPage);