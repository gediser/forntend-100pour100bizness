<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div class="w-full md:m-auto md:w-[80%] relative p-2">
    <div id="header">
        <div class="row h-16 flex items-center justify-between mb-4">
            <div class="logo h-8 flex items-center">
                <img class="h-8 w-8" alt="logo" src="/images/logo.jpg"/>
            </div>
            <div class="recherche h-8  flex items-center">
                <form class="flex items-center" @submit.prevent="searchUp">
                  <input 
                      class="relative left-1 h-8  border-2 border-belge rounded-l-full lg:rounded-r-0 pl-4 m-0 focus:right-[1px] focus:outline-2 focus:ring focus:border-belge" 
                      type="text" 
                      placeholder="Rechercher des publications ou bien produits"
                      v-model="model.q"
                      @keydown.enter="searchUp"
                  />
                  <button type="submit" class="h-8 bg-belge text-white px-2 border border-belge hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                  </button>
                </form>
            </div>
        </div>
        <div class="flex flex-wrap items-center justify-between">
          <div class="flex flex-wrap items-baseline space-x-4">
                <router-link v-for="item in navigation" :key="item.name" :to="item.to" active-class="bg-cbelge text-white hover:scale-110 hover:text-red-500" :class="[this.$route.name === item.to.name ? '' : 'bg-belge hover:scale-110 text-white hover:text-red-500', 'px-3 py-2 rounded-md text-sm font-medium']" >{{ item.name }}</router-link>
              </div>
            
            <div>
                <div @click="logout" class="hover:scale-110 text-white hover:text-red-500">
                    <a href="#" class="bg-belge rounded-lg p-2 ">D&eacute;connexion</a>
                </div>
            </div>
        </div>
    </div>

    <router-view></router-view>
    <div id="footer" class="bg-white fixed bottom-0 left-[10%] w-[80%] bottom-4">
        <div class="flex flex-wrap items-center justify-between">
            <div class="hover:scale-110 hover:text-red-500">
                <router-link 
                  :to="{name: 'Dashboard'}" 
                  active-class="hover:scale-110 hover:text-red-500"
                  :class="[this.$route.name === 'Dashboard' ? '' : 'text-cbelge']"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  Domicile
                </router-link>
            </div>
            <div class="hover:scale-110 text-belge hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                Vraie vue
            </div>
            <div class="hover:scale-110 text-belge hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                Message
            </div>
            <div class="hover:scale-110 text-belge hover:text-red-500">
                <span class="iconify h-16 w-16" data-icon="heroicons-outline:shopping-cart"></span>
                
                Charriot
            </div>
            <div class="hover:scale-110 text-belge hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mon buziness
            </div>
        </div>
        
    </div>

    <Notification />
    
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import {useStore} from 'vuex'
import {computed, ref} from 'vue'
import {useRouter} from 'vue-router'
import Notification from './Notification.vue'

const navigation = [
  //{ name: 'Dashboard', to: {name: "Dashboard"} },
  { name: 'Mes publications', to: {name: "Publications"} },
  { name: 'Mes produits', to: {name: "Products"} },
  { name: 'Profil', to: {name: "ProfilView"} },
]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
    Notification,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const model = ref({
      q:''
    });

    function logout() {
      store.dispatch('logout')
        .then(()=>{
          router.push({name: 'Login'})
        })
    }
    function search(){
        //model.value.show = true
        //model.value.loading = true
        console.log("search")
        store.dispatch("searchAll", model.value).then(()=>{
            //model.value.loading = false
            console.log("reponse correcte")
            router.push({name:"HomePublicView"});
        })
    }
    function searchUp(){
      search();
      console.log("okay")
      //
    }
    

    return {
      user: computed(() => store.state.user.data),
      navigation,
      logout,
      model,
      searchUp,
      search
    }
  },
}
</script>