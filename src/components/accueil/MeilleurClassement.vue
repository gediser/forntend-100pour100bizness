<template>
   <div class="my-slick-meilleur mb-4">
    <div v-for="slider, index in meilleur" :key="index">
      <router-link :to="{name:'PublicationsShow', params:{id:slider.id}}">
        <img alt="Image" class="h-48 w-48 rounded-md" :src="slider.image_url"/>
      </router-link>
    </div>
    
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axiosClient from '../../axios';

export default defineComponent({
  name:"Breakpoints",
  props:{
    meilleur:Array
  },
  components: {
    
  },
  watch:{
    meilleur: function(newVal, oldVal){
      this.$nextTick(() => {
                              window.$(".my-slick-meilleur").slick({
                                infinite: false,
                                speed: 300,
                                slidesToShow: 5.5,
                                slidesToScroll: 4,
                                responsive: [
                                  {
                                    breakpoint: 1024,
                                    settings: {
                                      slidesToShow: 2.5,
                                      slidesToScroll: 2,
                                      infinite: true,
                                    }
                                  },
                                  {
                                    breakpoint: 600,
                                    settings: {
                                      slidesToShow: 2,
                                      slidesToScroll: 2
                                    }
                                  },
                                  {
                                    breakpoint: 480,
                                    settings: {
                                      slidesToShow: 1.25,
                                      slidesToScroll: 1
                                    }
                                  }
                                  // You can unslick at a given breakpoint now by adding:
                                  // settings: "unslick"
                                  // instead of a settings object
                                ]
                              })
                              window.$('.my-slick-meilleur .slick-prev')
                                .addClass("w-8 rounded-full bg-gray-300")
                                .html('&lt;')
                              window.$('.my-slick-meilleur .slick-next')
                                .addClass("w-8 rounded-full bg-gray-300")
                                .html('&gt;')
      });
  },
  },
  data: () => ({
  }),
});
</script>

<style>
.my-slick-meilleur .slick-arrow {
  position: absolute;
  top: 80px;
  z-index: 1;
}

.my-slick-meilleur .slick-next{
  right: 0;
}
</style>