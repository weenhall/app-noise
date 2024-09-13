<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('playlist') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid :fixed="true">
        <ion-row v-for="(row, rowIndex) in getRows()" :key="rowIndex">
          <ion-col v-for="(item, colIndex) in row" :key="colIndex" size="3" :class="{ active: item.active }"
            @click="handleClick(item, rowIndex, colIndex)">
            <ion-img :src="item.imgSrc" :alt="item.name"></ion-img>
            <div>{{ $t(toCamelCase(item.attrName), item.name) }}</div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-title>
          <ion-button><ion-icon :icon="volumeMediumOutline" size="large" slot="icon-only"></ion-icon></ion-button>
          <ion-button @click="togglePlayer"><ion-icon :icon="currentPlayIcon" size="large"
              slot="icon-only"></ion-icon></ion-button>
          <audio ref="audioPlayer">
            <source :src="audioSrc" />
          </audio>
        </ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonImg } from '@ionic/vue';
import { volumeMediumOutline, playCircleOutline, pauseCircleOutline } from 'ionicons/icons';
import { onBeforeRouteLeave } from 'vue-router';
const audioList = ref([{
  name: '雨',
  attrName: 'rain',
  imgSrc: '/img/emblems/rain-symbolic.svg',
  active: true
}, {
  name: '咆哮',
  attrName: 'storm',
  imgSrc: '/img/emblems/storm-symbolic.svg',
  active: false
}, {
  name: '风',
  attrName: 'wind',
  imgSrc: '/img/emblems/wind-symbolic.svg',
  active: false
}, {
  name: '波浪',
  attrName: 'waves',
  imgSrc: '/img/emblems/waves-symbolic.svg',
  active: false
}, {
  name: '溪流',
  attrName: 'stream',
  imgSrc: '/img/emblems/stream-symbolic.svg',
  active: false
}, {
  name: '鸟',
  attrName: 'birds',
  imgSrc: '/img/emblems/birds-symbolic.svg',
  active: false
}, {
  name: '夏夜',
  attrName: 'summer-night',
  imgSrc: '/img/emblems/summer-night-symbolic.svg',
  active: false
}, {
  name: '火车',
  attrName: 'train',
  imgSrc: '/img/emblems/train-symbolic.svg',
  active: false
}, {
  name: '船',
  attrName: 'boat',
  imgSrc: '/img/emblems/boat-symbolic.svg',
  active: false
}, {
  name: '城市',
  attrName: 'city',
  imgSrc: '/img/emblems/city-symbolic.svg',
  active: false
}, {
  name: '咖啡店',
  attrName: 'coffee-shop',
  imgSrc: '/img/emblems/coffee-shop-symbolic.svg',
  active: false
}, {
  name: '火炉',
  attrName: 'fireplace',
  imgSrc: '/img/emblems/fireplace-symbolic.svg',
  active: false
}, {
  name: '粉红噪声',
  attrName: 'pink-noise',
  imgSrc: '/img/emblems/pink-noise-symbolic.svg',
  active: false
}, {
  name: '白噪声',
  attrName: 'white-noise',
  imgSrc: '/img/emblems/white-noise-symbolic.svg',
  active: false
}])
const getRows = () => {
  const rows = [];
  for (let i = 0; i < audioList.value.length; i += 4) {
    rows.push(audioList.value.slice(i, i + 4));
  }
  return rows;
}
const audioPlayer = ref();
const audioSrc = ref("/audio/rain.ogg");
const playerIcons = [playCircleOutline, pauseCircleOutline];
const currentPlayIcon = ref(playerIcons[0]);
// 切换播放图标
const togglePlayer = () => {
  const currentIndex = playerIcons.indexOf(currentPlayIcon.value);
  const nextIndex = (currentIndex + 1) % playerIcons.length;
  currentPlayIcon.value = playerIcons[nextIndex];
  if (audioPlayer.value && currentIndex === 0) {
    audioPlayer.value.play();
  }
  if (audioPlayer.value && currentIndex === 1) {
    audioPlayer.value.pause();
  }
};
let currentActiveIndex: number = 0;
const handleClick = (item: any, rowIndex: number, colIndex: number) => {
  audioList.value[currentActiveIndex].active = false;
  currentActiveIndex = rowIndex * 4 + colIndex;
  item.active = true;
  audioPlayer.value.pause();
  audioPlayer.value.currentTime = 0;
  audioSrc.value = '/audio/' + item.attrName + '.ogg';
  audioPlayer.value.load();
  if (currentPlayIcon.value === pauseCircleOutline) {
    audioPlayer.value.play();
  }
}

onBeforeRouteLeave((to, from, next) => {
  if (from.path === '/tabs/tab1') {
    audioPlayer.value.pause();
    currentPlayIcon.value = playCircleOutline;
  }
  next();
});

const toCamelCase = (str) => {
  return str
    .split('-')
    .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};
</script>
<style scoped>
ion-title {
  text-align: center;
}

ion-grid {
  text-align: center;
}

ion-col.active {
  background-color: darkgray;
}
</style>
