<template>
  <div class="modal">
    <div class="inner">
      <div class="close" @click="closeModal">
        <img src="/src/assets/close.svg" style="width: 20px" alt="" />
      </div>
      <h1 class="title">
        💌 {{ $store.state.userData[$store.state.index].username }}네
      </h1>
      <div class="addr">
        <div class="mb-3 mt-3">
          <input
            type="text"
            class="form-control"
            placeholder="주소를 입력하세요"
            v-model="newAddr"
          />
        </div>
        <div class="search" @click="searchAddr">
          <img
            src="/src/assets/search.svg"
            style="width: 30px; cursor: pointer; transition: 0.3s"
            alt=""
          />
        </div>
        <div class="current-btn" @click="moveCurrentLocation">현재위치</div>
        <div class="current-btn" @click="moveAddrLocation">주소위치</div>
      </div>
      <div class="mymap">
        <MapView ref="mapComponent" />
      </div>
      <div class="brown-btn" @click="updateAddr">이사가기</div>
    </div>
  </div>
</template>

<script setup>
import MapView from "./MapView.vue";
import { useStore } from "vuex";
import { ref } from "vue";
const store = useStore();
const lastClickedLocation = ref("");
const mapComponent = ref(null);
// methods
const closeModal = () => {
  store.commit("setModalView", false);
};
const newAddr = ref("");

const searchAddr = () => {
  // mapComponent.value.searchAddrData = newAddr.value;
  mapComponent.value.searchAddr(newAddr.value);
  newAddr.value = "";
  console.log("검색어: ", newAddr.value);
};
const updateAddr = () => {
  store.commit("setModalView", false);
  lastClickedLocation.value = mapComponent.value.getLastClickedLocation();
  console.log("마지막 마커 위치로 주소업뎃:", lastClickedLocation.value);
  store.commit("setAddr", lastClickedLocation.value);
};
// map
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
    .title {
      color: $brown-color;
      font-size: 35px;
      font-weight: 800;
    }
    .addr {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      .search:hover {
        transform: scale(1.1);
      }
      .form-control {
        width: 250px;
      }
      .current-btn {
        cursor: pointer;
        padding: 3px 3px;
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
