<template>
  <div v-if="!['manager', 'admin'].includes(this.$store.state.user.role)" class="flex justify-center items-center pt-12">
    Veuillez vous connecter et/ou demander a l'adminstrateur du site de vous donner les droits pour voir cette page.
  </div>
  <div v-else class="flex justify-center items-center pt-12">
    Vous etes a l'adminstration.
  </div>

  <div>Hello 
    {{ this.$store.state.user.role }}
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>