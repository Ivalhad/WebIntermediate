// src/scripts/pages/story-list-page.js
import { getAllStories } from '../data/api.js';
import { initMap, addMarkers } from '../utils/map.js';

const StoryListPage = {
  render: () => `
    <section>
      <h2>Stories</h2>
      <div id="stories-container" class="stories-list"></div>
      <div id="map" style="height: 400px;"></div>
    </section>
  `,

  afterRender: async () => {
    const token = localStorage.getItem('token');
    const response = await getAllStories({ page: 1, size: 20, location: 1, token });
    if (response.error) {
      alert(response.message);
      return;
    }
    const container = document.getElementById('stories-container');
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
    // Inisialisasi peta dan marker
    const map = initMap('map');
    const markers = response.listStory
      .filter((s) => s.lat && s.lon)
      .map((s) => ({
        coords: [s.lat, s.lon],
        popup: `<strong>${s.name}</strong><br>${s.description}`,
      }));
    addMarkers(map, markers);
  },
};

export default StoryListPage;