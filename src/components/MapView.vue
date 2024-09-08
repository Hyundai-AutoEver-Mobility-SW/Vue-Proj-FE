<template>
  <div id="map" style="width: 100%; height: 100%">map</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const latitude = ref(0);
const longitude = ref(0);

const moveLat = ref(0);
const moveLng = ref(0);

onMounted(() => {
  if (!("geolocation" in navigator)) {
    console.error("geolocation is not available");
    return;
  }
  const kakaoAppKey = import.meta.env.VITE_KAKAO_APP_KEY;
  const script = document.createElement("script");
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}&libraries=services&autoload=false`;
  script.onload = () => {
    // Kakao Maps API가 완전히 로드된 후에 지도 초기화
    window.kakao.maps.load(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          latitude.value = pos.coords.latitude;
          longitude.value = pos.coords.longitude;
          const container = document.getElementById("map");
          const options = {
            center: new kakao.maps.LatLng(latitude.value, longitude.value),
            level: 3, // 기본 줌 레벨 설정
          };

          // 지도 생성
          const map = new window.kakao.maps.Map(container, options);
        },
        (err) => {
          alert(err.message);
        }
      );
    });
  };
  document.head.appendChild(script);
});
</script>
<style lang="scss" scoped></style>
