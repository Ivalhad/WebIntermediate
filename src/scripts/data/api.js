// src/scripts/data/api.js
import CONFIG from '../config.js';

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const register = async ({ name, email, password }) => {
  const response = await fetch(`${CONFIG.BASE_URL}/register`, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
};

const login = async ({ email, password }) => {
  const response = await fetch(`${CONFIG.BASE_URL}/login`, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

const getAllStories = async ({ page = 1, size = 10, location = 0, token }) => {
  const url = new URL(`${CONFIG.BASE_URL}/stories`);
  url.searchParams.append('page', page);
  url.searchParams.append('size', size);
  url.searchParams.append('location', location);

  const response = await fetch(url, {
    method: HTTP_METHOD.GET,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const getStoryDetail = async (id, token) => {
  const response = await fetch(
    `${CONFIG.BASE_URL}/stories/${id}`,
    {
      method: HTTP_METHOD.GET,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
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
    method: HTTP_METHOD.POST,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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
      method: HTTP_METHOD.POST,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    },
  );
  return response.json();
};

const subscribeNotification = async ({ subscription, token }) => {
  const response = await fetch(
    `${CONFIG.BASE_URL}/notifications/subscribe`,
    {
      method: HTTP_METHOD.POST,
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
      method: HTTP_METHOD.DELETE,
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