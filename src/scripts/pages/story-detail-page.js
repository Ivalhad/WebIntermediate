import { getActivePathname, parsePathname } from '../routes/url-parser.js';
import { getStoryDetail } from '../data/api.js';
import { initMap, addMarkers } from '../utils/map.js';
import L from 'leaflet';

const StoryDetailPage = {

  render: () => ` 
    <section class="story-detail-container">
      <h2>Story Detail</h2>
      <div id="story-detail"></div>
      <div id="map-detail" style="height: 300px; margin-top: 20px; border-radius: 8px;"></div>
    </section>
  `,

  afterRender: async () => {
    const { id } = parsePathname(getActivePathname());
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Anda harus login untuk melihat detail cerita.');
      window.location.hash = '#/login';
      return;
    }

    if (!id) {
      console.error('Story ID not found in URL');
      return;
    }

    try {
      const response = await getStoryDetail(id, token);
      if (response.error) {
        alert(response.message);
        return;
      }
      const story = response.story;
      const container = document.getElementById('story-detail');

      container.innerHTML = `
        <div style="text-align: center;">
          <img src="${story.photoUrl}" alt="Story by ${story.name}" style="max-width: 100%; max-height: 400px; border-radius: 8px; margin-bottom: 16px; object-fit: contain;">
          <h3>${story.name}</h3>
          <p>${story.description}</p>
          <p><small>${new Date(story.createdAt).toLocaleString()}</small></p>
        </div>
      `;

      const map = initMap('map-detail', [story.lat, story.lon], 13);

      const customIcon = L.icon({
        iconUrl: story.photoUrl,
        iconSize: [60, 60],
        className: 'custom-marker-icon'
      });

      addMarkers(map, [
        { coords: [story.lat, story.lon], popup: `<b>${story.name}</b>`, icon: customIcon }
      ]);

    } catch (error) {
      console.error('Failed to fetch story detail:', error);
      const detailContainer = document.getElementById('story-detail');
      if(detailContainer) {
          detailContainer.innerHTML = '<p>Gagal memuat detail cerita.</p>';
      }
      const mapContainer = document.getElementById('map-detail');
      if(mapContainer) {
          mapContainer.style.display = 'none';
      }
    }
  },
};

export default StoryDetailPage;