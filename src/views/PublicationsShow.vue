<template>
  <page-component>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ publicationId ? `Publication ${publicationId}` : "Pas de publication correspondante" }}
                </h1>
            </div>
        </template>

        <div v-if="loading" class="text-center">Chargement...</div>
        <div v-else class="flex pb-48 ">
            <div class="lg:w-6/12 w-full flex flex-col gap-2 px-4">
                <img alt="Image publication" :src="image"/> 
                <div>
                    <h3 class="font-bold text-indigo-600 hover:text-indigo-700 py-2">Vendeur</h3>
                    <p><span class="font-bold">Nom:</span> {{user.name}}</p>
                    <p><span class="font-bold">Email:</span> {{user.email}}</p>
                    <p><span class="font-bold">Telephone:</span> {{user.telephone}}</p>
                </div>
            </div>
            <div class="lg:w-6/12 w-full flex flex-col gap-2 px-4">
                <p class="py-2"><span class="font-bold text-indigo-600 hover:text-indigo-700">Categorie: </span>{{categorie}}</p>
                <p v-html="description"></p> 
            </div>
        </div>
    </page-component>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import PageComponent from '../components/PageComponent.vue'
import store from "../store"

export default defineComponent({
    name:'PublicationsShow',
    components:{
        PageComponent
    },
    mounted(){
        store.dispatch('getCategories')
        if (this.$route.params.id){
            this.publicationId = this.$route.params.id
            store.dispatch("getPublicationShow", this.$route.params.id)
                .then(({data})=>{
                    this.loading = false
                    this.publicationId = this.$route.params.id
                    this.categorie = this.$store.state.categories.data[data.category_id].name
                    this.description = data.description
                    this.image = data.image_url
                    this.user = data.user
                    console.log("data", this.user)
                })
        }else{
            this.publicationId = null
        }
    },
    data(){
        return {
            loading:true,
            publicationId: null,
            categorie:'',
            image:'',
            description:'',
            user:{}
        }
    }
})
</script>

<style>

</style>