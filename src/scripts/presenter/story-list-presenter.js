import { getAllStories } from '../data/api.js';

class StoryListPresenter {
  constructor(view) {
    this.view = view;
  }

  // Mengambil token dari localStorage
  _getToken() {
    return localStorage.getItem('token');
  }

  // Inisialisasi dan memuat cerita
  async getStories() {
    const token = this._getToken();
    if (!token) {
      return this.view.onUnauthorized();
    }

    this.view.showLoading();

    try {
      const response = await getAllStories({ page: 1, size: 20, location: 1, token });
      if (response.error) {
        // Jika token tidak valid, hapus dan arahkan ke login
        if (response.message.toLowerCase().includes('token')) {
          localStorage.removeItem('token');
          return this.view.onUnauthorized(response.message);
        }
        this.view.showError(response.message);
      } else {
        this.view.showStories(response.listStory);
      }
    } catch (error) {
      console.error('Failed to fetch stories:', error);
      this.view.showError('Gagal memuat cerita. Silakan coba lagi nanti.');
    }
  }
}

export default StoryListPresenter;