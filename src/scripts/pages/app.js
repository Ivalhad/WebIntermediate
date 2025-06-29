import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._initialAppShell();
  }

  _initialAppShell() {
    this._setupDrawer();
    this._updateLoginStatusUI();
  }

  _setupDrawer() {
    if (this.#drawerButton && this.#navigationDrawer) {
      this.#drawerButton.addEventListener('click', (event) => {
        event.stopPropagation();
        this.#navigationDrawer.classList.toggle('open');
      });

      document.body.addEventListener('click', (event) => {
        if (!this.#navigationDrawer.contains(event.target) && !this.#drawerButton.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      });

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          this.#navigationDrawer.classList.remove('open');
        });
      });
    }
  }
  
  _updateLoginStatusUI() {
    const token = localStorage.getItem('token');
    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register');
    const navLogout = document.getElementById('nav-logout');
    const navAddStory = document.getElementById('nav-add-story');

    if (token) {
      navLogin.style.display = 'none';
      navRegister.style.display = 'none';
      navLogout.style.display = 'block';
      navAddStory.style.display = 'block';
      
      const logoutButton = navLogout.querySelector('a');

      logoutButton.replaceWith(logoutButton.cloneNode(true));

      document.getElementById('nav-logout').querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        this._updateLoginStatusUI();
        window.location.hash = '#/login';
      });

    } else {
      navLogin.style.display = 'block';
      navRegister.style.display = 'block';
      navLogout.style.display = 'none';
      navAddStory.style.display = 'none';
    }
  }

  async renderPage() {
    this._updateLoginStatusUI(); 
    const url = getActiveRoute();
    const page = routes[url] || routes['/404'];

    try {
      this.#content.innerHTML = await page.render();
      await page.afterRender();

      const skipLink = document.querySelector('.skip-link');
      skipLink.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#main-content').focus();
      });
    } catch (error) {
      console.error('Error rendering page:', error);
      this.#content.innerHTML = '<h2>Oops, something went wrong. Please try refreshing the page.</h2>';
    }
  }
}

export default App;