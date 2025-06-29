// src/scripts/pages/add-story-page.js
import { addStory } from '../data/api.js';
import { initMap } from '../utils/map.js';

const AddStoryPage = {
  render: () => `
    <section>
      <h2>Add New Story</h2>
      <form id="story-form">
        <label for="description">Description</label>
        <textarea id="description" name="description" required></textarea>

        <label for="photo">Photo</label>
        <input type="file" id="photo" name="photo" accept="image/*" capture required />

        <div id="map-add" style="height: 300px;"></div>
        <input type="hidden" id="lat" name="lat" />
        <input type="hidden" id="lon" name="lon" />

        <button type="submit">Submit</button>
      </form>
    </section>
  `,

  afterRender: () => {
    const form = document.getElementById('story-form');
    const map = initMap('map-add');
    let selectedCoords = null;
    map.on('click', (e) => {
      selectedCoords = e.latlng;
      document.getElementById('lat').value = selectedCoords.lat;
      document.getElementById('lon').value = selectedCoords.lng;
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const description = form.description.value;
      const photo = form.photo.files[0];
      const lat = form.lat.value;
      const lon = form.lon.value;
      const token = localStorage.getItem('token');
      const response = await addStory({ description, photo, lat, lon, token });
      if (!response.error) {
        alert('Story berhasil ditambahkan');
        window.location.hash = '#/stories';
      } else {
        alert(response.message);
      }
    });
  },
};

export default AddStoryPage;