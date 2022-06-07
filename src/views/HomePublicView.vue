<template>
  <page-component>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Accueil</h1>
                
            </div>
        </template>

        <div class="grid grid-cols-4 gap-4">
            <div class="px-4 py-3 col-span-4 md:col-span-3 border border-black-600 max">
                
                <div v-if="model.show" class="resultats mb-3">
                    <div v-if="model.loading">
                        Chargement...
                    </div>
                    <div v-else>
                        <h2 class="text-xl font-bold text-gray-900 mb-3">Recherche "{{ model.data.q }}"</h2>
                        <div v-if="model.data.publications.length" class="publications">
                        <h2 class="text-xl font-bold text-gray-900">Publications</h2>
                            <div  class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                                <PublicationListItem 
                                    v-for="(pub, ind) in model.data.publications"
                                    :key="pub.id"
                                    :publication="pub"
                                    :publique="true"
                                    class="opacity-0 animate-fade-in-down"
                                    :style="{animationDelay: `${ind*0.1}s`}"
                                />
                            </div>
                        </div>
                        <div v-if="model.data.products.length" class="produits">
                            <h2 class="text-xl font-bold text-gray-900">Produits</h2>
                            <div  class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                                <ProductListItem 
                                    v-for="(prod, ind) in model.data.products"
                                    :key="prod.id"
                                    :product="prod"
                                    :publique="true"
                                    class="opacity-0 animate-fade-in-down"
                                    :style="{animationDelay: `${ind*0.1}s`}"
                                />
                            </div>
                        </div>
                        <div 
                            v-if="!model.data.publications.length && !model.data.products.length"
                        >
                            <p>Pas de resultats</p>
                        </div>
                    </div>
                    
                </div>
                <div class="publicite-wrapper"> 
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
                    <div class="text-indigo-600 underline cursor-pointer" v-for="(item, index) in categories.data" :key="index" @click="searchCategorie(item.id)">
                        {{item.name}}
                    </div>
                </div>
                
            </div>
            
        </div>
    </page-component>
    <user-details-pop-up></user-details-pop-up>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue'
import store from '../store'
import { computed, ref, watch } from 'vue';
import ProductListItem from "../components/ProductListItem.vue"
import PublicationListItem from "../components/PublicationListItem.vue"
import UserDetailsPopUp from '../components/UserDetailsPopUp.vue';

const model = ref({
    q:'',
    loading:true,
    show:false,
    data:{
        publications:[],
        products:[]
    }
})

// watch to current survey data change and when this happen we update local

watch(
    () => store.state.search.data,
    (newVal, oldVal) =>{
        model.value.show = true
        model.value.loading = false
        model.value.data = {
            ...JSON.parse(JSON.stringify(newVal)),
            
        }
    }
);

const categories = computed(() => store.state.categories)
if (!categories.loaded){
    store.dispatch('getCategories')
}



function searchCategorie(id){
    model.value.show = true
    model.value.loading = true
    store.dispatch("searchCategory", id).then(()=>{
        model.value.loading = false
    })
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