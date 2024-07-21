import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL || "https://ecomzy-e-commerce.vercel.app";

export default axios.create({
    baseURL: baseURL,
    withCredentials: true,
});
