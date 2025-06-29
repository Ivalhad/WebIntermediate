import 'leaflet/dist/leaflet.css';
import '../styles/styles.css';

import App from './pages/app.js';

const app = new App({
  drawerButton: document.getElementById('drawer-button'),
  navigationDrawer: document.querySelector('.navigation-drawer'),
  content: document.getElementById('main-content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});