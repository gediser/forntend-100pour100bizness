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
    <div id="publications" v-if="meilleur_classement.length > 0" class="py-4 flex flex-wrap gap-4">
      <div class="relative" v-for="item, index in meilleur_classement" :key="index">
        <img class="h-24 w-24" alt="publication" :src="item.image_url" />
        <svg @click="deletePublication(index)" xmlns="http://www.w3.org/2000/svg" class="absolute top-1 right-1 h-6 w-6 text-white bg-gray-300 rounded-full cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
    <div v-else> 
      <p>Pas de publications pour la section meilleur classement.</p>
    </div>
    <div class="flex justify-center"> 
      <button @click="confirmer" class="w-[50%] text-center bg-belge hover:scale-110 text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">Confirmer Publications Meilleur Classement</button>
    </div>
    
  </div>
</template>

<script>
import axiosClient from '../../axios'
import store from '../../store'

export default {
  mounted(){
    axiosClient.get(`/meilleur-classement/get-all`)
        .then(({data}) => {
          this.meilleur_classement=this.meilleur_classement.concat(data.data);
        })
  },
  methods:{
    inserer(){
      this.publications = this.publications.trim()
      const publications_ids = this.publications.split(',')
      for(let i =0; i< publications_ids.length; i++){
        if (this.meilleur_classement.findIndex(item => item.id === parseInt(publications_ids[i])) >= 0){
          store.commit("notify", {message:"Echec, une publication est deja presente "+publications_ids[i], type:"fail"})
          return 
        }
      }
      if (this.publications.split(',').length + this.meilleur_classement.length > 10){
        store.commit("notify", {message:"Echec, publications superieures a 10", type:"fail"})
        return;
      }
      axiosClient.get(`/publications/get?pubs=${this.publications}`)
        .then(({data}) => {
          this.meilleur_classement=this.meilleur_classement.concat(data.data);
          store.commit("notify", {message:"Operation reussie", type:"success"})
        })
    },
    deletePublication(index){
      this.meilleur_classement.splice(index, 1)
    },
    confirmer(){
      if (this.meilleur_classement.length == 0){
        store.commit('notify', {message:'La selection ne contient pas de publications.', type:'fail'})
        return;
      }
      const publications = this.meilleur_classement.map(item => ({publication_id:item.id}))
      axiosClient.post('/meilleur-classement/save', {publications}).then(()=>{
        store.commit('notify', {message:'La selection a ete enregistree.', type:'success'})
      })

    }
  },
  data(){
    return {
      publications:'',
      meilleur_classement:[]
    }
  }
}
</script>

<style>

</style>