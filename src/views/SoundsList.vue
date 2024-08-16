<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid :fixed="true">
        <ion-row>
          <ion-col size="3"><ion-img src="/img/emblems/rain-symbolic.svg"></ion-img>Rain</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/storm-symbolic.svg"></ion-img>Storm</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/wind-symbolic.svg"></ion-img>Wind</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/waves-symbolic.svg"></ion-img>Waves</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="3"><ion-img src="/img/emblems/stream-symbolic.svg"></ion-img>Stream</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/birds-symbolic.svg"></ion-img>Birds</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/summer-night-symbolic.svg"></ion-img>Summer Night</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/train-symbolic.svg"></ion-img>Train</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="3"><ion-img src="/img/emblems/boat-symbolic.svg"></ion-img>Boat</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/city-symbolic.svg"></ion-img>City</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/coffee-shop-symbolic.svg"></ion-img>Coffee Shop</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/fireplace-symbolic.svg"></ion-img>FirePlace</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="3"><ion-img src="/img/emblems/pink-noise-symbolic.svg"></ion-img>Pink Noise</ion-col>
          <ion-col size="3"><ion-img src="/img/emblems/white-noise-symbolic.svg"></ion-img>White Noise</ion-col>
          <ion-col size="3"></ion-col>
          <ion-col size="3"></ion-col>
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
</style>
