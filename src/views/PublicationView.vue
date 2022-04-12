<template>
    <page-component>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ route.params.id ? model.title : "Cr&eacute;er une Publication"}}
                </h1>

                <button
                    v-if="route.params.id"
                    type="button"
                    @click="deletePublication"
                    class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Supprimer Publication
                </button>
            </div>
        </template>

        <div v-if="publicationLoading" class="flex justify-center">Loding...</div>

        <form v-else @submit.prevent="savePublication" class="animate-fade-in-down">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- Survey Fields -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <!-- Description -->
                    <div>
                        <label for="about" class="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <div class="mt-1">
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                v-model="model.description"
                                autocomplete="survey_description"
                                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                placeholder="D&eacute;crire votre publication" 
                            />
                        </div>
                    </div>  
                    <!--/ Description -->
                </div>
                <!--/ Survey Fields -->

                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
import {ref, watch, computed} from "vue"
import store from "../store"
import {useRoute, useRouter} from "vue-router"
import PageComponent from '../components/PageComponent.vue'

const router = useRouter();

const route = useRoute();

const publicationLoading = computed(() => store.state.currentPublication.loading)

// Create empty survey
    let model = ref({
        
        description: null,
        image_url: null,
    })

// watch to current survey data change and when this happen we update local
    watch(
        () => store.state.currentPublication.data,
        (newVal, oldVal) =>{
            model.value = {
                ...JSON.parse(JSON.stringify(newVal)),
                
            }
        }
    );

if (route.params.id){
       store.dispatch('getPublication', route.params.id);
    }

function savePublication(){
    store.dispatch("savePublication", model.value).then(({ data }) => {
            store.commit('notify', {
                type: 'success',
                message: 'Survey was successfully updated'
            })
            router.push({
                name: "PublicationView",
                params: { id: data.data.id}
            })
        });
}

function deletePublication(){
}
</script>

<style>

</style>