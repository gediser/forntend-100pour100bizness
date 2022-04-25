<template>
    <div v-if="userDetailsPopUp.show" class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
        <div class="relative w-full h-full max-w-2xl p-4 md:h-auto">
            <div
                class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[300px] py-2 px-4 animate-fade-in-down border-2 border-black-600"
            >
                <div class="flex justify-between items-center pb-2">
                        <h2 class="text-indigo-600 font-bold">Infos Publieur</h2>
                        <svg @click="close" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                </div>
                <div class="pb-2">
                    <div>
                        <h3 class="font-bold inline">Nom :&nbsp;</h3>
                        <span>{{userDetailsPopUp.data.name}}</span>
                    </div>
                    <div>
                        <h3 class="font-bold inline">Email :&nbsp;</h3>
                        <span>{{userDetailsPopUp.data.email}}</span>
                    </div>
                    <div>
                        <h3 class="font-bold inline">Telephone :&nbsp;</h3>
                        <span>{{userDetailsPopUp.data.telephone}}</span>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <button @click="close" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">OKAY</button>
                </div>
            </div>
        </div>
    </div>
  
</template>

<script setup>
import { computed } from 'vue';
import {useStore} from 'vuex';

const store = useStore();
const userDetailsPopUp = computed(() => store.state.userDetailsPopUp)

function close(){
    store.commit("closeUserDetailsPopUp")
}
</script>

<style>

</style>