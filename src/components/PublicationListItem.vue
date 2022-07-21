<template>
    <div 
        class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]"
    >
        <p @click="showDetails(publication.user)" class="cursor-pointer font-bold text-indigo-600 hover:text-indigo-700 py-2">{{ publication.user.name }}</p>
        <img :src="publication.image_url" alt="" class="w-full h-48 object-cover" />
        <div v-html="publication.description" class="overflow-hidden flex-1"></div>
        <div v-if="publique=='admin'" class="mt-3">
            <button v-if="publication.activate" @click="emit('desactivate', publication)" class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500">D&eacute;sactiver</button>
            <button v-else @click="emit('activate', publication)" class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Activer</button>
        </div>
        <div v-if="publique == 'private'" class="flex justify-between items-center mt-3">
            <router-link
                :to="{name: 'PublicationView', params: {id: publication.id}}"
                class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                &Eacute;diter
            </router-link>
           <div class="flex items-center">
                <button
                    v-if="publication.id"
                    type="button"
                    @click="emit('delete', publication)"
                    class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
           </div>
        </div>
    </div>
</template>

<script setup>

import store from '../store';

const {survey} = defineProps({
    publication: Object,
    publique: String
})

const emit = defineEmits(['activate', 'desactivate', 'delete'])

function showDetails(user){
   store.commit("showUserDetailsPopUp", user)
}

</script>

<style>

</style>