import AddStoryPresenter from '../presenter/add-story-presenter.js';

const AddStoryPage = {
  render: () => `
    <section>
      <h2>Add New Story</h2>
      <form id="story-form">
        <label for="description">Description</label>
        <textarea id="description" name="description" required></textarea>

        <video id="camera-stream" width="100%" autoplay style="margin-top: 10px;"></video>
        <canvas id="canvas" style="display:none;"></canvas>
        <button type="button" id="capture-button" style="margin-top: 5px;">Capture Photo</button>

        <label for="photo" style="margin-top: 15px;">Or Upload Photo</label>
        <input type="file" id="photo" name="photo" accept="image/*" />

        <div id="map-add" style="height: 300px; margin-top: 10px; border-radius: 8px; z-index: 0;"></div>
        <input type="hidden" id="lat" name="lat" />
        <input type="hidden" id="lon" name="lon" />

        <button type="submit" style="margin-top: 15px;">Submit</button>
      </form>
    </section>
  `,

  afterRender: () => {
    // Inisialisasi Presenter dan serahkan kontrol padanya
    const presenter = new AddStoryPresenter(AddStoryPage);
    presenter.init();
  },

  // === Metode yang dipanggil oleh Presenter ===
  
  getFormData: (capturedImage) => {
    const form = document.getElementById('story-form');
    return {
      description: form.description.value,
      photo: capturedImage || form.photo.files[0],
      lat: form.lat.value,
      lon: form.lon.value
    };
  },

  setCoordinates: (lat, lon) => {
    document.getElementById('lat').value = lat;
    document.getElementById('lon').value = lon;
  },
  
  onUnauthorized: () => {
    alert('Anda harus login untuk menambah cerita.');
    window.location.hash = '#/login';
  },

  onPhotoCaptured: () => {
    alert('Photo captured successfully!');
  },

  onCameraError: () => {
    document.getElementById('camera-stream').style.display = 'none';
    document.getElementById('capture-button').style.display = 'none';
  },
  
  onLocationFound: () => {
    alert('Lokasi Anda saat ini berhasil ditemukan!');
  },

  onLocationError: () => {
    alert('Gagal mendapatkan lokasi. Silakan pilih lokasi secara manual di peta.');
  },

  onValidationError: (message) => {
    alert(message);
  },

  onSubmissionSuccess: () => {
    alert('Story berhasil ditambahkan');
    window.location.hash = '#/stories';
  },

  onSubmissionFailed: (message) => {
    alert(message);
  },
};

export default AddStoryPage;