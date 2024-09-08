<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  item: Object,
  i: Number,
});

const latitude = ref(0);
const longitude = ref(0);

const moveLat = ref(0);
const moveLng = ref(0);

let map = null;
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
      initMap();
      getCurrentLocation();
      getCenterChange();
      setAddress();
    });
  };
  document.head.appendChild(script);
});
const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(latitude.value, longitude.value),
    level: 3,
  };
  map = new window.kakao.maps.Map(container, options);
};
const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      moveLat.value = pos.coords.latitude;
      moveLng.value = pos.coords.longitude;
      const moveLatLng = new window.kakao.maps.LatLng(
        moveLat.value,
        moveLng.value
      );
      const marker = new window.kakao.maps.Marker({
        position: moveLatLng,
      });
      marker.setMap(map); // 마커 지도에 설정
      map.setCenter(moveLatLng); // 지도 중심을 마커 위치로 설정
    },
    (err) => {
      alert(err.message);
    }
  );
};

const getCenterChange = () => {
  // 중심좌표가 변경 이벤트 등록
  kakao.maps.event.addListener(map, "center_changed", () => {
    const latlng = map.getCenter();
    moveLat.value = latlng.getLat();
    moveLng.value = latlng.getLng();
    // console.log("Center changed:", moveLat.value, moveLng.value);
  });
};

const setAddress = () => {
  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  console.log(
    "store.state.userData[props.i].address",
    store.state.userData[0].addr
  ),
    geocoder.addressSearch(
      store.state.userData[0].addr,
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          console.log("result", result);
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:3px 0;">우리집</div>',
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      }
    );
};
// 부모 컴포넌트에서 이 함수에 접근할 수 있도록 expose 사용
defineExpose({
  getCurrentLocation,
  setAddress,
});
</script>
<style lang="scss" scoped></style>
