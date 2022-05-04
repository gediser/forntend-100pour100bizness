<template>
  <page-component>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Accueil</h1>
                
            </div>
        </template>

        <div class="grid grid-cols-4 gap-4">
            <div class="px-4 py-3 col-span-4 md:col-span-3 border border-black-600 max">
                <h2 class="text-xl font-bold text-gray-900">Recherche</h2>
                <div class="recherche">
                    <form @submit.prevent="search">
                        <input
                            type="text" 
                            name="q"
                            id="q"
                            v-model="model.q"
                            autocomplete="search_q"
                            class="mt-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        /> 
                        <div class="mt-4 bg-gray-50 text-right">
                            <button
                                type="submit"
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                                    focus:outline-none focus:ring-2 focus:offset-2 focus-ring-indigo-500"
                            >
                                Rechercher
                            </button>
                        </div>
                    </form>
                </div>
                <div class="resultats">

                </div>
                <div class="publicite-wrapper mt-3"> 
                    <h2 class="text-xl font-bold text-gray-900">Publicite</h2>
                    <div class="publicite mt-2">
                        <img src="/images/pub1.jpg" alt="publicite"/>
                        <img src="/images/pub2.png" alt="publicite"/>
                    </div>
                </div>
                
            </div>
            <div class="categories px-4 py-3 border border-black-600">
                <h2 class="text-xl font-bold text-gray-900">Categories</h2>
                <div class="mt-3">
                    <div class="text-indigo-600 underline" v-for="(item, index) in categories.data" :key="index">
                        {{item.name}}
                    </div>
                </div>
                
            </div>
            
        </div>
    </page-component>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue'
import store from '../store'
import { computed, ref } from 'vue';

const model = ref({
    q:''
})

const categories = computed(() => store.state.categories)
if (!categories.loaded){
    store.dispatch('getCategories')
}

function search(){

}

</script>

<style>
    @media  screen and (max-width:768px) {
        .categories{
            display: none;
        }
    }

    .publicite{
        display: flex;
        gap: 2%;
    }

    .publicite img {
        width: 49%;
    }

    .publicite img:hover {
        transform: scale(1.01);
    }

    .max{
        max-width: 1200px;
    }
</style>