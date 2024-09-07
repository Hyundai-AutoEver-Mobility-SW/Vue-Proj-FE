<template>
  <div class="container-fluid p-0 bg-container">
    <img src="/src/assets/pixel.jpeg" class="img-fluid full-img" alt="" />
    <div class="overlay-text">
      <h1 class="title">Vue User List Practice</h1>
      <p class="description">
        Simple SPA, User CRUD implementation using Vue.js, Vue Router, and Vuex
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bg-container {
  background-color: black;
  width: 100%;
  height: 100vh;
  position: relative;
}
.full-img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fdecd8;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: #fdecd8;
}

.description {
  font-size: 1.2rem;
  color: #fdecd8;
}
</style>
