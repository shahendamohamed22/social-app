import axios from "axios";
import base_Url from "./baseURL";

const api = axios.create({ baseURL: base_Url });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
});

export default api;

