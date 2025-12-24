import axios from "axios";

const STRAPI_URL = import.meta.env.VITE_CMS_URL;

export const api = axios.create({
  baseURL: `${STRAPI_URL}/api/`, 
});