<template>
   <Carousel class="mb-8 meilleur" :settings="settings" :breakpoints="breakpoints">
    <Slide v-for="slide, index in slides" :key="index">
      <div class="m-2"><img :alt="slide.name" :src="slide.src"/></div>
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
        {name:"Image", src:'/images/photo-produits.jpg'},
        {name:"Image", src:'/images/photo-produits.jpg'},
        {name:"Image", src:'/images/photo-produits.jpg'},
        {name:"Image", src:'/images/photo-produits.jpg'},
        {name:"Image", src:'/images/photo-produits.jpg'},
        {name:"Image", src:'/images/photo-produits.jpg'},
        {name:"Image", src:'/images/photo-produits.jpg'},
        {name:"Image", src:'/images/photo-produits.jpg'},
        {name:"Image", src:'/images/photo-produits.jpg'},
        {name:"Image", src:'/images/photo-produits.jpg'},
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
        itemsToShow: 4.5,
        snapAlign: 'start',
      },
    },
  }),
});
</script>

<style>
.meilleur .carousel__next, 
.meilleur .carousel__prev{
  border-radius: 100%;
  background-color: gray;
}

.meilleur  .carousel__prev--in-active,
.meilleur  .carousel__next--in-active {
  display: none;
}
</style>