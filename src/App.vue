<template>
  <Modal v-if="$store.state.modalView" />
  <Navbar />
  <router-view />\
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Modal from "./components/Modal.vue";
</script>

<style lang="scss"></style>
