<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid :fixed="true">
        <ion-row>
          <ion-col size="12">
            <div id="chart-area"></div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="3"></ion-col>
          <ion-col size="3"><ion-button color="success" @click="startTest" :disabled="startDisabled">start</ion-button></ion-col>
          <ion-col size="3"><ion-button color="tertiary" @click="stopTest" :disabled="stopDisabled">stop</ion-button></ion-col>
          <ion-col size="3"></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { IonPage, IonContent, IonGrid, IonRow, IonCol,IonButton,alertController } from '@ionic/vue';
import { GaugeChart } from '@toast-ui/chart';
const startDisabled=ref(false);
const stopDisabled=ref(true);
const data = {
  series: [
    {
      name: 'Speed',
      data: [0],
    },
  ],
};
const options = {
  tooltip: {
    template: () => '',
  },
  chart: { title: '', width: 350, height: 250 },
  circularAxis: { title: 'db', scale: { min: 0, max: 120 } },
  series: {
    angleRange: {
      start: 270,
      end: 90,
    },
    dataLabels: { visible: true, offsetY: -200 },
  },
  plot: {
    bands: [
      { range: [0, 20], color: '#fce4ec' },
      { range: [20, 40], color: '#f8bbd0' },
      { range: [40, 60], color: '#f48fb1' },
      { range: [60, 80], color: '#f06292' },
      { range: [80, 100], color: '#ec407a' },
      { range: [100, 120], color: '#e91e63' },
    ],
  },
  theme: {
    chart: { fontFamily: 'Impact' },
    circularAxis: {
      title: { fontWeight: 500, fontSize: 20, color: '#650434' },
      label: { color: '#650434', fontSize: 15 },
      tick: { strokeStyle: '#650434' },
      strokeStyle: '#650434',
    },
    series: {
      clockHand: {
        color: '#650434',
        baseLine: 10,
      },
      pin: {
        radius: 10,
        color: '#650434',
        borderWidth: 5,
        borderColor: 'rgba(101, 4, 52, 0.3)',
      },
      dataLabels: {
        fontSize: 30,
        color: '#fff',
        textBubble: {
          visible: true,
          backgroundColor: '#650434',
          paddingX: 5,
          paddingY: 5,
        },
      },
    },
    plot: { bands: { barWidth: 35 } }
  },
  exportMenu: {
    visible: false
  }
};
let chart: any;
let intervalId: any;
let audioContext: any;
let stream: any;
onMounted(() => {
  const el = document.getElementById("chart-area");
  if (el) {
    chart = new GaugeChart({ el, options, data })
  }
})
const startTest = () => {
  startDisabled.value=true;
  stopDisabled.value=false;
 navigator.mediaDevices.getUserMedia({ audio: true })
    .then(async mediaStream => {
      console.log('Microphone access successfully obtained');
      stream = mediaStream;
      audioContext = new AudioContext();
      const alert = await alertController.create({
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: audioContext,
      buttons: ['Action'],
    });

    await alert.present();
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
        console.debug(volume);
        chart.setData({
          series: [
            {
              name: 'Speed',
              data: [volume],
            },
          ]
        })
      }
      intervalId = setInterval(getVolume, 200);
    }).catch(error => {
      console.error('Error accessing microphone', error);
    })
}
const stopTest = () => {
  stopDisabled.value=true;
  startDisabled.value=false;
  clearInterval(intervalId);
  chart.setData({
    series: [
      {
        name: 'Speed',
        data: [0],
      },
    ]
  })
  if (stream) {
    stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
  }
  if (audioContext) {
    audioContext.close().then(() => {
      console.log('音频上下文已关闭');
    }).catch((err: any) => {
      console.error('关闭音频上下文失败', err);
    });
  }
}
</script>
<style scoped>
ion-col {
  text-align: center;
}

ion-grid {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 45%;
  transform: translateY(-45%);
}
</style>
