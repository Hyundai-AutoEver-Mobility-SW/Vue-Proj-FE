<template>
  <nav class="navbar navbar-expand-md transparent-navbar">
    <div class="container">
      <img src="/src/assets/dog.png" class="m-1" alt="" />
      <a class="navbar-brand logo" href="#"> Vue </a>
      <button
        class="navbar-toggler custom-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
          <li class="nav-item">
            <router-link class="nav-link" to="/">HOME</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user">USER</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/mypage">MYPAGE</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link disabled" to="/">SIGNUP</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
.transparent-navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
.nav-link,
.logo {
  font-weight: 400;
  color: $beige-color;
  transition: color 0.3s ease, font-weight 0.3s ease;
}
.nav-link:hover,
.logo:hover {
  font-weight: 600; /* 호버 시 글씨가 더 굵어지도록 */
  color: #ffcc99; /* 호버 시 색상을 더 밝은 색으로 변경 */
}
.custom-toggler {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px; /* 적당한 여백 추가 */
  border-radius: 5px; /* 둥근 모서리 */
}
</style>
