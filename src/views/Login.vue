
<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 mb-32 md:mb-0">
      <div>
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-belge">Connectez-vous</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          {{ ' ' }}
          <router-link :to="{name: 'Register'}" class="font-medium text-cbelge hover:text-indigo-500"> Inscrivez-vous gratuitement </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit="login">
        <Alert
          v-if="errors && Object.keys(errors).length"
          class="flex-col items-stretch text-sm"
        >
          <div v-for="(field, i) of Object.keys(errors)" :key="i">
            <div v-for="(error, ind) of errors[field] ||  []" :key="ind">
              * {{ error }}
            </div>
          </div>
        </Alert>
        
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Adresse mail</label>
            <input v-model="user.email" id="email-address" name="email" type="email" autocomplete="email" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Addresse mail" />
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Mot de passe" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input v-model="user.remember" id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Se souvenir de moi </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-cbelge hover:text-indigo-500"> Mot de passe oubli&eacute;? </a>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cbelge hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connexion
          </button>
        </div>
      </form>
    </div>
    </div>
  </div>

    
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid'
import store from "../store"
import {useRouter} from 'vue-router'
import {ref} from "vue"
import Alert from "../components/Alert.vue"

const router = useRouter()

const user = {
  email: '',
  password: '',
  remember: false
}
let loading = ref(false)
let errors = ref({})

function login(ev){
  ev.preventDefault();

  loading.value = true;
  store.dispatch('login', user)
    .then(() => {
      loading.value = false;
      router.push({
        name: 'Dashboard'
      })
    })
    .catch(err => {
      loading.value = false;
      if (err.response.status === 422){
        errors.value = err.response.data.errors
      }
      
    })
}
</script>