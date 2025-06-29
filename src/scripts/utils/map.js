// src/scripts/utils/map.js
import L from 'leaflet';

// Mengatur ulang path ikon default Leaflet agar sesuai dengan folder 'dist/images'
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'images/marker-icon-2x.png',
  iconUrl: 'images/marker-icon.png',
  shadowUrl: 'images/marker-shadow.png',
});


const initMap = (elementId, center = [0, 0], zoom = 2) => {
  const map = L.map(elementId).setView(center, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);
  
  setTimeout(() => {
    map.invalidateSize();
  }, 100);

  return map;
};

const addMarkers = (map, items = []) => {
  items.forEach((item) => {
    if (item.coords && item.coords.length === 2 && !isNaN(item.coords[0]) && !isNaN(item.coords[1])) {
      
      const markerOptions = {};
      if (item.icon) {
        markerOptions.icon = item.icon;
      }

      const marker = L.marker(item.coords, markerOptions).addTo(map);
      
      if (item.popup) {
        marker.bindPopup(item.popup);
      }
    }
  });
};

export { initMap, addMarkers };