import axios from "axios"
import store from "./store"

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    return config;
});

axiosClient.interceptors.response.use(function(response){
    return response
}, function(error){
    if (error.response.status === 401){
        sessionStorage.removeItem('TOKEN')
        window.location = '/login'
    }else{
        
        return Promise.reject(error)
    }
})

export default axiosClient;