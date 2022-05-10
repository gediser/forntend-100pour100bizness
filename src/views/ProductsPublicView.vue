<template>
    <page-component>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Produits</h1>
                
            </div>
        </template>

        <div v-if="products.loading" class="flex justify-center">Chargement...</div>
        <div v-else-if="!products.data.length" class="flex justify-center">Vous n'avez pas de produits</div>
        <div v-else>
            <div  class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <ProductListItem 
                    v-for="(prod, ind) in products.data"
                    :key="prod.id"
                    :product="prod"
                    :publique="true"
                    class="opacity-0 animate-fade-in-down"
                    :style="{animationDelay: `${ind*0.1}s`}"
                    @delete="deleteProduct(prod)"
                />
            </div>
            <div class="flex justify-center mt-5">
                <nav
                    class="relative z-0 inline-flex justify-center rounded-md shadow-sm"
                    aria-label="Pagination"
                >
                    <a
                        v-for="(link, i) of products.links"
                        :key="i"
                        :disabled="!link.url"
                        v-html="link.label"
                        href="#"
                        @click="getForPage($event, link)"
                        aria-current="page"
                        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
                        :class="[
                            link.active 
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                            i===0 ? 'rounded-l-md' : '',
                            i===products.links.length-1 ? 'rounded-r-md' : ''
                        ]"
                    >

                    </a>
                </nav>
            </div>
        </div>
        
    </page-component>
    <user-details-pop-up></user-details-pop-up>

</template>

<script setup>
import store from "../store"
import {computed} from "vue"
import PageComponent from "../components/PageComponent.vue"
import ProductListItem from "../components/ProductListItem.vue"
import UserDetailsPopUp from '../components/UserDetailsPopUp.vue'

const products = computed(() => store.state.publicProducts)
store.dispatch('getPublicProducts')

function getForPage(event, link){
    event.preventDefault();
    if (!link.url || link.active){
        return;
    }
    store.dispatch("getPublicProducts", { url: link.url })
}
</script>

<style>

</style>