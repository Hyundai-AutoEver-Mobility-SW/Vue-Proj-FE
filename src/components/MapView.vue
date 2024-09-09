<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import { info } from "sass";
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
let marker = null;
let infowindow = null;
let geocoder = null;
const lastClickedLocation = ref("");
const searchAddrData = ref("");
// methods
const clearMap = () => {
  infowindow = null;
  marker = null;
};
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
    console.log("Kakao Maps API loaded");
    window.kakao.maps.load(() => {
      initMap();
      // getCurrentLocation();
      setAddress();
      clickMarker();
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
      marker = new window.kakao.maps.Marker({
        position: moveLatLng,
      });
      marker.setMap(map); // 마커 지도에 설정
      map.setCenter(moveLatLng); // 지도 중심을 마커 위치로 설정
      console.log("현재 위치는 ", moveLat.value);
    },
    (err) => {
      alert(err.message);
    }
  );
};

const clickMarker = () => {
  clearMap();
  geocoder = new kakao.maps.services.Geocoder();
  // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
  searchAddrFromCoords(map.getCenter());

  // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var jibunAddr = result[0].address.address_name;
        var detailAddr = "<div>" + jibunAddr + "</div>";
        var content =
          '<div style="width:200px;text-align:center;padding:3px 0; class="bAddr">' +
          detailAddr +
          "</div>";

        // 마커를 클릭한 위치에 표시합니다
        marker.setPosition(mouseEvent.latLng);
        marker.setMap(map);

        // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
        infowindow.setContent(content);
        infowindow.open(map, marker);
        lastClickedLocation.value = jibunAddr;
      }
    });
  });

  // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(map, "idle", function () {
    searchAddrFromCoords(map.getCenter());
  });

  function searchAddrFromCoords(coords, callback) {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  }

  function searchDetailAddrFromCoords(coords, callback) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }
};
const setAddress = () => {
  clearMap();
  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  console.log(
    "store.state.userData.address",
    store.state.userData[store.state.index].addr
  ),
    geocoder.addressSearch(
      store.state.userData[store.state.index].addr,
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          console.log("result", result);
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          infowindow = new kakao.maps.InfoWindow({
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
const searchAddr = (data) => {
  clearMap();
  searchAddrData.value = `받은 데이터: ${data}`;
  geocoder.addressSearch(data, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      // 결과값으로 받은 위치를 마커로 표시합니다
      marker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });
      // 인포윈도우로 장소에 대한 설명을 표시합니다
      infowindow = new kakao.maps.InfoWindow({
        content:
          '<div style="width:150px;text-align:center;padding:6px 0;">검색위치</div>',
      });
      infowindow.open(map, marker);
      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(coords);
    }
  });
};

// 부모
const getLastClickedLocation = () => {
  return lastClickedLocation.value;
};
// 부모 컴포넌트에서 이 함수에 접근할 수 있도록 expose 사용
defineExpose({
  getCurrentLocation,
  setAddress,
  getLastClickedLocation,
  searchAddr,
});
</script>
<style lang="scss" scoped></style>
