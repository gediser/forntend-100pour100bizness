<template>
    <page-component>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ route.params.id ? `Produit ${route.params.id}` : "Cr&eacute;er un Produit"}}
                </h1>

                <button
                    v-if="route.params.id"
                    type="button"
                    @click="deleteProduct"
                    class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Supprimer Produit
                </button>
            </div>
        </template>

        <div v-if="productLoading" class="flex justify-center">Chargement...</div>

        <form v-else @submit.prevent="saveProduct" class="animate-fade-in-down">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- Survey Fields -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">

                    <!-- Image -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <div class="mt-1 flex items-center">
                            <img 
                                v-if="model.image_url"
                                :src="model.image_url"
                                :alt="model.title"
                                class="w-64 h-48 object-cover"
                            />
                            <span
                                v-else
                                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-[80%] w-[80%] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <button
                                type="button"
                                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm
                                    leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >   
                                <input 
                                    type="file"
                                    @change="onImageChoose"
                                    class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                                />
                                Changer
                            </button>
                        </div>
                    </div>
                    <!--/ Image -->

                    <!-- Name -->
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text" 
                            name="name"
                            maxlength="250" 
                            id="name"
                            v-model="model.name"
                            autocomplete="product_name"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        /> 
                    </div>
                    <!--/ Name -->

                     <!-- Prix -->
                    <div>
                        <label for="prix" class="block text-sm font-medium text-gray-700">Prix</label>
                        <input
                            type="number" 
                            name="prix"
                            id="prix"
                            v-model="model.prix"
                            autocomplete="product_prix"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        /> 
                    </div>
                    <!--/ Prix -->

                    <!-- Category -->
                    <div>
                        <label for="category" class="block text-sm font-medium text-gray-700">Categorie</label>
                        <select
                            name="category"
                            id="category"
                            v-model="model.category_id"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                            <option>Choisir une categorie</option>
                            <option 
                                v-for="(item, index) in categories.data"
                                :key="index"
                                :value="item.id"
                            >
                                {{item.name}}
                            </option>
                        </select>
                    </div>
                    <!--/ Category -->

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
                                autocomplete="product_description"
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
                        Sauvegarder
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

const productLoading = computed(() => store.state.currentProduct.loading)
const categories = computed(() => store.state.categories)

// Create empty survey
    let model = ref({
        image:null,
        description: null,
        image_url: null,
        name: null,
        category_id: null,
        prix: null
    })

// watch to current survey data change and when this happen we update local
    watch(
        () => store.state.currentProduct.data,
        (newVal, oldVal) =>{
            model.value = {
                ...JSON.parse(JSON.stringify(newVal)),
                
            }
        }
    );
if (!categories.loaded){
    store.dispatch('getCategories')
}


if (route.params.id){
       store.dispatch('getProduct', route.params.id);
    }
else{
    store.commit("setCurrentProductLoading", false)
}


function onImageChoose(ev){
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () =>{
        // The field to send on backend and apply validations
        model.value.image = reader.result;

        // The field to display here
        model.value.image_url = reader.result;
    }
    reader.readAsDataURL(file);
}

function saveProduct(){
    store.dispatch("saveProduct", model.value).then(({ data }) => {
            store.commit('notify', {
                type: 'success',
                message: 'Le produit a bien ete sauvegardee.'
            })
            router.push({
                name: "ProductView",
                params: { id: data.data.id}
            })
        });
}

function deleteProduct(){
    if (confirm(`Etes vous sur de vouloir supprimer ce produit? Operation irreversible.`)){
            store.dispatch("deleteProduct", model.value.id)
                .then(() => {
                    router.push({
                        name: "Products",
                    })
                })
        }
}
</script>

<style>

</style>