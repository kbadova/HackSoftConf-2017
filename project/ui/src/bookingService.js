import axios from 'axios';

const location = window.location;
const BASE_URL = `${location.protocol}//${location.host}`;

export const bookingService = {
    createBooking(params) {
        const url = `${BASE_URL}/backend/booking/create/`;
        const config = {headers: {'X-CSRFToken': params.csrfToken}};
        return axios.post(url, params.data, config);
    }
};
