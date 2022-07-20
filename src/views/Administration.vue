<template>
  <div v-if="!['manager', 'admin'].includes(this.$store.state.user.role)" class="flex justify-center items-center pt-12">
    Veuillez vous connecter et/ou demander a l'adminstrateur du site de vous donner les droits pour voir cette page.
  </div>
  <div v-else class=" pt-12">
    <h1 class="text-3xl font-bold text-gray-900 text-center mb-4">Administration</h1>
    <div class="mx-auto flex flex-wrap"> 
      <div class="lg:w-3/12 w-full flex flex-col gap-2">
        <router-link 
          :to="{name:'AdminJustForYou'}"
          class="bg-belge hover:scale-110 text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
          >Juste pour vous</router-link>
        <router-link 
          :to="{name:'AdminBestRanking'}"
          class="bg-belge hover:scale-110 text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
          >Meilleur classement</router-link>
        <router-link 
          :to="{name:'AdminPublications'}"
          class="bg-belge hover:scale-110 text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
          >Publications</router-link>
        <router-link 
          v-if="['manager'].includes(this.$store.state.user.role)"
          :to="{name:'AdminUser'}" 
          class="bg-belge hover:scale-110 text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
          >Utilisateurs</router-link>
      </div>
      <div class="lg:w-9/12 w-full">
        <router-view></router-view>
      </div>
      
    </div>
    
  </div>

  
</template>

<script>
export default {

}
</script>

<style>

</style>