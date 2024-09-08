<template>
  <swiper
    :slidesPerView="auto"
    :spaceBetween="10"
    :centeredSlides="true"
    :pagination="{ clickable: true }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(item, i) in $store.state.userData" :key="i">
      <UserCard :item="item" :i="i" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import UserCard from "./UserCard.vue";
const modules = [Pagination];
</script>

<style lang="scss" scoped>
.swiper {
  .swiper-wrapper {
  }
  .swiper-slide {
    flex-shrink: 1;
    max-width: 250px !important;
  }
}
</style>
