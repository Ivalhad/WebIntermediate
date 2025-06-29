// src/scripts/utils/map.js
import L from 'leaflet';

const initMap = (elementId, center = [0, 0], zoom = 2) => {
  const map = L.map(elementId).setView(center, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);
  return map;
};

const addMarkers = (map, items = []) => {
  items.forEach((item) => {
    const marker = L.marker(item.coords).addTo(map);
    if (item.popup) marker.bindPopup(item.popup);
  });
};

export { initMap, addMarkers };