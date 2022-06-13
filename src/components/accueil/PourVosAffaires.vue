<template>
   <Carousel class="mb-8" :settings="settings" :breakpoints="breakpoints">
    <Slide v-for="slide in slides" :key="slide.url">
      <div class="bg-belge text-white p-2 border border-belge hover:text-red-500 hover:scale-110 rounded-md cursor-pointer">{{ slide.name }}</div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

export default defineComponent({
  name: 'Breakpoints',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data: () => ({
    slides:[
        {name:"Toutes categories", url:'/categories'},
        {name:"Demande de devis", url:'/devis'},
        {name:"Pret pour expedition", url:'/expedition'},
        {name:"Drop Shipping", url:'/drop-shiping'},
        {name:"Logistics", url:'/logistics'}
    ],
    // carousel settings
    settings: {
      itemsToShow: 1.5,
      snapAlign: 'center',
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: 'start',
      },
    },
  }),
});
</script>

<style>

</style>