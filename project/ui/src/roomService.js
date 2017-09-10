import axios from 'axios';

const location = window.location;
const BASE_URL = `${location.protocol}//${location.host}`;

const dataExtractor = res => res.data;
const errorHandler = err => {
  return Promise.reject(err);
};

export const roomService = {
  fetchRooms() {
    return axios
      .get(`${BASE_URL}/backend/rooms/`)
      .then(dataExtractor)
      .catch(errorHandler);
  }
};
