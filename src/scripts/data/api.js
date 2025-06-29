import CONFIG from '../config.js';

const register = async ({ name, email, password }) => {
  const response = await fetch(`${CONFIG.BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
};

const login = async ({ email, password }) => {
  const response = await fetch(`${CONFIG.BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

const addStory = async ({ description, photo, lat, lon, token }) => {
  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  if (lat && lon) {
    formData.append('lat', lat);
    formData.append('lon', lon);
  }

  const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return response.json();
};

const getAllStories = async ({ page, size, location, token }) => {
  const response = await fetch(
    `${CONFIG.BASE_URL}/stories?page=${page}&size=${size}&location=${location ? 1 : 0}`, // Menggunakan CONFIG.BASE_URL
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-cache',
    },
  );
  return response.json();
};

const getStoryDetail = async (id, token) => {
  const response = await fetch(`${CONFIG.BASE_URL}/stories/${id}`, { // Menggunakan CONFIG.BASE_URL
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  });
  return response.json();
};

const addStoryGuest = async ({ description, photo, lat, lon }) => {
  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  if (lat && lon) {
    formData.append('lat', lat);
    formData.append('lon', lon);
  }

  const response = await fetch(
    `${CONFIG.BASE_URL}/stories/guest`,
    {
      method: 'POST',
      body: formData,
    },
  );
  return response.json();
};

const subscribeNotification = async ({ subscription, token }) => {
  const response = await fetch(
    `${CONFIG.BASE_URL}/notifications/subscribe`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    },
  );
  return response.json();
};

const unsubscribeNotification = async ({ endpoint, token }) => {
  const response = await fetch(
    `${CONFIG.BASE_URL}/notifications/subscribe`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ endpoint }),
    },
  );
  return response.json();
};


export {
  register,
  login,
  getAllStories,
  getStoryDetail,
  addStory,
  addStoryGuest,
  subscribeNotification,
  unsubscribeNotification,
};