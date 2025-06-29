// Mengimpor CSS dari library dan styles utama
import 'leaflet/dist/leaflet.css';
import '../styles/styles.css';

// Mengimpor App class
import App from './pages/app.js';

const app = new App({
  drawerButton: document.getElementById('drawer-button'),
  navigationDrawer: document.querySelector('.navigation-drawer'),
  content: document.getElementById('main-content'),
});

// Fungsi untuk menangani rendering halaman dengan transisi
const handleRender = () => {
  // Cek apakah browser mendukung View Transition API
  if (!document.startViewTransition) {
    // Jika tidak, lakukan render biasa tanpa animasi
    app.renderPage();
    return;
  }

  // Jika didukung, jalankan transisi
  document.startViewTransition(() => {
    // Proses update DOM (render halaman baru) terjadi di sini
    return app.renderPage();
  });
};

// Event listener untuk merender halaman saat hash berubah
window.addEventListener('hashchange', handleRender);

// Event listener untuk merender halaman awal saat halaman dimuat
window.addEventListener('load', handleRender);