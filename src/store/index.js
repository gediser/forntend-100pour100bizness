import { data } from "autoprefixer";
import {createStore} from "vuex";
import axiosClient from '../axios'

const store = createStore({
    state: {
        user: {
            data: {},
            role:'',
            token: sessionStorage.getItem('TOKEN'),
        },
        search:{
            q:'',
            loading: true,
            show:false,
            data:{
                publications:[],
                products:[]
            }
        },
        currentPublication:{
            loading: true,
            data: {}
        },
        currentProduct:{
            loading: true,
            data: {}
        },
        categories: {
            loaded: false,
            data:[]
        },
        publicPublications: {
            loading:true,
            data: [],
            links:[]
        },
        publicProducts: {
            loading:true,
            data: [],
            links:[]
        },
        publications: {
            loading: true,
            data:[],
            links:[]
        },
        products: {
            loading: true,
            data:[],
            links:[]
        },
        notification: {
            show: false,
            type: null,
            message: null
        },
        userDetailsPopUp:{
            show: false,
            data: {
                name: '',
                email: '',
                telephone: ''
            }
        }
    },
    getters: {},
    actions: {
        searchCategory({commit}, id){
            return axiosClient.post(`search/category/${id}`).then((res)=>{
                commit("setResultsSearchAll", res.data)
                return res
            })
        },
        searchAll({commit}, model){
            return axiosClient.post("search/all", model).then((res)=>{
                commit("setResultsSearchAll", res.data)
                return res
            })
        },
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
        getPublicProducts({commit}, {url = null} = {}){
            url = url || 'view/product'
            commit("setPublicProductsLoading", true)
            return axiosClient.get(url)
                .then((res) => {
                    commit('setPublicProductsLoading', false)
                    commit('setPublicProductsData', res.data)
                    return res
                })
                .catch((err) => {
                    commit('setPublicProductsLoading', false)
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
        getProducts({commit}, {url = null} = {}){
            url = url || '/product'
            commit("setProductsLoading", true)
            return axiosClient.get(url)
                .then((res) => {
                    commit('setProductsLoading', false)
                    commit('setProductsData', res.data)
                    return data
                })
                .catch((err) => {
                    commit('setProductsLoading', false)
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
        getCategories({commit}){
            return axiosClient.get('/categories')
                        .then((res) => {
                            commit("setCategories", res.data)
                            return res
                        })
        },
        getProduct({commit}, id){
            commit("setCurrentProductLoading", true);
            return axiosClient
                    .get(`/product/${id}`)
                    .then((res) => {
                        commit("setCurrentProduct", res.data);
                        commit("setCurrentProductLoading", false);
                        return res;
                    })
                    .catch((err) => {
                        commit("setCurrentProductLoading", false);
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
        saveProduct({ commit }, product){
            delete product.image_url
            let response;
            if (product.id){
                response = axiosClient
                            .put(`/product/${product.id}`, product)
                            .then((res) => {
                                commit("setCurrentProduct", res.data);
                                return res;
                            });
            }else {
                response = axiosClient
                            .post("/product", product).then((res) => {
                                commit("setCurrentProduct", res.data);
                                return res;
                            });
            }
            return response;
        },
        deletePublication({commit}, id){
            return axiosClient.delete(`/publication/${id}`);
        },
        deleteProduct({commit}, id){
            return axiosClient.delete(`/product/${id}`);
        },
        updateProfil({ commit }, user){
            return axiosClient.post('/update-profil', user)
                .then(({data}) => {
                    return data
                })
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
        
        setResultsSearchAll: (state, data)=>{
            state.search.data = data
            state.search.q = data.q
        },
        setPublicProductsData: (state, data) => {
            state.search.data = data
        },
        setPublicationsLoading: (state, loading) => {
            state.publications.loading = loading
        },
        setPublicationsData: (state, publications) => {
            state.publications.data = publications.data
            state.publications.links = publications.meta.links
        },
        setProductsLoading: (state, loading) => {
            state.products.loading = loading
        },
        setProductsData: (state, products) => {
            state.products.data = products.data
            state.products.links = products.meta.links
        },
        setPublicPublicationsLoading: (state, loading) => {
            state.publicPublications.loading = loading
        },
        setPublicPublicationsData: (state, publications) => {
            state.publicPublications.data = publications.data
            state.publicPublications.links = publications.meta.links
        },
        setPublicProductsLoading: (state, loading) => {
            state.publicProducts.loading = loading
        },
        setPublicProductsData: (state, products) => {
            state.publicProducts.data = products.data
            state.publicProducts.links = products.meta.links
        },
        setCurrentPublicationLoading:(state, loading) => {
            state.currentPublication.loading = loading
        },
        setCurrentPublication:(state, publication) => {
            state.currentPublication.data = publication.data
        },
        setCurrentProduct:(state, product) => {
            state.currentProduct.data = product.data
        },
        setCurrentProductLoading:(state, loading) => {
            state.currentProduct.loading = loading
        },
        logout : (state) => {
            state.user.data = {};
            state.user.token = null;
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            state.user.role = 'user'
            if (userData.user.roles.findIndex(item => item.name === 'admin') >=0){
                state.user.role = 'admin'
            }
            if (userData.user.roles.findIndex(item => item.name === 'manager') >=0){
                state.user.role = 'manager'
            }
            sessionStorage.setItem('TOKEN', userData.token)
        },
        setCategories: (state, categories) => {
            state.categories.data = categories.data
            state.categories.loaded = true
        },
        notify: (state, {message, type}) =>{
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(()=>{
                state.notification.show = false;
            }, 3000)
        },
        showUserDetailsPopUp: (state, {name, email, telephone}) =>{
            state.userDetailsPopUp.data.name = name;
            state.userDetailsPopUp.data.email = email;
            state.userDetailsPopUp.data.telephone = telephone
            state.userDetailsPopUp.show = true
        },
        closeUserDetailsPopUp: (state) =>{
            state.userDetailsPopUp.show = false
        }
    },
    modules: {}
});

export default store;