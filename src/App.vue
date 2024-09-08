<template>
  <Modal v-if="$store.state.modalView" />
  <Navbar />
  <router-view />\
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Modal from "./components/Modal.vue";
</script>

<style lang="scss">
.brown-btn {
  background-color: $brown-color;
  width: 100%;
  color: white;
  border: none;
  text-align: center;
  padding: 0 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.brown-btn:hover {
  background-color: #735b29;
}
</style>
