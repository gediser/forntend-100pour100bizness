<template>
    <page-component>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Publications</h1>
                <router-link
                    :to="{name: 'PublicationCreate'}"
                    class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Ajouter 
                </router-link>
            </div>
        </template>

        <div v-if="publications.loading" class="flex justify-center">Loading...</div>
        <div v-else-if="!publications.data.length" class="flex justify-center">Vous n'avez pas de publications</div>
        <div v-else>
            <div  class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <PublicationListItem 
                    v-for="(pub, ind) in publications.data"
                    :key="pub.id"
                    :publication="pub"
                    class="opacity-0 animate-fade-in-down"
                    :style="{animationDelay: `${ind*0.1}s`}"
                    @delete="deletePublication(pub)"
                />
            </div>
            <div class="flex justify-center mt-5">
                <nav
                    class="relative z-0 inline-flex justify-center rounded-md shadow-sm"
                    aria-label="Pagination"
                >
                    <a
                        v-for="(link, i) of publications.links"
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
                            i===publications.links.length-1 ? 'rounded-r-md' : ''
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
import PublicationListItem from "../components/PublicationListItem.vue"

const publications = computed(() => store.state.publications)
store.dispatch('getPublications')

function deletePublication(publication){
    if (confirm(`Etes vous sur de vouloir supprimer cette publication? Operation irreversible!!`)){
        // delete survey
        store.dispatch("deletePublication", publication.id)
            .then(() => {
                store.dispatch('getPublications')
            })
    }
}

function getForPage(event, link){
    event.preventDefault();
    if (!link.url || link.active){
        return;
    }
    store.dispatch("getPublications", { url: link.url })
}
</script>

<style scoped>

</style>