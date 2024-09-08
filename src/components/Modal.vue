<template>
  <div class="modal">
    <div class="inner">
      <div class="close" @click="closeModal">
        <img src="/src/assets/close.svg" style="width: 20px" alt="" />
      </div>
      <h1>MAP</h1>
      <div class="addr">
        <div class="mb-3 mt-3">
          <input
            type="text"
            class="form-control"
            placeholder="주소를 입력하세요"
          />
        </div>
        <div class="current-btn" @click="moveCurrentLocation">현재위치</div>
        <div class="current-btn" @click="moveAddrLocation">주소위치</div>
      </div>
      <div class="mymap">
        <MapView ref="mapComponent" />
      </div>
      <div class="brown-btn">이사가기</div>
    </div>
  </div>
</template>

<script setup>
import MapView from "./MapView.vue";
import { useStore } from "vuex";
import { ref } from "vue";
const store = useStore();
const closeModal = () => {
  store.commit("setModalView", false);
};
const mapComponent = ref(null);
const moveCurrentLocation = () => {
  mapComponent.value.getCurrentLocation();
};
const moveAddrLocation = () => {
  mapComponent.value.setAddress();
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  .inner {
    width: 500px;
    height: 500px;
    background-color: $beige-color;
    border-radius: 20px;
    border: 1px solid $brown-color;
    padding: 25px 25px;
    position: relative;
    .close {
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 10px;
      margin: 5px;
      padding: 10px;
      background-color: $beige-color;
      border: 1px solid $brown-color;
      color: white;
      border-radius: 5px;
    }
    .addr {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      .form-control {
        width: 270px;
      }
      .current-btn {
        cursor: pointer;
        padding: 3px 10px;
        background-color: transparent;
        border: 2px solid $brown-color;
        color: white;
        border-radius: 15px;
        color: $brown-color;
        font-weight: 800;
        transition: 0.3s;
      }
      .current-btn:hover {
        background-color: $brown-color;
        color: white;
      }
    }
    .mymap {
      width: 100%;
      height: 270px;
      background-color: transparent;
      border-radius: 10px;
      margin-bottom: 20px;
      border: 2px solid $brown-color;
    }
  }
}
</style>
