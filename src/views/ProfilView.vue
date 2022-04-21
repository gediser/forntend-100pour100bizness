<template>
    <page-component>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ user.id ? `Utilisateur ${user.id}` : 'Utilisateur'}}
                </h1>
            </div>

        </template>

         <form @submit.prevent="saveProfil" autocomplete="none" class="animate-fade-in-down">
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
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- Survey Fields -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <!-- Nom -->
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Nom Complet</label>
                        <span v-if="!modifier">{{user.name}}</span>
                        <input
                            v-if="modifier"
                            type="text" 
                            name="name"
                            id="name"
                            v-model="user.name"
                            required=""
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        /> 
                    </div>
                    <!--/ Nom -->
                    <!-- Telephone -->
                    <div>
                        <label for="telephone" class="block text-sm font-medium text-gray-700">T&eacute;l&eacute;phone</label>
                        <span v-if="!modifier">{{user.telephone}}</span>
                        <input
                            v-if="modifier"
                            type="tel" 
                            name="telephone"
                            id="telephone"
                            pattern="6[0-9]{8}" 
                            title="Numero Orange, MTN ou bien Nextell"
                            v-model="user.telephone"
                            autocorrect="off" spellcheck="false" autocomplete="off"
                            required=""
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        /> 
                    </div>
                    <!--/ Telephone -->
                    <!-- Password -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        
                        <input
                            v-if="modifier"
                            type="password" 
                            v-model="user.password"
                            id="password" 
                            name="password"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        /> 
                    </div>
                    <!--/ Password -->
                    <!-- Password_Confirmation -->
                    <div>
                        <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Password Confirmation</label>
                        <input
                            v-if="modifier"
                            v-model="user.password_confirmation" 
                            id="password_confirmation" 
                            name="password_confirmation" 
                            type="password" 
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        /> 
                    </div>
                    <!--/ Password_Confirmation -->
                </div>
                <!-- Survey Fields -->

                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        @click.prevent="modifier = true"
                        class="inline-flex justify-center py-2 px-4 mr-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                            focus:outline-none focus:ring-2 focus:offset-2 focus-ring-indigo-500"
                    >
                        Modifier
                    </button>
                    <button
                        type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                            focus:outline-none focus:ring-2 focus:offset-2 focus-ring-indigo-500"
                    >
                        Save
                    </button>

                </div>
            </div>
         </form>
    </page-component>
    
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue'
import store from '../store'
import Alert from '../components/Alert.vue'
import {computed, ref} from 'vue'

const user = store.state.user.data;

user.password_confirmation = ''
user.password = ''

let modifier = ref(false)
let errors = ref({})

function saveProfil(){
    errors.value = {}
    if (user.password !== user.password_confirmation){
        errors.value = {
            error:{
                error: "The passwords are different."
            }
        }
        return
    }
    store
    .dispatch('updateProfil', user)
    .then((res) => {
      store.commit('notify', {
                type: 'success',
                message: 'Le profil a bien ete mis a jour.'
            })
     
    })
    .catch((err)=>{
      console.log("error", err, err.response)
      if (err.response.status === 422){
        errors.value = err.response.data.errors
      }
    })
}
</script>

<style scoped>

</style>
