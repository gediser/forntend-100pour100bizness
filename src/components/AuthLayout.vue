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
    <div id="header fixed w-full">
      <div class="row h-16 flex items-center justify-between mb-4">
          <div class="logo h-8 flex items-center">
              <img class="h-8 w-8" alt="logo" src="/images/logo.jpg"/>
          </div>
          <div class="recherche h-8  flex items-center">
              <form class="flex items-center" @submit.prevent="search">
                <input 
                    class="relative left-1 h-8  border-2 border-belge rounded-l-full lg:rounded-r-0 pl-4 m-0 focus:right-[1px] focus:outline-2 focus:ring focus:border-belge" 
                    type="text" 
                    placeholder="Rechercher des publications ou bien produits"
                    v-model="model.q"
                    @keydown.enter="search"
                />
                <button class="h-8 bg-belge text-white px-2 border border-belge hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
              </form>
          </div>
      </div>
      <div v-if="this.$store.state.user.token === null" class="hamburger-menu sm:hidden">
        <input id="menu__toggle" type="checkbox" ref="hiddencheckbox"/>
        <label class="menu__btn" for="menu__toggle">
          <span></span>
        </label>

        <ul class="menu__box">
          <li><router-link @click="this.$refs.hiddencheckbox.click();" v-for="item in navigation" :key="item.name" :to="item.to"  :class="['menu__item']" >{{ item.name }}</router-link></li>
          <li><router-link @click="this.$refs.hiddencheckbox.click();" :to="{name:'Login'}" :class="['menu__item']" >Se connecter</router-link></li>
        </ul>
      </div>
      <div v-if="this.$store.state.user.token === null" class="menu-screen-lg flex flex-wrap items-center justify-between">
        <div class="flex flex-wrap items-baseline space-x-4">
          <router-link v-for="item in navigation" :key="item.name" :to="item.to" active-class="bg-cbelge text-white hover:scale-110 hover:text-red-500" :class="[this.$route.name === item.to.name ? '' : 'bg-belge hover:scale-110 text-white hover:text-red-500', 'px-3 py-2 rounded-md text-sm font-medium']" >{{ item.name }}</router-link>
        </div>
          
          
        <div class="relative">
          <svg @click="show" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-belge cursor-pointer hover:scale-110 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div v-if="showInMenu" class="absolute w-[200px] top-8 flex flex-col gap-2 right-0 shadow py-1 px-4">
            <router-link :to="{name:'Login'}" class="bg-belge hover:scale-110 text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">Se connecter</router-link>
            <router-link :to="{name:'Register'}" class="bg-belge hover:scale-110 text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">S'inscrire</router-link>
          </div>
        </div>
          
      </div>

      <div v-if="this.$store.state.user.token !== null" class="hamburger-menu sm:hidden">
          <input id="menu__toggle" type="checkbox" ref="hiddencheckbox"/>
          <label class="menu__btn" for="menu__toggle">
            <span></span>
          </label>

          <ul class="menu__box">
            <li><router-link @click="this.$refs.hiddencheckbox.click();" v-for="item in navigationAuth" :key="item.name" :to="item.to"  :class="['menu__item']" >{{ item.name }}</router-link></li>
            <li><a href="#" @click="logout" class="menu__item ">D&eacute;connexion</a></li>
          </ul>
        </div>
        <div v-if="this.$store.state.user.token !== null" class="menu-screen-lg flex flex-wrap items-center justify-between">
          <div class="flex flex-wrap items-baseline space-x-4">
                <router-link v-for="item in navigationAuth" :key="item.name" :to="item.to" active-class="bg-cbelge text-white hover:scale-110 hover:text-red-500" :class="[this.$route.name === item.to.name ? '' : 'bg-belge hover:scale-110 text-white hover:text-red-500', 'px-3 py-2 rounded-md text-sm font-medium']" >{{ item.name }}</router-link>
              </div>
            <div class="relative">
              <svg @click="show" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-belge cursor-pointer hover:scale-110 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div v-if="showInMenu" class="absolute w-[200px] top-8 flex flex-col gap-2 right-0 shadow py-1 px-4">
                <router-link v-if="['manager', 'admin'].includes(this.$store.state.user.role)" :to="{name:'Administration'}" class="bg-belge hover:scale-110 text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">Administration</router-link>
                <span @click="logout" class="bg-belge hover:scale-110 text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">D&eacute;connexion</span>
                
              </div>
            </div>
            
        </div>

    </div>

    <router-view></router-view>

    <div id="footer" class="fixed bg-white left-0 lg:left-[10%] w-full lg:w-[80%] bottom-0">
      <div v-if="this.$store.state.user.token === null" class="flex flex-wrap items-center justify-between mx-auto w-full lg:w-[50%] p-4 ">
          <div class="flex flex-col items-center hover:scale-110 text-belge hover:text-red-500 text-sm sm:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              <span>Domicile</span>
          </div>
          <div class="flex flex-col items-center hover:scale-110 text-belge hover:text-red-500 text-sm sm:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              <span>Vraie vue</span>
          </div>
          <div class="flex flex-col items-center hover:scale-110 text-belge hover:text-red-500 text-sm sm:text-base">
              <span class="iconify h-8 w-8 sm:h-16 sm:w-16" data-icon="heroicons-outline:shopping-cart"></span>
              <span>Charriot</span>
          </div>
          
      </div>

      <div v-else class="flex flex-wrap items-center justify-between mx-auto w-full lg:w-[50%] p-4 lg:p-0">
            <div class="hover:scale-110 hover:text-red-500 text-sm sm:text-base">
                <router-link 
                  :to="{name: 'Dashboard'}" 
                  active-class="hover:scale-110 hover:text-red-500"
                  :class="[this.$route.name === 'Dashboard' ? '' : 'text-cbelge', 'flex flex-col items-center']"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  <span>Domicile</span>
                </router-link>
            </div>
            <div class="flex flex-col items-center hover:scale-110 text-belge hover:text-red-500 text-sm sm:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                <span>Vraie vue</span>
            </div>
            <div class="flex flex-col items-center hover:scale-110 text-belge hover:text-red-500 text-sm sm:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                <span>Message</span>
            </div>
            <div class="flex flex-col items-center hover:scale-110 text-belge hover:text-red-500 text-sm sm:text-base">
                <span class="iconify h-8 w-8 sm:h-16 sm:w-16" data-icon="heroicons-outline:shopping-cart"></span>
                <span>Charriot</span>
            </div>
            <div class="flex flex-col items-center hover:scale-110 text-belge hover:text-red-500 text-sm sm:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>My bizness</span>
            </div>
        </div>
        
    </div>
    <Notification />
    
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed, ref} from 'vue'
import {useRouter} from 'vue-router'
import Notification from './Notification.vue'

const navigation = [
  { name: 'Accueil', to: {name: "AccueilPublic"}, target: false },
  { name: 'Publications', to: {name: "PublicationsPublicView"}, target: false },
  { name: 'Produits', to: {name: "ProductsPublicView"}, target: false },
]

const navigationAuth = [
  //{ name: 'Dashboard', to: {name: "Dashboard"} },
  { name: 'Mes publications', to: {name: "Publications"} },
  { name: 'Mes produits', to: {name: "Products"} },
  { name: 'Profil', to: {name: "ProfilView"} },
]

export default {
  components: {
    
    Notification,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const model = ref({
      q: ''
    });
    
    function logout() {
      store.dispatch('logout')
        .then(()=>{
          router.push({name: 'Login'})
        })
    }
    
    function search(){
        router.push({name:"HomePublicView"});
        store.dispatch("searchAll", model.value)
    }
    
    return {
      user: computed(() => store.state.user.data),
      navigation,
      navigationAuth,
      logout,
      search,
      model,
    }
  },
  methods:{
    show(){
      this.showInMenu = !this.showInMenu
    }
  },
  data(){
    return {
      showInMenu:false
    }
  }
}
</script>

<style scoped>

@media screen and (max-width: 640px){
  .menu-screen-lg{
    display: none;
  }
}

#menu__toggle {
  opacity: 0;
}
#menu__toggle:checked + .menu__btn > span {
  transform: rotate(45deg);
}
#menu__toggle:checked + .menu__btn > span::before {
  top: 0;
  transform: rotate(0deg);
}
#menu__toggle:checked + .menu__btn > span::after {
  top: 0;
  transform: rotate(90deg);
}
#menu__toggle:checked ~ .menu__box {
  left: 0 !important;
}

.menu__btn {
  position: absolute;
  top: 80px;
  left: 10px;
  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 2;
}
.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  /*background-color: #616161;*/
  background-color: #C8AD7F;
  transition-duration: .25s;
}
.menu__btn > span::before {
  content: '';
  top: -8px;
}
.menu__btn > span::after {
  content: '';
  top: 8px;
}
.menu__box {
  display: block;
  position: fixed;
  top: 0;
  /*left: -100%;*/
  left: -200%;
  width: 300px;
  height: 100%;
  margin: 0;
  padding: 80px 0;
  list-style: none;
  background-color: #ECEFF1;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, .4);
  transition-duration: .25s;
  z-index: 1;
}
.menu__item {
  display: block;
  padding: 12px 24px;
  /*color: #333;*/
  color: #C8AD7F;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  transition-duration: .25s;
}
.menu__item:hover {
  background-color: #CFD8DC;
}

</style>