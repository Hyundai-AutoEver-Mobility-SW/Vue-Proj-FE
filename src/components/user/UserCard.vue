<template>
  <div class="user-card">
    <div class="user-info">
      <div class="avata">
        <img :src="item.image" alt="" />
      </div>
      <div class="user-details mb-3">
        <div class="like mb-3">
          <div class="like-btn" @click="addLike">❤️ ⬅️</div>
          <div v-for="n in likes[i]" :key="n">❤️</div>
        </div>
        <p class="detail-custom">{{ item.userid }}</p>
        <p class="detail-custom-2">{{ item.username }}</p>
        <p class="detail-custom">{{ item.addr }}</p>
      </div>
      <div class="user-actions">
        <button class="map-btn">지도보기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const props = defineProps({
  item: Object,
  i: Number,
});

const store = useStore();
const likes = ref(Array(store.state.userData.length).fill(0));
const addLike = (i) => {
  if (likes.value[i] < 5) {
    likes.value[i]++;
  }
};
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .user-info {
    border: 2px solid #4d3a10;
    border-radius: 10%;
    background-color: #fdecd8;
    max-width: 240px;
    gap: 20px;
    padding: 30px 20px;
  }
  .avata {
    width: 200px;
    height: 200px;
    border-radius: 30%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .user-details {
    .like {
      display: flex;
      gap: 5px;
    }
    .like-btn {
      cursor: pointer;
    }
    p {
      margin-bottom: 5px;
    }
    .detail-custom,
    .detail-custom-2 {
      display: inline-block;
      margin-right: 5px;
      padding: 0 5px;
      background-color: #5e875f;
      border-radius: 20px;
      color: #fdecd8;
      border: 1px solid #4d3a10;
    }

    .detail-custom-2 {
      font-weight: 700;
      background-color: #fdecd8;
      color: #4d3a10;
    }
  }
  .user-actions {
    display: flex;
    justify-content: center;
    width: 100%;

    .map-btn {
      background-color: #4d3a10;
      width: 100%;
      color: white;
      border: none;
      padding: 0 20px;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .map-btn:hover {
      background-color: #735b29;
    }
  }
}
</style>
