import axios from "axios";
import base_Url from "./baseURL";

const api = axios.create({ baseURL: base_Url });
const token = localStorage.getItem("token")

api.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
});

export default api;