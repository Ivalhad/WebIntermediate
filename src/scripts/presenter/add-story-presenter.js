import { addStory } from '../data/api.js';
import { initMap } from '../utils/map.js';
import L from 'leaflet';

class AddStoryPresenter {
  constructor(view) {
    this.view = view;
    this.map = null;
    this.storyMarker = null;
    this.capturedImage = null;
  }

  // Mengambil token dari localStorage
  _getToken() {
    return localStorage.getItem('token');
  }

  // Inisialisasi halaman
  async init() {
    const token = this._getToken();
    if (!token) {
      this.view.onUnauthorized();
      return;
    }

    this._initMap();
    this._initCamera();
    this._initGeolocation();
    this._attachFormSubmitListener();
  }

  // Inisialisasi peta
  _initMap() {
    this.map = initMap('map-add');
    this.map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      this._updateMarkerAndInputs(lat, lng);
      this.map.setView([lat, lng]);
    });
  }

  // Inisialisasi kamera
  _initCamera() {
    const video = document.getElementById('camera-stream');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture-button');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
        })
        .catch(err => {
          console.error("Error accessing camera: ", err);
          this.view.onCameraError();
        });
    } else {
      this.view.onCameraError();
    }

    captureButton.addEventListener('click', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      canvas.toBlob(blob => {
        this.capturedImage = new File([blob], "captured-photo.jpg", { type: "image/jpeg" });
        this.view.onPhotoCaptured();
      }, 'image/jpeg');
    });
  }

  // Inisialisasi geolokasi
  _initGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.map.setView([latitude, longitude], 13);
          this._updateMarkerAndInputs(latitude, longitude);
          this.view.onLocationFound();
        },
        (error) => {
          console.error('Error getting location:', error.message);
          this.view.onLocationError();
        }
      );
    } else {
      this.view.onLocationError();
    }
  }

  // Memperbarui marker pada peta
  _updateMarkerAndInputs(lat, lon) {
    if (this.storyMarker) {
      this.storyMarker.remove();
    }
    this.storyMarker = L.marker([lat, lon]).addTo(this.map);
    this.view.setCoordinates(lat, lon);
  }

  // Menangani submit form
  _attachFormSubmitListener() {
    const form = document.getElementById('story-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const token = this._getToken();
      if (!token) {
        this.view.onUnauthorized();
        return;
      }

      const { description, photo, lat, lon } = this.view.getFormData(this.capturedImage);
      
      if (!description || !photo) {
        return this.view.onValidationError('Deskripsi dan foto tidak boleh kosong.');
      }

      if (!lat || !lon) {
        return this.view.onValidationError('Silakan pilih lokasi cerita di peta.');
      }
      
      try {
        const response = await addStory({ description, photo, lat, lon, token });
        if (!response.error) {
          this.view.onSubmissionSuccess();
        } else {
          this.view.onSubmissionFailed(response.message);
        }
      } catch (error) {
        console.error('Error adding story:', error);
        this.view.onSubmissionFailed('Gagal menambahkan cerita. Periksa koneksi Anda.');
      }
    });
  }
}

export default AddStoryPresenter;