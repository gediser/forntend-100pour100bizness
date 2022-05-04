import { createRouter, createWebHistory } from "vue-router"
import  Dashboard from '../views/Dashboard.vue'
import  Publications from '../views/Publications.vue'
import  Products from '../views/Products.vue'
import PublicationView from '../views/PublicationView.vue'
import ProductView from '../views/ProductView.vue'
import ProfilView from '../views/ProfilView.vue'
import PublicationsPublicView from '../views/PublicationsPublicView.vue'
import ProductsPublicView from '../views/ProductsPublicView.vue'
import HomePublicView from '../views/HomePublicView.vue'
import  Login from '../views/Login.vue'
import  Register from '../views/Register.vue'
import  DefaultLayout from '../components/DefaultLayout.vue'
import  AuthLayout from '../components/AuthLayout.vue'
import store from "../store"


const routes = [
    
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Dashboard',
        component: DefaultLayout,
        meta: {requireAuth: true},
        children: [
            { 
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            { 
                path: '/publications',
                name: 'Publications',
                component: Publications
            },
            { 
                path: '/publications/create',
                name: 'PublicationCreate',
                component: PublicationView
            },
            { 
                path: '/publications/:id',
                name: 'PublicationView',
                component: PublicationView
            },
            { 
                path: '/profil',
                name: 'ProfilView',
                component: ProfilView
            },
            { 
                path: '/products',
                name: 'Products',
                component: Products
            },
            { 
                path: '/products/create',
                name: 'ProductCreate',
                component: ProductView
            },
            { 
                path: '/products/:id',
                name: 'ProductView',
                component: ProductView
            },

        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        meta: {isGuest: true},
        component: AuthLayout,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            },
            {
                path: '/view/public/publications',
                name: 'PublicationsPublicView',
                component: PublicationsPublicView
            },
            {
                path: '/view/public/products',
                name: 'ProductsPublicView',
                component: ProductsPublicView
            },
            {
                path: '/view/public/home',
                name: 'HomePublicView',
                component: HomePublicView
            },
            
        ]
    },
    
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth && !store.state.user.token){
        next({name: 'Login'})
    } else if (store.state.user.token && to.meta.isGuest){
        next({name: 'Dashboard'})
    }
    else {
        next()
    }
})

export default router