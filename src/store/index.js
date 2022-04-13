import {createStore} from "vuex";
import axiosClient from '../axios'

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        currentPublication:{
            loading: true,
            data: {}
        },
        publicPublications: {
            loading:true,
            data: [],
            links:[]
        },
        publications: {
            loading: true,
            data:[],
            links:[]
        },
        notification: {
            show: false,
            type: null,
            message: null
        }
    },
    getters: {},
    actions: {
        getPublicPublications({commit}, {url = null} = {}){
            url = url || 'view/publication'
            commit("setPublicPublicationsLoading", true)
            return axiosClient.get(url)
                .then((res) => {
                    commit('setPublicPublicationsLoading', false)
                    commit('setPublicPublicationsData', res.data)
                    return data
                })
                .catch((err) => {
                    commit('setPublicPublicationsLoading', false)
                })
        },
        getPublications({commit}, {url = null} = {}){
            url = url || '/publication'
            commit("setPublicationsLoading", true)
            return axiosClient.get(url)
                .then((res) => {
                    commit('setPublicationsLoading', false)
                    commit('setPublicationsData', res.data)
                    return data
                })
                .catch((err) => {
                    commit('setPublicationsLoading', false)
                })
        },
        getPublication({commit}, id){
            commit("setCurrentPublicationLoading", true);
            return axiosClient
                    .get(`/publication/${id}`)
                    .then((res) => {
                        commit("setCurrentPublication", res.data);
                        commit("setCurrentPublicationLoading", false);
                        return res;
                    })
                    .catch((err) => {
                        commit("setCurrentPublicationLoading", false);
                        throw err;
                    })
        },
        savePublication({ commit }, publication){
            delete publication.image_url
            let response;
            if (publication.id){
                response = axiosClient
                            .put(`/publication/${publication.id}`, publication)
                            .then((res) => {
                                commit("setCurrentPublication", res.data);
                                return res;
                            });
            }else {
                response = axiosClient
                            .post("/publication", publication).then((res) => {
                                commit("setCurrentPublication", res.data);
                                return res;
                            });
            }
            return response;
        },
        deletePublication({commit}, id){
            return axiosClient.delete(`/publication/${id}`);
        },
        register({ commit }, user){
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    commit('setUser', data)
                    return data
                })
        },
        login({ commit }, user){
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    commit('setUser', data)
                    return data
                })
        },
        logout({commit}){
            return axiosClient.post('/logout')
                .then(response => {
                    commit('logout')
                    return response;
                })
        },
    },
    mutations: {
        setPublicationsLoading: (state, loading) => {
            state.publications.loading = loading
        },
        setPublicationsData: (state, publications) => {
            state.publications.data = publications.data
            state.publications.links = publications.meta.links
        },
        setPublicPublicationsLoading: (state, loading) => {
            state.publicPublications.loading = loading
        },
        setPublicPublicationsData: (state, publications) => {
            state.publicPublications.data = publications.data
            state.publicPublications.links = publications.meta.links
        },
        setCurrentPublicationLoading:(state, loading) => {
            state.currentPublication.loading = loading
        },
        setCurrentPublication:(state, publication) => {
            state.currentPublication.data = publication.data
        },
        logout : (state) => {
            state.user.data = {};
            state.user.token = null;
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token)
        },
        notify: (state, {message, type}) =>{
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(()=>{
                state.notification.show = false;
            }, 3000)
        }
    },
    modules: {}
});

export default store;