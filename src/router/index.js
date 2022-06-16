import { createRouter, createWebHistory } from "vue-router"
import  AuthLayout from '../components/AuthLayout.vue'
import store from "../store"


const routes = [
    
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Dashboard',
        component: AuthLayout,
        meta: {requireAuth: true},
        children: [
            { 
                path: '/dashboard',
                name: 'Dashboard',
                component: ()=>import('../views/Dashboard.vue')
            },
            { 
                path: '/publications',
                name: 'Publications',
                component: ()=>import('../views/Publications.vue')
            },
            { 
                path: '/publications/create',
                name: 'PublicationCreate',
                component: ()=>import('../views/PublicationView.vue')
            },
            { 
                path: '/publications/:id',
                name: 'PublicationView',
                component: ()=>import('../views/PublicationView.vue')
            },
            { 
                path: '/profil',
                name: 'ProfilView',
                component: ()=>import('../views/ProfilView.vue')
            },
            { 
                path: '/products',
                name: 'Products',
                component: ()=>import('../views/Products.vue')
            },
            { 
                path: '/products/create',
                name: 'ProductCreate',
                component: ()=>import('../views/ProductView.vue')
            },
            { 
                path: '/products/:id',
                name: 'ProductView',
                component: ()=>import('../views/ProductView.vue')
            },
            { 
                path: '/administration',
                redirect:'/administration/justepourvous',
                name: 'Administration',
                component: ()=>import('../views/Administration.vue'),
                children:[
                    { 
                        path: '/administration/utilisateurs',
                        name: 'AdminUser',
                        component: ()=>import('../views/administration/AdminUser.vue')
                    },
                    { 
                        path: '/administration/justepourvous',
                        name: 'AdminJustForYou',
                        component: ()=>import('../views/administration/AdminJustForYou.vue')
                    },
                    { 
                        path: '/administration/meilleurclassement',
                        name: 'AdminBestRanking',
                        component: ()=>import('../views/administration/AdminBestRanking.vue')
                    },
                ]
            },
        ]
    },
    {
        path: '/auth',
        redirect: '/view/public/home',
        name: 'Auth',
        meta: {isGuest: true},
        component: AuthLayout,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: ()=>import('../views/Login.vue')
            },
            {
                path: '/register',
                name: 'Register',
                component: ()=>import('../views/Register.vue')
            },
            {
                path: '/view/public/publications',
                name: 'PublicationsPublicView',
                component: ()=>import('../views/PublicationsPublicView.vue')
            },
            {
                path: '/view/public/products',
                name: 'ProductsPublicView',
                component: ()=>import('../views/ProductsPublicView.vue')
            },
            {
                path: '/view/public/home',
                name: 'HomePublicView',
                component: ()=>import('../views/HomePublicView.vue')
            },
            {
                path: '/view/public/accueil',
                name: 'AccueilPublic',
                component: ()=>import('../views/AccueilPublic.vue')
            },
            
        ]
    },
    
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.isGuest){
        next()
    }
    else if (to.meta.requireAuth && !store.state.user.token){
        next({name: 'AccueilPublic'})
    } else if (store.state.user.token && to.meta.isGuest){
        next({name: 'Dashboard'})
    }
    else {
        next()
    }
})

export default router