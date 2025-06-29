import { getAllStories } from '../data/api.js';
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

  afterRender: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Anda harus login untuk melihat cerita.');
      window.location.hash = '#/login';
      return;
    }

    try {
      const response = await getAllStories({ page: 1, size: 20, location: 1, token });
      if (response.error) {
        alert(response.message);
        if (response.message.toLowerCase().includes('token')) {
            localStorage.removeItem('token');
            window.location.hash = '#/login';
        }
        return;
      }

      const container = document.getElementById('stories-container');
      container.innerHTML = ''; 
      
      if (response.listStory.length === 0) {
        container.innerHTML = '<p>Belum ada cerita yang ditambahkan.</p>';
      } else {
        response.listStory.forEach((story) => {
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
      }

      const map = initMap('map');
      
      const markers = response.listStory
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

    } catch (error) {
      console.error('Failed to fetch stories:', error);
      document.getElementById('stories-container').innerHTML = '<p>Gagal memuat cerita. Silakan coba lagi nanti.</p>';
    }
  },
};

export default StoryListPage;