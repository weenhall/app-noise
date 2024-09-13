<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-icon :icon="languageOutline" :size="large"></ion-icon>
        <ion-list>
          <ion-item>
            <ion-select :ok-text="$t('ok')" :cancel-text="$t('cancel')" v-model="currentLanguage" @ion-change="changeLanguage()">
              <ion-select-option value="zh">中文</ion-select-option>
              <ion-select-option value="en">ENGLISH</ion-select-option>            
            </ion-select>
          </ion-item>
        </ion-list>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonIcon , IonList, IonSelect, IonSelectOption} from '@ionic/vue';
import { languageOutline } from 'ionicons/icons';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
const { locale } = useI18n();
const changeLanguage = () => {
  console.log(currentLanguage.value)
  locale.value = currentLanguage.value;
  localStorage.setItem('language', currentLanguage.value);
}
const currentLanguage= ref(localStorage.getItem('language')||'zh');
</script>