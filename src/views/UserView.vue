<template>
  <div class="container-fluid p-0 bg-container">
    <div class="content">
      <div class="overlay-text">
        <h1 class="title">User List</h1>
        <p class="description">유저 목록을 확인하고 수정하세요!</p>
      </div>
      <div class="user-list">
        <UserList />
      </div>
    </div>
  </div>
</template>

<script setup>
import UserList from "../components/user/UserList.vue";
</script>

<style lang="scss" scoped>
.bg-container {
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 100vh;
  background-image: url("/src/assets/pixel.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20vh;
}
.overlay-text {
  text-align: center;
  color: $beige-color;
  margin-bottom: 70px;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: $beige-color;
}

.description {
  font-size: 1.2rem;
  color: $beige-color;
}
.user-list {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
