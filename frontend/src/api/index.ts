import axios from "axios";

import { authAPI } from "./auth";
import { languagesAPI } from "./language";
import { wordAPI } from "./word";

export const instance = axios.create({
    // withCredentials: true,
    baseURL: 'http://localhost:8080/',
});

export const getToken = () => localStorage.getItem('token');

export { authAPI, languagesAPI, wordAPI };
