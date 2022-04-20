<template>
    <div>
      <div>
        <img class="mx-auto h-12 w-auto" src="/images/logo.jpg" alt="Buziness" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Inscrivez-vous gratuitement</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          {{ ' ' }}
          <router-link :to="{name: 'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500"> Connectez-vous </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit="register">
        <Alert
          v-if="Object.keys(errors).length"
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
            <label for="fullname" class="sr-only">Nom complet</label>
            <input v-model="user.name" id="fullname" name="name" type="text" autocomplete="name" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Nom complet" />
          </div>
          <div>
            <label for="telephone" class="sr-only">T&eacute;l&eacute;phone</label>
            <input v-model="user.telephone" id="telephone" name="telephone" type="tel" pattern="6[0-9]{8}" title="Numero Orange, MTN ou bien Nextell" autocomplete="telephone" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Telephone, ex: 654785896"/>
          </div>
          <div>
            <label for="email-address" class="sr-only">Addresse mail</label>
            <input v-model="user.email" id="email-address" name="email" type="email" autocomplete="email" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Adresse mail" />
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Mot de passe" />
          </div>
           <div>
            <label for="password_confirmation" class="sr-only">Confirmation mot de passe</label>
            <input v-model="user.password_confirmation" id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password_confirmation" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirmation mot de passe" />
          </div>
          <div><small>Le mot de passe doit contenir au moins une lettre <span class="font-bold">majuscule</span>, une lettre <span class="font-bold">minuscule</span>, un <span class="font-bold">chiffre</span> et un <span class="font-bold">symbole</span>.</small></div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Inscription
          </button>
        </div>
      </form>
    </div>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid'
import store from "../store"
import {useRouter} from "vue-router"
import Alert from "../components/Alert.vue"
import {ref} from "vue"

const router = useRouter();

const user = {
  name: '',
  email: '',
  telephone: '',
  password: '',
  password_confirmation: ''
}
let loading = ref(false);
let errors = ref({})

function register(ev){
  ev.preventDefault();

  loading.value = true;
  store
    .dispatch('register', user)
    .then((res) => {
      loading.value = false
      router.push({
        name: 'Dashboard'
      })
    })
    .catch((err)=>{
      loading.value = false;
      if (err.response.status === 422){
        errors.value = err.response.data.errors
      }
    })
}

</script>