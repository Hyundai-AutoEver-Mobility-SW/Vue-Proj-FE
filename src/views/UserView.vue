<template>
  <div class="container-fluid p-0 bg-container">
    <img src="/src/assets/pixel.jpeg" class="img-fluid full-img" alt="" />
    <div class="overlay-text">
      <h1 class="title">User List</h1>
      <p class="description">유저 목록을 확인하고 수정하세요!</p>
    </div>
    <div class="userlist">
      <UserCard />
    </div>
  </div>
</template>

<script setup>
import UserCard from "../components/user/UserCard.vue";
</script>

<style lang="scss" scoped>
.overlay-text {
  position: absolute;
  top: 30%;
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
.userlist {
  position: relative;
}
</style>
