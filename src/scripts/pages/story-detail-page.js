// src/scripts/pages/story-detail-page.js
import { getActivePathname } from '../routes/url-parser.js';
const pathname = getActivePathname();
const [, , id] = pathname.split('/');    
import { getStoryDetail } from '../data/api.js';
import { initMap, addMarkers } from '../utils/map.js';

const StoryDetailPage = {
  render: () => `
    <section>
      <h2>Story Detail</h2>
      <div id="story-detail"></div>
      <div id="map-detail" style="height: 300px;"></div>
    </section>
  `,

  afterRender: async () => {
    const { id } = UrlParser.parseActiveUrlWithoutCombiner();
    const token = localStorage.getItem('token');
    const response = await getStoryDetail(id, token);
    if (response.error) {
      alert(response.message);
      return;
    }
    const story = response.story;
    const container = document.getElementById('story-detail');
    container.innerHTML = `
      <img src="${story.photoUrl}" alt="Story by ${story.name}" />
      <h3>${story.name}</h3>
      <p>${story.description}</p>
      <p><small>${new Date(story.createdAt).toLocaleString()}</small></p>
    `;
    const map = initMap('map-detail', [story.lat, story.lon], 5);
    addMarkers(map, [
      { coords: [story.lat, story.lon], popup: `${story.name}` }
    ]);
  },
};

export default StoryDetailPage;