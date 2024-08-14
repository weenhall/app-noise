<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">
        <ion-button color="tertiary" @click="buttonClick">start</ion-button>
        <ion-button color="primary" @click="stop">stop</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
let intervalID: any;
let audioContext: any;
let stream:any;
const buttonClick = () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(mediaStream  => {
      stream=mediaStream;
      console.log('Microphone access successfully obtained');
      audioContext = new AudioContext();
      // 创建音频源节点
      const source = audioContext.createMediaStreamSource(stream);

      // 创建分析器节点
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);

      // 创建一个 Uint8Array 用于存储音频数据
      const dataArray = new Uint8Array(analyser.frequencyBinCount);


      function getVolume() {
        analyser.getByteFrequencyData(dataArray);

        // 计算音量（RMS）
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const value = dataArray[i];
          sum += value * value;
        }
        const rms = Math.sqrt(sum / dataArray.length);
        const volume = Math.floor(rms);

        // 更新页面上的音量
        console.log(volume);
      }

      // 开始获取音量
      intervalID = setInterval(getVolume, 500);
    })
    .catch(error => {
      console.error('Error accessing microphone', error);
    });
}
const stop = () => {
  if(stream){
    stream.getTracks().forEach(track => track.stop());
  }
  if(audioContext){
    audioContext.close().then(() => {
                    console.log('音频上下文已关闭');
                }).catch(err => {
                    console.error('关闭音频上下文失败', err);
                });
  }
  clearInterval(intervalID);
}
</script>
<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
