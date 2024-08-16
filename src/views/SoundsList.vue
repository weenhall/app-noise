<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>声音列表</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid :fixed="true">
        <ion-row>
          <ion-col size="3"><ion-img src="/img/emblems/rain-symbolic.svg"></ion-img>雨</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/storm-symbolic.svg"></ion-img>咆哮</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/wind-symbolic.svg"></ion-img>风</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/waves-symbolic.svg"></ion-img>波浪</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="3"><ion-img src="/img/emblems/stream-symbolic.svg"></ion-img>溪流</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/birds-symbolic.svg"></ion-img>鸟</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/summer-night-symbolic.svg"></ion-img>夏夜</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/train-symbolic.svg"></ion-img>火车</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="3"><ion-img src="/img/emblems/boat-symbolic.svg"></ion-img>船</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/city-symbolic.svg"></ion-img>城市</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/coffee-shop-symbolic.svg"></ion-img>咖啡店</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/fireplace-symbolic.svg"></ion-img>火炉</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="3"><ion-img src="/img/emblems/pink-noise-symbolic.svg"></ion-img>粉红噪声</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/white-noise-symbolic.svg"></ion-img>白噪声</ion-col>
          <!-- <ion-col size="3"></ion-col>
          <ion-col size="3"></ion-col> -->
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-title>
          <ion-button><ion-icon :icon="volumeMediumOutline" size="large" slot="icon-only"></ion-icon></ion-button>
          <ion-button @click="togglePlayer"><ion-icon :icon="currentPlayIcon" size="large"
              slot="icon-only"></ion-icon></ion-button>
        </ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonIcon, IonButton, IonGrid, IonRow, IonCol,IonImg } from '@ionic/vue';
import { volumeMediumOutline, playCircleOutline, stopCircleOutline } from 'ionicons/icons';
const playerIcons = [playCircleOutline, stopCircleOutline];
const currentPlayIcon = ref(playerIcons[0]);
// 切换播放图标
const togglePlayer = () => {
  const currentIndex = playerIcons.indexOf(currentPlayIcon.value);
  const nextIndex = (currentIndex + 1) % playerIcons.length;
  currentPlayIcon.value = playerIcons[nextIndex];
};
</script>
<style scoped>
ion-title {
  text-align: center;
}
ion-grid {
  text-align: center;
}
ion-col:hover{
  background-color: darkgray;
}
</style>
