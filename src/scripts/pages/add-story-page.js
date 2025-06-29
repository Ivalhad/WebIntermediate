import { addStory } from '../data/api.js';
import { initMap } from '../utils/map.js';
import L from 'leaflet';

const AddStoryPage = {
  render: () => `
    <section>
      <h2>Add New Story</h2>
      <form id="story-form">
        <label for="description">Description</label>
        <textarea id="description" name="description" required></textarea>

        <label for="photo">Photo</label>
        <input type="file" id="photo" name="photo" accept="image/*" capture required />

        <div id="map-add" style="height: 300px; margin-top: 10px; border-radius: 8px; z-index: 0;"></div>
        <input type="hidden" id="lat" name="lat" />
        <input type="hidden" id="lon" name="lon" />

        <button type="submit">Submit</button>
      </form>
    </section>
  `,

  afterRender: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Anda harus login untuk menambah cerita.');
      window.location.hash = '#/login';
      return;
    }

    const form = document.getElementById('story-form');
    const latInput = document.getElementById('lat');
    const lonInput = document.getElementById('lon');
    const map = initMap('map-add');
    let storyMarker = null;

    // Fungsi untuk mengupdate marker dan input
    const updateMarkerAndInputs = (lat, lon) => {
      // Hapus marker lama jika ada
      if (storyMarker) {
        storyMarker.remove();
      }

      storyMarker = L.marker([lat, lon]).addTo(map);

      latInput.value = lat;
      lonInput.value = lon;
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          map.setView([latitude, longitude], 13);

          updateMarkerAndInputs(latitude, longitude);
          alert('Lokasi Anda saat ini berhasil ditemukan!');
        },
        (error) => {
          console.error('Error getting location:', error.message);
          alert('Gagal mendapatkan lokasi Anda. Silakan pilih lokasi secara manual di peta.');
        },
      );
    } else {
      alert('Geolocation tidak didukung oleh browser ini. Silakan pilih lokasi secara manual.');
    }

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      updateMarkerAndInputs(lat, lng);
      map.setView([lat, lng]);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const description = form.description.value;
      const photo = form.photo.files[0];
      const lat = latInput.value;
      const lon = lonInput.value;
      
      const currentToken = localStorage.getItem('token');
      if (!currentToken) {
        alert('Sesi Anda telah berakhir. Silakan login kembali.');
        window.location.hash = '#/login';
        return;
      }
      
      if (!description || !photo) {
        alert('Deskripsi dan foto tidak boleh kosong.');
        return;
      }

      if (!lat || !lon) {
        alert('Silakan pilih lokasi cerita di peta terlebih dahulu.');
        return;
      }

      try {
        const response = await addStory({ description, photo, lat, lon, token: currentToken });
        if (!response.error) {
          alert('Story berhasil ditambahkan');
          window.location.hash = '#/stories';
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error('Error adding story:', error);
        alert('Gagal menambahkan cerita. Periksa koneksi Anda.');
      }
    });
  },
};

export default AddStoryPage;