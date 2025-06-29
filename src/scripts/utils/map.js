// src/scripts/utils/map.js
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'images/marker-icon-2x.png',
  iconUrl: 'images/marker-icon.png',
  shadowUrl: 'images/marker-shadow.png',
});


const initMap = (elementId, center = [0, 0], zoom = 2) => {

  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

  const stadiaDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	  maxZoom: 20,
	  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  });

  const openTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	  maxZoom: 17,
	  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  

  const baseMaps = {
    "Normal": osm,
    "Gelap": stadiaDark,
    "Topografi": openTopo,
  };

  const map = L.map(elementId, {
    center: center,
    zoom: zoom,
    layers: [osm] 
  });


  L.control.layers(baseMaps).addTo(map);

  
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