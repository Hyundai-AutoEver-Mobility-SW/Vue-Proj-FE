<template>
  <Navbar />
  <transition>
    <router-view :key="$route.fullPath" />
  </transition>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style lang="scss"></style>
