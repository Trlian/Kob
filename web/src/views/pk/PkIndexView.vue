<template>
    <PlayGround v-if="$store.state.pk.status === 'playing'" />
    <MatchGround v-if="$store.state.pk.status === 'matching'" />
</template>
<script>
import PlayGround from '../../components/PlayGround.vue'
import MatchGround from '../../components/MatchGround.vue'
import { onMounted, onUnmounted } from 'vue'        //onMounted当组件被挂载之后，onUnmounted当组件被卸载之后
import { useStore } from 'vuex'

export default {

    components: {
        PlayGround,
        MatchGround,
    },
    setup() {
        const store = useStore();
        const SocketUrl = `ws://localhost:3000/websocket/${store.state.user.token}/`;

        let socket = null;
        onMounted(() => {
            store.commit('updateOpponent', {
                username: "我的对手",
                photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",

            })

            socket = new WebSocket(SocketUrl);

            socket.onopen = () => {
                console.log("connected!");
                store.commit('updateSocket', socket);
            },
            

            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                if (data.event === "start-matching") { //匹配成功
                    store.commit('updateOpponent', {
                        username: data.opponent_username,
                        photo: data.opponent_photo,
                    });
                    setTimeout(() => {
                        store.commit("updateStatus", "playing");
                    }, 2000);
                    store.commit('updateGamemap', data.gamemap); 
                }
            },

            socket.onclose = () => {
                socket.close();
                store.commit("updateStatus", "matching");
            }
        }),

        onUnmounted(() => {
            socket.close();
        })
    },
}
</script>

<style scoped>
    
</style>