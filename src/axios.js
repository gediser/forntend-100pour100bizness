import axios from "axios"
import store from "./store"
import { useRouter } from "vue-router";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    return config;
}, (error) => {
    if (error.response.status === 403){
        const router = useRouter();
        router.push({name: "Login"})
    }
    return Promise.reject(error);
});

export default axiosClient;