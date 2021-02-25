import axios from "axios";

import { authAPI } from "./auth";
import { languagesAPI } from "./language";

export const instance = axios.create({
    // withCredentials: true,
    baseURL: 'http://localhost:8080/',
});

export { authAPI, languagesAPI };
