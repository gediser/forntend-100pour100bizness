<template>
  <div class="p-12 pb-32">
    <form @submit.prevent="inserer">
      <input 
        class="h-8  w-[50%] border-2 border-belge rounded-l-full lg:rounded-r-0 pl-4 m-0 focus:outline-2 focus:ring focus:border-belge" 
        type="text"
        v-model="publications"
        placeholder="Entrez les id des plublications. ex: 1,2,3"
        @keydown.prevent.enter="inserer"
      />
      <button class="relative -top-[1px] h-8 bg-belge text-white px-2 border border-belge hover:text-red-500">Inserer</button>
    </form>
    <div id="publications" v-if="juste_pour_vous_publications.length > 0" class="py-4 flex flex-wrap gap-4">
      <div class="relative" v-for="item, index in juste_pour_vous_publications" :key="index">
        <img class="h-24 w-24" alt="publication" :src="item.image_url" />
        <svg @click="deletePublication(index)" xmlns="http://www.w3.org/2000/svg" class="absolute top-1 right-1 h-6 w-6 text-white bg-gray-300 rounded-full cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
    <div v-else> 
      <p>Pas de publications pour la section juste pour vous.</p>
    </div>
    <div class="flex justify-center"> 
      <button class="w-[50%] text-center bg-belge hover:scale-110 text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">Confirmer Publications Juste Pour vous</button>
    </div>
    
  </div>
</template>

<script>
import axiosClient from '../../axios'
import store from '../../store'

export default {
  methods:{
    inserer(){
      this.publications = this.publications.trim()
      if (this.publications.split(',').length + this.juste_pour_vous_publications.length > 10){
        store.commit("notify", {message:"Echec, publications superieures a 10", type:"fail"})
        return;
      }
      axiosClient.get(`/juste-pour-vous-publications/get?pubs=${this.publications}`)
        .then(({data}) => {
          console.log(data, "data")
          this.juste_pour_vous_publications=this.juste_pour_vous_publications.concat(data.data);
          store.commit("notify", {message:"Operation reussie", type:"success"})
        })
    },
    deletePublication(index){
      this.juste_pour_vous_publications.splice(index, 1)
    }
  },
  data(){
    return {
      publications:'',
      juste_pour_vous_publications:[]
    }
  }
}
</script>

<style>

</style>