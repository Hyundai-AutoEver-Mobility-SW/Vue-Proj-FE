<template>
  <div class="modal">
    <div class="inner">
      Lorem ipsum dolor sit amet.
      <button @click="closeModal">Close</button>
      <h1>Lorem ipsum dolor sit amet.</h1>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  .inner {
    width: 300px;
    height: 300px;
    background-color: white;
  }
}
</style>
