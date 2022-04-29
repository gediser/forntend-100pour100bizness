<template>
    <page-component>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Mes produits</h1>
                <router-link
                    :to="{name: 'ProductCreate'}"
                    class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Ajouter 
                </router-link>
            </div>
        </template>

        <div v-if="products.loading" class="flex justify-center">Loading...</div>
        <div v-else-if="!products.data.length" class="flex justify-center">Vous n'avez pas de produits</div>
        <div v-else>
            <div  class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <ProductListItem 
                    v-for="(prod, ind) in products.data"
                    :key="prod.id"
                    :product="prod"
                    :publique="false"
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
</template>

<script setup>
import store from "../store"
import {computed} from "vue"
import PageComponent from "../components/PageComponent.vue"
import ProductListItem from "../components/ProductListItem.vue"

const products = computed(() => store.state.products)
store.dispatch('getProducts')

function deleteProduct(product){
    if (confirm(`Etes vous sur de vouloir supprimer ce produit? Operation irreversible!!`)){
        // delete product
        store.dispatch("deleteProduct", product.id)
            .then(() => {
                store.dispatch('getProducts')
            })
    }
}

function getForPage(event, link){
    event.preventDefault();
    if (!link.url || link.active){
        return;
    }
    store.dispatch("getProducts", { url: link.url })
}
</script>

<style scoped>

</style>