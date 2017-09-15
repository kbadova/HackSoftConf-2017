import axios from 'axios';

const location = window.location;
const BASE_URL = `${location.protocol}//${location.host}`;

const dataExtractor = res => res.data;
const errorHandler = err => err;

export const bookingService = {
  createBooking(params) {
    const url = `${BASE_URL}/backend/booking/create/`;
    const config = {headers: {'X-CSRFToken': params.csrfToken}};
    return axios
      .post(url, params.data, config)
      .then(dataExtractor)
      .catch(errorHandler);
  }
};
