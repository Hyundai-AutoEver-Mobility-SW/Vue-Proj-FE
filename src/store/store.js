import { createStore } from "vuex";

export default createStore({
    state: {
        modalView: false,
        userData: [
        { userid: 'dog1', password: 'dog1', username: "초코", addr: "강남구", image: "/profile/1.jpg", like: 0 },
        { userid: 'dog2', password: 'dog2', username: "하양이", addr: "홍대", image: "/profile/2.jpg", like: 0 },
        { userid: 'dog3', password: 'dog3', username: "식빵이", addr: "성수", image: "/profile/3.jpg" },
        { userid: 'dog4', password: 'dog4', username: "크림이", addr: "잠실", image: "/profile/4.jpg" },
        { userid: 'dog5', password: 'dog5', username: "설이", addr: "옥수", image: "/profile/5.jpg" },
        ],
    },
    mutations: {},
    actions: {},
});