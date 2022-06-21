<template>
  <div class="my-slick-juste mb-4">
    <div v-for="slider, index in juste" :key="index">
      <img alt="Image" class="h-48 w-48" :src="slider.image_url"/>
    </div>
    
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import '../../assets/slick.css';

export default defineComponent({
  props:{
    juste:Array
  },
  components: {
    
  },
  watch:{
    juste: function(newVal, oldVal){
      this.$nextTick(() => {
                              window.$(".my-slick-juste").slick({
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
                              window.$('.my-slick-juste .slick-prev')
                                .addClass("w-8 rounded-full bg-gray-300")
                                .html('&lt;')
                              window.$('.my-slick-juste .slick-next')
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
.my-slick-juste .slick-arrow {
  position: absolute;
  top: 80px;
  z-index: 1;
}

.my-slick-juste .slick-next {
  right: 0;
}
</style>