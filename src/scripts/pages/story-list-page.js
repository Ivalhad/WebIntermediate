import StoryListPresenter from '../presenter/story-list-presenter.js';
import { initMap, addMarkers } from '../utils/map.js';
import L from 'leaflet';

const StoryListPage = {
  render: () => `
    <section>
      <h2>Stories</h2>
      <div id="stories-container" class="stories-list"></div>
      <div id="map" style="height: 400px; margin-top: 20px; border-radius: 8px;"></div>
    </section>
  `,

  afterRender: () => {
    // Inisialisasi presenter dan minta untuk memuat data
    const presenter = new StoryListPresenter(StoryListPage);
    presenter.getStories();
  },

  // === Metode yang dipanggil oleh Presenter ===

  showLoading: () => {
    const container = document.getElementById('stories-container');
    container.innerHTML = '<p>Loading stories...</p>';
  },

  showStories: (stories) => {
    const container = document.getElementById('stories-container');
    container.innerHTML = ''; 

    if (stories.length === 0) {
      container.innerHTML = '<p>Belum ada cerita yang ditambahkan.</p>';
      return;
    }
    
    // Render Story Cards
    stories.forEach((story) => {
      const card = document.createElement('div');
      card.className = 'story-card';
      card.innerHTML = `
        <img src="${story.photoUrl}" alt="Story by ${story.name}" />
        <h3>${story.name}</h3>
        <p>${story.description}</p>
        <p><small>${new Date(story.createdAt).toLocaleString()}</small></p>
      `;
      card.addEventListener('click', () => {
        window.location.hash = `#/stories/${story.id}`;
      });
      container.appendChild(card);
    });

    // Render Map Markers
    const map = initMap('map');
    const markers = stories
      .filter((s) => s.lat && s.lon)
      .map((s) => {
          const customIcon = L.icon({
              iconUrl: s.photoUrl,
              iconSize: [40, 40],
              className: 'custom-marker-icon'
          });
          return {
              coords: [s.lat, s.lon],
              popup: `<strong>${s.name}</strong><br>${s.description.substring(0, 30)}...`,
              icon: customIcon
          };
      });
      
    if (markers.length > 0) {
      addMarkers(map, markers);
    }
  },
  
  showError: (message) => {
    const container = document.getElementById('stories-container');
    container.innerHTML = `<p>${message}</p>`;
  },

  onUnauthorized: (message = 'Anda harus login untuk melihat cerita.') => {
    alert(message);
    window.location.hash = '#/login';
  },
};

export default StoryListPage;