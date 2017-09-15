import axios from 'axios';

const location = window.location;
const BASE_URL = `${location.protocol}//${location.host}`;

const dataExtractor = res => res.data;
const errorHandler = err => err;

export const tenantService = {
  fetchTenants() {
    return axios
      .get(`${BASE_URL}/backend/tenants/`)
      .then(dataExtractor)
      .catch(errorHandler);
  }
};
