<template>
   <Carousel class="mb-8 juste" :settings="settings" :breakpoints="breakpoints">
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
  props: ['data'],
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  computed:{
    slides(){
      return this.data.map(item => ({name:'Image', src: item.image_url}))
    }
  },
  data: () => ({
    
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
.juste .carousel__next, 
.juste .carousel__prev{
  border-radius: 100%;
  background-color: gray;
}

.juste  .carousel__prev--in-active,
.juste  .carousel__next--in-active {
  display: none;
}
</style>