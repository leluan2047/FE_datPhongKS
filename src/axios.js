import Axios from "axios";

export const axios = Axios.create({
    baseURL: 'https://fierce-peak-31965.herokuapp.com/api'
    // baseURL: 'http://localhost:8000/api'
});

axios.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
        return config;
    }
);