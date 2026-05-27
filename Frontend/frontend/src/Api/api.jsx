import axios from 'axios';

const BASE_URL = "https://eemc-innovations-2026-production.up.railway.app/api";

const api = axios.create({
    baseURL : BASE_URL
})


export default api;